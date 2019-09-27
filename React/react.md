# React基本语法

### 1. 入门安装
```
npx create-react-app my-app   //npm 5.2
cd my-app
npm start
```
#### 核心包：  
`import React from 'react';`  
`import ReactDOM from 'react-dom';`  
或者使用引入方法：  
`<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>`  
`<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>`

### 2. 渲染DOM
** 元素是构成 React 应用的最小砖块。
```javascript
ReactDOM.render(
    element,
    document.getElementById('')
);     

//其中element是DOM模板，而第二个参数是根元素
```
而使用DOM元素模板需要通过“{}”来插值：  
```javascript 
const name = 'xx'
function sayHi(){
  return 'hi';
}
const element = <h1 className='greeting'>{name}，{sayHi()}</h1>  //括号可以为表达式 

<=>等效

//React.createElement() 会预先执行一些检查，以帮助你编写无错代码

const element = React.createElement(
  'h1',  //标签名
  {className: 'greeting'},   //属性名
  'Hello, world!'   //文本内容
);
``` 
> 为了便于阅读，应将 JSX 拆分为多行，并将内容包裹在括号中，可以避免遇到自动插入分号陷阱。
```javascript
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### 3. 更新已渲染的元素
React 元素是不可变对象，一旦被创建，你就无法更改它的子元素或者属性。  
更新 UI 唯一的方式是创建一个全新的元素，并将其传入 ReactDOM.render()。  

栗子：使用定时器更新元素（实际上开销大）
```
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}
setInterval(tick, 1000);  
```
> 注意：在实践中，大多数 React 应用只会调用一次 ReactDOM.render()。有效方法是将这些代码封装到有状态组件中。  

与Vue的高效复用的特性一样，React只更新它需要的更新的部分，没有改变时不会发生变化。

### 4. jsx标签属性
通过""将属性值指定为字符串字面量，通过{}将属性值指定为JavaScript表达式  
两者使用方式不能兼用在同一个属性中  
> JSX属性名应使用驼峰命名法，并对应的属性名与HTML有区别，如className

*** JSX 防止注入攻击
你可以安全地在 JSX 当中插入用户输入内容：(与Vue的V-html不同)
```javascript
const title = response.potentiallyMaliciousInput;  
const element = <h1>{title}</h1>;   // 直接使用是安全的  
```
React DOM 在渲染所有输入内容之前，默认会进行转义，所有的内容在渲染之前都被转换成了字符串，有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。


### 5. 函数组件与class组件
* Function  
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const elem = <Welcome name=''></>;  //渲染组件
```
* 渲染组件过程  
1. 调用 ReactDOM.render() 函数，并传入 <Welcome name="Sara" /> 作为参数。
2. React 调用 Welcome 组件，并将 {name: 'Sara'} 作为 props 传入。
3. Welcome 组件将 `<h1>Hello, Sara</h1>` 元素作为返回值。
4. React DOM 将 DOM 高效地更新为 `<h1>Hello, Sara</h1>`。

* React.Component  
```javascript
class Welcome extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

//每次组件更新时 render 方法都会被调用，但只要在相同的 DOM 节点中渲染 <Clock /> ，就仅有一个 Clock 组件的 class 实例被创建使用。

<Welcome name="papa"></Welcome>
```
> 注意： 组件名称必须以大写字母开头，React 会将以小写字母开头的组件视为原生 DOM 标签。  

* 组合组件  
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
> 组件不能修改自身的props值，所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。  

### 6. state 与生命周期
* state能实现组件自我更新。  
State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。  
```JavaScript
//实现自我更新，将props改为state，首先继承props
class Clock extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {date: new Date()};  //state对象的属性：date
  }
  render(){
    return(
        <h1>{this.state.date}</h1>
    )   // 把 render() 方法中的 this.props.date 替换成 this.state.date ：
  }
}
```

* state注意事项
1. 不要直接修改 State
例如，此代码不会重新渲染组件：`this.state.comment = 'Hello'`;  
而是应该使用 setState():`this.setState({comment: 'Hello'});`  
2. State 的更新可能是异步的 ????
因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。  

state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：
```
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
上面使用了箭头函数，不过使用普通的函数也同样可以：
```
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

* 组件state是向下流动，每个组件都是真正独立的

* 组件内可以定义生命周期方法：
```
class Clock extends React.Component {
  constructor(props) {
    super(props);  
  }
  componentDidMount(){}   //this指向组件，可以往this添加字段
  componentWillUnmount(){}
```

### 7. 事件处理
