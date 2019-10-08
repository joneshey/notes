# Less语法

### 变量
使用@声明变量：
```less
@width:10px;  //还可以运算
#header{
 width:@width;
}
```

### 运算
```less
@conversion-2: 2 - 3cm - 5mm; // result is -1.5cm
background-color: #112244 + #111; // result is #223355
```

### mixins混合式
定义一个样式：`.tool{color:red}`  
在另外一个选择器中：
```less
#id a{
  width:110px;
  .tool();
}
```

### 嵌套子元素
```less
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
```less
div.hh{
.button {
  &-ok {  //div.hh .button-ok{}
    background-image: url("ok.png");   
  }
}
}
```
还可以mixins：
```less
#header .special-div {
  color: orange;
  #header.child();  // can also be written as #header > .child
}
```


### Function
* if  
```less
div {
    margin: if((2 > 1), 0, 3px);
}
```

* boolean  
`@bg-light: boolean(luma(@bg) > 50%);`  

* extract提取
```less
@list: apple, pear, coconut, orange;
value: extract(@list, 3);  //coconut
```

### Map
```less
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
```less
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
```less
.widget {
  color: #efefef;
  background-color: $color;
}
```

### 不输出mixins
如果要创建一个mixin，但又不希望该mixin出现在CSS输出中，请在mixin定义后加上括号。
```less
.my-other-mixin() {
  background: white;
}
```
