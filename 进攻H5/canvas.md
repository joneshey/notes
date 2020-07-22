## canvas
```
var lineCaps = ["butt", "round", "square"];   //线条末端样式
var lineJoin = ['round', 'bevel', 'miter'];  //线条间连接
for (var i = 0; i < 3; i++){
    ctx.beginPath();
    ctx.moveTo(20 + 30 * i, 30);
    ctx.lineTo(20 + 30 * i, 100);
    ctx.lineWidth = 20;
    ctx.lineCap = lineCaps[i];
    ctx.lineJoin = lineJoin[i];
    
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
