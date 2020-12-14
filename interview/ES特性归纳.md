# ES特性归纳
## ES6
1. 同步迭代器  
同步迭代器工作原理：
Iterable：一个对象，表示可以通过Symbol.iterator方法进行迭代。
Iterator：通过调用iterable [Symbol.iterator] ()返回的对象。它将每个迭代元素包装在一个对象中，并通过其next()方法一次返回一个。
IteratorResult：返回的对象next()。属性value包含一个迭代的元素，属性done是true 后最后一个元素。
```
const iterable = ['a', 'b'];
const iterator = iterable[Symbol.iterator]();
iterator.next()
// { value: 'a', done: false }
iterator.next()
// { value: 'b', done: false }
iterator.next()
// { value: undefined, done: true }
```

实践事例：   
线程协作：  
yield 返回表达式的值（value）和当前执行状态是否结束(done)，而且按顺序执行代码块，即便yield的表达式是异步操作也会等待结果  
```js
function *gen(x){
    var a = 1;
    yield setTimeout(()=>{
        console.log(x)
        a+=x
    })
    yield a+2
    console.log(2);
}
var a = gen(1);
a.next()   //输出1,此时a=2
a.next()   //返回4（a+2=4）
a.next()  //输出2
```
此处有个特殊情况，当next()传入参数，如果下一步yield 的表达式中有变量的话，变量将会被替代成next输入的值    
因此可以通过获取上次返回的值传入下一步线程
```
function* gen(x){
  var y =1;
  y = yield x + 2;
  return y+1;
}

var g = gen(1);
var a = g.next().value; // { value: 3, done: false }
g.next(a);  //{value:4, done: true}
```
与promise处理比较，promist使用的链式then()除了能保证异步函数能够正常返回，防止回调地狱之外，在代码维护方面比较冗余。  
如
```
var p = new Promise();
//异步resolve,reject()之后返回p 
//正常异步ajax\axios都会返回一个promise
p.then((data)=>{}).then(()=>{
    return axios
}).then((data)=>{
})
```

2. 数组扩展  
2.1). filter/find数组过滤
    arr.filter((item)=>{return item > 10})  //返回过滤后数组  
    arr.find(function(value, index, arr) {return value > 9;})    
2.2). every/some 遍历数组  
    是否每个数组都符合条件  
    arr.every((item)=>{return item > 10})  //返回boolean  
2.3). concat连接数组  
    参数可以为单个值或者数组  
2.4). map映射数组
    arr.map((item)=>{return item + 10})  //返回处理后的数组  
2.5). reduce
    array.reduce(callback,[initialValue]) 方法有两个参数  
    callback函数接收四个参数：  
    preValue ：上一次调用回调返回的值 或者是提供的初始值(回调函数return回来的值)  
    curValue ： 数组中当前被处理的数组项  
    index ：当前数组项在数组中的索引值  
    array 调用reduce() 方法的数组  
2.5). from()将对象转换为函数  
    Array.from('123') // ['a','b','c'] ,可将类数组的对象Set转换（也就是索引为数字不是字符串）   
2.6). of()将值转换为数组   
    Array.of(3,2)//[3,2]   
2.7). fill(str,indexStart,indexEnd)      
    `['a', 'b', 'c'].fill(7, 1, 2)  // ['a', 7, 'c']`   
2.8). 数组实例的 entries()，keys() 和 values()     
    如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。  
    ```
    let entries = letter.entries();
    console.log(entries.next().value);
    ```

* Array.prototype.sort()的默认排序算法必须稳定

3. 对象扩展  
属性简写，方法简写  
```
let birth = '2000/01/01';
const Person = {
  name: '张三',
  //等同于birth: birth
  birth,
};  

//输出对象{x:1,y:10}
function getPoint() {
  const x = 1;
  const y = 10;
  return {x, y};
}
// 等同于
module.exports = {
  getItem: getItem,
  setItem: setItem,
  clear: clear
};

function getItem (key) {
  return key in ms ? ms[key] : null;
}
function setItem (key, value) {
  ms[key] = value;
}
function clear () {
  ms = {};
}
module.exports = { getItem, setItem, clear };

```

