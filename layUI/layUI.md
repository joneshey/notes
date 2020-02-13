# LayUI学习

1. 目标
2. 框架内容


### 动画
layui-anim-动画


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

### 页面元素：
1. 表单
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
 
2. 导航
```javascript
layui.use('element', function(){
  var element = layui.element;
  
  //…
});
```
`layui-badge`  消息
`layui-badge-dot`  消息红点

水平、垂直、侧边三个导航的HTML结构是完全一样的，不同的是：

垂直导航需要追加class：layui-nav-tree 
侧边导航需要追加class：layui-nav-tree layui-nav-side

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

* 面包屑导航
可以通过设置属性 lay-separator="-" 来自定义分隔符。如： 首页- 国际新闻- 亚太地区- 正文  
默认为斜杠/  
HTML结构
```html  
<span class="layui-breadcrumb" lay-separator="-">
  <a href="">首页</a>
  <a href="">国际新闻</a>
  <a href="">亚太地区</a>
  <a><cite>正文</cite></a>
</span>
```

3. 选项卡
Tab响应式:当容器的宽度不足以显示全部的选项时，即会自动出现展开图标  
值得注意的是，如果存在 layui-tab-item 的内容区域，在切换时自动定位到对应内容。如果不存在内容区域，则不会定位到对应内容。  
你通常需要设置过滤器，通过 element模块的监听tab事件来进行切换操作。详见【内置组件 - 基本元素操作 element】
```
<div class="layui-tab">
  <ul class="layui-tab-title">
    <li class="layui-this">网站设置</li>
    <li>用户管理</li>
  </ul>
  <div class="layui-tab-content">
    <div class="layui-tab-item layui-show">内容1</div>
    <div class="layui-tab-item">内容2</div>
  </div>
</div>
 
<script>
//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
layui.use('element', function(){
  var element = layui.element;
  
  //…
});
</script>
```
layui-tab-card 卡片风格  
layui-tab-brief 简洁风格  
> 父层容器设置属性 lay-allowClose="true", 带删除按钮的选项卡  

#### ID焦点定位
对选项卡设置属性 lay-id="xxx" 来作为唯一的匹配索引，以用于外部的定位切换，如后台的左侧导航、以及页面地址 hash的匹配。  
属性 lay-id 是扮演这项功能的主要角色，它是动态操作的重要凭据
```
<div class="layui-tab" lay-filter="test1">
  <ul class="layui-tab-title">
    <li class="layui-this" lay-id="111" >文章列表</li>
    <li lay-id="222">发送信息</li>
    <li lay-id="333">权限分配</li>
    <li lay-id="444">审核</li>
    <li lay-id="555">订单管理</li>
  </ul>
  <div class="layui-tab-content">
    <div class="layui-tab-item layui-show">1</div>
    <div class="layui-tab-item">2</div>
    <div class="layui-tab-item">3</div>
    <div class="layui-tab-item">4</div>
    <div class="layui-tab-item">5</div>
  </div>
</div>

<script>
layui.use('element', function(){
  var element = layui.element;
  
  //获取hash来切换选项卡，假设当前地址的hash为lay-id对应的值
  var layid = location.hash.replace(/^#test1=/, '');
  element.tabChange('test1', layid); //假设当前地址为：http://a.com#test1=222，那么选项卡会自动切换到“发送消息”这一项
  
  //监听Tab切换，以改变地址hash值
  element.on('tab(test1)', function(){
    location.hash = 'test1='+ this.getAttribute('lay-id');
  });
});
</script>      
``` 

同样的还有增加选项卡和删除选项卡，都需要用到 lay-id
> 无论是导航、折叠面板、进度条还是Tab，都需依赖 element模块，大部分行为都是在加载完该模块后自动完成的

4. 面板
* 卡片式面板结构：  
layui-card  
  -- layui-card-header  
  -- layui-card-body  

* 折叠式面板结构：
layui-collapse
  -- layui-colla-item  
    -- layui-colla-title  
    -- layui-colla-content (layui-show)  
在折叠面板新增属性lay-accordion，即是手风琴面板。

5. 表格
layui-table基本属性：
lay-even 隔行背景  
lay-skin:line row nob(无边框)  
lay-size:lg sm  

6. 时间线
类结构：  
layui-timeline    
  -- layui-timeline-item  
    -- layui-icon layui-timeline-axis  
    -- layui-timeline-content layui-text  
      -- layui-timeline-title  
      -- 内容自由填充
```
<ul class="layui-timeline">
  <li class="layui-timeline-item">
    <i class="layui-icon layui-timeline-axis">&#xe63f;</i>
    <div class="layui-timeline-content layui-text">
      <h3 class="layui-timeline-title">8月18日</h3>
      <p>
        layui 2.0 的一切准备工作似乎都已到位。发布之弦，一触即发。
        <br>不枉近百个日日夜夜与之为伴。因小而大，因弱而强。
        <br>无论它能走多远，抑或如何支撑？至少我曾倾注全心，无怨无悔 <i class="layui-icon"></i>
      </p>
    </div>
  </li>
 </ul>
```

