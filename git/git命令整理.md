# git命令
### 安装
* 打开`git Bash`  
* 配置账户 `git config --global user.name/email '你输入的名字/邮件'`

### 创建版本库：
* 使用当前目录作为Git仓库 `git init`
>该命令执行完后会在当前目录生成一个 .git 目录。
* 使用我们指定目录作为Git仓库。 `git init newrepo`

* `mkdir filename`(可带path)  
* 进入文件 `cd filename`  
* `pwd` 显示当前目录路径
* `ls -ah` 将目录视为可见目录

### 添加文件到仓库
* `git add file/doucment`  可以带后缀指定文件类型
* `git commit -m [msgLog]`  将暂缓区的内容提交到当前分支，可以带日志
