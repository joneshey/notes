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
  const name = '';
  constructor(props){
    super(props)
    this.state={
        
    }
  }
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
路由也是个组件  
<BrowserRouter> 浏览器的路由组件  
```
BrowserRouter组件提供了四个属性
1. basename: 字符串类型，路由器的默认根路径
  如：
  <BrowserRouter basename="/admin"/>
    ...
    <Link to="/home"/> // 被渲染为 <a href="/admin/home">
    ...
  </BrowserRouter>
2. forceRefresh: 布尔类型，在导航的过程中整个页面是否刷新
3. getUserConfirmation: 函数类型，当导航需要确认时执行的函数。默认是：window.confirm
  默认为：
    const getConfirmation = (message, callback) => {
      const allowTransition = window.confirm(message)
      callback(allowTransition)
    }
4. keyLength: 数字类型location.key 的长度。默认是 6  
```
<HashRouter> URL格式为Hash路由组件  
<MemoryRouter> 内存路由组件  
<NativeRouter> Native的路由组件  
<StaticRouter> 地址不改变的静态路由组件  
  
BrowserRouter是用来管理我们的组件的，那么它当然要被放在最顶级的位置，而我们的应用程序的组件就作为它的一个子组件而存在。  
 <BrowserRouter></BrowserRouter>
```
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
//Class App
render(){
  return (
    <Router>
      <div>
        <child></child>
        <div>
          <Switch>
            <Route path="/login" component={login} />  //引入的组件login，定义路由login对应的组件
          <Switch>
        </div>
      </div>
    </Router>
  )
}
```
Link/NavLink组件使用时，要包裹在router里  
属性：  
1. to  
2. repalce:true,点击链接后将使用新地址替换掉访问历史记录里面的原地址,false则新增历史记录  
```
import {NavLink/Link} from 'react-router-dom'
function topNav(){ //无状态组件
  return(
    <li><NavLink to="/login"></NavLink></li>
    或
    // 对象参数
    <Link to={{
      pathname: '/query',
      search: '?key=name',
      hash: '#hash',
      state: { fromDashboard: true }
    }}>查询</Link>  
  )
```
* NavLink是一个特殊版本的Link，可以使用activeClassName来设置Link被选中时被附加的class，使用activeStyle来配置被选中时应用的样式   

Route的三种渲染方式:  
1. 指定component属性  
2. Render  
```
<Route path="/home" render={() => {
    console.log('额外的逻辑');
    return (<div>Home</div>);
    }/>
```
3. children  
3.1). 传入一个match参数来告诉你这个Route的path和location匹配上没有  
3.2). 如果path没有匹配上，也可以将它渲染出来。我们可以根据这个match参数来决定在匹配的时候渲染什么，不匹配的时候又渲染什么。
```
// 在匹配时，容器的calss是light，<Home />会被渲染
// 在不匹配时，容器的calss是dark，<About />会被渲染
<Route path='/home' children={({ match }) => (
    <div className={match ? 'light' : 'dark'}>
      {match ? <Home/>:<About>}
    </div>
  )}/>
  //可以获取路由传送的id
  <Route path='/p/:id' render={(match)=<h3>当前文章ID:{match.params.id}</h3>)} />
```
获取 location 对象：  
在 Route component 中，以 this.props.location 的方式获取  
在 Route render 中，以 ({ location }) => () 的方式获取  
在 Route children 中，以 ({ location }) => () 的方式获取  
在 withRouter 中，以 this.props.location 的方式获取  

Redirect组件： 
当这个组件被渲染是，location会被重写为Redirect的to指定的新location。它的一个用途是登录重定向，比如在用户点了登录并验证通过之后，将页面跳转到个人主页。`<Redirect to="/new"/>`   

Switch组件：  
渲染匹配地址(location)的仅仅第一个<Route>或者<Redirect>  
正常每个匹配到的route对被渲染：如： 
```
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
```
如果使用Switch，当url: /about时, Switch组件将匹配<Route path="/about"/>，并且将停止寻找匹配并渲染<About>。 同样，如果我们处于/michael，<User> 将被渲染。    
