# Vue必须理解的知识

### 什么是MVVM
view 视图 module 数据 view-module 数据驱动更新视图

### 响应式数据的原理
主要是object.defineProperty，将重新定义数据属性（enumable、get、set等属性）  
先初始化数据initData，然后observer会观察该数据是否已经定义，然后使用this.walk()对数据进行遍历处理，通过defineReactive去循环对象属性定义响应式变化，最后使用objec。defineProperty去定义数据。
>> 在重新定义时，会先收集数据依赖，再通知更新：  
>> dep.depend()是收集数据依赖,主要在get方法  
>> dep.notify()是通知数据依赖进行更新，主要在set方法

在get属性的重定义时，会遍历该data数据类型,先收集依赖，判断该值是否含有子对象，然后判断子对象是否为数组类型（数组响应），如果是数组则使用dependArray()方法去进行响应式处理。  
在set属性会观察该值是否含有子对象，如果有则递归observe()

### 检测数据数组变化
在observe观察数据方法中，会检测用户传入的value,如果value不是对象则停止观察  
先重新定义数据，修改原型def  
判断该值是否为数组，如果是，则重写原型方法：  
```
protoAugument(val,arrayMethods)  //自定义方法 
==>val.__proto__ = arrayMethods
```  
然后使用observeArray观察数组每一项数据，该方法是遍历数组对象，获取到值之后继续observe  


>> observer 就是先重定义该值Object.defineProperty，然后判断是否为数组，直到获取到的值不是数组最后执行this.walk(val)  
>> 而walk()就是遍历该值的数据结构（对象Object）去实现响应式defineReactive(obj,key)  
>> defineReactive先new一个数据依赖，然后使用Object.defineProperty去重写get和set方法。

### 为何要异步渲染(scheduler)
因为如果不使用异步渲染，会导致数据更新就对组件重新渲染，大量消耗性能，因此会在一轮数据更新后再去渲染页面。  
先通知watcher进行更新操作，然后去调用watcher.update方法，然后加入队列queueWatcher,然后等到nextTick去渲染页面（this.$nextTick()）  
>> update会判断lazy(computed属性)和是否同步,否则就会将更新加入队列
>> 队列会根据每个watcher的id去判断在该队列是否有该更新id，如果没有则增加并push到队列
>> 然后判断队列状态是flushing还是waiting，如果不是等待中，则去flushSchedulerQueue()，完成之后会更新视图，再调用updated的生命周期的回调函数

### nextTick实现原理
主要方法使用了宏任务和微任务，定义一个异步方法，多次调用nextTick会将方法存入队列，通过该异步方法清空队列。

### computed 与 watch 、 method区别
method每次调用都会执行一次；  
watch只会当依赖的属性发生变化才会执行回调；
method是一个有缓存的watcher;

### watch如何实现deep:true
deep(深度监听)实际就是递归遍历去监听，消耗性能大。  
get()方法将watch放在全局目标栈，然后去获取value进行依赖收集，判断是否开启deep,进行深度遍历traverse（对每一项进行取值，取值时执行get）（知识盲点）


