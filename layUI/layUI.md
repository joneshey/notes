# LayUI学习

1. 目标
2. 框架内容

1. Layui的模块加载采用核心的 layui.use(mods, callback)方法，当你的JS 需要用到Layui模块的时候，我们更推荐你采用预先加载，因为这样可以避免到处写layui.use的麻烦。你应该在最外层如此定义：

demo.jslayui.code
/*
  Demo1.js
  使用Layui的form和upload模块
*/
layui.use(['form', 'upload'], function(){  //如果只加载一个模块，可以不填数组。如：layui.use('form')
  var form = layui.form //获取form模块
  ,upload = layui.upload; //获取upload模块
  
  //监听提交按钮
  form.on('submit(test)', function(data){
    console.log(data);
  });
  
  //实例化一个上传控件
  upload({
    url: '上传接口url'
    ,success: function(data){
      console.log(data);
    }
  })
});

2. 如果你有强迫症，你对网站的性能有极致的要求，你并不想预先加载所需要的模块，而是在触发一个动作的时候，才去加载模块，那么，这是允许的。你不用在你的JS最外层去包裹一个大大的 layui.use，你只需要：

demo.jslayui.code
/*
  Demo2.js
  按需加载一个Layui模块
*/
 
//……
//你的各种JS代码什么的
//……
 
//下面是在一个事件回调里去加载一个Layui模块
button.addEventListener('click', function(){
  layui.use('laytpl', function(laytpl){ //温馨提示：多次调用use并不会重复加载laytpl.js，Layui内部有做模块cache处理。
    var html = laytpl('').render({});
    console.log(html);
  });
});


模块命名空间
layui 的模块接口会绑定在 layui 对象下，内部由 layui.define() 方法来完成。每一个模块都会一个特有的名字，并且无法被占用。所以你无需担心模块的空间被污染，除非你主动 delete layui.{模块名}。调用模块可通过 layui.use 方法来实现，然后再通过 layui 对象获得模块接口。如：

codelayui.code
layui.use(['layer', 'laypage', 'laydate'], function(){
  var layer = layui.layer //获得layer模块
  ,laypage = layui.laypage //获得laypage模块
  ,laydate = layui.laydate; //获得laydate模块
  
  //使用模块
});      
因为如果一旦你的业务代码是在模块加载完毕之前执行，你的全局对象将获取不到模块接口，因此这样用不仅不符合规范，还存在报错风险。
建议在你的 js 文件中，在最外层写一个 layui.use 来加载所依赖的模块，并将业务代码写在回调中

//全局
事实上 layui 的「模块化加载」十分适用于开发环境，它方便团队开发和代码调试。但对于「线上环境」，我们更推荐您采用「全模块加载」，即直接引入 layui.all.js，它包含了 layui 所有的内置模块，且无需再通过 layui.use() 方法加载模块，直接调用即可。如：

codelayui.code
<script src="../layui/layui.all.js"></script>  
<script>
;!function(){
  //无需再执行layui.use()方法加载模块，直接使用即可
  var form = layui.form
  ,layer = layui.layer;
  
  //…
}();
</script> 

layui-icon	用于图标
layui-elip	用于单行文本溢出省略
layui-disabled	用于设置元素不可点击状态
layui-hide	用于隐藏元素

Layui在解析HTML元素时，必须充分确保其结构是被支持的。以Tab选项卡为例：

HTMLlayui.code
<div class="layui-tab">
  <ul class="layui-tab-title">
    <li class="layui-this">标题一</li>
    <li>标题二</li>
    <li>标题三</li>
  </ul>
  <div class="layui-tab-content">
    <div class="layui-tab-item layui-show">内容1</div>
    <div class="layui-tab-item">内容2</div>
    <div class="layui-tab-item">内容3</div>
  </div>
</div>

公共属性
lay-filter=" "	事件过滤器。你可能会在很多地方看到他，他一般是用于监听特定的自定义事件。你可以把它看作是一个ID选择器

