# GIT
### 新建分支 
新建分支  git branch filename
新建分支并切换到该分支  git checkout -b filename

### 合并分支
合并分支  git merge (将两个分别修改过的分支进行合并)
当前是filename,要合并到master分支，则使用git merge filename
（前提，该两个分支都是有共同的父分支，然后各自提交过记录)

### 合并（延伸）分支
filename与master的各自有提交记录，将master的修改复制一份放到当前工作分支filename  git rebase master 
（以上都是仓库上面操作，不是工作区）  
filename 与 master（HEAD） 为两个分支，若git rebase filename则是在filename分支上新增一个分支并复制master的内容

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
