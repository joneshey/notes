当IDEA无法进行运行java文件：  
File-Project Structure-Modules中把你代码所在文件夹选为Sources然后确定。  
RUN就回来了  


javac -encoding utf-8 Output.java

1、时间戳（毫秒）

          System.currentTimeMillis()

2、时间戳（转秒）

         System.currentTimeMillis() / 1000

3、时间戳（转分钟）

        System.currentTimeMillis() / 1000 / 60

4、时间戳（转小时）

        System.currentTimeMillis() / 1000 / (60 * 60)

5、时间戳（转天）

       System.currentTimeMillis() / 1000 / (60 * 60 * 24)

//毫秒级时间戳

System.currentTimeMillis()


后台String转换日期LocalDate： LocalDates.parseLocalDateCored  Convert层

后台转换LocalDate为字符串：LocalDate.toDateString  Command层
 
.equal()  判断


导入接受参数:MultipartFile file  
创建工作本new XFSSBook(file.getInputStream)   
获取了工作表后去遍历数据即可，sheet.getRow/getCell  

比较时间  
SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
Date sd1=df.parse(beginTime);  
Date sd2=df.parse(endTime);  
System.out.println(sd1.before(sd2));  
System.out.println(sd1.after(sd2));  

使用SimpleDateFormat格式化格式时:

1、yyyy表示年，如2013；

2、MM表示月，如12；

3、dd表示天，如31；

4、hh表示用12小时制，如7；

5、HH表示用24小时制，如18；

6、mm表示分，如59；

7、ss表示秒，如59；
