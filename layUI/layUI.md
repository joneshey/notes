# LayUI学习

1. 目标
2. 框架内容


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
