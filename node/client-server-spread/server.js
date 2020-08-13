var http = require('http');
var http = require('url');
var http = require('util');
var http = require('queryString');
var http = require('fs');

//同步读取文件
var json = fs.readFileSync('./data.json','utf-8');
json = JSON.parse(json);

//路由实现，返回一个对象，{data,dataType,responseStatus,path}
function route(path,type,query){
  var jsonData,dataType,path,status;
  if(type == 'get'){
     switch(path){
        case '/':
        case '/index': dataType = 'html';path='index.html';status=200;break;
        case '/ico': dataType = 'img';path='b.ico';status=200;break;
        default: dataType='html';path='error.html';status=404;break;
     }
  }else if(type == 'post'){
     switch(path){
        case '/login':
          jsonData = loginRoutePost(query);
          break;
       case '/register':
          jsonData = registerRoutePost(query);
          break;
     }
  }
  return {json:jsonData,type:dataType,status:status,path:path}
}

//注册程序
function registerRoutePost(query){
  var name = query.name;
  if(!json[name]){  //读取文件的数据
    json[name] = {name:name,age:query.age,psw:query.pwd};
    fs.writeFile('data.json',JSON.stringify(json,"","\t"),(err)=>{  //\t使得写进文件的格式化更工整
      if(err){return}
    })
    return jsonData = {isSuccess:true};
  }else{
    return jsonData = {isSuccess:false};
  }
}

//登陆处理程序，查看有没有该用户，且判断密码
function loginRoutePost(query){
  var name = query.name;
  var pwd = query.pwd;
  if(!json[name]){
    return jsonData = {isSuccess:false}
  }else{
    if(pwd==json[name].pwd) return jsonData = {isSuccess:true}
  }
}


//获取get请求类型
function get(req,res){
  var pathname = url.parse(req.url).pathname,
      param = url.parse(req.url,true).query;
  var content = route(pathname,'get',param);
  //var {json,type,status,path} = route(pathname,'get',param);  对象解构
  if(content.type == 'data'){ //纯数据
    res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
    res.write(JSON.stringify(content.json));
    res.end();
  }else if(content.type == 'html'){
     fs.readFile(content.path,(err,data)=>{
      if(err){
        return;
      }
      res.writeHead(content.status,{'Content-Type':'text/html;charset=utf8'});
      res.write(data);
      res.end();
     })
  }eles if(content.type == 'css'){ //js,img
     fs.readFile(content.path,(err,data)=>{
      if(err){
        return;
      }
      res.write(data);
      res.end();
     })
   }
}

function post(req,res){
  var pathname = url.parse(req.url).pathname,
      param = '',content ='';
   req.on('data',(data)=>{
      param+=data;
   })
   req.on('end',function(){
      param = queryString.parse(param);
      content = route(pathname,'post',param);
      
       res.writeHead(200,{'Content-Type':'text/json;charset=utf8'});
      res.write(JSON.Stringify(content.json));
      res.end();
   })
}

//启动服务端  
http.createServer((req,res)=>{
  if(req.method == 'get'){
      get(req,res)
  }else if(req.method == 'post'){
      post(req,res)'
  }
}).listen(8080);
