## Router
设置路由：
```
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User,
      props: { default: true, sidebar: false }
    }
  ]
})
//vue
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
//js
router.push({ name: 'user', params: { userId: 123 }})
```
添加路由：router.addRoutes(routes)// 某模块的路由
```
Vue.use(Router)
new Router({})
```

命名视图：
```
routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
 
 
//default  
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

重定向：
```
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```


路由守卫设置方法：  
1. 全局前置守卫
你可以使用 router.beforeEach 注册一个全局前置守卫：
```
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```
2. 路由独享的守卫
你可以在路由配置上直接定义 beforeEnter 守卫：
```
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```
并可以直接在页面调用钩子函数

keep-alive如果需要在activated(),在vue对象存活的情况下，进入当前存在activated()函数的页面时，一进入页面就触发
```
beforeRouteLeave() 路由守卫
beforeRouteEnter (to,from,next) {

　　//在确认呈现此组件的路由之前调用。

　　//无权访问“this”组件实例，

　　//因为调用这个守卫时还没有创建！
   //需要路由更新就要调用next  
    next(vm => {
    　if(from.meta.title == '报名页面'） {
　　　　　//判断是否从报名页面过来，如果是显示弹窗
　　　　　vm.isShow = true
　　　}
  })
}
```
