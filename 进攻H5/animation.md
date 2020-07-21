## Animejs (https://www.animejs.cn/)
1. 使用方式：
安装anime.js:npm install animejs 或者下载anime.js 的文件包  
在页面中引入anime.min.js 文件。  
`<script type="text/javascript" src="js/anime.min.js"></script>`

2. 实例：
```
var myAnimation = anime({
  targets: ['.blue', '.green'],
  translateX: '13rem',
  rotate: 180,
  borderRadius: 8,
  duration: 2000,
  loop: true
});
```

### 开始文档熟悉：  
1. targets属性 
targets属性值就是元素dom标志，如类名、Id  
可以为多个元素节点或者数组[]，如getElemenetByTagName()或者querySelectorAll()  

targets可以为js对象属性，然后再anime新增自定义同名属性（至少有一个数字属性）  
设置round(范围)easing(增量速度曲线)  
update是回调函数  

2. 可动画的目标属性
css属性：borderRadius(驼峰)backgroundColor  
transform属性：translateX scale rotate  
上述的js对象属性，即从原对象属性值变为animie定义的属性值  
DOM属性： input表单中的value，在anime实例中定义value变化范围  

3. 动画基础参数
duration: 持续时间  
delay: 延时
endDelay: 末端延时
easing: 时间曲线  
  匀速：linear  
  非匀速：
 ```
'easeInQuad'	'easeOutQuad'	'easeInOutQuad'	由快至慢
'easeInCubic'	'easeOutCubic'	'easeInOutCubic'	由快至慢，效果更强
'easeInQuart'	'easeOutQuart'	'easeInOutQuart'	由快至慢，效果更强
'easeInQuint'	'easeOutQuint'	'easeInOutQuint'	由快至慢，效果更强
'easeInSine'	'easeOutSine'	'easeInOutSine'	由快至慢，比Quad弱
'easeInExpo'	'easeOutExpo'	'easeInOutExpo'	突然减速，效果较强
'easeInCirc'	'easeOutCirc'	'easeInOutCirc'	突然减速，效果较弱
'easeInBack'	'easeOutBack'	'easeInOutBack'	冲出终点后返回
```
  三次贝塞尔：cubicBezier(x1, y1, x2, y2)
  弹簧：spring(mass, stiffness, damping, velocity)
  弹跳：easeOutElastic(amplitude, period)  
  台阶式：steps(numberOfSteps)

* 如果传的对象为多个dom这里easing可以通过回调获取元素所设置的动画去个性化配置，如`function(el){return el.getAttribute('data-animi')}`，只要返回time或者对应的值   
round: 每次的变化梯度  
每个属性对象都可以添加{value:,duration:,easing:}属性  
每个基本属性可以自定义function，参数：target	当前动画目标元素，index	动画目标的索引，targetsLength	总动画目标数  
如：
```
delay: function(el, i, l) {
    return i * 100;
  }
```

4. 方向与循环
direction：normal 正方向  reverse  反方向  alternate  往返运动
loop: true 或者 number

5. 关键帧  
动画关键帧 keyframes: 属性值为数组[]，数组有多个属性对象  
属性关键帧 ：通过属性值设置多个数组[]， [{value: 200, delay: 500},{value: 200, delay: 500}]

6. 交错动画
Stagger允许你通过 跟随和重叠动作 为多个元素设置动画。
`delay:anime.stagger(value, options)`  
`delay:anime.stagger(value, {start: 500})` 特定时间开始延迟  
`rotate:anime.stagger([-360, 360])`  设定交错范围值，旋转将在-360deg到360deg之间均匀分布在所有元素之间  
`anime.stagger(value, {from: startingPosition})`  从特定位置开始交错效果,first从第一个元素开始效果
last从最后一个元素开始效果  center 从中心开始效果  index从指定索引去启动    
`anime.stagger(value, {direction: 'reverse'})`  更改交错动画的顺序，direction属性可以改为其他属性。





