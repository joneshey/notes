webpack的模块化规范基于common.js,支持amd和cmd规范   

源代码预 处理，例如ES6,typeScript,图片的哈希值处理(版本号缓存)  
自动打包，更新显示  
围绕解决方案搭建环境（框架的运行架构，规避预期问题）  
开发效率（热加载）  
代码质量(ESLint）  

配置文件：webpack.config.js  

直接执行webpack  
```
module.export={
  //定义入口,该入口文件是主程序js以及包括其依赖（require）的js
  entry:'./js/app.js',
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
        filename:'[name].js'
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
  loaders:[{
     test:/\.css$/,
     loader:'style-loader!css-loader'//显示调用，则需要执行webpack命令时加载这两个加载器
  }]
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



详细：
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
npm run dev:client/server   //dev这个配置项在package.json？？运行文件中

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
