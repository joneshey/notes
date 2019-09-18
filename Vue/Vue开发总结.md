# 一、使用规范以及相关语法问题  [![Build Status](https://img.shields.io/circleci/project/github/vuejs/vue-router/dev.svg)](https://www.baidu.com/)
> tips可用“>” ,-表示列表，‘反义符号’表示label,三个`代表预编译,注意对齐

### 1、声明data属性方式的区别

官方文档的风格指南规定，在创建组件数据（data属性）的时候，除了根实例（new Vue）以外的地方，都应该返回function函数对象给data属性，从而保持组件数据的独立性。

data属性是响应式的，当数据变化时会重渲染页面。
> 值得注意的是:  
只有当实例被创建时就已经存在于 data 中的属性才是响应式的。也就是说如果你添加一个新的属性，比如：`vm.b = 'hi'`，那么对 b 的改动将不会触发任何视图的更新。  
唯一的例外是使用 Object.freeze()，这会阻止修改现有的属性，也意味着响应系统无法再追踪变化。

#### 声明语法：
``` javaScript
#第一种的声明方法，通过函数生成了一个独立的数据对象，提供给当前组件使用，不影响其他子组件下的数据属性；
data:function(){return {}}  
#或  
#(es6语法匿名函数)   
data(){} 
#第二种的声明方法，返回一个对象，能给根实例和子组件共享数据。
data:{ }
```


### 2、What Can I Do In 生命周期
Vue生命周期，主要有：<b>创建（beforeCreated,created）、挂载（beforeMount,mounted）、更新（beforeUpdated,updated）、销毁（beforeDestroy,destroyed）</b>的八个生命周期。  
####   其中，值得注意的周期问题：  

* 在created时，实例被创建，其实例下的部分初始化的属性，如data,methods,filters,components等属性都能在该周期里面可以读取以及调用，但此时页面的DOM元素还没渲染出来，并不能在created周期里获取，因此即使给DOM元素添加了ref的属性，在created周期也不能调用实例的refs的属性（`this.refs.xx`）；  

* 在mounted时，DOM元素才刚渲染出来，此时可以将绑定了ref属性的DOM元素通过`this.refs.xx`来获取。  
	**（如果需要通过异步接口去初始化数据，则可以在以上周期进行请求后，通过回调保证数据返回后进行赋值，需要小心的是，如果需要初始化数据后操作DOM，应该使用watch监听数据变化，结合`$.netxTick()`来出发对DOM的对应操作。）**

* 在update时，由于Vue是数据驱动，因此如果数据有更新则会调用该声明周期的函数体。

* 在destroy时，单页面跳转后，父或子组件被切换时，将被进行回收内存进行销毁，此时可将在此组件监听全局的事件（如window）进行解绑，避免影响其他组件。  
栗子：监听滚动事件，`window.onscroll()`

![生命周期](https://cn.vuejs.org/images/lifecycle.png)
### 3、watch监听数据
watch 属性可以监听data和computed中的数据变化，当数据值发生改变，会触发处理程序，而`$.nextTick()`可以选择放在watch下的处理程序里触发,能够保证在下一次数据更新的时候，DOM元素能够获取到该数据且渲染出来。

#### 使用语法：
```javaScript
  data(){
    data1:''
  },
  watch:{
    data1:{
      handler:function(newVal,oldVal){
        var _this = this;
	_this.$nextTick(function(){
	   //函数体
	})
      },
      immediate:false  //是否在初始化数据是也同样触发
    }
  }
```

### 4、v-on事件可以直接修改组件数据data
为了减轻methods方法里的处理程序，某些简单的修改数据操作，例如toggle方法，可以直接利用`@click='isActive = !isActive'`

### 5、v-for 与 v-if 官方建议不能公用在同一个元素标签
原因是 v-for 优先级高于 v-if ,因此存在v-if还没渲染数据进行判断时，v-for就开始遍历数据渲染DOM,从而影响性能问题或者控制台报错~~is undefined~~。 
> 建议：将v-if放在外层容器，避免以上情况。


### 6、过滤器的使用
在语法模板中，通过`methonds | filter()`对数据进行过滤;  
在绑定属性中，通过调用`$options.filters.xx()`进行过滤。  
全局过滤器定义：`Vue.filters('name',function(){})`

### 7、父子组件model属性传值
父组件调用子组件时，`<child v-model='isCheck'></child>`
子组件的实例中，需要新增model属性：
```javascript
model:{
  prop:'checked',  //相当于props属性
  event:'change'  //onchange事件
}，
props:{
  checked:{type:Boolean}
}
```
在子模板中：
```
<input :checked='checked' @change="$emit('change',$event.target.checked)">
```
以上的语法等同于：
```
//父组件
<child v-on:customerEvt="parentMethonds" :checked="checked"></child>
//子组件
props:{
  checked:{type:Boolean}
}
<input :checked='checked' @change="$emit('customerEvt',data)">  //子组件input触发onchange后会触发到父组件的方法parentMethonds
```

### 8、动态参数
从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：  
* `<a v-bind:[attributeName]="url"> ... </a>` ，这里的 attributeName 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的 Vue 实例有一个 data 属性 attributeName，其值为 "href"，那么这个绑定将等价于 v-bind:href。
* 同样地，你可以使用动态参数为一个动态的事件名绑定处理函数：`<a v-on:[eventName]="doSomething"> ... </a>`，当 eventName 的值为 "focus" 时，`v-on:[eventName]` 将等价于 v-on:focus。

### 9、methods属性和computed属性区别
methods和computed都可以在语法模板中直接使用，如`{{methods()}}`  
不同的是: 计算属性是基于它们的响应式依赖(data)进行缓存的，只在data发生改变时它们才会重新求值。  
这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而methods，每当触发重新渲染时，调用方法将总会再次执行函数。

### 10、key值的作用
key 的特殊属性主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。使用 key，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误。  

最常见的用例是结合 v-for：
```
<ul>
  <li v-for="item in items" :key="item.id">...</li>
