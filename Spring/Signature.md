1. 先获取到需要加签的参数  
由于get方法获取参数和post方法不一样，因此获取参数需要对httpRequest的请求方法进行判断：
```java
if(HttpSender.Method.GET.name().equal(request.method)){  // get方法
  TreeMap<String,String> sortedMap = new TreeMap<>();
  Map<String ,Collection<String>> params = request.queries();
  //判断是否为空
  if(param == null){
    param = new HashedMap();
    //遍历param.EntrySet,获取values
    //List<String> value = (List<String>)stringCollectionEntry.getValue() 是一个collection
    //然后判断参数值的长度个数。如果是数组则size>1 ,如果没数据则size=0.因此需要判断
    //注意验证参数是否与被调度方一致，否则无法进行验签，例如空格中文的处理以及空值
    sortedMap.put(entry.getKey(),"");
    TreeMap<String,String> sortMap = new TreeMap<>(sortedMap);
    businData = JSONUtil,toJson(sortMap).getBytes(Charsets.UTF_8);
  }
}else{//如果是post
  businData = request.requestBody().asBytes()//转成byte去加密
}

//以上方法是获取bytes,接下来加密
//时间戳，密钥，使用Hex.encodeHexString(encodeMD5(data))
```
