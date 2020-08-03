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
 
 
 
 
## 正文  
### 1. IndexedDB  
IndexedDB 的主要设计目标之一就是允许大量数据可以被存储以供离线使用  

window.indexedDB判断是否支持某一浏览器   
使用模式：(异步调用)  
1). 打开数据库，window,indexedDB.open("name")
由于是异步的，该方法不会立即打开数据库或者一个事物  
open()返回IDBOpenDBRequest对象，包含result或者error的值。   
如果数据库不存在或定义更高的版本（第二个参数版本号，不能为浮点数？？）则创建，触发onupgradeneeded事件  

对返回的请求对象中，生成监听成功/失败的回调函数  
```
request.onerror/onsuccess = function(e){
 db = e.target.result; //IDBDataBase实例 
 //e.target.errorCode
}  
```

常见error情况： 用户或者浏览器拒绝访问打开一个IndexedDB存储;或者数据库的版本高于你试图打开的版本（VER_ERR）

2). 在数据库创建一个存储空间  
```
request.onupgradeneeded = function(e){   //唯一可以修改数据库结构的地方，创建或者删除存储空间对象
  var db = e.target.result;
  var objStore = db.createObjectStore("name",{keyPath:"key"});  //创建存储空间
}
```
不能修改仓库，只能删了重建（删除不存在的仓库会报错）  
onupgradeneeded完成后触发onsuccess

2.1). 使用索引
对象存储空间每写入一个值，与一个键相关联  
创建索引时设置unique标记，可以确保索引keyPath唯一性.
```
//实例
const dbName = "db";
var request = indexedDB.open(dbName);
request.onupgradeneeded = function(e){
  var db = e.target.result;
  var objStore = db.createObjectStore("goods",{keyPath:"goodId"});  
  objStore.createIndex("name","name",{unique:false})  //创建索引
  objStore.createIndex("goodId","goodId",{unique:false})  
  objStore.transaction.oncomplete = function(e){
    // 将数据保存到新创建的对象仓库，开启事务
    var goodObjStore = db.transaction("goods", "readwrite").objectStore("goods");
    data.forEach(function(item) {   //data是外来数据
      goodObjStore.add(item);
    });
  }
  
}
```
2.2). 使用键生成器   
var objStore = db.createObjectStore("goods",{autoIncrement:true});  //相当于自增index   

3). 启动一个事务并发送请求执行数据库操作  
对数据库进行操作必须开启一个事务去处理，且事务提供了：readonly\readwrite\versionchange三种模式  
versionchange 用于修改数据库模式或者结构，该事务指定了version的IDBFactory.open(name)方法启动，因此建立该事务需要调用IDBVersionChangeRequest.setVersion   
readonly或readwrite模式可以操作数据，使用IDBDatabase.transaction(storeName,mode)启动一个事务，该方法返回一个事务对象，用于访问对象仓库，默认为只读。  
第一个参数可以为数组，当事务想跨越所有对象存储空间时，可以使用db.objectStoreNames  

4). 通过监听DOM事件等待操作完成  

保持事务活跃的方法是在其上构建一个请求。请求完成会得到一个DOM事件，并可以通过回调延长事务    
事务接受三种DOM事件：error,abort,complete  
error:冒泡机制，错误会中断它所在的事务，除非在发送错误时调用了stopPropagation并执行其他操作处理异常，否则整个事务会回滚，因此要考虑和处理错误的场景，或者使用全局通用错误处理  
abort: 当事务被回滚时，会触发abort事件  
complete: 当所有请求完成后，complete会被触发   
```
transaction.oncomplete/onerror = fn
``` 
存储空间索引值 对应 建立存储空间的索引属性(唯一);   
新增可以使用add()/put()，前者不能存在相同键的对象，且返回的是请求对象，可以为该请求延长事务（result指向该存储空间的索引属性） 
删除可以使用delete("存储空间索引值")  
获取数据可以使用objStore.get("存储空间索引值")  
更新数据可以使用put,但事先获取数据key和值，然后改变值：  
```
request = objStore.get();
request.onsuccess = function(e){
  var data = e.target.result;
  data.age = xx;
  objStore.put(data);
}

```

加速数据库访问：限制作用于定义，只定义对象仓库，这样可以同时运行多个不含重复作用域的事务  
只在必要才定义rw事务  
链式操作： db.transaction().objectStore().delete();  

* 事务生命周期：

5). 对操作结果进行操作  
可以遍历所有数据，然后通过游标去获取值  
objStore.openCursor().onsuccess = function(e){
  if(e.target.result){
    cursor.value.name
    cursor.key
    corsor.continue();
  }//当数据到达末尾，返回的result是undefined
}

使用索引获取值，objStore.index("name").get("David").onsuccess = fn(e)  
但由于索引可能不是唯一，因此返回的记录是唯一索引值最小的一个，如goodId  

给游标指定搜索范围以及方向：
```
IDBKeyRange.only()//仅匹配
IDBKeyRange.lowerBound/upperBound/bound("David",false)//匹配所有超过“David”的，包括“David”

index.openCursor(boundKeyRange,'prev'//倒序).onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // 当匹配时进行一些操作
    cursor.continue();
  }
};
```
使用完数据库需要db.close
```
var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req = store.clear();
    req.onsuccess = function(evt) {
      displayActionSuccess("Store cleared");
      displayPubList(store);
    };
    req.onerror = function (evt) {
      console.error("clearObjectStore:", evt.target.errorCode);
      displayActionFailure(this.error);
    };
```


###　2. webpack/fis实践  
1). FIS  
执行fis发布的命令`CALL fis release [环境配置参数] -f [fis.js] -w`;//-w 持续更新   
fis.set('namespace',xxx)  //为独立模块打包


fis.match()//匹配对应的文件进行操作
```
fis.match('static/**/xxx.js',{
  useHase: true // 默认为true,是否加时间戳
  useSameNameRequire: true  //是否重名，默认为false
  moduleId: //设置模块的id
})

fis.match('*',{
  url: '/${namespace}$0'  //选择符
  release: '${dir}/${namespace}/$0'  //
})

fis.match('::package',{
 packager:fis.plugin('map',{  //进行打包压缩
  'static/pkg/common.css':[
    'static/lib/css/vue.min.css'
  ]  //输出文件common.css在目录static/pkg
 })
})

fis.mathc('*.xx',{
  optimizer:fis.plugin('beautify-css')  //使用beautify插件进行优化文件
})
```
fis.hook('commonjs',{wrap:true})  //支持的模块化

fis.config.merge  
```
fis.config.merge({
 namespace:  '' //模块名
 templateDir:  ''//模块目录
 backendConfigDir: '' //后台配置文件目录
 modules:
 roadMap:
 settings:
 deploy:{  //部署
   local:  {from:  ,to:} //本地 ，from省略表示从根目录开始上传
   backend: {to:}   //后台资源目录
 }
})
```
### 4. 性能优化  
1). 从接口获取的数据内容是否在首屏加载时必要显示，如果接口返回的数据量大，且非必要，则可以等首屏加载后再调用  
2). 加载的资源是否有依赖顺序，如果有，需要按顺序去加载  
3). 接口是否位于循环体，接口返回的数据是否能调用一次后存放在浏览器缓存或者内存，避免重复调用  
4). 压缩静态资源，可以使用打包工具，或者按需加载模块（模块化以及webpack、fis）


### 6. 前后端交互流程  
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
