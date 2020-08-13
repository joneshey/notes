## NODE
单线程引用程序：  
node 为单进程单线程应用程序，V8引擎提供异步执行回调接口，可处理大量并发操作，容易解决I/O阻塞问题，以观察者模式实现事件处理机制（事件驱动模型） 
运行在服务端的js：  
使用V8引擎的即时编译器，能够跳过apache\nginx代理服务器
模块化编程：  
通过require以及exports对程序片段进行模块化，使得整个应用更加独立   

工作原理：（事件驱动异步I/O服务端）  
1. 异步编程，借助回调函数避免阻塞  
2. 事件循环，程序执行会维护一个事件队列，程序进入事件循环时，会继续处理下一个事件，当异步请求完成后，会被推送到事件队列，等待进程处理  
3. 事件分发，通过eventEmitter实例，注册和触发事件  

node的事件机制使用observer设计模式实现，每次注册监听一个异步事件都生成一个observer，当事件发生则触发该回调函数。单线程进入到事件主循环，直到处理事件队列没有observer时退出循环。  
模型： 主循环接收到一个事件请求处理，将事件交给handler而不做处理，并继续接受下一个事件，减少I/O阻塞。  
服务器收到请求后，先关闭请求再处理，从而不阻塞其他请求接受；当请求完成后，会放回处理队列，出队时将结果返回用户  

setMaxListener(n) 可以设置最大监听器的数量，默认为10

### REPL交互式解释器
node 简单运算 变量声明（var,let） 多行表达式（直接回车自动判断多行） 下划线变量(用于获取上一个运算结果)  

### 模块化
模块系统分为两类，内置模块/文件模块，自身有一个文件模块缓存  
每个单独js,以文件名为一个模块：require('./login')，即可读取login里面的成员属性  
其次，文件中需要module.exports成员方法或者变量  
引入时应该带相对路径，否则会由内置模块、全局模块、以及当前模块搜索该js,搜索链较长  
原理：使用commonJS函数式编程  
node.js加载引入的js后，会把代码包装成立即执行函数，形成闭包，避免全局变量冲突和污染（单个文件进行模块化，需要加入commonJS文件）  
引入模块顺序：  
1. 先读取模块缓存的模块  
2. 再读取内置模块  
3. 后读取父目录下的文件模块  

### 事件处理
1. 引入events内置模块  
2. 创建eventEmitter对象，new event.EventEmitter()  
3. 创建handler => 处理程序触发其他事件 eventEmitter.emit('data_receiver')//接受数据事件  
4. 监听绑定handler eventEmitter.on()
`emitter.on/emit(evt,(arg1,arg2)=>{})`
events内置方法：  
添加事件监听器：addListener(event,listener);   
移除事件监听器：removeListener(event,listener);  
once(event,listener)  //只监听一次  
主要核心是eventEmitter对象，对事件触发与监听器功能的封装  

### 基本模块
1. global 全局对象  
所有变量应使用var声明，避免引入全局变量
log\info\warn\error\trace\dir  
返回输出文件所在位置的绝对路径：__filename  
返回当前脚本的目录：__dirname  
setTimeout/setInerval  
2. process 进程  
nextTick()在一堆事件执行完成后，在下一轮响应执行代码  
`process.nextTick(()=>{})`  
还可以监听进程exit事件，完成了一轮事件循环后，无任何事件时可以执行
3. UTIL模块  
util.inherits(constructor,subConstructor) 实现对详见的原型继承  
util.inspect(obj,[showHidden],[depth])  将对象转化为字符串的方法（直接打印出对象解构，depth为对象层数）  
isArray(obj)/isData(obj)/isRegExp(obj)  


