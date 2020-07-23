Controller
@Controller
@RequestMapping
两者结合进行请求拦截
URLtempalte(@RequestParam and @PathVarible)
@Controller 用于标记在一个类上，使用它标记的类就是一个SpringMVC Controller 对象。


Controller——现代方式
通过注解SpringMVC可以识别Controller，并且将请求映射到正确的方法。

【步骤1】：通知SpringMVC的DispatcherServlet这是一个Controller，所以在类上添加@Controller，这样它就会被DispatcherServlet上下文环境管理，并且完成它的依赖注入。  
【步骤2】：指明该Controller负责处理哪一个URL,通过添加@RequestMapping("/courses"),它处理Controller负责处理根URL，也就是courses下的路径都会被它拦截到。  
【步骤3】：指明映射到哪一个方法，所以在相应方法上添加注解@RequestMapping(value="/view"，method=RequestMethod.GET),同时可以限制从get方法过来的请求。  
【步骤4】处理前端传过来的参数，第一种方式：也就是get请求带了一个参数courseId=123，它需要被方法所识别，这里在方法的参数上绑定annotation，属性就是前端传过来的key（courseId)的名，通过在方法参数前使用@RequestParam（"courseId"）,这里可以通过日志查看绑定数据的行为（log.debug("In viewCourse,courseId={}",courseId)  

