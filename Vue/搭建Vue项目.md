# 搭建Vue项目注意事项

在线操作：
1. 初始化：`vue init webpack projectName`
2. 进入项目： `cd projectName`
3. 安装配置下的依赖包：`npm install`
4. 跑服务运行： `npm run dev`

离线操作：  
* 只需要加多一个步骤：
先在webpack官网下载压缩包，解压后将文件夹改为对应的模板名，如webpack；  
然后在c://的用户目录下，创建一个.vue-template(`mkdir .vue-template`)；  
初始化时：`vue init webpack projectName  --offline`。

修改端口可以在config.index.js进行配置

### 创建项目  
`vue create projectName`
> 如果你在 Windows 上通过 minTTY 使用 Git Bash，交互提示符并不工作。你必须通过 `winpty vue.cmd create hello-world` 启动这个命令。不过，如果你仍想使用 `vue create hello-world`，则可以通过在 `~/.bashrc` 文件中添加以下行来为命令添加别名。 `alias vue='winpty vue.cmd'` 你需要重新启动 Git Bash 终端会话以使更新后的 bashrc 文件生效。(`~/.vuerc`被保存的 preset 将会存在用户的 home 目录下一个名为 .vuerc 的 JSON 文件里。如果你想要修改被保存的 preset / 选项，可以编辑这个文件。)

### 使用图形化界面  
`vue ui`


### package.json配置
* script
定义的是npm 运行的命令，如：
```
"scripts":{
  "start":"cross-env NODE_ENV=devlopment webpack-dev-server --port 8000",   //node编译指令，如：node xx.js
  //webpack-dev-server是一个快速搭建本地环境的一个包
  //cross-env 运行跨平台设置和使用环境变量的脚本，windows不支持NODE_ENV=development的设置方式。
  "dist":   //生成dist资源,npm run dist 就是打包，指令使用webpack(npm run build)
},
"dependencies":{  //npm install 时下载
  "":""  
},
"devDependencies":{  //npm i -D packageName包名，安装开发环境时的依赖包
  "":""  
}
```
  scripts定义后，可以在build的部署目录中，新增一个dev-serve.js  
  进行`app.listen(port,function(){})`进行监听(express，原生请参照node.js）
![https://segmentfault.com/a/1190000014588132 --- 图源](https://segmentfault.com/img/bV9mWS?w=761&h=510)  
--- 图源自 https://segmentfault.com/a/1190000014588132  


* 简单配置端口
webpack.config.js
```
module.export={
  entry:'',
  output:{},
  mode:'development'
  devServer:{
      host:'',
      hot:'',
      proxy:{}
  }
}
```

* 部署代码
1. 先用webpack进行打包，配置好package.json和build/build.js，运行npm run build  
（当然你可以用fis）
2. 生成对应的dist文件夹后，将文件夹扔到apache服务器（这是本地服务器，应该放在nginx）上对应的目录
3. 配置http.conf(nginx.conf)和host文件
4. 访问对应Ip即可查看

### vue项目引入文件
index.css通过import引入less，index.js引入index.css  
从而在该入口读取到样式文件  
以上针对html文件而言  
“按照vue文件，可以将模板、样式以及js都写在同一个文件”

### VSCode 安装离线插件
Code --install-extension name.vsix
