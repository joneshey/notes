## WebSocket协议。

Request Headers
```
Accept-Encoding: gzip, deflate, br
Accept-Language: zh,zh-TW;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6
Cache-Control: no-cache
Connection: Upgrade
Host: 127.0.0.1:3000
Origin: http://localhost:3000
Pragma: no-cache
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
Sec-WebSocket-Key: bwb9SFiJONXhQ/A4pLaXIg==
Sec-WebSocket-Version: 13
Upgrade: websocket
//Connection: Upgrade 表示要升级协议  
//Upgrade: websocket 要升级协议到websocket协议  
//Sec-WebSocket-Version 表示websocket的版本。如果服务端不支持该版本，需要返回一个Sec-WebSocket-Versionheader，里面包含服务端支持的版本号。  
//Sec-WebSocket-Key 对应服务端响应头的Sec-WebSocket-Accept，由于没有同源限制，websocket客户端可任意连接支持websocket的服务。这个就相当于一个钥匙一把锁，避免多余的，无意义的连接。
```  
   
服务端响应的 Response Headers
```
Connection: Upgrade
Sec-WebSocket-Accept: 2jrbCWSCPlzPtxarlGTp4Y8XD20=
Upgrade: websocket

//Sec-WebSocket-Accept: 用来告知服务器愿意发起一个websocket连接， 值根据客户端请求头的Sec-WebSocket-Key计算出来
```

## websocket API  
客户端若想要与支持webScoket的服务器通信，可以使用WebSocket构造函数返回WebSocket对象。  
`const ws = new WebSocket("ws://localhost:3000/websocket");`  
ws返回的实例对象的属性：  
WebSocket.onopen： 连接成功后的回调  
WebSocket.onclose： 连接关闭后的回调  
WebSocket.onerror： 连接失败后的回调  
WebSocket.onmessage： 客户端接收到服务端数据的回调  
webSocket.bufferedAmount： 未发送至服务器的二进制字节数  
WebSocket.binaryType： 使用二进制的数据类型连接  
WebSocket.protocol ： 服务器选择的下属协议  
WebSocket.url ： WebSocket 的绝对路径  
WebSocket.readyState： 当前连接状态，对应的四个常量    
WebSocket.CONNECTING: 0  
WebSocket.OPEN: 1  
WebSocket.CLOSING: 2  
WebSocket.CLOSED: 3   
 
方法：  
WebSocket.close() 关闭当前连接  
WebSocket.send(data) 向服务器发送数据  

客户端代码：
```
// 创建一个webSocket对象
const ws = new WebSocket("ws://127.0.0.1:3000/websocket/test")
ws.onopen = e => {
  // 连接后监听
  console.log(`WebSocket 连接状态： ${ws.readyState}`)
}

ws.onmessage = data => {
  // 当服务端返回数据的时候，放到页面里
  receiveBox.innerHTML += `<p>${data.data}</p>`
  receiveBox.scrollTo({
    top: receiveBox.scrollHeight,
    behavior: "smooth"
  })
}

ws.onclose = data => {
  // 监听连接关闭
  console.log("WebSocket连接已关闭")
  console.log(data);
}

sendBtn.onclick = () => {
  // 点击发送按钮。将数据发送给服务端
  ws.send(msgBox.value)
}
exit.onclick = () => {
  // 客户端主动关闭连接
  ws.close()
}
```

服务端代码：  
考虑到了模块化开发，没有直接把代码放到直接创建服务的文件中。而是使用了路由，给webSocket服务分配一个单独的接口
```

const express = require("express");
const expressWs = require("express-ws")
const router = express.Router()
expressWs(router);

router.ws("/test", (ws, req) => {
  ws.send("连接成功")
  let interval
  // 连接成功后使用定时器定时向客户端发送数据，同时要注意定时器执行的时机，要在连接开启状态下才可以发送数据
  interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(Math.random().toFixed(2))
    } else {
      clearInterval(interval)
    }
  }, 1000)
  // 监听客户端发来的数据，直接将信息原封不动返回回去
  ws.on("message", msg => {
    ws.send(msg)
  })
})


module.exports = router
```
