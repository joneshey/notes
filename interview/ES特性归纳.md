# ES特性归纳
## ES6

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
