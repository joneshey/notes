### 重定向
使用"redirect: url"  
或使用：response.sendRedirect

### 引入Service
需要使用@Autowire注解

### 路径参数
@PathVariable

### 定义接口时注意
1. 接口的目的：业务通用性和单个独立性  
如果通用性，考虑如何做到每个相同类型的接口出入参一致，兼容不同场景，利用路径参数  
如果独立性，如需要获取外部链接重定向，则选择从查询参数传入，避免环境不同导致链接失效    

2. 每个@CustomerIdentity的注释都进行了验证用户是否登陆，且saveRequest保存了某个controller的请求头、请求地址以及请求参数，再进行重定向  
在重定向的请求控制层里，通过获取saveRequest的参数以及重定向地址（首次controller进入跳到过滤器使用saveRequest保存的地址），从而使在浏览器对这些参数回参
AccountNotBoundAccessDeny

事件戳：
String.valueOf(System.currentTimeMillis)

### ENCODING为常量
xxx.getByte(ENCODING)　　
private final String ENCODING＝'utf-8'
