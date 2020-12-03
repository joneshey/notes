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

## ES7
特性：  
1. 数组原型新增includes方法  
arr.includes("item",2)  //返回boolean  
参数1为项值，参数2为开始位置
* 与indexof区别在于返回值不一样，且当数组的有空的值的时候，includes会认为空的值是undefined，因此includes(undefined)返回true。  

2. 求幂运算符  
之前原生是使用 Math.pow(x,3);  
新特性支持 x**3   

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

