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


7.  
