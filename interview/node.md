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