</ul>
```
它也可以用于强制替换元素/组件而不是重复使用它。当你遇到如下场景时它可能会很有用：

完整地触发组件的生命周期钩子  
例如：触发过渡
```
<transition>
  <span :key="text">{{ text }}</span>
</transition>
```
当 text 发生改变时，<span> 会随时被更新，因此会触发过渡。

### 11、对象变更检测注意事项
Vue 不能检测对象属性的添加或删除：
```javascript
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```
对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性。
但是，可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性。例如，对于：
```javascript
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```
你可以添加一个新的 age 属性到嵌套的 userProfile 对象：
`Vue.set(vm.userProfile, 'age', 27)`  或 `vm.$set(vm.userProfile, 'age', 27)`  
有时你可能需要为已有对象赋值多个新属性，比如使用 Object.assign() 或 _.extend()。
如果你想添加新的响应式属性，应该用两个对象的属性创建一个新的对象：
```javascript
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

# 二、使用时遇到的开发问题  [![Build Status](https://img.shields.io/circleci/project/github/vuejs/vue-router/dev.svg)]

### 1、渲染前页面的显示问题
在实例进行初始化时，页面显示会出现以下情况：（异步加载数据）  
a. 使用语法模板`{{}}`挂载数据，会直接输出语法模板。
> 解决方法：可以使用v-text属性保证首屏数据在渲染后才输出正常数据，同时标签之间的内容，会在渲染后被替换。或者，通过在css设置`[v-cloak]{display:none}` 又或者使用`<template>`标签来确保数据得到初始化后才渲染。PS:后两种会产生副作用，如未渲染时页面为空。  

b. 模板使用未返回的异步数据的字段，控制台会报错`is not defined` 或 `undefined`，但模板输出正常。  
原因：该数据尚未返回，因此无法获取下一层级的字段，从而报错。但由于Vue是响应式的，因此当数据从异步返回后，自动更新到模板页面。
> 解决方法：可以使用v-if指令事先判断该数据是否为空，从而保证该数据的字段不会报错

### 2、关于控制相邻元素的类名或样式
提供一个思路：通过用单个字段不同值（1:N）来控制相邻元素，例如：`showTab == 'tab1'`的布尔值来控制绑定类名属性，`:class="{ 'isShow': showTab == 'tab1'}"`,而不是单纯的`isShow:true`,`:class=isShow`  
其中，参考语法有：
```
:class="[isActive ? isHide : '',f-red]"   //isActive和isHide都是data属性，均会有值
或
:class="[{ active: isActive }]"

//多重值
//从 2.3.0 起你可以为 style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：
:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"
```

### 3、如何在没有使用脚手架情况下使用Vue.component
项目使用的模板是ftl，通过引入Vue.js文件来进行开发。因此，无法使用ES6提供的模块化对Vue文件进行引入import，实现组件化功能需要以下两步：  
a. 在页面主容器（根实例）外，通过<@widget name=''>嵌入子组件的模块代码  
b. 创建子组件的js文件，定义子组件对象：  

```javascript
   var record = {
   	template:'#id' , // 对应子模板下的template 的id
	data(){},
	props:{
	   xx:{
	     type:/*数据类型*/,
	     require:/*是否必传*/,
	     validate:/*验证器*/
	   }
	},
	mounted:function(){}
   }
   module.export = record;
```
c. 在父组件的js里面使用require引入子组件js文件，并赋值给变量，在实例中注册
```javascript
var record = require('record.js');
new Vue({
   components:{
     'record-main':record
   }
})
```
全局注册组件：`Vue.components('name',{data:'',el:'#id'})`