[https://img1.sycdn.imooc.com/5d0cd0840001ea2f12110240.jpg]
解决不能再JSP页面引入JSTL的原因？

<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>jstl</artifactId>
    <version>1.2</version>
</dependency>  
第二种方式:绑定路径参数，这里使用@PathVariable("course"),要在URL路径中显示声明这个路径，也就是在@RequestMapping注解的value属性中，在路径后使用/{courseId}花括号括起来表示一个路径变量。
例如访问路径：http://localhost:8080/view2/courseId=123


restful风格传参：
使用@PathVariable（“courseId”）进行绑定，同样需要在RequestMapping的value属性中进行声明，value=“/view2/{courseId}”  
使用@RequestParam（“courseId”）进行绑定，当需要指定处理的请求方式时，加上method属性值  
 
传统方式传参
public xx(httpServletRequest request)  
通过获取request.getParameter("");  
注意要转换值，因为获取的是字符串  


Binding
请求参数名匹配填入定义模型  
如请求参数为id,name  
则定义的模型是：  
```java
//Person.class
public class Person{
  String id;
  String name;
}

//xx.controller
//表单提交，POST
@RequestMapping(value="",method=RequestMethod.POST)
public String xx(@RequestParam Person person){}  //表单的name元素于模型一致
```
return值：  
重定向"redirect:xxx"(url)  
转发"forward:xxx"  
亦可以通过@ModelAttribute Course course  

> ModelAndView 创建实例后，通过mv.setViewName(".jsp")指定返回页面，通过mv.addObject()返回字段。  

@RequestMapping()，其中配置项有value,method请求方法(RequestMethod.GET),param请求参数限制  
方法类型声明 匹配 return "返回对应字段"  


文件上传  
表单属性 action = '' enctype='multipart/form-data'  
表单元素属性 type="file" name="file"  

controller通过类参数接受:MultipartFile file(内置类)  

JSON  
@ResponseBody返回JSON格式  
配置不详细列举  


拦截器
SpringMVC中的Interceptor拦截器是链式的，可以同时存在多个Interceptor，然后SpringMVC会根据声明的前后顺序一个接一个的执行，而且所有的Interceptor中的preHandle方法都会在Controller方法调用之前调用。  

1. 编写拦截器类实现HandlerInterceptor接口implements  
```java
public Class TestInterceptor implements HandlerInterceptor{
    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3) throw Exception{
        //Object arg2是被拦截的请求的目标对象
        // ModelAndView arg3参数改变显示的视图或者修改发往视图的方法
    }
    public Boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2) throw Exception{
        //Object arg2是被拦截的请求的目标对象
    }
}
```

2. 将拦截器注册到Spring MvC  
注册拦截器  
//确认注入spring-mvc  
<mvc:interceptors>  
    <bean class="过滤器的包完整路径，用·引用包"  //.TestInterceptor
3. 配置拦截规则（针对部分拦截）  
<mvc:interceptors>
    <mvc:mapping path="/viewAll.form/"> //拦截结尾以viewAll和form的请求，正则表达式   
    <bean class="过滤器的包完整路径，用·引用包"  
    
拦截器方法（继承HandlerInterceptorAdapter类）    
1. preHandle,该方法将在Controller处理之前进行调用。  
支持重写（@override）     
Interceptor链式结构也是可以进行中断,这种中断方式是令preHandle的返回值为false，当preHandle的返回值为false的时候整个请求就结束了。

2. postHandle，是进行处理器拦截用的，它的执行时间是在处理器进行处理之后，也就是在Controller的方法调用之后执行。
但是它会在DispatcherServlet进行视图的渲染之前执行，也就是说在这个方法中你可以对ModelAndView进行操作。  
操作详解：  
对应的controller返回了一个ModelAndView对象，在拦截器里通过 ModelAndView arg3参数进行修改（addObject新增或者覆盖）
> 先声明的Interceptor拦截器该方法反而会后调用


3. afterCompletion 该方法将在整个请求完成之后，也就是DispatcherServlet渲染了视图执行。  
这个方法的主要作用是用于清理资源的  

> 2,3需要preHandle返回true才会执行。

多个拦截器应用  
执行顺序: 例如过闸口，来回算一个周期，先回来的先执行。

其他实现方式  
继承：implements WebRequestInterceptor  
将webRequest arg0 代替所有HttpServletRequest和Response参数  
另外使用该参数时，preHandle没有返回值，只是一个void空方法，因此不能终止请求  

使用场景：  
一、 处理请求的共同问题
1. 乱码
2. 权限检验
```java
public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2) throws Exceptoin{
    arg0.setCharacterEncoding("utf-8");
    if(arg0.getSession().getAttribute("user")==null){
    
    }
}

```

过滤器与拦截器的区别
拦截器只过滤请求
过滤器依赖Servlet容器，基于回调函数，过滤范围大


数据绑定入门：  
入参
String[] name //name=lucy&name=Tom


-Dfile.encoding=UTF-8  设置控制台不为乱码

String.equals();  //调用方必须为字符串且不为null  
如果为null,则会报空指针异常，例如: 
```java
class Person{
   private String name = "aa";
   private String age;
}
Person person = new Person();
String age = person.getAge();
String year = "19";
age.equals(year); //由于age为null,因此报异常
//正确应该是： year.equals(age)  因为year已确认不为null
```


导入/导出Excel文件：
1. HSSFWorkBook => .xls  
2. XSSFWorkBook => .xlsx  
不同版本不同的工作本类型  
HSSFCell HSSFSheet HSSFRow  

通过httpServletResponse去获取getOutputStream()  
setHeader（"content-disposition","attachment;filname=xx.xlsx" ）以及contentType   
然后通过out.write()写入数据，且要关闭workbook和out  
注意导出文件的文件名如果中文乱码需要使用base64转义在前端去转义回来

split方法为何不能用小数点bai(.)做参数  
`a.b.c".split("\\."); `

或者使用"".subString("".indexOf("."));  


## 连接ftp传输文件
1. 连接ftp
```
FTPClient ftpClient = new FTPClient();
ftpClient.connect(host,port);
int replyCode = ftpClient.getReplyCode();
//FTPReply.isPositiveCompletion(replyCode)  boolean
boolean login = ftpClient.login(user,psw);
//设置文件传输类型
ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
ftpClient.changeWorkingDirectiory(dict);//返回boolean,相当于cd
```
2. 获取文件 
```
ftpClient.listFiles();
//遍历，获取名字  thread.sleep(1000*5)休眠
file[i].isFile()/isDictionary()
```
3. 下载文件，判断目录，并可以覆盖文件
```
File dir = new　File(dir);
if(!dir.exist()){
    dir.mkdir();
}
//下载到本地
File localFile = new File (dir,fileName)
OutputStream out = new FileOutPutStream(localFile);
ftpClient.retrieveFile(name,out);
out.close()
```
4. 删除文件
ftpClient.deleteFile();

## 写sql
1. 需要注意注入sql安全，因此使用插值法
```
String sql = "select * from table where id = ?"
con = DriverManager.getConnection(dbUrl,user,psw);
ps = con.prepareStatement(sql);
ps.setString (1,id)
ResultSet rs = ps.executeQuery();//ps.executeUpdate();
rs.next()/rs.getString("key")
con.comitt()//执行非查询操作必须commit
```
2. 创建表  
```
create table xxx(
 prop1   type  not null,
 CONSTRAINT prop1 PRIMARY KEY (prop1)
);
comment on column xx.prop1
is '';
```

3. 设置序列
```
create sequence seq_t_dept
minvalue 1
maxvalue 99999999
start with 1
increment by 1
cache 50
```
每调用一次seq_t_dept.nextval,序列自增1  
因此需要查看当前序号是currVal  
`insert into dept_p values('001', '安保部', '000', 1, seq_on_test.nextval);`
