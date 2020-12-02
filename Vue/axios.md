# Axios
1. post请求，传送data : qs.Stringify(param)
2. 如果是传类中类，则需要指定header{content-type:""},且请求参数不可以是用qs.stringify()
3. 如果是get请求，则用param参数；post请求则用data
4. 如果是get请求传数组，则需要.
```
paramsSerializer:  params => qs.stringify(params, {arrayFormat: 'repeat'})
```



过滤器：  
1. 创建axios实例，const service = axios.create({timeout:,baseURL:""})  
2. 设置过滤器service.interceptors.response.use(response=>{},err)/request.use(request=>{},err)  
3. 参数属性：request.headers/response.headers


导出Excel文件：  
接口返回文件流  
```
let blob  = new Blob([res.data],{type:'application/vnd.ms-excel;charset=utf-8'})  // 这样导致无数据返回也会导出Excel
let name = res.header["content-disposition"]  //获取文件头信息
let link = document.createElement("a");
link.href= URL.createOnjectURL(blob);
link.download = name // 必须知道下载名才能下载文件，还要需要base64转义中文
//挂载上去html后要触发click事件
然后remove元素，并URL.revokeObjectURL(blob)
```
