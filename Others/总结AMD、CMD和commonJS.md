commonJS,CMD/AMD对应类似的实现是 noedJs（webpack）/RequireJs/SeaJs
> AMD/CMD主要针对浏览器端。

### 模块化
一个模块化实现特定功能，组织JS中的业务逻辑，都可以称为模块化。这种模块化类似于 java中的包 直接引入，即插即用，不会产生变量冲突，就是如此便捷。

### commonJS
commonJS运行于服务器端，node.js的模块系统，就是参照CommonJS规范实现的，每个模块都是一个单独的作用域。  
模块只有一个出口，module.exports对象，我们需要把模块希望输出的内容放入该对象。  

服务器端一般采用同步加载文件，也就是说需要某个模块，服务器端便停下来，等待它加载再执行。而浏览器端要保证效率，需要采用异步加载，这就需要一个预处理，提前将所需要的模块文件并行加载好。

### AMD

AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块 

同样都是异步加载模块，AMD在加载模块完成后就会执行改模块，所有模块都加载执行完后会进入require的回调函数，执行主逻辑，这样的效果就是依赖模块的执行顺序和书写顺序不一定一致，看网络速度，哪个先下载下来，哪个先执行，但是主逻辑一定在所有依赖加载完成后才执行.

requireJS主要解决两个问题

1. 多个js文件可能有依赖关系，被依赖的文件需要早于依赖它的文件加载到浏览器   
2. js加载的时候浏览器会停止页面渲染，加载文件越多，页面失去响应时间越长   

require()函数在加载依赖的函数的时候是异步加载的，这样浏览器不会失去响应，它指定的回调函数，只有前面的模块都加载成功后，才会运行，解决了依赖性的问题。

### CMD

CMD推崇就近依赖，只有在用到某个模块的时候再去require   
CMD规范是国内发展出来的，就像AMD有个requireJS，CMD有个浏览器的实现SeaJS，SeaJS要解决的问题和requireJS一样，只不过在模块定义方式和模块加载（可以说运行、解析）时机上有所不同 

1. Sea.js 推崇一个模块一个文件，遵循统一的写法   
2. CMD加载完某个模块后没有立即执行而是等到遇到require语句的时再执行。

CMD加载完某个依赖模块后并不执行，只是下载而已，在所有依赖模块加载完成后进入主逻辑，遇到require语句的时候才执行对应的模块，这样模块的执行顺序和书写顺序是完全一致的

AMD在加载模块完成后就会执行改模块，所有模块都加载执行完后会进入require的回调函数，执行主逻辑，这样的效果就是依赖模块的执行顺序和书写顺序不一定一致，看网络速度，哪个先下载下来，哪个先执行，但是主逻辑一定在所有依赖加载完成后才执行

这也是很多人说AMD用户体验好，因为没有延迟，依赖模块提前执行了，CMD性能好，因为只有用户需要的时候才执行的原因

### 使用构建工具构建js
1. mod.js引入,且顺序应该在所构建的js前面（加载顺序）
2. 如果是lib类的js,要考虑是否需要构建，因为构建后会被define保包围，导致全局变量无法获取
3. define主要有依赖包名，require和export，因此构建后的js想要调用其api需要使用require('xx.js').init();
4. mod.js是一个构建工具，仅将js的方法暴露出来，因此尽管需要require，也应在使用require之前引入对应api