### FS文件系统
1. 引入require('fs')
fs模块提供同步和异步的方法：  
```
$.getJSON('url',(data)=>{})  //不影响IO线程执行，异步操作
getJSONSync("url")   //同步执行
```
2. 读取文件   
异步读取文件：`fs.readFile('xx.file','utf-8',(err,data)=>{})`  
读取文本的话，data返回string;读取二进制文件，data返回一个buffer对象  
数据类型转换：  
buffer=>String:  `data.toString('utf-8')`   
String=>buffer:  `Buffer.from(text,'utf-8')`  
同步读取文件：`readFileSync('.file','utf-8')`  
使用try{}catch(e){}进行异常处理

3. 写文件  
异步写文件： `fs.writeFile('file',data,(err)=>{})`  
写入文件类型是buff时，只需要关注返回的是否成功，因此传入err参数  
同步写文件：`fs.writeFile('',data)`  

4. 创建目录： fs.mkdir('/xx0/xx1',(err)=>{})  
xx0目录必须存在，除非传入第二个参数option.mode:0777,option.recursive:true，此时无论路径存不存在都会创建  
（与java的mkdirs类似）
* 获取文件的详细信息：fs.stat('file',(e,stat){}),stat对象包括size,isDeirectory,birthTime,isFile  

5. open,close,unlink,rmdir,readdir,appendFile  

### stream 流  
所有Stream对象都市EventEmitter实例 
类型： readable writable duplex transform 
读取流：   
通过流读取数据（与buffer对比）：  
```
fs.createReadStream('.txt');
readerStream.setEncoding('chareset');
readerStream.on()  //监听事件data/end/error/finish，data事件有返参
```
写入流：  
```
fs.createWriteStream('.txt')
writeStream.write(data,'charset')
writeSteam.end()  //标记文件末尾
writeSteam.on()  //监听事件error/finish
```
管道流=>实现文件复制，将读取一个文件的数据写入另一个文件  
创建写入流，读取流的实例：`readerStream.pipe(writeStream)` 的链式操作   

### 文件服务器
url主要提供解析请求路径的方法  
querystring 主要提供解析post请求参数`querystring.parse(param)`,该param参数通过接听data事件获得    

1. 引入url模块  
url.parse('url',boolean)解析后获取一个url对象,第二个参数是否解析为对象  
属性： protocol协议，hostname主机名，port端口，host主机Ip，etc(hash,search,query,pathname,path,href)   
```
var a = www.efunds.com.cn?rank=1&nice=best
var query = url.parse(a,true) //query.rank=>1,query.nice=>best 
```
2. 解析url参数  
get请求：  
```
var params=url.parse(req.url,true).query; // 查询参数
res.write()//输出页面,需要设置响应头为text/plain
res.end()
```
post请求：
```
//监听接受数据事件
req.on('data',(chunk)=>{body=chunk})
req.on('end',()=>{
  body = queryString.parse(body); //解析参数
  res.write();//响应头为text/html
  res.end();
})
```
3. 引入path模块  
path.resolve('.') 解析目录  
path.join('当前目录','子目录','文件名') 组合路径  
创建服务器后，获取path再获取对应文件路径  
```
fs.stat(filePath,(err,stats)=>{
  if(!err && stats.isFile()){
      //设置响应头
      //将文件流导向响应
      fs.createReadStream(filePath).pipe(response)  //自动将读取到的内容写入response
  }
})
```

### HTTP服务器请求（原生）  
1. 引入http模块  
操作模块提供的request和response对象  
request封装http请求，获取请求头信息（method,url）  
response封装http响应，将响应返回服务器  
2. 创建服务器server对象  
```
http.createServer((req,res)=>{
  //req.url
  res.writeHead(status,{header})  // status为200或者404的响应码，content-type等信息
  //res.write(data)
  res.end('hello world')  //使用end返回数据？
})
```
3. 监听端口server.listen
```
http.createServer().listen
```
客户端：  
1. 引入http模块  
2. 向服务端发送请求 http.request(opts,cb)  
3. 处理响应回调  
4. 关闭请求  
```
http.request({
  host:
  port:
  path:'/index.html'
},(res)=>{
  //res.on('data',fn)
  //res.on('end',fn)
}).end();
```