4. THUNK函数
“传名调用”，由于js都是传值调用，而当一个表达式被当成参数传入就是THUNK函数  
```
function add(a){
    console.log(a+1);
}
let x = 1;
add(x+1);

// =>

var thunk = function(){
    return x+1;
}
add(thunk)
//add(a){return thunk() + 1 }
```

但js的Thunk函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。??????
封装的Thunk转换器
```
// ES6版本
var Thunk = function(fn) {  
  return function (...args) {  
    return function (callback) {  
      return fn.call(this, ...args, callback);
    }
  };
};

function f(a, cb) {
  cb(a);
}
let ft = Thunk(f);  
执行等于：
ft = function(...args){
    return function(callback){
        return f.call(this,...args,callback)
    }
}

let log = console.log.bind(console);

ft(1)(log) // 1
执行等于：
(function(x){
    return function(log){
        return f.call(this,x,log)
    }
})(1)

//步骤分解：
ft(1)
//相当于
ft(1) = function(callback){
    return f.call(this,1,callback)
}
ft(1)(log)
f.call(this,1,log);
=>
function f(a, cb){
    consoloe.log(1)
}
```
可简单使用var thunkify = require('thunkify');插件  

5. Thunk结合Generate函数  
自动执行：可实现保证前一步执行完，才能执行后一步  
反复传入next方法的value属性。这使得我们可以用递归来自动完成  
```
var thunkify = require('thunkify');
var readFile = thunkify(fs.readFile);

var gen = function* (){
  var r1 = yield readFile('/etc/fstab');
  //console.log(r1.toString());
  var r2 = yield readFile('/etc/shells');
  //console.log(r2.toString());
};

function run(fn) {
  var gen = fn();

  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);  //这步是如何递归？输出是从gen输出，同下可得，result.value是某个读取文件的返回函数
  }

  next();
}

run(gen);  // yield readFile反复调用该方法
```

6. promise的自动执行  
```
function run(gen){
  var g = gen();

  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){  //result.value是个promise对象，data就是resolve回来的值
      next(data);
    });
  }

  next();
}

run(gen);
```

7. proxy代理
相当于重写对象内部属性的get/set方法  
```
//生成 Proxy 实例。
var proxy = new Proxy(target, handler);
//target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。

var proxy = new Proxy({}, {
  get: function(target, propKey) {
    if(propKey == 'greet')
    return "hello world";
  }
});
```
Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。    

要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。    
如果handler没有设置任何拦截，那就等同于直接通向原对象。      
```
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"

//或者
let target = Object.create(proxy);
target.a // "b"
```

proxy的属性配置  
get(target, propKey, receiver)   

set(target, propKey, value, receiver)  拦截对象属性的设置，proxy.foo = v或proxy['foo'] = v，返回一个布尔值   

has(target, propKey) 拦截propKey in proxy的操作，以及对象的hasOwnProperty方法   
deleteProperty(target, propKey)  

ownKeys(target) 该方法返回对象所有自身的属性   

defineProperty(target, propKey, propDesc) 拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)  

实例：
```
var person = {
  name: "张三"
};
var proxy = new Proxy(person, {
  get: function(target, property) {
    if (property in target) {  //property key
      return target[property];
    } else {
      return ""
    }
  }
});
var obj2 = Object.create(proxy);  //继承proxy
```

8. module模块  
ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。  
CommonJS 和 AMD 模块，都只能在运行时确定这些东西。  
```
// CommonJS模块
let { stat, exists, readFile } = require('fs');
//这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

// ES6模块
import { stat, exists, readFile } from 'fs';
//这种加载称为“编译时加载”或者静态加载
```
为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。  
```
// export-default.js
export default function () {
  console.log('default');
}
```


## ES7
特性：  
1. 数组原型新增includes方法  
arr.includes("item",2)  //返回boolean  
参数1为项值，参数2为开始位置
* 与indexof区别在于返回值不一样，且当数组的有空的值的时候，includes会认为空的值是undefined，因此includes(undefined)返回true。  

2. 求幂运算符  
之前原生是使用 Math.pow(x,3);  
新特性支持 x**3   

3. async函数  
异步函数：  
async函数是Generator函数的语法糖  
```
//Generator
var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

//async
var asyncReadFile = async function (){
  var f1 = await readFile('/etc/fstab');
  var f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```
