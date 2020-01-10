# Xshell命令

ll <=> ls -l  //列出文件列表的详细信息 
mkdir  //创建目录
find [文件名]  //在当前目录搜索文件
grep  //筛选文件名

tail -f [文件名]  //监听文件，如日志

Sudo rz  //即是接收文件，xshell就会弹出文件选择对话框，选好文件之后关闭对话框，文件就会上传到linux里的当前目录 
Sudo sz file //就是发文件到windows上

cat file  //显示文件内容

diff dir1 dir2   //比较目录1与目录2的文件列表是否相同，但不比较文件的实际内容，不同则列出
diff file1 file2   //比较文件1与文件2的内容是否相同，如果是文本格式的文件，则将不相同的内容显示，如果是二进制代码则只表示两个文件是不同的
comm file1 file2  //比较文件，显示两个文件不相同的内容

外部配置文件（weblogic），与内部配置文件
需要配置与内部一致的点方式
vim 文件.扩展名  修改文件
esc :wq  提交保存修改文件
改完weblogic文件需要重启
在bin目录中，./restart.sh
