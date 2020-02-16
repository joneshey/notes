webpack的模块化规范基于common.js,支持amd和cmd规范   

### webpack作用：
源代码预 处理，例如ES6,typeScript,图片的哈希值处理(版本号缓存)  
自动打包，更新显示  
围绕解决方案搭建环境（框架的运行架构，规避预期问题）  
开发效率（热加载）  
代码质量(ESLint）  


### 网络优化:
1. 合并资源文件，减少http请求  
2. 压缩资源文件大小  
3. 利用缓存机制，减少缓存请求，从浏览器中获取（hash值改变时加载新的请求、时间戳）不浪费服务器带宽  

配置文件：webpack.config.js  

直接执行webpack  
```
const path = require('path')  //使路径编译打包后成为绝对路径,path.join(__dirname,'../')
module.export={
  //定义入口,该入口文件是主程序js以及包括其依赖（require）的js
  entry:'./js/app.js',  //path.join(__dirname,'../')
  //定义文件发布的位置，出口
  output:{
    filename:'dist/dist.js'
    //,path定义发布的目录，若不定义可以写在filename属性 
  }
   /**entry:{  多个入口
        name1:'url1',
        name2:'url2'
      },
      //此时出口可以定义：
      output:{
        path:'/dist/',
        filename:'[name].js',  
        //[name].[hash].js,该hash是打包时候发生改动的时候会更改
        publicPath:'/public'  //静态文件引用时的路径
      }
    **/
}
```
服务器：   
npm install -g webpack-dev-serve  
然后直接执行 webpack-dev-serve  ，发布项目到服务器  
 
webpack可以加载所有资源，都被看成一个模块。  
通过module属性定义这些加载配置：（指定加载器）  
     test:定义匹配的规则  
     loader:定义加载器  
     
 css（app）可以在js(app)引用（require），然后一起打包：
```
 module:{
  rules:[{
     test:/\.css$/,
     loader:'style-loader!css-loader'//显示调用，则需要执行webpack命令时加载这两个加载器
     ,exclude:[path.join()]//不包括编译哪些文件目录的文件
  }]
  }
```

服务端渲染  
单页面应用存在：SEO抓取不了js,加载响应过长 
webpack.congfig.server.js  
```
module.exports = {
  target:'node'  //在哪个环境执行
  ,entry,output
}
```
npm run build 跑的时候需要在package.json修改scripts属性;
```
"scripts":{
  "build:client":
  "build:server":"webpack --config build/webpack.config.server.js",
  "clear": "rimraf dist",//删除并覆盖dist目录，需要npm i 
  "build":"build:client && build:server"
}
```

图片加载器  
url-loader : 两种加载方式
   内嵌式：图片嵌入文件内部（图片转化为base64）
   外链式：图片作为资源加载（图片路径引入）
用语法url-loader?limit=2048 表示限制图片大小，从而进行对加载方法的选取
？是用来定义加载器的参数配置

*  new Image()

压缩js   
需要使用，插件，webpack只负责模块化
配置plugins属性即可使用，属性值是一个数组
var webpack = require('webpack');
plugins:[
    //每个成员一个插件
    new webpack.optimeze.UglifyJsPlugin()
]

html-webpack-plugin(); //百度作用吧。。。   


## 详细：
npm init  初始化项目，生成package.json
目录结构：
./  
  --build,放置配置文件，脚本等等  
  --client,放前端文件，app.js声明应用页面的全部内容   
npm webpack init

将webpack.config.js的配置抽出公用配置，放在webpack.base.js  
```
module.exports = {
   配置项...
}
```
在webpack.config.js引入以下模块：   
require('webpack-merge') //用来合并webpack文件,需要install 
require('webpack.base')  //上述的js文件

将配置赋给常量config:   
```
const config = webpackMerge(baseConfig,{
  entry:'',
  output:''
});
```
后面的相同配置参数会覆盖前面的公用配置，没有的话则插入配置  
npm run dev:client/server   //dev这个配置项在package.json
npm i serve-favicon  //处理网页图标  
使用express();时，在use(favicon(path.join(__dirname,'')));  

如何不需要每次更改都重启服务  
npm i nodemon  脚本控制服务启动，当有改动直接重启服务器
创建nodemon.json  
 ```
{
  "restartable":'rs',//配置文件时必须
  "ignore":[
    ".git","node_module/**/node_modules"
  ]//忽略某些文件的更改
  ,"env":{
    "NODE_ENV":"development"  
    //对应package.json的scripts配置项的
    //"dev:server":nodemon server/serves.js 后面跟服务器的目录
  }
  ,"verbose":true  //是否详细输出错误信息
  ,"ext": //哪些文件更改需要重启 
}
```

常用配置  
webpack dev server   
Hot module replacement  热加载

判断是否服务器：
 ```
const isDev = process.env.NODE_ENV =="development" //package.json配置时设置  
if (isDev){
  config.devServer = {
    host:'',
    port:'',
    contentBase:'',  //webpack编译静态资源在output对应的路径
    hot:true,  //启动module.replacement
    overlay:{erros:true}  //错误是否网页显示
    publicPath:'/public',  
    //所有请求需要加该路径名才能访问静态资源文件，相当于/m 转发器 ,相当于dist目录，只是显示在浏览器中使用public,在output设置
    historyApiFallBack:{
        index:'./public/index.html'  //执行xxx:8080/index是在pulic目录下的index
    }
  }
}
```
** 需要把dist目录清除再跑npm run dev，因为webpack会找到对应的目录，如果存在直接读取没有重新编译的内容
//"clear": "rimraf dist",//删除并覆盖dist目录，需要npm i (package.json可以配置该项)
```
//package.json
"script":{
"dev:client":cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.client.js"
}
//cross-env是为了适应不同操作系统，需要npm i
```
