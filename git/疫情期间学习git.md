# GIT
新建分支  git branch filename
新建分支并切换到该分支  git checkout -b filename

合并分支  git merge (将两个分别修改过的分支进行合并)
当前是filename,要合并到master分支，则使用git merge filename
（前提，该两个分支都是有共同的父分支，然后各自提交过记录)

filename与master的各自有提交记录，将master的修改复制一份放到当前工作分支filename  git rebase master 
（以上都是仓库上面操作，不是工作区）

在提交树上移动  HEAD  分离出HEAD不要指向分支，只需要把checkout 某次提交记录的哈希值

在提交树移动中找回提交记录，使用相对引用，回到父节点: git checkout HEAD^ 或者使用git log查询日志的哈希值
（git checkout HEAD^已将HEAD从分支中分离出，再移动提交记录）git checkout HEAD~次数

将master分支强制移动到前三级提交记录的分支 git branch -f master HEAD~3
-f是强制移动

在 Git 里撤销变更的方法很多。和提交一样，撤销变更由底层部分（暂存区的独立文件或者片段）和上层部分（变更到底是通过哪种方式被撤销的）组成。
主要有两种方法用来撤销变更 —— 一是 git reset，还有就是 git revert
