# Less语法

### 变量
使用@声明变量：
```css
@width:10px;  //还可以运算
#header{
 width:@width;
}
```

### 运算
```css
@conversion-2: 2 - 3cm - 5mm; // result is -1.5cm
background-color: #112244 + #111; // result is #223355
```

### mixins混合式
定义一个样式：`.tool{color:red}`  
在另外一个选择器中：
```css
#id a{
  width:110px;
  .tool();
}
```

### 嵌套子元素
```css
#header{
  color:red;
  .child{
    font-size:13px;
  }
  .miao{
    width:100px;
  }
}
```
若如果为伪元素的话，则使用`&:after`,&为所有的父选择器，相当于获取他的字符串值
```
div.hh{
.button {
  &-ok {  //div.hh .button-ok{}
    background-image: url("ok.png");   
  }
}
}
```
还可以mixins：
```css
#header .special-div {
  color: orange;
  #header.child();  // can also be written as #header > .child
}
```


### Function
* if  
```css
div {
    margin: if((2 > 1), 0, 3px);
}
```

* boolean  
`@bg-light: boolean(luma(@bg) > 50%);`  

* extract提取
```
@list: apple, pear, coconut, orange;
value: extract(@list, 3);  //coconut
```

### Map
```css
#colors() {
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
```

### 可插变值
```css
//选择器
@my-selector: banner;

.@{my-selector} {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}

@images: "../img";

body {
  color: #444;
  background: url("@{images}/white-sand.png");
}
```

### 属性作为变量
```
.widget {
  color: #efefef;
  background-color: $color;
}
```

### 不输出mixins
如果要创建一个mixin，但又不希望该mixin出现在CSS输出中，请在mixin定义后加上括号。
```
.my-other-mixin() {
  background: white;
}
```
