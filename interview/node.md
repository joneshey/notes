## NODE
node 为单进程单线程应用程序，V8引擎提供异步执行回调接口，可处理大量并发操作，以观察者模式实现事件处理机制（事件驱动模型）  
服务器收到请求后，先关闭请求再处理，从而不阻塞其他请求接受；当请求完成后，会放回处理队列，出队时将结果返回用户  

setMaxListener(n) 可以设置最大监听器的数量，默认为10

### REPL交互式解释器
node 简单运算 变量声明（var,let） 多行表达式（直接回车自动判断多行） 下划线变量(用于获取上一个运算结果)  

### 模块化
每个单独js,以文件名为一个模块：require('./login')，即可读取login里面的成员属性  
其次，文件中需要module.exports成员方法或者变量  
引入时应该带相对路径，否则会由内置模块、全局模块、以及当前模块搜索该js,搜索链较长  
原理：使用commonJS函数式编程  
node.js加载引入的js后，会把代码包装成立即执行函数，形成闭包，避免全局变量冲突和污染（单个文件进行模块化，需要加入commonJS文件）  

### 事件处理
1. 引入events内置模块  
2. 创建eventEmitter对象，new event.EventEmitter()  
3. 创建handler => 处理程序触发其他事件 eventEmitter.emit('data_receiver')//接受数据事件  
4. 监听绑定handler eventEmitter.on()

主要核心是eventEmitter对象，对事件触发与监听器功能的封装  

### 基本模块
1. global 全局对象  
log\info\warn\error\trace\dir 
2. process 进程  
nextTick()在一堆事件执行完成后，在下一轮响应执行代码  
`process.nextTick(()=>{})`  
还可以监听进程exit事件，完成了一轮事件循环后，无任何事件时可以执行

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
1. 引入url模块  
url.parse('url')解析后获取一个url对象  
属性： protocol协议，hostname主机名，port端口，host主机Ip，etc(hash,search,query,pathname,path,href)  
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
2. 创建server对象  
```
http.createServer((req,res)=>{
  res.writeHead(status,{header})  // status为200或者404的响应码，content-type等信息
  res.end('hello world')  //使用enf返回数据？
})
```
3. 监听端口server.listen
```
http.createServer().listen
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
