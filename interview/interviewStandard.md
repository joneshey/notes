## 职位要求
前言：  
根据最近的求职要求归纳了以下需要熟悉的知识点  

1. 缓存IndexedDB  
2. webpack的实践  
3. mobileWeb 的页面适配  
4. 性能优化  
5. sass预处理器  
6. 前后端交互流程  
7. 模块化和组件化  
8. webGL  
 
 
 
 
### 正文  
2. webpack/fis实践


4. 性能优化  
1). 从接口获取的数据内容是否在首屏加载时必要显示，如果接口返回的数据量大，且非必要，则可以等首屏加载后再调用  
2). 加载的资源是否有依赖顺序，如果有，需要按顺序去加载  
3). 接口是否位于循环体，接口返回的数据是否能调用一次后存放在浏览器缓存或者内存，避免重复调用  
4). 压缩静态资源，可以使用打包工具，或者按需加载模块（模块化以及webpack、fis）


6. 前后端交互流程  
1). 用户操作后触发事件；  
2). 前端根据具体事件向后端发送请求（同步或异步方式）  
3). 请求包括接口定义的参数以及header请求头信息  
4). 后端接受请求后处理数据，并返回响应数据  
5). 前端接受数据后进行页面数据交互响应  
同步或异步：  
同步： 通过表单元素发送请求，无论是form.commit还是元素中指定action都属于同步
异步： $.ajax()  原生XmlHttpRequest()  axios
异步=>同步： 通过promise或者$.Deferred()=>defer.resolve()或者$.when().done()/then()/fail()  //when的参数是defer对象，如果普通函数则需要使用deferred
例如:
```
function fn(){
  return $.ajax();
}
function fn(){
  var defer = $.Defferred()
  $.ajax({
    success:function(data){
      defer.resolve(data);
    }
  });
  return defer;
}
$.when(fn).then((data)=>{
  //就是返回的数据data
})
```