### 栅格是12列
可以在单列设置列间隔类，如layui-col-space*,*代表任意一个基数  
偏移类，layui-col-offset4  偏移4列，用于布局  
<div class="layui-row layui-col-space10">
    <div class="layui-col-xs6 layui-col-sm6 layui-col-md4">
      移动：6/12 (手机<768px)| 平板：6/12(平板≥768px) | 桌面：4/12(桌面≥992px)
    </div>
</div>

### 响应式类
响应式公共类：

类名（class）	说明
layui-show-*-block	定义不同设备下的 display: block; * 可选值有：xs、sm、md、lg
layui-show-*-inline	定义不同设备下的 display: inline; * 可选值同上
layui-show-*-inline-block	定义不同设备下的 display: inline-block; * 可选值同上
layui-hide-*

将栅格放入一个带有 class="layui-container" 的特定的容器中，以便在小屏幕以上的设备中固定宽度，让列可控。  
当然，你还可以不固定容器宽度。将栅格或其它元素放入一个带有 class="layui-fluid" 的容器中，那么宽度将不会固定，而是 100% 适应


### IE8/9兼容栅格：

事实上IE8和IE9并不支持媒体查询（Media Queries），但你可以使用下面的补丁完美兼容！该补丁来自于开源社区：

codelayui.code
<!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
<!--[if lt IE 9]>
  <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
  <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->


### 动画
layui-anim-动画

### 表单
layui-form
--layui-form-item
  --layui-form-label
  --layui-input-block
    --input  lay-skin="switch"
 lay-verify：注册form模块需要验证的类型    
 ```javascript
 layui.use('form', function(){
  var form = layui.form;
  
  //监听提交
  form.on('submit(formDemo)', function(data){
    layer.msg(JSON.stringify(data.field));
    return false;
  });
});
 ```
 
### 导航
```javascript
layui.use('element', function(){
  var element = layui.element;
  
  //…
});
```
`layui-badge`  消息
`layui-badge-dot`  消息红点

```html
<ul class="layui-nav" lay-filter="">
  <li class="layui-nav-item"><a href="">最新活动</a></li>
  <li class="layui-nav-item layui-this"><a href="">产品</a></li>
  <li class="layui-nav-item"><a href="">大数据</a></li>
  <li class="layui-nav-item">
    <a href="javascript:;">解决方案</a>
    <dl class="layui-nav-child"> <!-- 二级菜单 -->
      <dd><a href="">移动模块</a></dd>
      <dd><a href="">后台模版</a></dd>
      <dd><a href="">电商平台</a></dd>
    </dl>
  </li>
  <li class="layui-nav-item"><a href="">社区</a></li>
</ul>
```

### 开发问题
layui.use('form', function(){
  var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
  
  //……
  
  //但是，如果你的HTML是动态生成的，自动渲染就会失效
  //因此你需要在相应的地方，执行下述方法来进行渲染
  form.render();
});  

很多时候你的页面元素可能是动态生成的，这时element的相关功能将不会对其有效，你必须手工执行 element.init(type, filter) 方法即可。注意：2.1.6 开始，可以用 element.render(type, filter); 方法替代

第一个参数：type，为表单的type类型，可选。默认对全部类型的表单进行一次更新。可局部刷新的type如下表：

参数（type）值	描述
tab	重新对tab选项卡进行初始化渲染
nav	重新对导航进行渲染
breadcrumb	重新对面包屑进行渲染
progress	重新对进度条进行渲染
collapse	重新对折叠面板进行渲染
例子layui.code
element.init(); //更新全部  2.1.6 可用 element.render() 方法替代
element.render('nav'); //重新对导航进行渲染。注：layui 2.1.6 版本新增
//……
      
第二个参数：filter，为元素的 lay-filter="" 的值。你可以借助该参数，完成指定元素的局部更新。

codelayui.code
【HTML】
<div class="layui-nav" lay-filter="test1">
  …
</div>
 
<div class="layui-nav" lay-filter="test2">
  …
</div>
      
【JavaScript】
//比如当你对导航动态插入了二级菜单，这时你需要重新去对它进行渲染
element.render('nav', 'test1'); //对 lay-filter="test1" 所在导航重新渲染。注：layui 2.1.6 版本新增
//……      
