1. getter  
访问store.getters.doneTodos
```
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {  //state为参数，相当于data
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
     doneTodosCount:()=>{}
  }
})
export default store
```

mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性  
```
import { mapGetters } from 'vuex'

export default {  //实例计算属性
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

2. mutation  
通过store.commit('increment')调用store.mutation, 第二个可选参数为额外参数:store.commit('increment',10)  
或者使用：  
```
---实例
store.commit({
  type: 'increment',
  amount: 10
})
----vuex
mutations: {
    increment (state,a) {
      // 变更状态
      //state.count++
      state.count += a.amount
    }
  }
```
