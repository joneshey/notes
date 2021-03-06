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

### 将文件夹关联到远程仓库 
* `git init`
*  `git remote add origin 'git@server-name:path/repo-name.git'`

### 更新远程仓库（即团队提交的代码）
* `git fetch` 
* `git merge` 获取后进行手动合并
* `git pull （仓库名）`  获取修改后并合并到本地
* `git push 本地分支 -u local-branch-name:remote-branch-name`  将本地分支提交到远程仓库
* `git branch -r` 查看远程仓库的分支
* `git clone [giturl]` 克隆远程仓库的master
* `git checkout [-b] branchname` 切换仓库分支，加上-b是建立新分支（由于checkout会直接删掉缓存工作区，因此慎重）

### 添加文件到仓库(实质上是将新增的文件加上追踪，因此commit和add目标都是暂缓区)
* `git add file/doucment`  可以带后缀指定文件类型，将文件添加到暂缓区
* `git add *`  将所有新增文件提交到暂缓区
* `git commit -m [msgLog]`  将工作区的修改内容提交到本地仓库，可以带日志
> 可以多次添加文件到暂缓区，而提交会把添加的文件一并提交到仓库
* `git commit -am `  能省去add指令直接提交
* `git push` 提交本地仓库的文件提交到remote仓库

### 取消已缓存的内容
* git reset HEAD hello.php取消其中一个的缓存，操作如下：  
现在两个文件修改后，都提交到了缓存区，
```
$ git status -s  //查看本地状态
 M README
 M hello.php
$ git add .   //新增文件
$ git status -s  
M  README
M  hello.php
$ git reset HEAD hello.php //将暂缓区的文件回滚到远程仓库的最新版本  
Unstaged changes after reset:
M    hello.php
```
现在你执行 git commit，只会将 README 文件的改动提交到本地仓库.git，而 hello.php 是没有的。  
git reset HEAD 只是取消了add到暂缓区的步骤，内容并没有reset

### 回滚文件
* `git reset --hard HEAD^`  HEAD代表当前版本，而^代表上一个版本
* `git reset --hard 版本号前四位`

### 删除文件
* `git rm <file>` 删除工作区文件
* `git rm -f <file>`   删除之前修改过并且已经放到暂存区域的文件，则必须要用强制删除选项 -f
* `git rm --cached <file>`  把文件从暂存区域移除，但仍然希望保留在当前工作目录中
> 换句话说，仅是从跟踪清单中删除，使用 --cached 选项即可

### 拷贝项目
* git clone git@github.com:IvanJLeung/git.git dictionary   私有仓库 本地目录

### 对比差异
* `git diff readme.txt`  比较工作区（working directory）和暂存区（stage/index）的区别
* `git diff --cached `   比较暂存区（stage/index）和分支（master）的区别
* `git log`   查看最近三次提交的日志
* `git status`  显示文件状态是否被修改

### cat 查看文件内容
cat xx.txt

### 查看暂缓区 
git status  查看暂缓区（stash）有没有修改的文件

如果显示为untracked 证明提交到暂缓区的文件是新增的


fetch  从remote到stash    
rebase  从stach到本地
可以设置ignore.list

git checkout — file 可以丢弃工作区的修改

git add ./git commit -m '' /git push all


https://www.cnblogs.com/qlqwjy/p/8378851.html

### 回滚后出现的远程仓库比仓库新，不能提交  
在本地回滚后，远程上面依然是之前的版本，用git push -f 将本地库强制推送到远程，这时远程库也已经回滚到之前的提交了。
