vue-cli3 创建的时候并不会自动创建vue.config.js，因为这个是个可选项，所以一般都是需要修改webpack的时候才会自己创建一个vue.config.js
## 创建项目
`vue create`

## 拉取 2.x 模板 (旧版本) 
Vue CLI >= 3 和旧版使用了相同的 vue 命令，所以 Vue CLI 2 (vue-cli) 被覆盖了。如果你仍然需要使用旧版本的 vue init 功能，你可以全局安装一个桥接工具：

`npm install -g @vue/cli-init`
# `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
`vue init webpack my-project`

## 在现有的项目中安装插件
安装@vue/eslint：`vue add eslint`  
这个命令将 @vue/eslint 解析为完整的包名 @vue/cli-plugin-eslint，然后从 npm 安装它，调用它的生成器。    
如果一个插件已经被安装，你可以使用 vue invoke 命令跳过安装过程，只调用它的生成器。这个命令会接受和 vue add 相同的参数。  
场景：install完没有调用生成器？？  

> 如果出于一些原因你的插件列在了该项目之外的其它 package.json 文件里，你可以在自己项目的 package.json 里设置 vuePlugins.resolveFrom 选项指向包含其它 package.json 的文件夹。例如，如果你有一个 .config/package.json 文件：
```
{
  "vuePlugins": {
    "resolveFrom": ".config"
  }
}

```

## 加入项目本地的插件
如果你需要在项目里直接访问插件 API 而不需要创建一个完整的插件，你可以在 package.json 文件中使用 vuePlugins.service 选项：
```
{
  "vuePlugins": {
    "service": ["my-commands.js"]
  }
}
```
每个文件都需要暴露一个函数，接受插件 API 作为第一个参数。
## .vuerc
你的 home 目录下的一个配置文件中 (~/.vuerc)在user/user/目录

实际上，项目开发自己要手动创建一个vue.config.js  
默认的配置文件是在lib/config  
cmd 中敲 vue inspect > output.js , 这样我们会得到一份最终生效的 webpack 配置信息，省去了你自己去看 cli-service 源码。  

```
因为 vue-cli 3 中的 cli-service 对 webpack 4 引入了 webpack-chain 插件，同时对配置进行了高度抽象化，所以开发者想随心所欲的修改配置，操作方式就比以前更加难。在我的亲身实践下，总结了几点，供大家参考：

首先，修改点主要位于 vue.config.js 中的

configureWebpack: (config) => {
// 简单/基础配置，比如引入一个新插件
},
chainWebpack: (config) => {
// 链式配置
}
loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },
      postcss: {
        // options here will be passed to postcss-loader
      }
}
```
