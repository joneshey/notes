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

### 绘制方法
总结大部分绘图的总流程，接下来归纳以下常用的绘制方法：  

常用绘制方法  

Scatter函数:  
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
> np.rint()四舍五入取整

2. 组合图 
多个数据图显示  
如：df = pd.read_csv('path.csv'),截取数据 df9 = df[:10]  

> 引入pandas可以读取csv,xls等表单数据，直接生成图像数据

3. 气泡图
类似散点图，与之区别的是通过描绘点的大小变成气泡图  
`scratter(x,y,mode,marker=dict(size=[40,60,80,100]))`  
marker可以传入color opacity size showscale（是否显示右侧颜色条） sizemode(area按面积缩放,diameter按直径缩放) sizeref(大小为原来的1/2)，其中color、opacity、size都需要传入列表，且与点一一对应  

4. 线形图
如散点图类似，主要简述如何将数据对应的日期端设为x坐标轴  
利用pandas生成事件序列作为横轴  
date = pd.date_range(start = '',end='')  //使用日/月/年  
data = [go.Scatter(x=date,y=[])]

### 数据处理
* 数据缺口与数据连接
数据往往可能存在空数据，导致无法连成一条完整的线形图，因此如果数据缺失，需要对缺口进行连接  
`Scatter(connectgaps=False/True,line=dict(dash='dash/dot/dashdot'))`  
缺失数据会被默认设为None, connectgaps对缺失的点进行显示设置，False则显示数据缺口，True则连接缺失值左右相邻的数据点  

* 数据插值
plotly提供6种方法进行插值：shape = 'linear/spline/hv/vh/hvh/vhv'  -- 多数使用前两个  
设置也是在Scatter下的line字段添加字典dict(shape='linear')  

* 填充线形图 
应用：显示股票一段时间的最高价与最低价
*没看懂（待看）

Bar函数：  
1. 柱形图
语法使用：`plotly.graph_objs(go).Bar(x=[],y=[]);`  

此外，用例还提供一个设置layout的方法：`go.Layout( title='',xaxis=go.XAxis(range=[0.4,4.5],domain=[0,1]) )`  
最后通过go.Figure去进行定义成一组数据  
结合前面的用法，go.figure可传参数应有三个：data,layout,filename  
其中，py.offline.plot也可以传参数：定义好的数据fig/(data,layout), filename

2. 柱形簇图
显示图表往往需要通过多组数据进行对比，例如观察不同品牌中，各自的销售量、消费价格等信息，因此需要通过绘制柱形簇进行对比分析。  
与柱形图唯一区别就是，在其基础上加入多组数据。  
如：要分析格力、西门子和美的在2017,2018,2019的销售量，此时将不同品牌作为一个类在坐标轴显示，不同年份显示为同一个x轴不同的柱形簇。  
```python
trace_1 = go.Bar(
  x=['格力','西门子','美的'],
  y=[10,21,8],
  name = '2017'
);
trace_2 = go.Bar(
  x=['格力','西门子','美的'],
  y=[12,19,10],
  name = '2018'
);
...
go.Figure(data=[trace_1,trace_1,...],layout=go.Layout(title=''))
```

3. 层叠柱状图
柱形簇图与柱形图类似，而层叠柱形图与柱形簇图又大同小异。  
实现具体方式是在设置Layout中，传入barmode属性  
```python
go.Layout(
  barmode='stack'
)
```

4. 瀑布式柱状图
*没看懂（待看）

5. 水平条形图
言简意赅，在Bar函数设置参数orientation='h'（条形图参数）即可。亦可结合在layout使用barmode:'stack'绘制层叠条形图。
> 若想将线形图设为水平，可以将 x 和 y 的数据在定义时互换。

案例：  
左侧条形图，右侧折线图。x轴均在左侧，且坐标相同。y轴数据不同。  
处理数据：  
1.将数据对应起来  
```python
for ydn, yd, xd in zip(y_nw, y_s, x_saving){  #zip()将对应的对象打包成元组，以最短的长度为主，如（[1,2],[2,12,3]）=> [(1,2),(2,12)]
   
}
```

### 样式设置
柱形图的多组数据显示，除了可以传入多组数据作为数据，亦可以通过样式高、宽来显示在图表上。  
如显示最高涨幅和波动率两个指标，可以通过定义高度为最高涨幅，宽度为波动率。  
显示规则:柱形图越高，涨幅度越高；柱形图越宽，波动率越大；红色柱形图表示涨幅上升，而绿色柱形图表示涨幅下跌。  
```python
volume = [1,2,3,4,12];  # []5
width = [item *3/sum(volume) for item in volume] # []5
go.Bar(
  x=[]5,
  y=[]5,
  width=width,
  marker=dict(color=[]5,opacity=0.8)  #目前需要手工为负数填充绿色
)
# []5表示5个元素的数组，opacity=0.8代表每个柱状透明度统一为0.8
```
另外将 x 的标记旋转45° ：`go.Layout(xaxis=dict(tickangle=-45))`

Layout样式参数：  
title, yaxis/xaxis（可以为多组，yaxis1,yaxis2）,legend,margin... 参数值皆用dict映射  
其中:  
yaxis参数值的属性可以是：showgrid(bool,是否显示网格), showline(bool), showticklabels(bool), linecolor, linewidth, domain([0,0.43],限制坐标轴范围)  
xaxis参数值的属性可以是：zeroline(bool,是否显示左侧轴线), side(top,bottom，轴上的标注显示位置), dtick(显示标注的数值间隔)  
legend(图例)的参数值：x, y, font(dict(size=''))  
margin参数值的属性可以是：l r t b 的距离大小  
paper_bgcolor（整张画布）  
plot_bgcolor(绘画部分)

> 具体参数供参考网址：  
> (他人)https://www.jianshu.com/p/4f4daf47cc85  
> (他人)https://blog.csdn.net/weixin_44941795/article/details/100165972
