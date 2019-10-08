---
tags: 前端, api
meta:
  - name: description
    content: Vue常用插件之axios：ajax请求
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,ajax
---

# axios

## 简介
`vue`官方推荐的`ajax`请求插件，可运行在客户端和服务器端

## 安装
插件安装：`npm i axios --save`

## 使用
- 在`src/utils/`目录下新建文件`request.js`，全局配置`axios`

```javascript
import axios from 'axios'
import { Toast } from 'mint-ui'

// 创建axios实例
const request = axios.create({
  baseURL: process.env.BASE_API // api的base_url  在 config/dev.env.js 和 config/prod.env.js 文件中配置
  // timeout: 5000                  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
    if (store.getters.token &&  process.env.BASE_API !== '/') {
        config.headers["QQ-Token"] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
}, error => {
    // Do something with request error
    Promise.reject(error)
})

// respone拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Toast(res.desc)
      return Promise.reject(new Error('error'))
    } else {
      return res.data
    }
  },
  error => {
    Toast(error.message)
    return Promise.reject(error)
  }
)

export default request
```

- `GET`请求

```javascript
request.get('/user', {
  params: { id: 12345 }
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```

- `POST`请求

```javascript
request.post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```

- 通用方法

```javascript
request({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
})
```

## 请求方法别名
在使用别名方法时， `url`、`method`、`data` 这些属性都不必在配置中指定

>- axios.request(config)
>- axios.get(url[, config])
>- axios.delete(url[, config])
>- axios.head(url[, config])
>- axios.post(url[, data[, config]])
>- axios.put(url[, data[, config]])
>- axios.patch(url[, data[, config]])

## 参考链接
[Axios中文说明](https://www.kancloud.cn/yunye/axios/234845)
