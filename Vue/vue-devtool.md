# devTool
1. 下载vue-tool文件，建议不要下载git最新的版本，因为会在run build 的时候报错：cannot find @vue-devtool，因此我换了以前电脑安装的安装包
2. 下载安装包后，进行npm install ，中途遇到一个说chormedriver-win32需要更新，但更新很久也没下下来，因此我直接ctrl+c ，然后就开始run build 
3. 完成后修改shell下的manifest文件，改变president为true
4. 然后将整个chrome文件夹拉到扩展程序即可
