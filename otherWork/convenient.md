1. swiper
```
<div class="swiper-container">
        <div class="swiper-wrapper">
            <span class="swiper-slide">1111111</span>
            <span class="swiper-slide">222222</span>
            <span class="swiper-slide">333333</span>
            <span class="swiper-slide">444444</span>
            <span class="swiper-slide">555555</span>
            <span class="swiper-slide">666666</span>
            <span class="swiper-slide">777777</span>
            <span class="swiper-slide">888888</span>
        </div>
</div>
<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/Swiper/4.0.6/js/swiper.min.js"></script>
<script>
    $(function () {
        var swiper = new Swiper('.swiper-container', {
            spaceBetween: 20,
            slidesPerView:'auto',
            freeMode: true
        });
    })
</script>
```
2. 复制到粘贴板
```
function copyUrl2()
{
var Url2=document.getElementById("biao1");
Url2.select(); // 选择对象
//document.execCommand("Copy"); // 执行浏览器复制命令
window.clipboardData.setData("Text",clipBoardContent);
alert("已复制好，可贴粘。");
}
```
```
function copyArticle(event) {
        const range = document.createRange();
        range.selectNode(document.getElementById('gift_code'));
 
        const selection = window.getSelection();
        if(selection.rangeCount > 0)
            selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        alert('复制成功');
    }
```

插件clipboard.js
```
var clipboard = new ClipboardJS('#codeBtn');
clipboard.on("success", function(e){
$(".alertMsg").html("复制成功！");
$(".modal-bg").css("display", "block");
e.clearSelection();
});
clipboard.on("error", function(e){
$(".alertMsg").html("请选择“拷贝”进行复制!");
$(".modal-bg").css("display", "block");

```

3. boostrap下拉列表
```
<select class="custom-select" size="3">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
```

4. webpack 打包
npm i webpack webpack-cli clean-webpack-plugin html-webpack-plugin html-loader webpack-dev-server -D

```
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
      index: './index.js',  
      rewards: './src/rewards/index.js',
      tasks: './src/tasks/index.js',
  },
  output: {
      path: path.resolve(__dirname,'./dist'),
      filename: '[name]/index-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [" style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks:['rewards'],
      filename: './rewards/index.html',
      template: "./src/rewards/index.html",
      minify: {                    //html压缩
        removeComments: true,     //移除注释
        collapseWhitespace: true //移除空格
      }
    }),
    new HtmlWebpackPlugin({
      chunks:['tasks'],
      filename: './tasks/index.html',
      template: "./src/tasks/index.html",
      minify: {                    //html压缩
        removeComments: true,     //移除注释
        collapseWhitespace: true //移除空格
      }
    }),
    new HtmlWebpackPlugin({
      chunks:['index'],
      filename: './index.html',
      template: "./index.html",
      minify: {                    //html压缩
        removeComments: true,     //移除注释
        collapseWhitespace: true //移除空格
      }
    }),
    /* new CopyWebpackPlugin({
      patterns: [
      ],
    }) */
  ],
};
```
