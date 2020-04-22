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
 
constants.FALSE.equal()  判断
