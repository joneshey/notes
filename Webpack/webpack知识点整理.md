# Webpack知识点

配置文件：webpack.config.js  
```javascript
module.exports= configObj;  
configObj={
    mode
   entry:
   output:
}
// 或
import path from 'path';
import webpack from 'webpack';
const config: webpack.Configuration = {
  mode: 'production',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
};
```

### 1. mode 模式
属性值：production & development
production:
相当于添加了以下配置
```javascript
plugins: [
    new UglifyJsPlugin(/* ... */),
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
]
```

### 2. entry 入口
表示打包哪些文件的路径，更多的是用正则表达式  
```
const config = {
  entry: './path/to/my/entry/file.js'   //可以为文件目录路径
};
```
entry属性值：  
* 若传入一个数组，则创建多个入口
* 也可以使用对象方式，{'name':'path','name2':'path'},每一个name代表一个主入口
```javascript
entry: {
    a: "./app/entry-a",
    b: ["./app/entry-b1", "./app/entry-b2"]
  },
```

### 3. output 输出
表示打包编译后的静态文件输出的路径
> 即使可以存在多个入口起点，但只指定一个输出配置。  
```javascript
const config = {
  output: {
    filename: 'bundle.js',   //文件名
    path: '/home/proj/public/assets'   //文件存目录
  }
};

//多个入口
{
  entry: {
    app: './src/app.js',   //可以为文件目录路径
    search: './src/search.js'
  },
  output: { 
    filename: '[name].js',   //app、search入口名字
    *** filename: "[chunkhash].js", // 用于长效缓存
    path: __dirname + '/dist'
  }
}
```
如若app入口配置有两个路径，则将两个路径的js打包在app.js里。

### 4. loader 解析模块
loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。  
先将两个转类型插件安装，`npm install --save-dev css-loader/style-loader`和`npm install --save-dev ts-loader`     
在webpack.config.js中定义：
```javascript
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
      // test 和 include 具有相同的作用，都是必须匹配选项
      // exclude 是必不匹配选项（优先于 test 和 include）
      ***只在 test 和 文件名匹配 中使用正则表达式，在 include 和 exclude 中使用绝对路径数组***
    ]
  }
};

//内联方法
//通过前置所有规则及使用 !，可以对应覆盖到配置中的任意 loader。
//可以使用在模板对应的js文件,

import Styles from 'style-loader!css-loader?modules!./styles.css';  

//CLI
//对 .css 文件使用 style-loader 和 css-loader。

webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader' 
```
> <b>loader特性</b>:  
loader 支持链式传递，能够对资源使用流水线(pipeline)。   
一组链式的 loader 将按照相反的顺序执行。  
loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。

### 5. watch 监听
启用 Watch 模式。这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改。Watch 模式默认关闭。  
`watch: false`
* aggregateTimeout  
当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位：`aggregateTimeout: 300` 为默认值
* ignored
对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用。这个选项可以排除一些巨大的文件夹，例如 node_modules：`ignored: /node_modules/`  
也可以使用 anymatch 模式：ignored: "files/**/*.js"  
* poll
通过传递 true 开启 polling，或者指定毫秒为单位进行轮询

```
watchOptions: {
  aggregateTimeout: 300,
  poll: 1000
}
```

### 6. performance 性能
```javascript
performance: {
  hints: false   //不展示警告或错误提示。
  ***"warning,将展示一条警告，通知你这是体积大的资源
}
```

### 对不同语言的配置  
