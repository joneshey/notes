webpack的模块化规范基于common.js,支持amd和cmd规范   

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


