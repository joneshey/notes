## 使用java实现扫描程序 
1. 与ftp连接然后将文件夹的文件根据校验下载到本地
2. 规定时间扫描
3. 不删除文件但区别重传,根据另外的文件内容是否变更来判定
4. 新增数据库记录，路径、源文件、目标文件、更改时间等字段
5. 记录日志

自定义配置文件:
```
//cfg 
//数据库ip,host,user,pwd
//ftp的ip,host,user,pwd
ftp_server_encoding=ISO8859-1
//目标搜索ftp目录
workDirOnFTP = \\app\\
//扫描间隔
interval = 5
//本地存储ftp的目录
localDir = D\:/test/
//相对路径，用于存储在数据库
relateDir = /test/

workStartTime = 20:00:00 //End
```

运行cmd:
```
@echo off 
setlocal enableextensions enabledelaudexpansion

set cp=.\package  
for %%f in (.\*jar) do set cp=!cp!;%%f   //获取所有依赖包
set CLASSPATH = &cp&;%CLASSPATH% 
echo %CLASSPATH%

set X_JAVA=""  //jdk目标目录
%X_JAVA% -Xms512m -Xmx512m package.xxxx // 对应的java程序名

```

实现过程中的知识点:  
1. 在规定时间内扫描，则需要在配置文件中设定扫描开始于结束时间：    
读取配置  
```java
//在构造函数中定义配置的参数
InputStream input = new FileInputStream("xxxx.txt")；
Properties prop = new Properties();
prop.load(input);
time = trimString(prop.getProperty("endTime"));
``` 

比较时间，格式化时间  
```java
SimpleDateFormat form = new SimpleDateFormat("HH:mm:ss");  // 注意HH是24小时制
Date currTime = new Date();
String dateString = form.format(currTime);
//换成统一比较格式
Date cTime = form.parse(dateString);  //参数为String类型
Date beginTime = form.parse(time);
if(beginTime.before(cTime)){}
```

2. 连接ftp
1). 创建FTPClient实例，使用ftpClient.connect(host,port)，返回replyCode用来判断是否连接成功  
2). 登陆ftpClient.login(user,pwd)，指定传输类型setFileType(FTPCilent.BINARY_FILE_TYPE)二进制  
3). 跳转到指定目录去扫描文件 changeWorkingDirectory(dir);
```
ftpClient.connect(host,port);
int code = ftpClient.getReplyCode();
if(!FTPReply.isPositiveCompletion(code)){
  //连接失败
  return
}
//登陆ftpClient.login(user,pwd)返回boolean判断
//跳转到指定目录去扫描文件 changeWorkingDirectory(dir)
```

3. 扫描文件
1). 获取所有文件，ftpClient.listFiles()  
2). 遍历文件并获取文件名(FTPFile file单个文件类型) new String(file.getName().getBytes(ftpEncode),localEncode);进行转码  
3). 比较是否已经上传，获取相同文件getFTPFile(ftpClient.fileName)，比较oFile和tFile的文件大小，如果相同则是上传完毕  
* 可以做文件格式校验等操作

4. 判断是否重传
1). 获取识别的文件内容
```
InputStream input = ftpClient.retrieveFileStream(fileName);
if(input == null){} //判空
BufferedReader reader = new BufferedReader(new InputStreamReader(input));
reader.readLine()
input.close();
//最后记得告诉ftpClient已经读取完成
ftpClient.completePendingCommand();
```
2). 与数据库的标志字段对比equals

5. 下载文件
1). 判断路径是否存在
```
File dir  = new File(path);
if(!dir.exists())  
  dir.mkdirs();  //创建路径，且可以跨级创建
File file = new File(dir,fileName);
OutputStream out = FileOutputStream(file);
ftpClient.retrieveFile(fileName,out);
out.close()
```

6. 日志
使用log4j.Logger,然后定义静态变量Logger.getLogger("Name");  
配置log4j.properties文件，指定Name
```
log4j.rootLogger   日志级别（info,debug）
log4j.logger.org   日志级别
log4j.logger.name  
log4j.appender.name /file/DatePattern/layout/  
```
logger继承root的日志，如果对info或者debug自定义了appender则会输出两次  
如果不指定file则不会输出日志  
```
log4j.logger.APP = INFO,APP
log4j.appender.APP = log4j.DailyRollingFileAppender
log4j.appender.APP.file = log/app/log
log4j.appender.APP.DatePattern='.'yyyy-MM-dd
log4j.appender.APP.layout=log4j.PatternLayout
log4j.appender.APP.layout.ConversionPattern=%d{[yyyy-MM-dd HH:mm:ss]}{%m}%n
```

7. 数据库
```
PreparedStatement ps = null
String sql = "select * from xx where name = ?";
con = DriverManager.getConnection(db,user,pwd);
ps.con.prepareStatement(sql);
ps.setString(1,"null")
ResultSet re = ps.executeQuery();
while(re.next()){ re.getString('name') }
```


代码评审时，注意点：  
1. 性能问题：  
由于扫描程序每秒扫描一次，因此要注意重复切换目录、操作数据库、读取文件、输出日志量的性能问题，减少不必要的性能操作。  
2. 读取文件：  
读取文件读取多行，要判断reader.readLine()!=null;然后对读取的一行进行拼接。   
读取之后需要关闭输入/出流，且判断输入/输出流是否为空，否则关闭时会报空指针异常。  
3. 代码优化：  
把每个功能都抽离成函数，避免逻辑混乱以及代码维护困难。   
4. 异常处理：
操作数据库异常后，要关闭数据连接；  
读写操作异常后，要关闭流；  


具体程序部分代码：
```
public static void main(String[]args) throws InterruptedException{
    App app = new App();
    //记录启动日志
    while(){
      boolean isWork = app.isWorkTime();
      if(isWork){
        app.work();
      }else{//提示非工作时间}
      //Thread.sleep(interval),间隔参数从配置文件获取
    }
}

public App(){
  //获取配置文件
  try{
    InputStream in = new FileInputStream(new File(".").getAbsolutePath()+"/test/custom.cfg");
    Properties prop = new Properties();
    prop.load(in);
    //获取字段值，prop.getProperty("");
    //对必要信息加密输出cfg
    //new BASE64Encoder().encode(pwd.getBytes());
  } catch(Exception e){
  }
}

public void work(){
  
}
```
