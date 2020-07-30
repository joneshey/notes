## 使用java实现扫描程序 
1. 与ftp连接然后将文件夹的文件根据校验下载到本地
2. 规定时间扫描
3. 不删除文件但区别重传,根据另外的文件内容是否变更来判定
4. 新增数据库记录，路径、源文件、目标文件、更改时间等字段
5. 记录日志

运行cmd:
```
@echo off 
setlocal enableextensions enabledelaudexpansion

set cp=.\package  
for %%f in (.\*jar) do set cp=!cp!;%%f   //获取所有依赖包
set CLASSPATH = &cp&;%CLASSPATH% 
echo %CLASSPATH%

set X_JAVA=""  //jdk目标目录
%X_JAVA% -Xms512m -Xmx512m package.xxxx
ping 127.0 -n 60 >nul
```
实现过程中的知识点:  
1. 在规定时间内扫描，则需要在配置文件中设定扫描开始于结束时间：    
读取配置  
```java
InputStream input = new FileInputStream("xxxx.txt")；
Properties prop = new Properties();
prop.load(input);
time = trimString(prop.getProperty("endTime"));
``` 
比较时间  
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
2). 登陆ftpClient.login(user,pwd)，指定传输类型setFileType(FTPCilent.BINARY_FILE_TYPE)  
3). 跳转到指定目录去扫描文件 changeWorkingDirectory();

3. 扫描文件
1). 获取所有文件，ftpClient.listFiles()  
2). 遍历文件并获取文件名(FTPFile) new String(file.getName().getBytes(Encode),encode);进行转码  
3). 比较是否已经上传，获取相同文件getFTPFile(ftpClient.fileName)，比较oFile和tFile的文件大小，如果相同则是上传完毕  

4. 判断是否重传
1). 获取识别的文件内容
```
InputStream input = ftpClient.retrieveFileStream(fileName);
if(input == null){} //判空
BufferedReader reader = new BufferedR
```
