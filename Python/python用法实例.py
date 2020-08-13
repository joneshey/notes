-*- coding:UTF-8 -*- 

print('Hello Python') 
# 输入交互
name = raw_input("pls enter ur name:")
print('Hello, '+name);

# slice数组截取方法  
n = range(10)
print(n)  //[0-9],0到9的元组
print(n[:3])  //[0,1,2],从0开始
print(n[::3])  //[0,3,6,9]，从0开始，3代表的是梯度step   

# dict字典值
r={"a":1,"b":2}
#i为index
for i in r:  
  print(r[i])  
  
# hanoi 汉诺塔

# 类定义  
class Test(obj):
  def __init__(self,name,age):  //内置属性__age,无法在外部访问
    super(Test,self).__init__()
    self.__name=name
    self.__age = age
  def printout(self):
    print(self.__name)
person = Test('jj',48)
person.printout();
//无法访问person1.name或者person1.__name  

# 枚举值  
from enum import Enum
# 枚举类定义方法
class weekday(Enum):  
  mon=1
  tue=2
print(weekday.mon) //1

# 游戏规则：排序后获取逐个元素，放到另一个元组存储中，然后每次将该元组的第一个元素放在后面
display = sorted([17,13,11,2,3,5,7],reverse=True)
res = []
for i in display:
  res.append(i)
  if display.index(i)!=len(display)-1:  
    res.append(res.pop(0))
res.reverse();
print(res)

# 游戏规则：将1变为0,0变为1 
parent = []
for x in [[1,1,0],[1,0,1],[0,0,0]]:
  son = []
  for y in x:
    if y==1:
      single = 0
    else:
      single = 1
    son.append(single)
  son.reverse()
  parent.append(son)
print(parent)

# 游戏规则，判断用户进行上下左右移动后，是否走回原点
str = "rrrll"
def isOrgin(str):
  str = str.lower()
  obj = {}
  for x in str:
  #获取字符串每个字母出现的次数
    if obj.get(x.-1) == -1:
      obj[x]=1
    else:
      obj[x]=obj.get(x)+1
  #{r:3,l:3}
  for y in obj:
    if( (obj.get('u',-1)==obj.get('d',-1)) & (obj.get('r',-1)==obj.get('l',-1)) ): #注意括号
      return true
    else:
      return false  
      
# obj.get("",-1) //如果获取不了元素则返回-1


# 
def twoSum(x):
  if x<0:
    x=str(x)  #转换为字符串
    odd=x[0:1]  #截取负号
    oil=x[1:]
    l=list(oil)  #转换数组
    l.reverse()
    print(odd+"".join(l))#转换为字符
  else:
    l=list(str(x))
    l.reverse()
    print("".join(l))
    
