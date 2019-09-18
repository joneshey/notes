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
