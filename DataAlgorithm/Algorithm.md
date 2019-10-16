# Algorithm

* ### 二分法
二分法的对象必须为有序的元素列表
```python
def binary_search(arr,item):  // item为你查找的项，返回位置
  low = 0;
  high = len(arr)-1;
  
  while low <= high:
    mid = (low+high)/2;
    guess = arr[mid];
    if guess == item:
      return mid;
    if guess < item:  //若中位数小于该值，则证明该值范围在中位数后半部分，则最低位置为index+1
      low = mid + 1;
    else:  //证明在前半部分，则最低位置为中位数inde-1
      high = mid - 1；
  return None;
```

* ### 数组与链表
数组：优点：随机访问，通过索引获取元素快，位置依次排序O(1)；缺点：浪费预留内存，操作元素不方便，后面元素逐个向后移动一位O(n)  
链表：优点：操作元素效率快，不占预留内存，通过地址查找元素O(1)；缺点：顺序访问，读取元素不方便O(n)  
数组的元素的是挨个的，连续排序。  
链表的元素是分开的，通过指针next头部指向下一个元素地址。  

* ### 栈
先进后出，数组的一种。需要给它分配内存大小。  
函数执行就是调用栈的体现。栈顶首先添加是主函数的内存块，最后才执行完成，再往上是函数中调用的方法，执行完就弹出内存。
栈顶指针始终指向栈的第一个元素

* ### 队列
后进后出，只支持入队和出队

* ### 散列表
类似map,dict. 可有数组散列表和散列数组，如在数组里存储map对象，或者在散列存在多个值（数组）  
时间复杂度为O(1)，意思是无论散列表长度多大，所需的时间都相同（获取key）  
散列表速度快慢与散列函数相关，良好散列函数让数组的值呈均匀分布，避免冲突。   
> 冲突：两个键分配同一个存储位置，解决冲突可以通过创建一个链表存储该两个键值对  
用处：1.检查是否重复；2.映射关系；3.作为缓存  

* 填装因子  
散列表包含元素数与位置总数（总长度）之比  
填装因子越小，发生冲突几率越小  
当填装因子大于 0.7 则应调整散列表长度

* ### 图
图模拟一组连接，由节点和边组成。相连的节点叫邻居  
用散列表实现图结构，通过队实现示广度优先搜索（有序）  
```python
  graph = {}
  graph['aga'] = ['alcie','bob']
  graph['alcie'] = []
  //表示alcie和bob都是aga的邻居,但age不是alcie的邻居（单向图）
```
有向图：单向关系，只有被指向箭头，没有指向箭头。  
无向图：双向关系，有被指向和指向箭头

* ### 选择排序
遍历数组，比较大小，置顶排序  
时间复杂度：O(n^2),实际为n(1/2*n),但大O时间复杂度仅是取幂数最高的一位，且不要常数项。
```python
def findMinIndex(arr):
  min = arr[0];
  min_index = 0;
  for i in range(1,len(arr)):  //从1开始遍历
    if arr[i] < min:
      min = arr[i];
      min_index = i;
  return min_index；

def sort(arr):
  newArr = [];
  for i in len(arr):  //循环的是原始数组的项数，但这里的len(arr)只执行一遍，为数值5
    //但在函数体里面arr的长度是发生变化
    min_index = findMinIndex(arr);
    newArr.append(arr.pop(min_index));  // 修改原数组的元素，并把移除的元素添加到新数组；因此需要找到最小值得索引
  return newArr;
  
sort([22,31,21,3,22]);

```

* ### 递归
递归能使程序看上去更容易理解  
举个《算法图解》的栗子：  
从盒子堆中找钥匙，盒子里面可能是盒子，可能是钥匙。
```python
def look_for_key(boxes):
  for item in len(boxes):
    if item.is_box:
      look_for_key(item);  //调用方法本身
    elif item.is_key:
      print('I Find It');
      
//阶乘
def fact(x):
  if x==1:
    return 1;
  else:
    return x*fact(x-1)
```
缺点是容易陷入死循环，因此需要让程序具备两个条件：基线条件和递归条件。  
基线条件指的是，什么情况下，能够得到的预期结果；相反，递归条件是在什么情况下（不满足预期时），需要继续调用自己。  
若栈过高，则会耗用大量内存存储函数调用的信息。

