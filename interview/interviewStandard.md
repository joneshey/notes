## 职位要求
前言：  
根据最近的求职要求归纳了以下需要熟悉的知识点  

1. 缓存IndexedDB  (√)  
2. webpack的实践  (√)  
3. mobileWeb 的页面适配  
4. 性能优化  (√)  
5. sass预处理器  (√)  
6. 前后端交互流程  (√)  
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

### 2. webpack/fis实践  
1). FIS  
执行fis发布的命令`CALL fis release [环境配置参数] -f [fis.js] -w`;//-w 持续更新  -L 浏览器自动刷新  
fis.set('namespace',xxx)  //为独立模块打包


fis.match()//匹配对应的文件进行操作
```
----解决sass编译
// npm install -g fis-parser-less-2.x
fis.match('**/*.less', {
    rExt: '.css', // from .less to .css  输出成css
    parser: fis.plugin('less-2.x', {   //安装less后，启用less插件解析匹配文件的代码
        // fis-parser-less-2.x option
    }),
    
   release: 'xxx' // 这个对vue组件无效,因为组件中的样式片段编译只是编译内容
});
// 要配置其release，需要针对生成的css文件：
fis.match('src/vue/(**.css)', {
  release: '/vue-style/$1'
});


----实现模块化
// 开启模块化开发
fis.hook('module');   //fis.hook('commonjs',{wrap:true})  //支持的模块化
fis.match('*.es6', {
  isMod: true  //是否启用模块化工具，require，define
});

=>  
require('./comp/1-0/1-0.js');
var btn = document.getElementById('btn');
var handler = function() {
  require(['./comp/2-0/2-0.js']);   //类似es7引入import
};
    
   
fis.match('::package', {
  postpackager: fis.plugin('loader')   //使用插件loader打包
  packager:fis.plugin('map',{  //进行打包压缩
  'static/pkg/common.css':[
    'static/lib/css/vue.min.css'
  ]  //输出文件common.css在目录static/pkg
 })
})
=>  .match('**/*.{css,scss}', {
         packTo: '/static/pkg/all.css' //css打成一个包
     });

fis.match('static/**/xxx.js',{
  useHase: true // 默认为true,是否加时间戳
  useSameNameRequire: true  //是否重名，默认为false
  moduleId: //设置模块的id
})

fis.match('*',{
  url: '/${namespace}$0'  //选择符
  release: '${dir}/${namespace}/$0'  //
  useCache : false  是否使用缓存
})


fis.mathc('*.xx',{
  optimizer:fis.plugin('beautify-css')  //使用beautify插件进行压缩资源
})
```
fis.media('prod') // 按生产发布
```
fis.media('prod').match('*', {
  deploy: fis.plugin('http-push', {
    receiver: 'http://remote-rd-host/receiver.php'
  })
});
```

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

2). webpack  
在index.js引入import css,则依赖的index.html会添加style标签在head里面  
```
 module: {
   rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
        ]
      },
      {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'  //font文件也是使用file-loader
         ]
       }
    ]
  }
```
而使用loader（css-loader或者html-loader）会让资源能够识别到本地文件，并转换引用名字  
使用字体时，可以通过@font-face定义后字体属性，如font-family(可自定义)，src(资源路径)，在css使用时直接font-family:自定义名称  

输出管理：  
`entry:{name1:'',name2:'' }`   
`output: {fileName:[name].bundle.js,path: path.resolve(__dirname, 'dist')} `,name对应的是入口文件的模块名  


如果更改入口起点的名称，或者添加了一个新的名称，生成的包将被重命名在一个构建中，但是index.html文件仍引用旧的文件。  
因此使用html-webpack-plugin解决以上问题,该插件会覆盖原有的index.html并且会将所有的bundle加到html里面  
```
----引入HtmlWebpackPlugin
plugins: [
     new HtmlWebpackPlugin({
       title: 'Output Management'  //	用于生成的HTML文档的标题
       filename: //将HTML写入的文件。默认为index.html
       inject:  head//true和body都会将js资源放在body底部
       favicon: //图片路径
       meta:  //meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
     }),
     
     new CleanWebpackPlugin(['dist']), //清理旧文件，安装clean-webpack-plugin依赖，先清除后构建，注意顺序
   ],
```

快速排查问题可以在开发环境的配置文件使用：`devtool:'inline-source-map'`,会快速告诉开发者在哪里出错  

观察模式可以在脚本配置 webpack --watch   
或者使用webpack-dev-server  
```
---脚本配置"webpack-dev-server --open"
---在module里面去添加配置，指定扫描目录
devServer: {
    contentBase: './dist'
 },
```
或者使用 webpack-dev-middleware，用于开发环境，使用node命令去执行服务器文件server.js  
如果是测试环境，可能不会使用node代理，则会使用nginx，这时候只需要指定dist目录即可  
```
----配置文件要设置publicPath，供服务器使用:path.resolve(__dirname,'/dist')
----server.js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');  //使用config配置文件
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```