### 路由
创建好http服务器请求后，封装回调函数  
```
//解析请求路径，获取路径名
let pathname = url.parse(req.url).pathname;
switch(pathname){
  case '/login':
    showPage('./view/home.html',200);break;
}
function showPage(path,status){
  var content=fs.readFileSync(path)
  res.writeHead(status,{
    content-type:
  })
  res.write(content);
  res.end();
}
```
可以结合req.method请求方法实现具体路由  

### MYSQL  
1. 引入mysql模块  
2. 连接数据库  
```
var conn = mysql.createConnection({
  host:
  user:
  password:
  database:
})
conn.connect();
```
3. 数据库操作    
不同语句操作，入参个数不一样  
插入语句：如(Value(?,?,?),[22,11,22])
```
conn.query('sql',(err,results,fields)=>{})
```
可以使用占位符，防止sql注入  
4. 断开连接  
conn.end();

### 加密Crypto  
crypto模块：提供加密和哈希算法，底层通过c/c++实现，暴露js接口  
```
var hash =  crypto.createHash('md5')
hash.update(data);
hash.digest(data);//加密

HMAC多一个密钥传参数=> createHmac('sha256','secretKey')
AEC对称交易，使用 同一个密钥=> createDecipher('aes192','key')
```

### web-socket
可以使用io.js插件   
双向通信：浏览器与服务器建立不受限的双向通信的通道  
传统HTTP协议只能有浏览器发起请求，服务器才响应，无法主动发送数据  
通过轮询，定时器定时给服务器发送数据来获取服务器消息  

ws连接必须由浏览器发起，请求地址为 ws:// 开头，请求头：Upgrade:websocket / Connection:Upgrade将连接转换为ws连接  
服务器响应代码为101，表示该连接将被更改为upgrade指定的协议  
底层通信依旧是SSL/TLS协议，兼容IE10以上

*可能需要添加依赖 ws:1.1.1   

创建服务器实例：
1. 引入ws模块，引用Server类：ws.Server  
2. 实例化：
```
new WSServer({
  port:8080
})
```
3. 监听请求(server)  
请求接入：connection事件  
```
ws.on('connection',(res)=>{
  ws.on('message',(msg){  //收到信息时
      ws.send(${msg},(err)=>{})  //参数2为发送后的回调函数
  })
})
```
(client)  
```
var ws = new WebSocket('ws://');
ws.onmessage=(msg)=>{msg.data/msg.orgin}
ws.send('')
//ws.on('open',()=>{ws.send('')})
//ws.on('message',(msg)=>{})
```  

### EXPRESS框架
Node.js WEB应用框架  
特性：
1. 设置中间件响应http请求  
2. 定义路由表用于不同请求操作  
3. 通过模板传递参数，动态渲染html  

安装express同时：  
body-parser  处理JSON,RAW,TEXT,URL的数据   
cookie-parser  解析cookie,将req.cookie转为对象  
multer  处理表单数据   

实例：
```
var express = require('express')
var app = express();
app.get('path',(req,res)=>{
  var response = {
    param:req.query.param
  }
  //res.end(JSON.stringify(response))
  res.send('');  //传送数据给浏览器
})

//post请求
require('body-parser')
urlencodedParser = bodyParser.urlencode({extended:false})
app.post('path',urlencodedParser,(req,res)=>{
  var response = {
    param:req.query.param
  }
  res.end(JSON.stringify(response))
})

var server = app.listen(80,()=>{
  var host = server.address().address/port
})  //监听80端口

```

经验所得：  
1. 写入文件如果格式化内容，可以是用JSON.stringify传入第三个参数\t  
2. 从判断路由到判断请求方法再到判断路由响应类型，都需要分类讨论  
3. 任何响应输出都是字符串，需要通过stringify将json对象转换为字符串  
4. node.js能一直监听端口，当重新执行脚本，浏览器能立即响应，无须手动刷新  
