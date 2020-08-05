# feign使用
1. 在yaml 文件配置注册中心的地址
```
enruka:
    client:
        service-url:
            defaultZoom:
```
2. 在pom文件注入httpClient 以及相关feign版本
    httpClient主要解决多种请求方法的feign请求
3. 如果get请求需要传入对象参数，则需要在yaml文件配置feign.httpclient.enable = true ，为了使得请求不直接使用jdk的强制转换post请求，其次也要在接收方时加入@RequestBody. 另外在feign2.1.0 版本可以使用@springQueryMap注解
4. 加入feign过滤器，在过滤器设header
```
@Component
//覆写apply方法
FeignInspector implements RequestInspector{  //稍后补充
    public void apply(RequestTemplate template){
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.getAttribute;
        HttpServletRequest req = attr.getRequest(); //这里是http的请求，从http请求获取头信息
        template.header();   //设置服务端调度的头信息，(key,value)
    }
}
//PS:URLEncoder.encode(name,Charset.forName("UTF-8").name)
```
5. Get请求多数需要@RequestParam("name")  @PathVarible("name")  

6. post请求尽量用@RequestBody  get使用@RequestParam

7. restful处理，将配置spring.mvc.hiddenmethod.filter.enable:true

8. 由于底层传参时候对参数进行有转义，因此为了与后台保持一致的加密方式要使用URLDecoder.decode()后的参数进行加签名  
仅限于get请求，先判断feign发送的请求是否为get,如果是则获取传递参数request.queries()  //Map<String,collection>  
遍历queries的entrySet(),如果参数没有值，则设为空（后台当数据为空处理，能接受key值） 如果参数有一个值（基本类型）则直接加密  如果参数值不为1（可能是多个同名参数）则需要遍历值进行加密之后使用json格式化   
