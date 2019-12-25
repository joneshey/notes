# plotly

### 引言
简单实例解析入门：  
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
参数:data(包括数据以及布局)，输出文件名  
`py.offline.plot(data,filename='tmp/plotlyPic.html')`  
若不使用filename则在当前目录生成文件，对于多个图形生产须要用filename定义，不然会覆盖旧图像  
其中可以修改后缀，`py.offline.plot(data,filename='tmp/plotlyPic.html'，image='png'` ,不过需要打开浏览器手动保存该图。   

### 基本绘图流程
由上面的实例可知，完整的绘图流程应该包括以下内容：
* 通过Scatter添加图轨数据
* 设置画面窗口布局，layout命令
* 集成图形、布局数据，使用Data、Figure命令
* 绘制图形的输出，使用主函数plot()

总结大部分绘图的总流程，接下来归纳以下常用的绘制方法：  
常用绘制方法  
1. 散点图  
由于在plotly没有专门区分线形图以及散点图，因此统一通过Scatter函数进行实现。  
使用Scatter时，除了x,y变量，还需要传入mode,name参数  
mode:绘图模式，name:曲线名称 marker:设置点与线的样式  
而mode主要有以下参数值：markers, lines, markers+lines(带描点的线性图)；  
额外参数：
text，相应节点的悬浮文字，需要传入列表（数组）；  
marker需要传入dict(),而传入的字典可以为width = x,color = '',size = 10, line = dict(width=2)；  

使用layout，可以设置布局数据  
layout = dict(title='',yaxis=dict(zeroline=True),xaxis=dict())  //zeroline是设置是否显示0刻度
fig = dict(data=data,layout=layout)  => 也可以使用fig = pygo.Figure(data = data,layout=layout,filename=r'tmp.html')  
py.offline.plot(fig,filename='')  => py.offline.plot(fig)

> 随机数可通过引入numpy，调用numpy.random()获取  

2. 组合图 
多个数据图显示  
如：df = pd.read_csv('path.csv'),截取数据 df9 = df[:10]  

> 引入pandas可以读取csv,xls等表单数据，直接生成图像数据

3. 气泡图
类似散点图，与之区别的是通过描绘点的大小变成气泡图  
`scratter(x,y,mode,marker=dict(size=[40,60,80,100]))`  
marker可以传入color opacity size showscale（是否显示右侧颜色条） sizemode(area按面积缩放,diameter按直径缩放) sizeref(大小为原来的1/2)，其中color、opacity、size都需要传入列表，且与点一一对应  

4. 线形图


