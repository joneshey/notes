## 手动搭建webpack

1. npm init生成package.json  

2. 配置package.json（dependencies/private）  

3. 创建src/index.js,使用引用模块体现webpack  

4. 创建dist/index.html,引用main.js  //默认npx webpack打包主入口为main.js  

* 执行npx webpack前先安装好webpack以及webpack-cil  
* 配置json使用脚本“webpack”,如果有webpack.config.js则会自动读取该配置  

5. 下载相关依赖包css-loader/style-loader ,然后编写配置文件的module.rules, 然后在src/index.js引入css，打包后即可在浏览器看到效果  

6. 多个入口配置，为了不进行手动在index.html添加多个bundle,需要使用html-webpack-plugin对页面进行引入并更新资源
//引入html-webpack-plugin和clean-webpack-plugin的问题:  
一个是出现tapable.plugins is deprecated. Use new API on `.hooks` instead，解决方案下载最新版本@next  
一个是is not a constructor, 解决方案是引入时候用对象解构以及创建实例时不加参数  
即便不引入新的js入口，只要配置了，使用html-webpack-plugin就会自动加入到html里面   
```  
//没有默认入口，会覆盖dist的HTML
html-webpack-plugin({
  inject : false/body true,//编译后插入位置
  template: "src/index.html",  //初始模板
  filename:'',
  title:''
  chunk: [] //指定入口
})
```
遇到一个问题，配置了webpack --watch/-w 之后，发现更新了js,html会被删除，因此需要配置CleanWebpackPlugin
```
plugins: [
        new CleanWebpackPlugin({cleanStaleWebpackAssets: false})
    ]
    //cleanStaleWebpackAssets： 删除陈旧的webpack资源。
```

7. 开发调试，加入devtool:inline-source-map 则能显示具体哪一行哪一个文件报错，如果不配置则只会显示bundle.js报错  
//生产上用hidden-source-map,nosources-source-map  

8. 不需要手动编译且刷新，利用--watch 或者 webpack-dev-server   
指定配置devServer:{contentBase:'./dist'}  //指定更新目录  
先安装再去package.json去写脚本：webpack-dev-server --open  
