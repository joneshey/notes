记一日志：
1. 使用ssh下载仓库，需要在本地配置ssh密钥以及公钥  
2. 根据教程，先通过git bash设置了账户以及邮箱  
```
 git config --global user.name author #将用户名设为author
 git config --global user.email author@qq.com #将用户邮箱设为author@corpmail.com
```
3. 生成私钥ssh-keygen -t rsa -C"author@qq.com"   
此时即可从gitlab拉取具体项目到本地仓库  

由于之前是用http进行拉取，因此没有注意ssh的配置。  
如果出现了以下错误`The authenticity of host 'github.com (192.30.255.112)' can't be established.`  
表示缺少了一个known_hosts文件，输入yes命令自动补充文件  
此时即可使用ssh去下载对应的依赖。（本次问题背景）：使用git+ssh://git@gitlab进行安装依赖

