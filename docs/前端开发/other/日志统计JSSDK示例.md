# 日志统计JSSDK示例

## 需求
类似于百度统计。
实现简单的前端访问等采集功能

> 两个功能：
>- 打开页面、离开页面的自动采集功能
>- 前端埋点，通过代码中埋点采集数据

> 前端需要保证
> 1. 用户无感知：异步方式处理，不影响用户的业务接口访问
> 2. 通用性：应能适用原生环境和各类框架集成环境，如VUE、reactjs, angular等
> 3. 轻量：压缩
> 4. 加密：代码本身需要做混淆处理，特别是要将参数混淆，尽量隐藏处理过程和接口细节
> 5. 安全：为了保证通信安全，接口调用尽量走ssl


## 实现
### 命名空间
为防止`js`文件对项目命名的污染，把代码放在一个自执行函数中

```javascript
// sdkLog.js文件
(function() {
  // do something
})()
```

### 产品区分
我们通过给`js`文件带`key`值的方式来区分产品。不同的产品对应着不同的`key`值

```javascript
// html文件
(function() {
  var sdk = document.createElement("script");
  sdk.src = "http://xxx/sdkLog.js?xxxxxxxxxxxxx";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(sdk, s);
})()


// sdkLog.js文件
function getKey() {
  // let file, scripts = document.getElementsByTagName("script"); 
  // file = scripts[scripts.length - 1].getAttribute("src");
  // console.log(file)
  let curScriptElement = document.currentScript
  let arySrc = curScriptElement.src.split('?')
  if (arySrc.length < 2) {
    return null
  }
  return arySrc[1]
}
const key = getKey()
```

以后可能会给`js`文件带更多的参数，我们采用`key1=value1&key2=value2`的形式

```javascript
// html文件
(function() {
  var sdk = document.createElement("script");
  sdk.src = "http://xxx/sdkLog.js?key=xxxxxxxxxxxxx";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(sdk, s);
})()


// sdkLog.js文件
function getArgs() {
  // let file, scripts = document.getElementsByTagName("script"); 
  // file = scripts[scripts.length - 1].getAttribute("src");
  // console.log(file)
  let curScriptElement = document.currentScript
  let arySrc = curScriptElement.src.split('?')
  if (arySrc.length < 2) {
    return null
  }
  let aryResult = {}
  let aryParam = arySrc[1].split('&')
  if (aryParam.length > 0) {
    for (let i = 0; i < aryParam.length; i++) {
      let data = aryParam[i].split('=')
      aryResult[data[0]] = data[1]
    }
  }
  return aryResult
}
const key = getArgs()['key']
```

### 发送请求
前端采集到数据后，需要往后端发送接口请求，将采集到的数据发送给后端
一般发送接口请求都是采用`ajax`
如果使用`ajax`的话。为保证通用性，我们需要自己自己封装`ajax`
这里我们不需要关心接口请求的返回值等，只要发送出去就可以。用`Get`请求。我们采用`new Image()`的方式

```javascript
// sdkLog.js文件
function sendImg(url) {
  let img = new Image()
  img.src = url
  return img
}
```

### 参数处理
发送的请求数据需要处理成`key1=value1&key2=value2`的形式
我们封装一个方法用来处理

```javascript
function formatParams(params) {
  let res = ''
  let arr = []
  for(let k in params) {
    arr.push(key + '=' + encodeURIComponent(params[key]))
  }
  if(arr.length > 0) {
    res = '?' + arr.join('&')
  }
  return res
}
```

### 页面类型
判断下页面类型`app`、`wechat`、`qq`、`openweb`

```javascript
function getBrowserType() {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.match(/micromessenger/i) !== null) {
    return 'wechat'
  } else if (ua.match(/\sqq\//i) !== null) {
    return 'qq'
  } else if (ua.match(/mobile/i) !== null && ua.match(/browser/i) == null) {
    // 页面是不是运行在某个APP内部，这个需要根据实际情况判断
    // APP可以在userAgent中添加特定的标识用来区分
    // APP也可以自动加一些参数来区分
    // 总之根据实际情况
    // 这里只是随便加了一个判断（比如有 mobile 标识，没有 browser 标识）
    return 'app'
  } else {
    return 'openweb'
  }
}
```

### 自动采集
> 参数
>- `url`：页面地址
>- `act`：行为（`open`、`refresh`、`redirection`、`close`）
>- `duration`：滞留时间，打开的话传`0`
>- `key`：产品代号
>- `m`：相同地址的图片会有缓存，为保证每次都能发出请求，多加一个参数。用随机数或者当前时间

```javascript
// sdkLog.js文件
let baseApi = 'https://xxxx/api/'
let startTime = (new Date()).getTime()
let key = getArgs()['key']
function sendAuto(act) {
  let params = {}
  let nowTime = (new Date()).getTime()
  let params = {
    url: window.location.href,
    act: act,
    duration: (act == 'open') ? 0 : Math.floor((nowTime - startTime) / 1000),
    key: key,
    m: nowTime
  }
  sendImg(baseApi + 'logs/auto' + formatParams(params))
  (act == 'open') && (startTime = nowTime)
}

// 没有找到办法区分是刷新、跳转还是关闭
// 这里就先只有打开和关闭。以后再想办法
window.onload = function() {
  sendAuto('open')
  window.onbeforeunload = function() {
    sendAuto('close')
  }
}
```

### 埋点功能
我们定义一个全局的数组变量`_sdkLog`

