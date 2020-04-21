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

### 非对称加密
公钥通常用于加密会话密钥、验证数字签名，或加密可以用相应的私钥解密的数据。通过这种算法得到的密钥对能保证在世界范围内是独一的。使用这个密钥对的时候，如果用其中一个密钥加密一段数据，必须用另一个密钥解密。比如用公钥加密数据就必须用私钥解密，如果用私钥加密也必须用公钥解密，否则解密将不会成功。

### 验签以及签名（加密）
* 国密  
 public String method(String msg, String userId, String privateKey){
   byte[] msg.getByte(ENCODING)　　 //编码
   String privateKeyStr = new String(Base64Utils.encode(Util.hexTobyte(pk)))
   byte[] pribyte =Base64Utils.decode(privateKeyStr.getbyte(Encoding))
   SM2Util.sign()
 }
* URIComponentsBuilder.fromHttpUrl().queryParam()

使用配置文件的参数
@value(${})


@RequestMapping和@GetMapping区别  
Spring4.3  
@RequestMapping可以指定GET、POST请求方式  
@GetMapping等价于@RequestMapping的GET请求方式  

@RequestMapping(value = "hello", method= RequestMethod.GET )  
@GetMapping("hello")  
