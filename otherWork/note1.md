避免以后重复搭建环境：

1. 安装 node 后，新增两个目录：node_cache, node_global
2. 设置 npm

```
npm config set prefix "D:\Develop\nodejs\node_global"
npm config set cache "D:\Develop\nodejs\node_cache"
```

- 记得在 path 添加变量

3. 安装 vue-devtool
   3.1). 先下载资源后解压
   3.2). npm i => npm run build
   3.3). 从 chrome 修改 maniest.json 文件，然后从浏览器引入插件


- 开发须知

```
pc 端：
<meta charset="utf-8">
<meta name="keywords" content="your keywords">
<meta name="description" content="your description">
<meta name="author" content="author,email address">
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
移动端：
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta name="format-detection" content="telephone=no">
```

vscode 的 setting.json 在 appdata/roaming/code/user/setting.json
安装 eslint, liveserver, vetur



npm config set prefix "D:\Develop\nodejs\node_global"
npm config set cache "D:\Develop\nodejs\node_cache"


npm install (with no args, in package dir)
npm install [<@scope>/]<name>
npm install [<@scope>/]<name>@<tag>
npm install [<@scope>/]<name>@<version>
npm install [<@scope>/]<name>@<version range>
npm install <git-host>:<git-user>/<repo-name>
npm install <git repo url>
npm install <tarball file>
npm install <tarball url>
npm install <folder>

alias: npm i
common options: [-P|--save-prod|-D|--save-dev|-O|--save-optional] [-E|--save-exact] [-B|--save-bundle] [--no-save] [--dry-run]


接手的项目中出现了下面这样的写法：

"xxx": "git+ssh://git@xxx.xxx.com/xxx/xxx/xxx#v1.0.0"

"@xxx/project-name": "~0.0.1",

之前也在其他项目中见过：

"xxx": "http://gitlab.xxx.com/xxx/xxx/archive.tar.gz?ref=0.0.1"


git://github.com/user/project.git
git+ssh://user@hostname:project.git
git+ssh://user@hostname/project.git
git+http://user@hostname/project/blah.git
git+https://user@hostname/project/blah.git


组件引入插件：  
使用了 import { Button } from 'ant-design-vue'; 的写法引入了 antd 下所有的模块，这会影响应用的网络性能  
可以通过以下的写法来按需加载组件。   
```
import Button from 'ant-design-vue/lib/button';  
import 'ant-design-vue/lib/button/style'; // 或者 ant-design-vue/lib/button/style/css 加载 css 文件  
```
如果你使用了 babel，那么可以使用 babel-plugin-import 来进行按需加载，加入这个插件后。你可以仍然这么写：  
`import { Button } from 'ant-design-vue';`
插件会帮你转换成 `ant-design-vue/lib/xxx` 的写法。

usage:
```
// .babelrc
"plugins": [
  ["import", { "libraryName": "antd", "libraryDirectory": "lib"}, "antd"],
  ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib"}, "antd-mobile"]
]
//或
{
  "libraryName": "element-ui",
  "styleLibraryDirectory": "lib/theme-chalk",
}

import { Button } from 'element-ui';

      ↓ ↓ ↓ ↓ ↓ ↓

var _button = require('element-ui/lib/button');
require('element-ui/lib/theme-chalk/button');
```

```
Object.keys(components).forEach(key => {
    vue.component(key, components[key]);
  });
```
