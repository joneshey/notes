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