区别在于:  
1.内置执行器，async自带执行器，调用时无需调用next(),只需要执行asyncReadFile()  
2.语义化，async代表异步函数，await表示等待执行结果  
3.返回类型可以是Promise对象（可以用then方法指定下一步的操作）和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）
```
var f = asyncReadFile
f().then().catch()
```
语法：
await后面只能是表达式、值以及promise  
1. async函数返回一个Promise对象：async函数内部return语句返回的值，会成为then方法回调函数的参数  
await命令后面的Promise对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到   
```
//简单类型值
async function f() {
  return 'hello world'; //resolve("hello world")   
}
f().then(v => console.log(v))

//promise对象
function setTime(){
  return new Promise(function(resolve,reject){
        //resolve(11)
        setTimeout(()=>{resolve(11)},1000)
    })
}
async function f(){
  let a = await setTime();
    return await a+1;
}
f().then((v)=>{
    console.log(v)  //先打印出promise对象为pending，再打印12
})
```
只要一个await语句后面的Promise变为reject，那么整个async函数都会中断执行。  
为了避免这个问题，可以将第一个await放在try...catch结构里面，这样第二个await就会执行。  
```
async function f() {
  try {
    await Promise.reject('出错了');  
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}
```
2. async函数返回的Promise对象，必须等到内部所有await命令的Promise对象执行完，才会发生状态改变。  
也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。  

//类似算法题，将一个数组的元素逐个请求接口，并按顺序输出
```js
function ajax(val){
 return new Promise((resolve,reject)=>{
    resolve(val+1);
 })
}

async function getOrder(arr) {
    let list = [];  
    //await Promise.reject('出错了').catch(e => console.log(e));
    try{
        for(let i in arr){
            let item = await ajax(arr[i])
            list.push(item); 
        }
    }.catch(e=>{})
    console.log(new Date().getMilliseconds()) //775
    return list;
}  //最后增加reject()

console.log(new Date().getMilliseconds())  //758
getOrder([1,2]).then(function (result) {
  setTimeout(()=>{console.log(result);},1000);
});

```
以上的写法不足之处：继发关系，会比较耗时，会等待item执行完才去触发下一个。  
因此优化getOrder方法：
```
async function getOrder(arr) {
    let list = [];  
    //await Promise.reject('出错了').catch(e => console.log(e));
    try{
        for(let i in arr){
            let itemPromise = ajax(arr[i])
            let item = await itemPromise  //执行时间909  912
            list.push(item); 
        }
    }.catch(e=>{})
    return list;
}  //最后增加reject()

```

实例：按顺序完成异步操作
```
async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```
map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。  
后面的for..of循环内部使用了await，因此实现了按顺序输出。  



## ES8
特性：  
1. 异步函数  
Async/Await，用于处理JS异步操作的语法糖    
当程序遇到await标记的方法时，要等待该函数处理完毕后，才能进行下一步的操作（下一步相当于回调函数的操作）  
因此该函数返回对应函数处理成功/失败的值
```
async function asyncFn() {
    const result = await requestFn();
    console.log(result);  //可以同时按序执行
    const result1 = await requestFn();
    console.log(result1)
}

// 等同:
function asyncFn() {
    return requestFn()
    .then(result => {
        console.log(result);
    });
}
```
并行处理多个异步函数：
```
 const [result1, result2] = await Promise.all([
        otherAsyncFunc1(),
        otherAsyncFunc2(),
  ]);
 // =>等同:
  Promise.all([
        otherAsyncFunc1(),
        otherAsyncFunc2(),
    ])
    .then([result1, result2] => {
        console.log(result1, result2);
    });
```

2. Object.values and Object.entries  
对象的键值集合，返回所有可枚举属性值/键值对  
参数为对象或者数组,或者字符串： 
```
Object.values([1,2,3])   //返回数组[1,2,3]
Object.values({a:3,b:2})  // 返回数组[3,2]
Object.entries([1,2,3])   //返回数组[['0',1],['1',2],['2',2]]
Object.entries({a:3,b:2})  // 返回数组[['a',3],['b',2]]
```

