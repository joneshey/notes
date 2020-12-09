## Router
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
