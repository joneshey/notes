# Axios
1. qs.Stringify(param)
2. 如果是传类中类，则需要指定header{content-type:""},且请求参数不可以是用qs.stringify()
3. 如果是get请求，则用param参数；post请求则用data
4. 如果是get请求传数组，则需要.
```
paramsSerializer:  qs.stringify(params, {arrayFormat: 'repeat'})
```
