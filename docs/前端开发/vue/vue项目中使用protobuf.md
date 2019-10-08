---
meta:
  - name: description
    content: vue-cli脚手架搭建的vue项目中使用protobuf
  - name: keywords
    content: 喵巨人,前端,前端开发,JavaScript,vue,vue-cli,json,protobuf,protobuf.js
---

# vue项目中使用protobuf

## 简介

`Google Protocol Buffer`(简称`Protobuf`)是一种轻便高效的结构化数据存储格式，平台无关、语言无关、可扩展，可用于通讯协议和数据存储等领域。

> 有几个优点：
>1. 平台无关，语言无关，可扩展；
>2. 提供了友好的动态库，使用简单;
>3. 解析速度快，比对应的XML快约20-100倍；
>4. 序列化数据非常简洁、紧凑，与XML相比，其序列化之后的数据量约为1/3到1/10。

## 思路
- 在使用`vue-cli`脚手架搭建的`Vue`项目中使用
- 前端使用`protobuf.js`这个库来处理`proto`文件
- 接口请求相关资料是通过`yaml`文件保存的。前端使用`yaml-loader`处理
- `proto`文件和`yaml`文件由后端开发人员维护，前端直接拿过来用。

## 步骤
### 插件安装
```bash
npm i axios protobufjs --save
npm i yaml-loader --save-dev
```

### 命令添加
- 在`src/`目录下新建`proto/`目录
- 将所有的`proto`文件复制到`src/proto/`目录下
- 修改`package.json`文件。在`scripts`下面添加命令

```json
{
  // ...
  "scripts": {
    // ...
    "proto": "pbjs -t json-module -w commonjs -o src/proto/proto.js  src/proto/*.proto"
  },
  // ...
}
```

> 备注：
>- 通过此命令，可以将`src/proto/`目录下的所有`proto`文件生成一个`src/proto/proto.js`文件
>- 当然也可以生成`json`文件，但实践证明打包成`js`模块比较好用
>- `-w`参数可以指定打包js的包装器，这里用的是`commonjs`，即打包后的`js`文件是`nodejs`语法的。使用`require`、`module.exports`
>- 若想使用`es6`语法，可以将`-w`参数的`commonjs`修改成`es6`。具体配置看`protobuf.js`文档

### yaml文件处理

`yaml`文件示例

```yaml
commands:
  UploadCmd.ADVISOR_UPLOAD:
    name: "UploadInfo"
    url: "/advisor/upload"
    cmd: 0x6401
    comment: UploadInfo ADVISOR_UPLOAD  port 8811 上传图片或视频 FileExt FileData UseFor 必填
  UploadCmd.ADVISOR_UPLOAD_RSP:
    name: "UploadInfo"
    url: "/advisor/upload"
    cmd: 0x6402
    comment: ADVISOR_UPLOAD_RSP
```

- 在`src/`目录下新建`axios/`目录
- 将`yaml`文件复制到`src/axios/`目录下
- 修改`build/webpack.base.conf.js`文件，添加`yaml-loader`配置

```javascript
// ...
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.yaml$/,
        loader: 'yaml-loader',
        include: [resolve('src')]
      },
      // ...
    ]
  },
  // ...
}
```

引入文件代码

```javascript
import yaml from 'json-loader!yaml-loader!./protobuf.yaml'
console.log(yaml)
```

### ajax封装
在`src/axios/`目录下新建文件`request_pb.js`

`ajax`发起`http`请求的整个流程：`开始调用接口` -> `request_pb.js将数据变成二进制` -> `前端真正发起请求` -> `后端返回二进制的数据` -> `request_pb.js处理二进制数据` -> 获得数据对象

接口都是二进制的数据，所以需要设置`axios`的请求头，使用`arraybuffer`

```javascript
import axios from 'axios'
const httpService = axios.create({
  timeout: 45000,
  method: 'post',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/octet-stream'
  },
  responseType: 'arraybuffer'
})
```

`http_base.proto`里面定义了与后端约定的接口枚举、请求体、响应体如下：

```protobuf
syntax = "proto3";

package advisor;
// ...
// 请求
message ReqBase
{
	DeviceBase Dev 	    = 1;   // 设备信息
	uint64     UserId   = 2;   // 用户id
	uint32     Cmd 		= 3;   // 命令字
	uint64     MsgId 	= 4;   // BussnissId，业务号，客户端发起，原样返回
	string     SessionId = 5;  // SessionId
	bytes      PbBody    = 6;  // 数据内容
	string     MsgCtx 	 = 7;  // 请求描述
}

// 响应
message RetBase
{
	int32    Code   	= 1; // 错误码
	uint64   UserId     = 2; // 用户id
	uint32   Cmd 		= 3; // 命令字
	uint64   MsgId 	    = 4; // BussnissId，业务号，客户端发起，原样返回
	bytes    PbBody     = 6; // 数据内容
	string   MsgCtx 	= 7; // 错误描述
}
// ...
```

