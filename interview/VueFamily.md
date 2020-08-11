# 项目中使用vue全家桶  
首先都是通过单文件引用，然后就全局注册。   

### Vue-router

```
import VueRouter from 'vue-router'
//引入vue,引入各模块组件
Vue.use(VueRouter)
default export  new VueRouter({
  //写路由
  routes:[{
    path:'/',
    redirect:'/login'
  },{
    path:,
    component:,
    meta:{keepAlive:,showFooter:,fade:,index:}
  }]
})
```
然后在主组件中，注册router
```
new Vue({
  el: '#app',
  router,
  store,
  render:h=>h(app)
})
```
在主页面定义路由的显示位置，<router-view></router-view>，可以使用过渡元素包裹  
由于默认路径重定向跳转到login,因此router-view显示的页面时login  
可以通过watch监听$route变化  

实现跳转使用类似<a>元素的<router-link>进行跳转，`<router-link tag="span" to="profile"></router-link>`,tag表示伪装元素  
* 子路由是在路由下在设一个routes，查看笔记...  

### Vuex
包括state,action,mutations,getter  
state放置全局变量  
mutations相当于触发事件，一般第二个参数是入参，第一个参数为state全局变量  
action暴露给用户使用，借此触发mutations中的方法  
例如：
```
export const savePath = ({ commit }, payload) => {
  commit('savePath', payload);
};
```
```
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations  //拆开多个js管理，然后引入模块注册
})
```
组件使用方法：  
```

import { mapActions,mapstate } from 'vuex';
computed: {
    ...mapState(['DbSource']),
},

watch: {
    DbSource(currVal) {
        // 监听mapState中的变量，当数据变化（有值、值改变等），
        // 保证能拿到完整的数据，不至于存在初始化没有数据的问题，然后可以赋给本组件data中的变量
      this.currVal = currVal;
    }
}
// 方法一（dispatch）
this.$store.dispatch('saveDbSource', this.DbSource);
 
// 方法二（映射）
// 1、通过methods方法添加映射关系 
methods: {
    ...mapActions(['saveDbSource'])
  }
 // 2、使用
this.saveDbSource
```

## Vue-cli  
依赖vue/cli-service，基于 webpack 构建，并带有合理的默认配置  

vue-cli >=3.0，初始化项目使用vue create /vue ui界面化  
所以在3.0以上的版本如果需要使用vue init webpack project则需要安装桥接工具@vue/cil-init  

在创建好的项目中安装一个插件，使用vue add pluginName,针对vue-cli中的插件，如vue-cli-plugin-eslint,可以不用注释@vue,vue add cli-plugin-eslint  
> vue add 之前将项目的最新状态提交，因为该命令可能调用插件的文件生成器并很有可能更改你现有的文件。  

vue-cli-service 可以用来执行命令  
`vue-cli-service build/serve`
```
用法：vue-cli-service serve [options] [entry]
命令行参数 [entry] 将被指定为唯一入口
选项：

  --open    在服务器启动时打开浏览器
  --copy    在服务器启动时将 URL 复制到剪切版
  --mode    指定环境模式 (默认值：development)
  --host    指定 host (默认值：0.0.0.0)
  --port    指定 port (默认值：8080)
  --https   使用 https (默认值：false)  
  
  用法：vue-cli-service build [options] [entry|pattern]
  
vue-cli-service build 会在 dist/ 目录产生一个可用于生产环境的包，带有 JS/CSS/HTML 的压缩，和为更好的缓存而做的自动的 vendor chunk splitting。它的 chunk manifest 会内联在 HTML 里。

选项：

  --mode        指定环境模式 (默认值：production)
  --dest        指定输出目录 (默认值：dist)
  --modern      面向现代浏览器带自动回退地构建应用
  --target      app | lib | wc | wc-async (默认值：app)
  --name        库或 Web Components 模式下的名字 (默认值：package.json 中的 "name" 字段或入口文件名)
  --no-clean    在构建项目之前不清除目标目录
  --report      生成 report.html 以帮助分析包内容
  --report-json 生成 report.json 以帮助分析包内容
  --watch       监听文件变化
```  
vue-cli-service build --dest 'dist'，相当于在vue.config.js指定outputDir  

vue-cli-service build --modern  
Vue CLI 会产生两个应用的版本：一个现代版的包，面向支持 ES modules 的现代浏览器，另一个旧版的包，面向不支持的旧浏览器。    

你可以通过 chainWebpack 调整内联文件的大小限制。例如，下列代码会将其限制设置为 10kb：
```
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('images')
        .use('url-loader')
          .loader('url-loader')
          .tap(options => Object.assign(options, { limit: 10240 }))
  }
}
```  

URL 转换规则  

如果 URL 是一个绝对路径 (例如 /images/foo.png)，它将会被保留不变。  
如果 URL 以 . 开头，它会作为一个相对模块请求被解释且基于你的文件系统中的目录结构进行解析。  
如果 URL 以 ~ 开头，其后的任何内容都会作为一个模块请求被解析。这意味着你甚至可以引用 Node 模块中的资源：
<img src="~some-npm-package/foo.png">  
如果 URL 以 @ 开头，它也会作为一个模块请求被解析。它的用处在于 Vue CLI 默认会设置一个指向 <projectRoot>/src 的别名 @。(仅作用于模版中)  

配置项：  
1. outputDir  
默认值: 'dist'   
当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。  
* 请始终使用 outputDir 而不要修改 webpack 的 output.path。  

2. assetsDir  
默认值: ''  
放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。  
* 从生成的资源覆写 filename 或 chunkFilename 时，assetsDir 会被忽略。

3. indexPath  
默认值: 'index.html'  
指定生成的 index.html 的输出路径 (相对于 outputDir)  

4. filenameHashing(boolean)   

5. productionSourceMap(生产设为false)

6. configureWebpack  
通过 webpack-merge 合并到最终的配置  
```
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  }
}
```

7. devServer  
所有 webpack-dev-server 的选项都支持。  
注意：  
有些值像 host、port 和 https 可能会被命令行参数覆写。  
有些值像 publicPath 和 historyApiFallback 不应该被修改，因为它们需要和开发服务器的 publicPath 同步以保障正常的工作。
```
devServer: {
    proxy: 'http://localhost:4000'
    //proxy:{
      '/api':{target:'http://localhost:4000'}
    }
}
```
