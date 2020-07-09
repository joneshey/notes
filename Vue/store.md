# 状态管理
1. 创建实例
```
new Vuex.Store({
  modules: {},//这里是匹配多个模块下的store文件夹的index
  state:{},
  mutations:{},
  actions:{}.
  getters
})
```

2. 在各个模块下的store/index.js
```
let module = {
  state:{
    moduleName:{  //即使组件的name
      key: value  //即sub
    }
  },  //状态数据
  mutations:{
    setData(state,data){   //在组件去设置状态
      if(typeof data != "object")return;
      if(Array.isArray(data)){
        data.forEach(v => {
          if(v.key){
            for(let i in v.sub){
              state[v.key][i] = v.sub[i]
            }
          }else{
            for(let i in v.sub){
              state[i] = v[i]
            }
          }
        })
      }else{
         if(data.key){
            for(let i in v.sub){
                state[v.key][i] = v.sub[i]
              }
          }else{
              for(let i in v.sub){
                state[i] = v[i]
              }
          }
      }
    }
  }, 
  actions:{
    setData({commit},data){  //data:{key:name}
      commit("setData",data)
    }
  }.
  getters
}
eport default{
  modules:{
    moduleName
  }
}
```
3. 组件调用
在methods调用：
```
 methods:{
  ...mapActions("moduleName",{
    setData:'setData'
  }),
  test(){
    this.setData({
      key:"component",
      sub:{
        keyName:data
      }
    })
  }
 }
```
