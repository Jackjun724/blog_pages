import Mock from 'mockjs'

/**
 * 初期设计代码 ， 接口已过期  ，仅作语法参考。
 */

// 获取url参数
const parseQueryString = (url) => {
  let regUrl = /^[^?]+\?([\w\W]+)$/
  let regPara = /([^&=]+)=([\w\W]*?)(&|$|#)/g
  let arrUrl = regUrl.exec(url)
  let ret = {}
  if (arrUrl && arrUrl[1]) {
    let strPara = arrUrl[1]
    let result
    while ((result = regPara.exec(strPara)) != null) {
      ret[result[1]] = result[2]
    }
  }
  return ret
}

Mock.mock(new RegExp('/api/login.do'), {
  'code': 0,
  'data': {
    'token': '@id'
  }
})

Mock.mock(new RegExp('/api/dashboard.do'), {
  'code': 0,
  'data': {
    'charts': {
      'weekVisits': [100, 120, 161, 134, 105, 160, 165],
      'weekReply': [120, 82, 91, 154, 162, 140, 145]
    },
    'reply':
      [
        {
          date: '2016-05-02',
          name: '王小虎',
          ip: '10.12.52.133',
          content: '上海市普陀区金沙江路 1518 弄',
          id: 1
        }, {
        date: '2016-05-04',
        name: '王小虎',
        ip: '10.12.52.133',
        content: '上海市普陀区金沙江路 1517 弄',
        id: 2
      }, {
        date: '2016-05-01',
        name: '王小虎',
        ip: '10.12.52.133',
        content: '上海市普陀区金沙江路 1519 弄',
        id: 3
      }, {
        date: '2016-05-03',
        name: '王小虎',
        ip: '10.12.52.133',
        content: '上海市普陀区金沙江路 1516 弄',
        id: 4
      }, {
        date: '2016-05-03',
        name: '王小虎',
        ip: '10.12.52.133',
        content: '上海市普陀区金沙江路 1515 弄',
        id: 5
      }, {
        date: '2016-05-03',
        name: '王小虎',
        ip: '10.12.52.133',
        content: '上海市普陀区金沙江路 1515 弄',
        id: 5
      }],
    'tags': [
      ['Vue', 240],
      ['React', 300],
      ['Java', 250],
      ['Python', 300],
      ['Spring Boot', 200],
      ['SSM', 210]
    ],
    'dayVisitsNum': 100,
    'weekVisitsNum': 800,
    'replyNum': 102
  }
})

Mock.mock(new RegExp('/api/publishNode.do'), {
  'code': 0,
  'msg': '上传成功!'
})

Mock.mock(new RegExp('/api/getAllTags.do'), {
  'code': 0,
  'data': [
    {id: 1, value: 'Spring'},
    {id: 2, value: 'SSM'},
    {id: 3, value: 'SpringBoot'},
    {id: 4, value: 'Vue'}
  ]
})

Mock.mock(new RegExp('/api/getNoteList.do'), ({body}) => {
  const para = JSON.parse(body)
  return Mock.mock({
    'code': 0,
    'data': {
      pageSize: para.pageSize,
      pageNum: para.pageNum,
      count: 99,
      tableData:
        [
          {
            id: 1,
            title: 'Spring 自动注入详解',
            author: 'Jack Jun',
            publishTime: '2018-01-02 17:30',
            updateTime: '2019-01-05 17:20',
            tags: ['Spring', 'SSM'],
            status: 2
          },
          {
            id: 2,
            title: 'Spring 自动注入详解',
            author: 'Jack Jun',
            publishTime: '2018-01-02 17:30',
            updateTime: '2019-01-05 17:20',
            tags: ['Vue', 'SSM'],
            status: 2
          },
          {
            id: 3,
            title: 'Spring 自动注入详解',
            author: 'Jack Jun',
            publishTime: '2018-01-02 17:30',
            updateTime: '2019-01-05 17:20',
            tags: ['Vue', 'Spring', 'SSM'],
            status: 2
          },
          {
            id: 4,
            title: 'Spring 自动注入详解',
            author: 'Jack Jun',
            publishTime: '2018-01-02 17:30',
            updateTime: '2019-01-05 17:20',
            tags: ['Vue', 'SSM'],
            status: 2
          },
          {
            id: 5,
            title: 'Spring 自动注入详解',
            author: 'Jack Jun',
            publishTime: '2018-01-02 17:30',
            updateTime: '2019-01-05 17:20',
            tags: ['Spring', 'SSM'],
            status: 1
          },
          {
            id: 6,
            title: 'Spring 自动注入详解',
            author: 'Jack Jun',
            publishTime: '2018-01-02 17:30',
            updateTime: '2019-01-05 17:20',
            tags: ['SSM'],
            status: 2
          },
          {
            id: 7,
            title: 'Spring 自动注入详解',
            author: 'Jack Jun',
            publishTime: '2018-01-02 17:30',
            updateTime: '2019-01-05 17:20',
            tags: ['Spring', 'SSM'],
            status: 2
          },
          {
            id: 8,
            title: 'Spring 自动注入详解',
            author: 'Jack Jun',
            publishTime: '2018-01-02 17:30',
            updateTime: '2019-01-05 17:20',
            tags: ['Vue', 'Spring'],
            status: 3
          },
          {
            id: 9,
            title: 'Spring 自动注入详解',
            author: 'Jack Jun',
            publishTime: '2018-01-02 17:30',
            updateTime: '2019-01-05 17:20',
            tags: ['Vue'],
            status: 2
          },
          {
            id: 10,
            title: 'Spring 自动注入详解',
            author: 'Jack Jun',
            publishTime: '2018-01-02 17:30',
            updateTime: '2019-01-05 17:20',
            tags: ['Vue', 'SSM'],
            status: 2
          },
        ]
    }
  })
})

Mock.mock(new RegExp('/api/delNoteById.do'), options => {
  return Mock.mock({
    'code': 0,
    'msg': '删除成功! ID:' + options.body
  })
})

Mock.mock(new RegExp('/api/getNoteInfoById.do'), options => {
  return Mock.mock({
    'code': 0,
    'data': {
      'title': '这是一篇测试文章 ID:' + options.body,
      'author': 'JACK JUN',
      'publishDate': '2019-03-23T01:50:45.000Z',
      'type': 2,
      'tags': ['SpringBoot', 'SSM', 'Spring'],
      'content': '# Spring 实现控制反转 及 依赖注入\n## XML Bean定义\n```xml\n<bean\nid="beanId"\nname="beanName"\nclass="class文件定位"\nparent="父Bean，不需要继承关系"\nabstract="定义是否抽象，默认Flase(true|false)"\nscope="作用域：单例|多例 (prototype|singleton)"\nlazy-init="true|false 是否初始化是加载"\nautowire="no|byName|byType|constructor|auto detect|default  自动装箱机制"\n>\n    <!-- 常用参数 -->\n    <property name="propertyName" ref|value="">\n        <!-- 如果不在同一个配置文件中 请使用以下方法 -->\n        <ref local="mainFriame"/>\n    </property>\n</bean>\n```\n获取容器中的bean\n```java\n// 获取容器\nApplicationContext applicationContext = new ClassPathXmlApplicationContext("name.xml");\n// 获取bin对象 by Id\napplication.getBean("");\n```\n## 集合属性\nDEMO CLASS\n```java\npublic class Test{\n    private List list;\n    private Map map;\n    private Properties prop;\n    private Set set;\n}\n```\nXML\n```xml\n<bean id="testBean" class="cn.luckvv.Test">\n    <!-- 成员变量配置 -->\n    <property name="list">\n        <list>\n            <value>v1</value>\n            <value>v2</value>\n        </list>\n    </property>\n\n    <property name="map">\n        <map>\n            <entry key="k1"><value>v1</value></entry>\n            <entry key="k2"><value>v2</value></entry>\n        </map>\n    </property>\n\n    <property name="prop">\n        <props>\n            <prop key="k1">str1</prop>\n            <prop key="k2">str2</prop>\n        </props>\n    </property>\n\n    <property name="set">\n        <set>\n            <value>v1</value>\n            <value>v2</value>\n        </set>\n    </property>\n</bean>\n```\n\n> 以上是XML配置Bean ，也可以使用注解的方式配置Bean\n\n注解 @Component 是bean的标志 可以指定其Value\n\nDEMO\n```java\n@Component //@Component("lucky")\npublic class Lucky {\n\n}\n```\n写了注解以后必须在Spring中配置 来启用类的扫描\n引入context命名空间并扫描bean\n方式等同于 SpringMvc扫描 Controller\n`<context:component-scan base-package=""/>`\n\n还有一些注解\n\n`@Scope("prototype")`表示作用域 作用在Class上\n\n`@Autowired` 表示自动装配 接受boolean 默认true 自动匹配与标记属性类型相同或子类型或接口实现的bean，如果匹配到多个，则会报出错误：BeanCreatingException\n\n解决多个匹配的办法有两种：\n- 把属性名称作为依赖bean名称\n- 使用@Qualifier注解指定依赖bean的名称\n\nDEMO\n```java\n@Component("computer")\n@Scope("prototype")\npublic class Computer{\n    @Autowired\n    private Display display;\n\n    @Autowired\n    @Qualifier("samsungMainFrame")\n    private MainFrame mainFrame;\n\n    //...more...\n}\n```\n\n另外对JSR-250规范支持的三个注解：\n- `@Resource`  Resource 等同于 Autowired都是自动装箱注解，不过Antowired默认byType而Resource默认byName，且Resource支持两个参数name，type。\n- `@PostConstruct` 被该注释标记的方法会在类被实例化的时候调用\n- `@PreDestory` 被该注释标记的方法会在类被销毁之前调用'
    }
  })
})

Mock.mock(new RegExp('/api/delReplyById.do'), options => {
  return Mock.mock({
    'code': 0,
    'msg': '删除成功! ID:' + options.body
  })
})

Mock.mock(new RegExp('/api/getReplyList.do'), ({body}) => {
  const para = JSON.parse(body)
  return Mock.mock({
    'code': 0,
    'data': {
      pageSize: para.pageSize,
      pageNum: para.pageNum,
      count: 99,
      'tableData|10': [
        {
          'id|+1': 1,
          'content': '这是一个特别特别特别特别特别特别特别特别特别特别特别特别长的内容',
          title: 'Spring 自动注入详解',
          'name': '@cname',
          'replyId|1-10': 1,
          'replyTime': '@datetime',
          'ip': '@ip',
          'status|1-3': 1,
        },
      ]
    }
  })
})

Mock.mock(new RegExp('/api/getReplyInfo.do'), options => {
  return Mock.mock({
    'code': 0,
    'data|5': [{
      'id|1-10': 1,
      'author': '@cname',
      'reply': 'This is Content.'
    }]
  })
})

Mock.mock(new RegExp('/api/addTagByName.do'), options => {
  return Mock.mock({
    'code': 0,
    'msg': '添加成功! ID:' + options.body
  })
})


Mock.mock(new RegExp('/api/delTagByName.do'), options => {
  return Mock.mock({
    'code': 0,
    'msg': '删除成功! ID:' + options.body
  })
})


Mock.mock(new RegExp('/api/get(Image|File)List.do'),options => {
  let para = JSON.parse(options.body)

  return Mock.mock({
    'code':0,
    'data':{
      'tableData|10':[
        {
          'id|1-10':1,
          'title':'测试文件',
          'url':'https://www.luckyvv.cn'
        }
      ],
      'count':12
    }
  })
})
