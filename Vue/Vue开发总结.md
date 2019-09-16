一、使用规范以及相关语法问题

    1、声明data属性方式的区别
       官方文档的风格指南规定，在创建组件数据（data属性）的时候，除了根实例（new Vue）以外的地方，都应该返回function函数对象给data属性，从而保持组件数据的独立性。
	   声明语法：
	   data:function(){return {}}  或  data(){}  (es6语法匿名函数)   
	   data:{ }
	   第一种的声明方法，通过函数生成了一个独立的数据对象，提供给当前组件使用，不影响其他子组件下的数据属性；
	   第二种的声明方法，返回一个对象，能给根实例和子组件共享数据。
	
	2、What Can I Do In 生命周期
		Vue生命周期，主要有：创建（beforeCreated,created）、挂载（beforeMount,mounted）、更新（beforeUpdated,updated）、销毁（beforeDestroy,destroyed）的八个生命周期。
		其中，值得注意的周期问题：
		在created时，实例被创建，其实例下的部分初始化的属性，如data,methods,filters,components等属性都能在该周期里面可以读取以及调用，但此时页面的DOM元素还没渲染出来，并不能在created周期里获取，因此即使给DOM元素添加了ref的属性，在created周期也不能调用实例的refs的属性（this.refs.xx）；
		在mounted时，DOM元素才刚渲染出来，此时可以将绑定了ref属性的DOM元素通过this.refs.xx来获取。
		（如果需要通过异步接口去初始化数据，则可以在以上周期进行请求后，通过回调保证数据返回后进行赋值，需要小心的是，如果需要初始化数据后操作DOM，应该使用watch监听数据变化，结合$.netxTick()来出发对DOM的对应操作。）
		
