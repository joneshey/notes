# 漏洞分析

### * Host头攻击
为了方便获取网站域名，开发人员一般依赖于请求包中的Host首部字段。例如，在php里用_SERVER["HTTP_HOST"]。但是这个Host字段值是不可信赖的(可通过HTTP代理工具篡改)，如果应用程序没有对Host字段值进行处理，就有可能造成恶意代码的传入。

漏洞检测
Host头攻击漏洞的检测比较简单，只需要抓包，修改Host字段值，提交，查看响应中是否包含修改后的Host字段值即可。

下面我分三个场景，介绍一下Host头攻击漏洞存在的表现。

跳转
场景一：正常请求，响应302，Location首部字段指明跳转的地址，其中Location字段值为Host字段指定的地址。


将请求包的Host字段值修改为www.baidu.com提交，响应包中的Location地址也被更改为www.baidu.com。

拼接
场景二：正常请求，正常响应，将Host字段值拼接到标签属性值中。


将请求包的Host字段值修改为www.baidu.com提交，发现服务器将www.baidu.com拼接到了script标签的src属性值中。

代码注入
场景三：这其实也属于拼接，只不过在场景二的基础上写入了恶意代码。


利用Host字段写入script标签，弹出警告框。

漏洞修复
对Host字段进行检测。

Nginx，修改ngnix.conf文件，在server中指定一个server_name名单，并添加检测。

Apache，修改httpd.conf文件，指定ServerName，并开启UseCanonicalName选项。

Tomcat，修改server.xml文件，配置Host的name属性。

[作者：安全小白团 链接：https://www.jianshu.com/p/690acbf9f321]

