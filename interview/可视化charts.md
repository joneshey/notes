## 项目中使用的highchart  
`new Highcharts.Chart({})`  
1. 圆饼  
图表属性：  
```
chart:{
  renderTo:'#id',
  height:
  margin:
  plotBackgroundColor:
  plotShadow:boolean
},
colors:[]  //圆饼系列的颜色组
title:
tooltip:{enable:boolean}
plotOptions:{
  pie:{  //圆饼
    allowPointSelect:boolean //点击饼状的交互
    cursor:
    dateLabels:{enable:boolean}
  },
  style:{},
  innerSize:'XX%',  //空心圆大小
  size:'',
  point:{
    event:{
      legendItemClick:fn(e)
    }
  }
},
legend:{ //图示的位置和样式
  
},
series:[{
  type:''  // 规定图表类型
  data: data
}]
```
 
2. 曲线图  
图表属性：  
```
chart: {
  type:'area',
  renderTo:'',
  backgrouundColor:,
},
legend:{}//图例
xAxis:{}
yAxis:{
  min:  //最小值
  tickAmount: //刻度值
  gridLineDashStyle: 'dash',
  title:
  gridLineWidht:
  labels:{  //每个刻度的标签
    formatter:fn(){this.value},  //this指向图表对象
    x:  // 偏移距离
    y:
  },
  startOnTick: boolean  //是否从0开始
},
toolTips:{  // 数据提示框
  positioner:{x:,y:} //位置
  fommatter:fn(){
    this.x //横坐标,值得是鼠标指的点
  }
},
series:[{
  color:
  data: //y轴的数据
  marker:{}
}]  
```
可以独立为`chart.setTitle({text:'',style:{}})`  

3. 两条曲线图  
```
yAxias:[{
  tickPositioner:function(){
    //获取最大最小值
    //tick=min,step=(max-min)/3,取三段4点，position为点坐标
    //如果获取不了step则返回最小值
    //遍历并把刻度返回给回调函数
    //除以1000*1000为了防止每个刻度加完step会四舍五入后大于max,导致返回的刻度只有三个,图表溢出
    //如：min:3.25 max:5.53 step: 0.76000000001 ticks:[3.25,4.01,4.77,5.53000001]
    for(tick;abs(step)<1 ? floor(tick*1000)/1000 <= max : floor(tick)<= max; tick+=step){
      arr.push(tick)
    }
  }
},{

}],
series:[{
  type:'area'
},{
  type:'line'
}]
```


## 项目中使用的eChart    

先echart.init().setOption({});  
```
 var myChart = echarts.init(document.getElementById('main'));
  // 指定图表的配置项和数据
  var option = {
      title: {
          text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
          data:['销量']
      },
      xAxis: {
          data: ["A","B","C","D","E","F"]
      },
      yAxis: {},
      series: [{
          name: '',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
``` 
1. 图表类型  
line\bar\scatter散点图\k值线\pie\radar雷达图\map\tree ...  \

2. [http://www.max-logistics.com/Tpl/Home/default/Public/Hui/lib/echarts/2.2.7/doc/doc.html#Option]