### 内置模块
1. 弹层组件 layui.layer

作为独立组件使用：引入好layer.js，直接用即可   
<script src="layer.js"></script>    
      
在 layui 中使用：  
```
layui.use('layer', function(){
  var layer = layui.layer；
  layer.msg('hello');  //toast
  layer.alert("hah"); 附加参数，{icon：0-6}
  layer.load(1); //风格1的加载,参数值为0-2
  layer.tips(content, follow, options);
  layer.confirm(content,btn:[btn1,btn2],btn1cb(index, layero),btn2cb); //btn:{}
});             
```
> 关于confirm的例子:
```eg1
layer.open({
  content: 'test'
  ,btn: ['按钮一', '按钮二', '按钮三']
  ,yes: function(index, layero){
    //按钮【按钮一】的回调
  }
  ,btn2: function(index, layero){
    //按钮【按钮二】的回调
    
    //return false 开启该代码可禁止点击该按钮关闭
  }
  ,btn3: function(index, layero){
    //按钮【按钮三】的回调
    
    //return false 开启该代码可禁止点击该按钮关闭
  }
  ,cancel: function(){ 
    //右上角关闭回调
    
    //return false 开启该代码可禁止点击该按钮关闭
  }
});
```
关闭弹层 layer.close(index)
获取弹出的index值：var index = layer.tips();  //每一种弹层调用方式，都会返回一个index  
layer.close(index); 
> 如果你想关闭最新弹出的层，直接获取layer.index即可，值是由layer内部动态递增计算的
> 关闭所有层，layer.closeAll(type)

layer提供了5种层类型, 可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。  
采用layer.open({type: 1})方式调用，则type为必填项（信息框除外）   
```
layer.open({
  type:'1',
  title: '',
  content: '',
  skin:'',
  area:'',
  offset:'',
  btnAlign:'', //默认'r'右对齐
  btn:[]...,
  closeBtn: 0/1,
  shade: [0.8, '#393D49'], //阴影遮罩
  shadeClose：boolean ,//点击区域外是否关闭弹层
  id:'',anim :0-6,
  success :callback , //成功弹出后的回调函数,yes/cancel/end
});
```
另外，不同类型的参数会有不同的显示效果。
若：
type参数  
type => 1 ：content传入html,DOM元素$('#id')最好为独立模块元素
type => 2 : content传入网址则显示页面内容，跨域另提，如果不让滚动条出现，可以传入数组[url,'no'] 
type => 4 : content传入[content,选择器],则在该元素附近显示提示语

skin参数  
```javascript
//单个使用
layer.open({
  skin: 'demo-class'
});
//全局使用。即所有弹出层都默认采用，但是单个配置skin的优先级更高
layer.config({
  skin: 'demo-class'
})
```
```css
body .demo-class .layui-layer-title{background:#c00; color:#fff; border: none;}
body .demo-class .layui-layer-btn{border-top:1px solid #E9E7E7}
```

2. 时间选择器
通过layui获取模块后，使用laydate.render初始化配置并渲染  
其中：elem参数为input的选择器，或elem: lay('#test')  
type:year month date time datetime
range:boolean
format:yyyy-MM-dd (默认)亦可随意使用分隔符编排
value:初始值
min/max:最大值
show:boolean 当外部调用时直接显示
closeStop: '#test1' //与上面一起使用的参数：当点击事件发生所，阻止关闭事件冒泡。如果不设定，则无法弹出
ready(date)/change/done:callback(value, date, endDate)生成的值、日期时间对象、结束的日期时间对象

3. 分页（仅仅是分页器，不包括内容显示）
先通过layui获取到laypage,再进行渲染
```
laypage.render({
    elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
    count: 50 //数据总数，从服务端得到,
    limit: 10(default),	//laypage将会借助 count 和 limit 计算出分页数
    limits: , //每页条数的选择项。如果 layout 参数开启了 limit，则会出现每页条数的select选择框
    jump:'' //完成分页的回调,此时应该显示数据
  });
  
```


