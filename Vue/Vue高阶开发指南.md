# Vue高阶开发指南
### 插槽
### jsx
### 自定义指令
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