生产配置：  
项目往往需要独立生产配置以及开发配置，但遵循不重复的规则，因此需要一个webpack-merge去把通用的配置合并  
新增webpack.common.js / webpack.prod.js   
```
---webpack.prod.js
require(webpack-merge);
require(webpack.common.js);

module.exports=merge(common,{//这里编写生产的配置
  plugins:[
    new UglifyJSPlugin({
      sourceMap:true  //而不是inline-source,增大压缩包大小
    })  //代码压缩
  ]
})
```
脚本区分生产和开发环境：webpack --config webpack.prod.js  
指定环境：  
要注意设置process.env.NODE_ENV === 'production'，因为很多依赖包会根据这个选择不同的资源，使用definePlugin去定义该环境常量  
```
new webpack.DefinePlugin({   //webpack包
      'process.env.NODE_ENV': JSON.stringify('production') 
 })
```

代码分离：  
入口起点：使用 entry 配置手动地分离代码。  
防止重复：使用 CommonsChunkPlugin 去重和分离 重复模块chunk。  
动态导入：通过模块的内联函数调用来分离代码。  

在module中设置共用的模块名，独立出一个bundle
```
 new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // 指定公共 bundle 的名称。  
  })
```

资源缓冲:  
通过使用 output.filename 进行文件名替换，可以确保浏览器获取到修改后的文件。  
[hash] 替换可以用于在文件名中包含一个构建相关(build-specific)的 hash，但是更好的方式是使用 [chunkhash] 替换，在文件名中包含一个 chunk 相关(chunk-specific)的哈希。    
`filename: '[name].[chunkhash].js'`   
将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。
因此通过实现以上步骤，利用客户端的长效缓存机制，可以通过命中缓存来消除请求，并减少向服务器获取资源，同时还能保证客户端代码和服务器端代码版本一致。   
```
   entry: {
     main: './src/index.js',
     vendor: [
       'lodash'
     ]
   },
   plugins:[
    new webpack.optimize.CommonsChunkPlugin({  //CommonsChunkPlugin 的 'vendor' 实例，必须在 'manifest' 实例之前引入。
       name: 'vendor'
   }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
    ]
```
当新引入一个依赖import(),模块[chunck]会根据以下发送改变：
main bundle 会随着自身的新增内容的修改，而发生变化。  
vendor bundle 会随着自身的 module.id 的修改，而发生变化。  
manifest bundle 会因为当前包含一个新模块的引用，而发生变化。  
但对于vendor,添加依赖不会改变module.id，因此不应该发送变化，使用new webpack.HashedModuleIdsPlugin()能够有效解决添加本地依赖导致每次构建都重新打包的问题  

TS构建：(skip)  
npm install --save-dev typescript ts-loader  
建立tsconfig.json  
tsc xx.ts
```
 rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
```

构建性能：  
* 将 loaders 应用于最少数的必要模块，设定扫描目录
```
{
  test: /\.js$/,
  include: path.resolve(__dirname, "src"),
  loader: "babel-loader"
}
```
* 自定义解析，如果你使用自定义解析 plugins ，并且没有指定 context 信息，可以设置 resolve.cacheWithContext: false
* 在内存中编译，通过在内存中进行代码的编译和资源的提供，但并不写入磁盘来提高性能:webpack-dev-server，webpack-hot-middleware，webpack-dev-middleware
* 开发环境避免使用生产环境的工具，以下这些工具在开发中通常被排除在外:
```
UglifyJsPlugin
ExtractTextPlugin
[hash]/[chunkhash]
AggressiveSplittingPlugin
AggressiveMergingPlugin
ModuleConcatenationPlugin
```

### 4. 性能优化  
1). 从接口获取的数据内容是否在首屏加载时必要显示，如果接口返回的数据量大，且非必要，则可以等首屏加载后再调用,或者减少数据量的获取   
2). 加载的资源是否有依赖顺序，如果有，需要按顺序去加载  
3). 接口是否位于循环体，接口返回的数据是否能调用一次后存放在浏览器缓存或者内存，避免重复调用  
4). 压缩静态资源，可以使用打包工具，或者按需加载模块（模块化以及webpack、fis）
5). DOM操作导致的重绘和回流问题：
   5.1). DOM的增删行为
   5.2). 几何属性的变化:  
   如果要改变多个属性，最好将这些属性定义在一个class中，直接修改class名，这样只用引起一次回流。
   5.3). 元素位置的变化:  
   修改一个元素的左右margin，padding之类的操作，所以在做元素位移的动画，不要更改margin之类的属性，使用定位脱离文档流后改变位置会更好。
   5.4). 获取元素的偏移量属性:  
   例如获取一个元素的scrollTop、scrollLeft、scrollWidth、offsetTop、offsetLeft、offsetWidth、offsetHeight之类的属性，浏览器为了保证值的正确也会回流取得最新的值，所以如果你要多次操作，最取完做个缓存。
   5.5). 页面初次渲染
   5.6). 浏览器窗口尺寸改变

### 5. sass预处理器
先安装或者安装依赖包sass   
如果直接编译可使用sass xx.sass xxx.css  
在项目使用sass:  
在webpack.conf.js配置rules属性  
```
{
 test:/\.scss$/,
 loaders:['style','css','sass']  => lang = "sass"
}
```
或者，需要通过fis.parser解析即可   
```
fis.match('**/*.less', {
    rExt: '.css', // from .less to .css  输出成css
    parser: fis.plugin('less-2.x', {   //安装less后，启用less插件解析匹配文件的代码
        // fis-parser-less-2.x option
    }), 
   release: 'xxx' 
});
```

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
