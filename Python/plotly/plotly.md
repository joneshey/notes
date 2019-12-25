# plotly

*注意文件名不能为plotly，否则无法引入plotly模块

导入所需模块库：plotly, plotly.graph_objs(图像对象)  
定义一个绘画对象trace, 其由pygo的Scatter对象定义（数据布局） 
Scatter对象的输入数据是通过dict格式  
如：x=[],y=[]  (x,y字符是plotly模块的内部变量)  
```python
pygo.Scatter({
  x=[],y=[]
})
```
另外图像对象中的Data函数，会将代表两条曲线的绘画对象定义为一组图形数据，传入参数应为列表（数组）  
```python
pygo.Data([trace,trace0])
```
定义图形数据之后，使用主函数将图形进行绘制，py.plot()  
绘制图形主函数，离线绘图：py.offline.plot  
参数:data,界面窗口设置，输出文件名  
`py.offline.plot(data,filename='tmp/plotlyPic.html')`  
若不使用filename则在当前目录生成文件，对于多个图形生产须要用filename定义，不然会覆盖旧图像  
其中可以修改后缀，`py.offline.plot(data,filename='tmp/plotlyPic.html'，image='png'` ,不过需要打开浏览器手动保存该图。   


