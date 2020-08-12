## React  
优点：  
1. 类XML语法  
2. 组件语义化  
3. 不需要字符串拼接  

差异：  
jsx里面使用onClick/onChange  
在React定义的css属性使用驼峰值   
类名使用

* 是否需要引入jq, 由于使用vmnode，所有的虚拟节点都无法查找元素的html和id，除非你是使用引入方式使用react/vue框架

工作原理：  
1. 采用单向数据流  
  props:用于父组件向下层组件传递参数，组件不能修改props值（与vue一样）  
    props可以传递函数，父组件传递时直接写入自定义属性即可<child custom={this.fn} userId="xxx" ></child>  
    当constructor完成后，this.props已经被复制，因此在componentWillMount事件中已经有值  
  state:组件维护状态需要使用setState()函数进行修改，直接修改无法刷新，如this.xx ="' ？？
    state:使用this.setState({ name:'little boy' })

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

组件交互：  
1. 父子组件交互(props/event)
//vue是使用props和$emit()  
2. 非父子组件交互（eventBus/cookie/loacalStorage/store）  
3. session\路由参数通讯  
```
//EventBus.js
import {EventEmitter} from "events";
export defalut new EventEmitter();

//使用
import eventBus from "./EventBus"

//监听的组件
eventBus.addListener("myEvt",(e,param)=>{
  //在didMount事件中监听事件
})
//触发的组件
<div onClick={(e)=>eventBus.emit('myEvt',this,{otherParam:''} )}>
```

纯函数无状态组件：  
只有render方法  
不支持state和生命周期方法、refs  
建议将无状态组件写成函数  
```
function MyButton(props){
  return(
      <a>clickMe</a>
  )
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


## react-router  

```
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
render(){
  return (
    <Router>
      <div>
        <child></child>
        <div>
          <Switch>
            <Route path="/login" component={login} />  //引入的组件login
          <Switch>
        </div>
      </div>
    </Router>
  )
}
```


