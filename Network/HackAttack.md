# 安全分析

### 1. Host头攻击
原理：利用构建工具将请求包的Host参数和请求方法进行修改  
风险：会容易跳转到非对应页面，造成钓鱼网站  
解决方法：
1. nginx以及Apache的配置
2. 通过SERVER_NAME获取域名，不要依赖请求包的host
3. 应用程序进行host头攻击检测,设置Host白名单
Nginx，修改ngnix.conf文件，在server中指定一个server_name名单，并添加检测。
Apache，修改httpd.conf文件，指定ServerName，并开启UseCanonicalName选项。
Tomcat，修改server.xml文件，配置Host的name属性。

```java
public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException,
			ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		String host = request.getHeader("host");  //无论有没有手动设置host,request.getHeader("host")不会等于null
		if (requestHost != null && !ServerWhiteListUtil.isWhite(host)) {
		response.setStatus(403);
		return;
		}
}
```
测试过程重现：
请求构建工具：Postman  
在请求Headers新增参数Host,输入别于请求的域名，打开postman控制条，查看详细的请求包信息，会发现host参数与请求地址的域名不一致。

### 2. 用户枚举
之前有了解过，就是不要提示给非法用户登录的提示错误，同一显示错误提示语：用户名或者密码不正确  
其中，关于密码剩余输入次数也需要注意

### 3.SQL注入
描述：将恶意sql代码注入到数据库查询语句中，多数为表单的提交。  
  
<b>举个栗子</b>：
```SQL
sql = "SELECT * FROM users WHERE name = '" + name + "' and passWord = '"+ psw +"';"
恶意填入：
name = "1' OR '1'='1";
psw = "1' OR '1'='1";
>>  sql = "SELECT * FROM users WHERE name = '1' OR '1'='1' and passWord = '1' OR '1'='1';"  //执行是为true就可以强行登陆
```
原理：在编写控制层时，使用请求参数去填充SQL语句（位置多数where xx = yy的条件语句），因此尽量避免写java时的Sql语句是通过外部变量进行拼接，可以使用占位符。
```java
//PreprareStatement#{}可以接收简单类型值或pojo属性值。如果parameterType传输单个简单类型值，#{}括号中可以是value或其它名称。
//PreprareStatement时，即使参数里有敏感字符如 or '1=1'、数据库也会作为一个参数一个字段的属性值，而不是sql语句
 String sql = “insert into user (name,pwd) values(?,?)”;  
 PreparedStatement ps = conn.preparedStatement(sql);  
 ps.setString(1, “jack”);   //占位符顺序从1开始
 ps.setString(2, “123456”); //也可以使用setObject
 ps.executeQuery();
```
