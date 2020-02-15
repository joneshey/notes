# GIT
### 新建分支 
新建分支  git branch filename
新建分支并切换到该分支  git checkout -b filename

### 合并分支
合并分支  git merge (将两个分别修改过的分支进行合并)，在当前分支生成新的子分支
当前是filename,要合并到master分支，则使用git merge filename
（前提，该两个分支都是有共同的父分支，然后各自提交过记录)

### 合并（延伸）分支
filename与master的各自有提交记录，将master的修改复制一份放到当前工作分支filename  git rebase master 
（以上都是仓库上面操作，不是工作区）  
filename 与 master（HEAD） 为两个分支，若git rebase filename则是在filename分支上新增一个子分支并复制master的内容

> git rebase 和 git merge 区别
> git rebase 是把你的提交记录放在别人的分支下后面  
> git merge 是将公共分支（远程的更新）跟自己的提交记录合并在一起，然后形成一个新提交到本地仓库  
```
例子：
1-2-3 是现在的分支状态
这个时候从原来的master ,checkout出来一个prod分支
然后master提交了4.5，prod提交了6.7
master分支状态就是1-2-3-4-5，prod状态变成1-2-3-6-7

如果在prod上用rebase master ,prod分支状态就成了1-2-3-4-5-6-7

如果是merge
1-2-3-6-7-8
........ |4-5|
会出来一个8，这个8的提交就是把4-5合进来的提交

作者：曹九朵_
链接：https://www.jianshu.com/p/4079284dd970
```
```
在开发社区里，有许多关于 merge 与 rebase 的讨论。以下是关于 rebase 的优缺点：

优点:

Rebase 使你的提交树变得很干净, 所有的提交都在一条线上
缺点:

Rebase 修改了提交树的历史
比如, 提交 C1 可以被 rebase 到 C3 之后。这看起来 C1 中的工作是在 C3 之后进行的，但实际上是在 C3 之前。

一些开发人员喜欢保留提交历史，因此更偏爱 merge。而其他人（比如我自己）可能更喜欢干净的提交树，于是偏爱 rebase。
```

** 不要在公共分支使用rebase
** 本地和远端对应同一条分支,优先使用rebase,而不是merge

### 移动提交记录和分支
在提交树上移动  HEAD  分离出HEAD不要指向分支，只需要把checkout 某次提交记录的哈希值

在提交树移动中找回提交记录，使用相对引用，回到父节点: git checkout HEAD^ 或者使用git log查询日志的哈希值
（git checkout HEAD^已将HEAD从分支中分离出，再移动提交记录）git checkout HEAD~次数

将master分支强制移动到前三级提交记录的分支 git branch -f master HEAD~3
-f是强制移动

### 撤销变更
在 Git 里撤销变更的方法很多。和提交一样，撤销变更由底层部分（暂存区的独立文件或者片段）和上层部分（变更到底是通过哪种方式被撤销的）组成。
主要有两种方法用来撤销变更 —— 一是 git reset，还有就是 git revert

git reset HEAD~1通过把分支记录回退几个提交记录来实现撤销改动。git reset 向上移动分支，原来指向的提交记录就跟从来没有提交过一样。    
git revert HEAD  如从提交了c2修改记录，但不想回退记录，只是将改动的内容恢复到提交之前的版本内容，此时会在c2的提交记录下，新增一个与c1内容一样的提交记录c2^  
(相当于提交记录没有回滚，但内容撤销了并新提交一次)

### 复制提交记录内容
git cherry-pick <提交号>... 可以是多个提交号   将一些提交复制到当前所在的位置（HEAD）下面  
如 git cherry-pick c2 c4  

交互式rebase 指的是使用带参数 --interactive 的 rebase 命令, 简写为 -i    
Git 会打开一个 UI 界面并列出将要被复制到目标分支的备选提交记录，它还会显示每个提交记录的哈希值和提交说明.    
git rebase -i HEAD~4 打开最近4次的提交记录，进行按顺序复制到新分支  

git rebase有两个参数，基分支 复被制分支。
```
先用 git rebase -i 将提交重新排序，然后把我们想要修改的提交记录挪到最前
然后用 commit --amend 来进行一些小修改
接着再用 git rebase -i 来将他们调回原来的顺序
最后我们把 master 移到修改的最前端（用你自己喜欢的方法），就大功告成啦！
```

git checkout oneBranch  
git cherry-pick c4 c5 c3  

### 给提交记录定义标签
git tag v1 c1(提交记录)  若不指定提交记录，则指向HEAD  
切换的时候可以使用标签，git checkout v1

### 对当前分支的提交记录描述
git describe 的语法是：
git describe <ref> 可以为分支或者提交记录的哈希值h以及tag    
<ref> 可以是任何能被 Git 识别成提交记录的引用，如果你没有指定的话，Git 会以你目前所检出的位置（HEAD）。  

它输出的结果是这样的：<tag>_<numCommits>_g<hash>  
tag 表示的是离 ref 最近的标签， numCommits 是表示这个 ref 与 tag 相差有多少个提交记录， hash 表示的是你所给定的 ref 所表示的提交记录哈希值的前几位。  
当 ref 提交记录上有某个标签时，则只输出标签名称
  
### 快速移动
git checkout HEAD^2~2 表示移动到第二个分支的前两个版本

### 从远程仓库获取数据
git fetch  
只是把远程仓库的提交记录获取下来，但并不会改变你本地仓库的状态。  
它不会更新你的 master 分支，也不会修改你磁盘上的文件。  

理解这一点很重要，因为许多开发人员误以为执行了 git fetch 以后，他们本地仓库就与远程仓库同步了。  
它可能已经将进行这一操作所需的所有数据都下载了下来，但是并没有修改你本地的文件。  
可以理解为下载，还没安装

### 将从远程仓库获取数据更新到工作区
先获取数据，再合并代码；
1. git fetch
2. 合并
git cherry-pick o/master  
git rebase o/master  
git merge o/master

而git pull相当于拉取后且进行合并   
git pull --rebase

### 上传内容
git push

因为这情况（历史偏离）有许多的不确定性，Git 是不会允许你 push 变更的。实际上它会强制你先合并远程最新的代码，然后才能分享你的工作。  
例如：基于c1版本开发，修改后提交到本地仓库后为c3,远程有修改记录c2，此时c3跟c2有冲突（因为c3不包含c2），因此git需要你更新代码后才能push  

1. 先获取更新，git fetch 此时只是下载更新内容，还没“安装”到本地工作区
2. 合并代码，git rebase (复制工作区并创建新子分支)将工作移动到最新提交记录
3. 推送代码,git push

而git merge 不会移动工作区，将新的变更更新到我们的本地分支，包含远程仓库的变更

### 设置追踪分支
设置远程追踪分支的方法就是使用：git branch -u 命令，执行：  
git branch -u o/master foo  
或者git checkout -b foo o/master

### 高级指引
git push <remote> <place>
  
git push origin master  
把这个命令翻译过来就是：切到本地仓库中的“master”分支，获取所有的提交，再到远程仓库“origin”中找到“master”分支，将远程仓库中没有的提交记录都添加上去，搞定之后告诉我。  
