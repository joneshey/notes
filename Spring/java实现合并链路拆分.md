## java实现合并链路拆分
### 功能背景
  近期需要实现一个一条链路中，有一个节点是多值，需要拆分成多条链路。如：A->B/C->C 拆分成 A->B->C A->C->C
  
### 实现思路
1. 遍历第一个问题时，检查有没有多个选项，如果有则遍历选项放入数组；
2. 遍历第二个问题时，将[A][B]分别作为下一个元素的基准，如果有多个选项，则往[A][B]分别插入新值，变成[A,B][B,B]
3. 双重遍历，第一重遍历链路元素，第二重遍历选项值，遍历选项值时，向已有的链路插入新值，然后返回多条链路

### 遇到的问题
需要深拷贝数组，用于临时存放已有的链路（在遍历选项的时候）

```java
List<List<String>> deepCopy(List<List<String>> oList){
  List<List<String>> tList = new ArrayList<>();
  for(List<String> list = oList){
    List<String> tmp = new ArrayList<>();
    for(item:list){
      tmp.add(item);
    }
    list.add(tmp);
  }
  return tList();
}

//对象类型拷贝
public Object clone(){
  nodeInfo = (NodeInfo)super.clone();
}
```

### 具体实现
```java
//将单条链路拆分，循环第一重：链路元素
publice void divideChain(List<String> strList){
  List<List<String>> chainList = new ArrayList<>();
  for(item : strList){
    String[] values = item.split("/");
    chainList = loopValues(values,chainList);
  }
}
//循环第二重，元素多值
private List<List<String>> loopValues(String[] values,List<List<String>> chainList){
  List<List<String>> targetList = new ArrayList<>();
  //遍历选项，插入原有链路
  for(item : values){
    List<List<String>> tmpList = deepCopy(chainList);  //获取深拷贝的数组，用于存已有的链路
    targetList.addAll(concatChain(item,tmpList))
  }
}
//将插入新值，生成新链路
private List<List<String>> loopValues(String value,List<List<String>> currentChains){
   List<List<String>> infosList = new ArrayList<>();
   if(currentChains.size()!=0){
      for(List<String> chain : currentChains){
        chain.add(value);//这里会改变元素组的currentChains，即loopValues的tmpList，但由于上一重循环每次都新拷贝一份
        infosList.add(chain);
      }
   }else{
      List<String> infos = new ArrayList<>();
      infos.add(value);
      infosList.add(infos);
   }
   return infosList;
}
```
