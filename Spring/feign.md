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
    public void apply(RequestTemplate temp){
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.getAttribute;
        HttpServletRequest req = attr.getRequest(); //这里是http的请求
        template.header();
    }
}
//PS:URLEncoder.encode(name,Charset.forName("UTF-8").name)
```
5. Get请求多数需要@RequestParam("name")  @PathVarible("name")  

6. post请求尽量用@RequestBody  get使用@RequestParam

7. restful处理，将配置spring.mvc.hiddenmethod.filter.enable:true