4. 模板引擎template
看码吧...语法用{{#}}包裹，若冲突可以自定义：  
laytpl.config({  
  open: '<%',  
  close: '%>'  
});  
``` 
//第一步：编写模版。你可以使用一个script标签存放模板，如：
<script id="demo" type="text/html">
  <h3>{{ d.title }}</h3>
  <ul>
  {{#  layui.each(d.list, function(index, item){ }}
    <li>
      <span>{{ item.modname }}</span>
      <span>{{ item.alias }}：</span>
      <span>{{ item.site || '' }}</span>
    </li>
  {{#  }); }}
  {{#  if(d.list.length === 0){ }}
    无数据
  {{#  } }} 
  </ul>
</script>
 
//第二步：建立视图。用于呈现渲染结果。
<div id="view"></div>
 
//第三步：渲染模版
var data = { //数据
  "title":"Layui常用模块"
  ,"list":[{"modname":"弹层","alias":"layer","site":"layer.layui.com"},{"modname":"表单","alias":"form"}]
}
var getTpl = demo.innerHTML
,view = document.getElementById('view');
laytpl(getTpl).render(data, function(html){
  view.innerHTML = html;
});
```

5. 轮播图
轮播类结构：  
layui-carousel
  -- carousel-item
渲染调用时：
```
layui.use('carousel', function(){
  var carousel = layui.carousel;
  ////重置轮播  carousel.reload(options);
  //建造实例
  carousel.render({
    elem: '#test1'
    ,width: '100%' //设置容器宽度
    ,arrow: 'always' //始终显示箭头
    //,anim: 'updown' //切换动画方式
    autoplay,interval,
    index: ,//初始化索引
    arrow:hover/always/none,
    indicator: //指示器位置
    trigger:'click'指示器触发事件
  });
});
```
监听轮播事件：
```
carousel.on('change(test1)', function(obj){ 
  console.log(obj.index); //当前条目的索引
  console.log(obj.prevIndex); //上一个条目的索引
  console.log(obj.item); //当前条目的元素对象
});    
```

6. 流加载
两个核心加载方法：  
信息流：layui.flow(opts)  
参数项：  
elem   
scrollElem	// 滚动条所在元素选择器，默认document。如果你不是通过窗口滚动来触发流加载，而是页面中的某一个容器的滚动条，通过该参数指定即可。  
isAuto	// 是否自动加载。默认true。如果设为false，点会在列表底部生成一个“加载更多”的button，则只能点击它才会加载下一页数据。  
end	//用于显示末页内容，可传入任意HTML字符。默认为：没有更多了  
isLazyimg	//是否开启图片懒加载。默认false。如果设为true，则只会对在可视区域的图片进行按需加载。与此同时，在拼接列表字符的时候，你不能给列表中的img元素赋值src，必须要用lay-src取代，如：
 ```
layui.each(res.data, function(index, item){
  lis.push('<li><img lay-src="'+ item.src +'"></li>');
});   
  ```        
mb	//与底部的临界距离，默认50。即当滚动条与底部产生该距离时，触发加载。注意：只有在isAuto为true时有效。
done //到达临界点触发加载的回调。信息流最重要的一个存在。携带两个参数：
```
done: function(page, next){
  //从 layui 1.0.5 的版本开始，page是从1开始返回，初始时即会执行一次done回调。
  //console.log(page) //获得当前页
  //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
  //只有当前页小于总页数的情况下，才会继续出现加载更多
  next('列表HTML片段', page < res.pages); 
}
```
懒加载：layui.lazimg  //针对lay-src属性的img元素有作用

7. 上传文件
  ```
  upload.render({
    elem: '#test1' //绑定元素
    ,url: '/upload/' //上传接口
    ,done: function(res){
      //上传完毕回调
    }
    ,error: function(){
      //请求异常回调
    }
    //,accept: 'file' //允许上传的文件类型
    //,size: 50 //最大允许上传的文件大小
    //,acceptMime: 'image/*'
    //,multiple: 是否支持多文件
    //,choose/before/done(res,index)/error(index,upload重新上传的方法)
    //,url 用来告诉 upload 模块的服务端上传接口,method请求方法,data额外参数 => 类似ajax
  });
```
> 参数允许通过元素属性lay-data="{url: '/b/', accept: 'file'}，但仍需要upload模块渲染元素

8. 表单
主要总结一下：
表单元素的lay-filter属性，用于在表单模块进行功能 性操作时，迅速找到对应的表单元素。  
`form.render(type,filter);` 更新表单元素   
事件监听：   
`form.on('type(filter)', function(data){});`  
属性值：  
lay-verify: required（必填项）phone（手机号）email（邮箱）url（网址）number（数字）date（日期）identity（身份证）  
            自定义=>同时支持多条规则的验证，格式：lay-verify="验证A|验证B" 如：lay-verify="required|phone|number"     
            还可以给他设定任意的值，比如lay-verify="pass"，那么你就需要借助form.verify()方法对pass进行一个校验规则的定义。    
```
form.verify({
  username: function(value, item){ //value：表单的值、item：表单的DOM对象
    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
      return '用户名不能有特殊字符';
    }
  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  ,pass: [
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
  ] 
});   
```
lay-verType: tips（吸附层）alert（对话框）msg（默认）	用于定义异常提示层模式。  
lay-reqText: 用于自定义必填项（即设定了 lay-verify="required" 的表单）的提示文本  
lay-submit	无需填写值	绑定触发提交的元素，如button


