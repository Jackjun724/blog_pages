# blog_pages

> jackjun blog_pages

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## API

##### /api/dashboard.do
```javascript
let res=
{
  code:0,
  data:{
    charts:{
      weekVisits:[],
      weekReply:[]
    },
    reply:[ //TOP6
      {date:'(string)',name:'(string)',ip:'(string)',content:'(string)',id:'(int)'},
    ],
    tags:[
      ["example",numbers],
    ],
    dayVisitsNum:100,
    weekVisitsNum:800,
    replyNum:102,
  }
}
```

##### /api/getAllTags.do
```javascript
let res={
  code:0,
  data:[
    {id: 1, value: 'Spring'},
    {id: 2, value: 'SSM'},
    {id: 3, value: 'SpringBoot'},
    {id: 4, value: 'Vue'}
  ]
}
```

##### /api/publishNote.do(Parameter:String(JSONObject))
JSON包含参数:
{
    title: '',
    author: 'JACK JUN',
    publishDate: '',
    type: 2,
    tags: [],
    content: ''
}
```javascript
let res={
  code:0,
  msg:'上传成功!'
}
```

##### /api/getNodeList.do (Parameter:String(JSONObject))
JSON包含参数:
{
    filters:['Vue','Spring'],
    orderByColumn:'publishTime|updateTime|id|null',
    orderType:'asc|desc',
    pageSize: 10 '缺省 10',
    pageNum: 1  '缺省 1'
}
```javascript
let res=
{   
    pageSize:10,
    pageNum:1,
    count:99,
    tableData:[
            {
                id:1,
                title:'Spring 自动注入详解',
                author:'Jack Jun',
                publishTime:'2018-01-02 17:30',
                updateTime:'2019-01-05 17:20',
                tags:['Vue','Spring','SSM'],
                status:2
            },
            ...
        ]
}
```

##### /api/delNodeById.do (Parameter:int(id))
```javascript
let res=
{
  code:0,
  msg:'tips msg!'
}
```

##### /api/getNoteInfoById.do (Parameter:int(id))
```javascript
let res={
  code:0,
  data:{
      title: '',
      author: 'JACK JUN',
      publishDate: '',
      type: 2,
      tags: [],
      content: ''
  }
}
```

##### /api/getReplyList.do (Parameter:String(JSONObject))
JSON包含参数:
{
    filters:['Vue','Spring'],
    orderByColumn:'replyTime|id|null',
    orderType:'asc|desc',
    pageSize: 10 '缺省 10',
    pageNum: 1  '缺省 1'
}
```javascript
let res=
{   
    pageSize:10,
    pageNum:1,
    count:99,
    tableData:[
        {
            id:1,
            content:'写的不错!',
            title:'Spring 自动注入详解',
            name:'Jack A',
            replyId:'',
            replyTime:'2018-01-02 17:30',
            ip:'10.24.142.13',
            status:2,
        },
            ...
    ]
}
```

##### /api/delReplyById.do (Parameter:int(id))
```javascript
let res=
{
  code:0,
  msg:'tips msg!'
}
```

##### /api/getReplyInfo.do (Parameter:int(id))
```javascript
let res={
  code:0,
  data:[{
    id:2,
    author:'Jack',
    reply:'This is Content.'
  }]
}
```

##### delTagByName(Parameter:String(name))

##### addTagByName(Parameter:String(name))

##### getFileList(Parameter:Map {pageNum,pageSize})
```
    'code':0,
    'data|10':{
      'tableData|10':[
        {
          'id|1-10':1,
          'title':'测试文件',
          'url':'https://www.luckyvv.cn'
        }
      ],
      'count':12
    }
```
##### getImageList(Parameter:Map {pageNum,pageSize})
```
    'code':0,
    'data|10':{
      'tableData|10':[
        {
          'id|1-10':1,
          'title':'测试文件',
          'url':'https://www.luckyvv.cn'
        }
      ],
      'count':12
    }
```
