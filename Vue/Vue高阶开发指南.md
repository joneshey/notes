# Vue高阶开发指南
### 插槽
### jsx
### 自定义指令
需求：对所有页面的按钮根据请求数据进行权限控制  
使用自定义指令去控制隐藏  

```
//v-name:binding-arg  v-name=binding-value
Vue.directive('name',{
  // 当被绑定的元素插入到 DOM 中时……
  inserted:function(el,binding,vnode){
  //只调用一次，指令第一次绑定到元素时调用。
  bind:function(el,binding,vnode){}
  componentUpdated:()=>{}
  unbind:()=>{}
  }
})
```
参数详情：  
el：指令所绑定的元素，可以用来直接操作 DOM。
binding：一个对象，包含以下 property：
    name：指令名，不包括 v- 前缀。
    value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
    oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
    expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
    arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
    modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
vnode：Vue 编译生成的虚拟节点。  
oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

想注册局部指令，组件中也接受一个 directives  

参数可以动态：v-name:[arg]=200，然后在data定义arg的值，值也是可以通过字面量表示：value.a//{a:1}  

### 过渡和动画
### Vue-router
### $api
我们可以在main.js中一次性引入(import)，然后在vue中的文件通过this.$api.XXX()调用。（xxx为某js文件export出的方法）
Vue.prototype.$api = {}

如果子组件和父组件的数据绑定有关联，则使用:xx.sync="xx" 
```
<child :id.sync="id"></child>
this.$emit("update:id","xxx");
```
