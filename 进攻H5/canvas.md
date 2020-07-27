## canvas
```
var lineCaps = ["butt", "round", "square"];   //线条末端样式
var lineJoin = ['round', 'bevel', 'miter'];  //线条间连接
cxt.setLineDash([10, 20, 30]);  //设置虚线
for (var i = 0; i < 3; i++){
    ctx.beginPath();
    ctx.moveTo(20 + 30 * i, 30);
    ctx.lineTo(20 + 30 * i, 100);
    ctx.lineWidth = 20;
    ctx.lineCap = lineCaps[i];
    ctx.lineJoin = lineJoin[i];
    
    ctx.arc(x,y,半径r,起始角度,结束角度（Math.pi,实际为周长））1-2π
    //    sAngle	起始角，以弧度计（弧的圆形的三点钟位置是 0 度）。  
    // eAngle	结束角，以弧度计。  
    //  counterclockwise	可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。   
    
    ctx.globalCompositeOperation = "source-over"; //source-in source-atop destination-over destination-in  destination-out全局两个图形合成操作
    ctx.transform(1, 1, 0, 1, 0, 0);  //矩阵变形
    
    ctx.setLineDash([20, 5]);  // [实线长度, 间隙长度]  设置虚线
    ctx.lineDashOffset = -0;  //实线的偏离度，指的是绘制虚线时的第一条实线的偏离
    ctx.stroke();
}
```
显示图像时裁剪。dx,dy开始裁剪的区域，dWidth裁剪的大小  
`drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)`  

save() 和 restore()  
save 和 restore 方法是用来保存和恢复 canvas 状态的，都没有参数。  
Canvas 的状态就是当前画面应用的所有样式和变形的一个快照。
* restore()：每一次调用 restore 方法，上一个保存的状态就从栈中弹出，所有设定都恢复

```
var gradient=ctx.createLinearGradient(0,0,170,0);
gradient.addColorStop("0","magenta");
gradient.addColorStop("0.5","blue");
gradient.addColorStop("1.0","red");
// 用渐变进行填充
ctx.strokeStyle=gradient;
ctx.lineWidth=5;
ctx.strokeRect(20,20,150,100);
```

规律：
x2为100，即使垂直水平不变
当x1,x2不变，x3=400,x4为100，则为一条直线，长度为300  
当x2不变，x1为120，调整垫为（120,100）相当于仍为一条直线  
当x2调整向下移动，X2=120,x1=100,则将中心点拉下20距离  
因此是将中心点调整到x1,x2
二次贝塞尔曲线
```
ctx.moveTo(100, 100);//（从上一点）起始点
ctx.quadraticCurveTo(200, 500, 300, 400);  //x1,x2为调整坐标，x3,x4为终点
ctx.stroke();
```
三次贝塞尔
```
// 起始点
ctx.moveTo(100, 300);//（从上一点）
ctx.bezierCurveTo(150, 250, 250, 350, 300, 300);
```