在`request_pb.js`文件中根据约定好的请求体、响应体编写

```javascript
// 请求体message
const PBMessageRequest = protoRoot.lookup('advisor.ReqBase')
// 响应体的message
const PBMessageResponse = protoRoot.lookup('advisor.RetBase')

// 构造公共请求体:PBMessageRequest
const reqData = {
  Dev: {},
  PbBody: {},
  SessionId: '',
  UserId: '',
  Cmd: '',
  MsgId: 0,
  MsgCtx: ''
}
```

`request_pb.js`完整代码如下：

```javascript
import axios from 'axios';
import protoRoot from '@/proto/proto'
import protobuf from 'protobufjs'
import store from '@/store'
import Msg from '@/utils/msg'
import { commands } from 'json-loader!yaml-loader!./protobuf.yaml'

const httpService = axios.create({
  timeout: 45000,
  method: 'post',
  baseURL: process.env.urlApi_go,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/octet-stream'
  },
  responseType: 'arraybuffer'
})

// 请求体message
const PBMessageRequest = protoRoot.lookup('advisor.ReqBase')
// 响应体的message
const PBMessageResponse = protoRoot.lookup('advisor.RetBase')

// 将请求数据encode成二进制，encode是proto.js提供的方法
function transformRequest(data) {
  const aa = PBMessageRequest.encode(data).finish()
  return aa;
}

function isArrayBuffer(obj) {
  return Object.prototype.toString.call(obj) === '[object ArrayBuffer]'
}

function transformResponseFactory(responseType, str) {
  return function transformResponse(rawResponse) {
    // 判断response是否是arrayBuffer
    if (rawResponse == null || !isArrayBuffer(rawResponse)) {
      return rawResponse
    }
    try {
      const buf = protobuf.util.newBuffer(rawResponse)
      // decode响应体
      const decodedResponse = PBMessageResponse.decode(buf)
      if (decodedResponse.Code === undefined || decodedResponse.Code === 0) {
        if (decodedResponse.PbBody && responseType) {
          const model = protoRoot.lookup(responseType)
          decodedResponse.data = model.decode(decodedResponse.PbBody)
          decodedResponse.data && (decodedResponse.data.code = 0)
        }
      } else {
        decodedResponse.data = {}
        decodedResponse.data.code = decodedResponse.Code
        decodedResponse.data.msg = decodedResponse.Message
      }
      decodedResponse.cmd_str = str
      return decodedResponse
    } catch (err) {
      return err
    }
  }
}

/**
 * request
 * @param {*} api 接口名称
 * @param {*} params 请求体参数
 */
function request(api, params) {
  const pbConstruct = protoRoot.lookup(commands[api].name)
  const requestBody = pbConstruct.encode(params).finish()
  // 构造公共请求体:PBMessageRequest
  const reqData = {
    Dev: {
      UUID: store.state.deviceId ? store.state.deviceId : ''
    },
    PbBody: requestBody,
    SessionId: store.state.sessionId ? store.state.sessionId : '',
    UserId: store.state.user ? store.state.user.UserId : '',
    Cmd: commands[api].cmd,
    MsgId: 0,
    MsgCtx: ''
  }
  // 将对象序列化成请求体实例
  const req = PBMessageRequest.create(reqData)

  // 这里用到axios的配置项：transformRequest和transformResponse
  // transformRequest 发起请求时，调用transformRequest方法，目的是将req转换成二进制
  // transformResponse 对返回的数据进行处理，目的是将二进制转换成真正的json数据
  return httpService.post(commands[api].url, req, {
    transformRequest,
    transformResponse: transformResponseFactory(commands[api+'_RSP'].rspName, api)
  }).then(({ data, status }) => {
    // 对请求做处理
    if (status !== 200) {
      const err = new Error('服务器异常')
      Msg.error('服务器异常', 3000);
      throw err
    } else if (data.Code === undefined || data.Code === 0) {
      return data.data
    } else if (data.Code === 13001 || data.Code === 13002 || data.Code === 13003) {
      // session out
      Msg.warning("Session timeout, sign in again!", 3000)
      store.dispatch('setSessionOut')
      store.dispatch('showLogin')
    } else {
      Msg.error(data.MsgCtx, 3000)
      return data.data
    }
  }, (err) => {
    throw err
  })
}

// 在request下添加一个方法，方便用于处理请求参数
request.create = function (protoName, obj) {
  const pbConstruct = protoRoot.lookup(protoName)
  return pbConstruct.encode(obj).finish()
}

export default request
```

### ajax调用

调用示例

```javascript
import request from '@/axios/request_pb'

const params = {
  WordKey: 'keyword',
  Skip: 0,
  Limit: 20
}
const res = await request('SearchCmd.FUZZY_SEARCH_ADVISOR', params)
```

