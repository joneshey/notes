## React  
优点：  
1. 类XML语法  
2. 组件语义化  
3. 不需要字符串拼接  

差异：  
jsx里面使用onClick/onChange  
在React定义的css属性使用驼峰值  

* 是否需要引入jq, 由于使用vmnode，所有的虚拟节点都无法查找元素的html和id，除非你是使用引入方式使用react/vue框架

生命周期：  
1. 初始化 initialization  在建立属性和状态  
2. 挂载  mounting  组件即将挂载，渲染，完成挂载   
3. 更新  updation  组件即将接受属性，是否更新组件，组件即将更新，渲染，完成更新  
4. 销毁  unmounting  组件即将销毁  

9个事件：   
setup props and state(constructor)  
componentWillMount  render  componentDidMount  
componentWillReceiveProps  shouldComponentUpdate  componentWillUpdate (render)  componentDidUpdate  
componentWillUnmount  

嵌套组件生命周期事件顺序：  
1. 父： constructor ,componentWillMount ,render  
2. 子： constructor ,componentWillMount ,render ,componentDidMount  
3. 父： componentDidMount   
```
//引入子组件child
class Father extend Component{  //在主组件注册
  constructor(){
    super()
    //执行
  }
  render(){
    //执行
    return({
      <child></child>
    })
  }
}
```

------jsx事例  
```
//引入React,{Component} from 'react';

const styles={
  fontSize:'1.2rem'
}  //使用时通过 style={styles}

class App extend Component{
  name = '';
  fnClick(){
  
  }
  render(){
    return(
      //模板使用{this.name}来插值
      //同时可以使用{}写表达式，如.map(()=>{return })
      //亦可以用来写函数<a onclick={(e)=>{alert(this.refs.xxx);}}>  </a>
      //或者 onclick= {(e) = > {this.fnClick()} };
    )
  }
}
export default App;
```
