# Axios
1. qs.Stringify(param)
2. 如果是传类中类，则需要指定header{content-type:""},且请求参数不可以是用qs.stringify()
3. 如果是get请求，则用param参数；post请求则用data
4. 如果是get请求传数组，则需要.
```
paramsSerializer:  qs.stringify(params, {arrayFormat: 'repeat'})
```


过滤器：  
1. 创建axios实例，const service = axios.create({timeout:,baseURL:""})  
2. 设置过滤器service.interceptors.response.use(response=>{},err)/request.use(request=>{},err)  
3. 参数属性：request.headers/response.headers