递归算法可以用来计算数组总和
```python
def sum(arr):
  if arr == []:
    return 0;
  else:
    first = arr.pop(0);
    return first+sum(arr);

print(sum([2,1,2]));  //5
```

* ### 分而治之D&C
倘若整块地按最小宽度分成长宽相同的方块，剩下还没分成的地称为小块地，“适用小块地的最大方块，也是适用于整块地的最大方块”
往下划分，找到当小块地里最大的方块的长宽相同则是基线条件，不符合的则成递归条件。
步骤：找出基线条件，将问题分解，直到符合基线条件  


* ### 快速排序
工作原理：从数组选择一个元素作为基准值，遍历数组每个元素与基准值比较，比基准值大的添加在右空数组，比基准值小的添加在左有空数组。利用递归算法，一直对数组进行找基准值，比较分类（分区），再合并结果。  
基线条件：当数组小于等于1时，不需要比较。  
算法： 
```python
def quickSort(arr):
  if len(arr) < 2
    return arr;
  else:
    less = [];  //比基准值小的
    more = [];  //比基准值大的
    mid = arr[0];  //最好随机选取数组的数，若为[0]，则是最坏结果时间
    for i in range(1,len(arr)):
      if arr[i] <= mid:   //与基准值比较
        less.append(arr[i]);
      else:
        more.append(arr[i]);
    return sum(less)+ [mid] +sum(more) ; //数组合并
    
print(sum([1,22,12,42,1]));
    //还有一种表达式
    less = [i for i in array[1:] if i<=mid]
```
讨论：为什么选取第一个元素而不选择随机为最糟糕的算法。  
前提：该数组为有序数组。  
1. 时间复杂度为O(n^2)，因为选取第一个元素比较分区时，若该数组为有序数组，则每次右边都是n-1的数组，需要n(n-1)遍历。因此调用栈更多。     
2. 若随机选取一个值，则时间复杂度为O(nlogn)，相当于二分法，将数组分成一半，调用栈短得多，更快使两边数组达到基线条件（最简单的数组不需要排序）  
时间复杂度：O(nlogn)

* ### 图算法--广度优先搜索
查找路径，解决最短距离的算法，必须通过顺序查找第一个节点是否符合，不符合继续查找下一个节点  
按层搜索，使用队列实现按顺序查找   
时间复杂度:O(V顶点+E边数)  V为添加到队列时间，E为寻找遍历时间  

![](https://img-blog.csdn.net/20180805163135680?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNjgxMjQx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)  

工作原理:  
1. 创建一个队列，存储需要检查的元素
2. 从队列出队一个人，检查是否符合条件
3. 如果不是，则将该元素的二级元素加入队列
4. 递归第二步
5. 判断队列是否为空
```python
graph ={}
graph['you']=['alice','bob'];
graph['alice']=['eric',tom];
graph['bob']=[];

from collection import deque
search_queue = deque();  
//deque双向对列，append/apendleft,clear,count,inset(index,val),pop,remove,reverse,rotate(指定次数)
search_queue += graph['you'];  //graph['you']是一个数组

while search_queue:   //队列不为空为条件
  person = search_queue.popleft();  //弹出首元素
  if person_is_target(person):
    return true;
  else: 
    search_queue += graph[person];  //如果该节点有第二层，则添加第二层的所有节点，否则检查第二个节点
    //['eric','tom']在bob后面，符合广度优先搜索
    //先检查一级元素，再二级元素
retrun False
```
但由于上述元素数组中可能包括同一个数组或元素，如：`['bob']=['eric','may']`  
因此，避免做重复遍历寻找，在检查元素之前需要确认是否已经检查过。  
```python
def search(name):
  search_queue = deque();
  search_queue += graph[name];  
  searched = [] ; //用于存储已经检查过的元素
  while search_queue:
    person = search_queue.popleft();  
    if person not in searched:    //检查该元素是否已经检查过
      if person_is_target(person):
        return true;
      else: 
        search_queue += graph[person]; 
        searched.append(person)
  retrun False
```