3. String padding  
使用padStart和padEnd为字符填充长度  //类似"a".repeat(3)???  
第一个参数是 targetLength（目标长度），表示结果字符串的长度。  
第二个参数是可选的 padString（填充字符），默认值是空格。  
如果字符串超过目标长度，则不会改变原字符串   
如果填充字符加上原字符超出目标长度，则截取填充字符前几个字符  
如果填充字符加上原字符小于目标长度，则继续补充填充字符
```
//在字符前加ES8
"Version".padStart(10,"ES8")  
```

4. Object.getOwnPropertyDescriptors  
getOwnPropertyDescriptors 方法返回指定对象所有自身属性的描述对象，在于方便将一个对象深度拷贝给另一个对象，同时可以将getter/setter拷贝。  

5. 结尾逗号，意思是即便在最后一行代码写上逗号，也不会异常  
```
var obj = {
  a:1,
  n:2,
}
```

## ES9
1. 异步迭代器  
与同步迭代器相比，异步迭代器必须要等到异步函数调用成功才能进行下一步next()调用  
```
async function example() {
  // 普通迭代器: 无需使用promise
  const iterator = createNumberIterator();
  iterator.next(); // Object {value: 1, done: false}
  iterator.next(); // Object {value: 2, done: false}
  iterator.next(); // Object {value: 3, done: false}
  iterator.next(); // Object {value: undefined, done: true}

  // 异步迭代器: 使用await保证异步函数调用完成
  const asyncIterator = createAsyncNumberIterator();
  const p = asyncIterator.next(); // Promise
  await p;// Object {value: 1, done: false}
  await asyncIterator.next(); // Object {value: 2, done: false}
  await asyncIterator.next(); // Object {value: 3, done: false}
  await asyncIterator.next(); // Object {value: undefined, done: true}
}

```


2. 展开运算符和剩余参数  
与ES6不一样的是，ES9的使用范围不仅仅是数组，对象也可以展开
```
----展开运算符
var obj = {
  a: 1,
  b: 2,
  c: 3,
}
const { a, ...param } = obj;
  console.log(a)     //1
  console.log(param) //{b: 2, c: 3}

----rest参数
function foo({a, ...param}) {
  console.log(a);    //1
  console.log(param) //{b: 2, c: 3}
}

foo(obj)
```

3. 正则表达式命名捕获组 
`const RE_DATE = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;`  数字引用捕获组,获取时使用数字exec(str)[1]    
`const RE_DATE = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;`  命名的捕获组,使用定义的名称exec(str).groups.year   
```
// 使用解构语法更为简便
const {groups: {day, year}} = RE_DATE.exec('1999-12-31');  //相当于定义了day和year常量，并必须对应对象进行结构，如果常量名不一致读取为undefined
console.log(year); // 1999
console.log(day); // 31
```

新方法匹配中文字符  
中文字符对应的Unicode Script是Han，对应正则reg `/\p{Script=Han}/u`   
newReg.test('地平线')  //true

4. 模板字符串修改  
要取消转义序列的语法限制，可在模板字符串之前使用标记函数String.raw:
```
`\u{54}`   // "T"
String.raw`\u{54}`  // "\u{54}"
```

## ES10  
1. 新增了String的 trimStart()方法和 trimEnd()方法  

2. 新增了Array的 flat()方法和 flatMap()方法  
本质上就是是归纳（reduce） 与 合并（concat）的操作。  
还可以利用 flat()方法的特性来去除数组的空项

## ES11  
1. 可选链   
不需要进行判空，使用'?.'，如果有值会继续访问
var name = user?.info?.name;  

2. 空值合并运算符
使用空值合并运算符??，也就是如果为空值、undefined、0，则不会当做false处理    
```
var a = 0;
a??'hehe'  //0
```
||无法区分false、0、空字符串 "" 和 null/undefined。它们都一样 ——假值（falsy values）。如果其中任何一个是||的第一个参数，那么我们将得到第二个参数作为结果。

3. 按需加载  
可以在函数中使用import()，减少全局引用资源，导致渲染性能下降  

4. globalThis提供访问全局对象  
直接globalThis => window  

5. bigInt解决精度问题  
bigInt为数据原始（primitive）类型  （Symbol也是，独一无二）  
只需要BigInt(); 或者加上n: `1212121112n` 即可  

6. 正则匹配String.prototype.matchAll  
该方法会返回一个迭代器，每个迭代器代表非全局搜索符的匹配性（含子项）。  
* 加上全局只含父项  

