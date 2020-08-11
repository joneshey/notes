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