> 参数
>- `url`：页面地址
>- `type`：页面类型（`app`、`wechat`、`qq`、`openweb`）
>- `act`：活动或页面功能名
>- `op`：用户操作行为
>- `tag`：用户操作行为的附加信息，如有多条，使用`|`分割
>- `key`：产品代号
>- `m`：相同地址的图片会有缓存，为保证每次都能发出请求，多加一个参数。用随机数或者当前时间

```javascript
// html文件
var _sdkLog = _sdkLog || []
(function() {
  var sdk = document.createElement("script");
  sdk.src = "http://xxx/sdkLog.js?key=xxxxxxxxxxxxx";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(sdk, s);
})()


// sdkLog.js文件
function sendPoint(arr) {
  let params = {
    url: window.location.href,
    type: getBrowserType(),
    act: arr[0] ? arr[0] : '',
    op: arr[1] ? arr[1] : '',
    tag: arr[2] ? arr[2] : '',
    key: key,
    m: (new Date()).getTime()
  }
  if(Array.isArray(params.tag)) {
    params.tag = params.tag.join('|')
  }
  sendImg(baseApi + 'logs/point' + formatParams(params))
}
// 开放一个方法用于埋点
let logHistory = window._sdkLog || []
window._sdkLog = {
  push: function() {
    for(let i = 0; i < arguments.length; i++) {
      let arg = arguments[k]
      if(Array.isArray(arg)) {
        logHistory.push(arg)
        sendPoint(arg)
      }
    }
  }
}


// 埋点代码示例
_sdkLog.push(['帖子编辑框', '插入表情', '附加信息1|附加信息2'])
_sdkLog.push(['帖子编辑框', '插入表情'])
_sdkLog.push(['帖子编辑框', '插入表情', ['附加信息1', '附加信息2']])
```

### 开放方法
单页面应用等，当页面跳转时，没法监测到页面变动。

**方法一（不推荐）**
开放几个方法，单页面应用可以自行添加

```javascript
// sdkLog.js文件
// 提供给全局的方法
window.$sdkLog = {
  redirect() {
    sendAuto('redirection')
  },
  open() {
    sendAuto('open')
  },
  refresh() {
    sendAuto('refresh')
  }
}
```

**方法二（推荐）**
借鉴百度统计功能，不用上面的几个方法
通过给`_sdkLog`进行`push`操作的时候带不同的参数来实现埋点和页面跳转
埋点操作`_trackEvent`、页面跳转`_trackPageview`

具体代码如下：修改`window._sdkLog`部分

```javascript
let logHistory = window._sdkLog || []
window._sdkLog = {
  push: function() {
    for(let i = 0; i < arguments.length; i++) {
      let arg = arguments[k]
      if(Array.isArray(arg) && arg.length > 0) {
        switch (arg[0]) {
          case '_setAutoPageview':
            autoPageview = arg[1] ? true : false
            break
          case '_trackPageview':
            if (arg[1] === 'open') {
              sendAuto('open')
            } else if (arg[1] === 'redirect') {
              sendAuto('redirection')
            } else if (arg[1] === 'refresh') {
              sendAuto('refresh')
            }
            break
          case '_trackEvent':
            arg.splice(0, 1)
            logHistory.push(arg)
            sendPoint(arg)
            break
        }
      }
    }
  }
}


// 埋点代码示例
_sdkLog.push(['_trackEvent', '帖子编辑框', '插入表情', '附加信息1|附加信息2'])
_sdkLog.push(['_trackEvent', '帖子编辑框', '插入表情'])
_sdkLog.push(['_trackEvent', '帖子编辑框', '插入表情', ['附加信息1', '附加信息2']])

// 页面跳转代码示例
_sdkLog.push(['_trackPageview', 'open'])
_sdkLog.push(['_trackPageview', 'redirect'])
_sdkLog.push(['_trackPageview', 'refresh'])
```

### 压缩混淆
`sdkLog.js`文件需要进行压缩混淆
代码中使用的一些`ES6/7/8`语法需要转成`ES5`语法
这里我们使用`webpack + babel`做简单处理

- `npm init -y`
- 安装：`npm i webpack webpack-cli webpack-dev-server babel-core babel-loader babel-preset-env html-webpack-plugin cross-env --save-dev`
- 新建文件`webpack.config.js`

```javascript
const path = require('path')
// const htmlWebpackPlugin = require('html-webpack-plugin')

// 导出一个具有特殊属性配置的对象
module.exports = {
  entry:'./src/main.js',/* 入口文件模块路径 */
  output:{
    path:path.join(__dirname,'./dist/'),/* 出口文件模块所属目录，必须是一个绝对路径 */
    filename:'sdkLog.js'/* 打包的结果文件名称 */
  },
  // devServer:{
  //   // 配置webpack-dev-server的www目录
  //   host: 'localhost',
  //   port: 8080,
  //   contentBase:'./dist'
  // },
  plugins:[
    // 该插件可以把index.html打包到bundle.js文件所属目录，跟着bundle走
    // 同时也会自动在index.html中注入script引用链接，并且引用的资源名称，也取决于打包的文件名称
    // new htmlWebpackPlugin({
    //   template:'./index.html'
    // })
  ],
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/(node_modules)/,//排除掉node_module目录
        use:{
          loader:'babel-loader',
          options:{
            presets:['env'] //转码规则
          }
        }
      }
    ]
  }
}
```

- 修改`package.json`文件，添加一条命令`"build": "cross-env webpack --config webpack.config.js --progress"`
- 执行`npm run build`，即可在`dist/`目录打包生成压缩混淆后的`sdkLog.js`文件