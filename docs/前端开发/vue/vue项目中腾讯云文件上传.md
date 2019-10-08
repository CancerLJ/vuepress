---
meta:
  - name: description
    content: 在vue项目中上传文件到腾讯云对象存储
  - name: keywords
    content: 喵巨人,前端,笔记,vue,文件上传,腾讯云
---

# Vue项目中腾讯云文件上传

## 简介
文件上传一般是前端将文件通过`form表单`或者`ajax`提交给后端

这里介绍前端直接上传文件到腾讯云的对象存储中

小文件直接上传，大文件用分片上传的方式。

文件分片上传需要一个识别文件的唯一标识。而`md5`是非常合适的，前端在文件上传前在本地使用`spark-md5`计算`md5`

## 准备
- 注册腾讯云账号
- 到`COS对象存储控制台`创建存储桶，得到`Bucket`（存储桶名称）和`Region`（地域名称）
- 到`控制台密钥管理`获取项目的`SecretId`和`SecretKey`

## 步骤
### 安装

- 安装：`npm i cos-js-sdk-v5 spark-md5 --save`

### 使用
- 在`config/dev.env.js`和`config/prod.env.js`文件中添加相关配置

```javascript
module.exports = {
  // ...
  Bucket: '"xxx-xxx-xxx"', // Bucket
  Region: '"ap-beijing"', // Region
  Domain:'"xxx.xxx.com"',  // Domain
}
```

- 在`src/utils/`目录下新建文件`uploadfile.js`

```javascript
import COS from 'cos-js-sdk-v5'
import SparkMD5 from 'spark-md5'
import { getCOSAuth } from '@/axios/api'

var key = ''
// 配置
const cosConfig = {
  Bucket: process.env.Bucket,
  Region: process.env.Region,
  Domain: process.env.Domain
}

// 初始化实例
var cos = new COS({
  getAuthorization: async function(options, callback) {
    /**
     * 签名计算放在前端会暴露 SecretId 和 SecretKey
     * 我们把签名计算过程放在后端实现，前端通过 ajax 向后端获取签名结果
     * 正式部署时请再后端加一层自己网站本身的权限检验。 
     * 异步获取临时密钥
     */
    const res = await getCOSAuth()
    const authdata = res.data.response
    const auth = {
      TmpSecretId: authdata.credentials.tmpSecretId,
      TmpSecretKey: authdata.credentials.tmpSecretKey,
      XCosSecurityToken: authdata.credentials.sessionToken,
      ExpiredTime: authdata.expiredTime // 在ExpiredTime时间前，不会再次调用getAuthorization
    }
    callback(auth)
  },
  FileParallelLimit: 3, // 文件并发数
  ChunkParallelLimit: 8, // 同一个上传文件的分块并发数
  ChunkSize: 1024 * 1024 * 8 // 分块上传时，每块的字节数大小
})

// 获取cos存储的图片地址，替换为域名地址
function getObjectUrl() {
  const url = cos.getObjectUrl({
    Bucket: cosConfig.Bucket,
    Region: cosConfig.Region,
    Key: key,
    Sign: false
  }, function(err, data) {
    // console.log(err || data)
  })
  // 腾讯云的地址替换为域名地址
  const p = `${cosConfig.Bucket}.cos.${cosConfig.Region}.myqcloud.com`
  return url.replace(p, cosConfig.Domain)
}

// 获得文件md5
function getFileMD5(file, callback) {
  // 声明必要的变量
  const fileReader = new FileReader()
  // 文件每块分割2M，计算分割详情
  const chunkSize = 2 * 1024 * 1024;
  const chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0

  // 创建md5对象（基于SparkMD5）
  const spark = new SparkMD5()

  // 每块文件读取完毕之后的处理
  fileReader.onload = function(e) {
    // 每块交由sparkMD5进行计算
    spark.appendBinary(e.target.result)
    currentChunk++

    // 如果文件处理完成计算MD5，如果还有分片继续处理
    if (currentChunk < chunks) {
      loadNext()
    } else {
      callback(spark.end())
    }
  }

  // 处理单片文件的上传
  function loadNext() {
    const start = currentChunk * chunkSize
    const end = start + chunkSize >= file.size ? file.size : start + chunkSize

    fileReader.readAsBinaryString(file.slice(start, end))
  }

  loadNext()
}

// 大文件分片上传-通过sliceUploadFile上传
export function uploadFile(file, callback, progressBc) {
  // 得到md5码
  getFileMD5(file, md5 => {
    // 存储文件的md5码
    file.md5 = md5
    const subfix = file.name.substr(file.name.lastIndexOf('.'))
    key = file.md5 + subfix;
    cos.sliceUploadFile({
      Bucket: cosConfig.Bucket,
      Region: cosConfig.Region,
      Key: key,
      Body: file,
      onProgress: function(progressData) {
        progressBc(progressData.percent)
      }
    }, function(err, data) {
      if (err) {
        callback(err)
      } else {
        data.fid = getObjectUrl()
        callback(null, data)
      }
    })
  })
}

// 小文件直接上传-通过putObject上传
export function uploadFile2(file, callback, progressBc) {
  // 得到md5码
  getFileMD5(file, md5 => {
    // 存储文件的md5码
    file.md5 = md5
    const subfix = file.name.substr(file.name.lastIndexOf('.'))
    key = file.md5 + subfix
    cos.headObject({
      Bucket: cosConfig.Bucket,
      Region: cosConfig.Region,
      Key: key
    }, function(err, data) {
      if (err != null) {
        cos.putObject({
          Bucket: cosConfig.Bucket,
          Region: cosConfig.Region,
          Key: key,
          Body: file,
          onProgress: function(progressData) {
            // console.log(JSON.stringify(info))
            progressBc(progressData.percent)
          }
        }, (err, data) => {
          if (err && err.error) {
            // wx.showModal({ title: '返回错误', content: '请求失败：' + err.error.Message + '；状态码：' + err.statusCode, showCancel: false });
          } else if (err) {
            // wx.showModal({ title: '请求出错', content: '请求出错：' + err + '；状态码：' + err.statusCode, showCancel: false });
          } else {
            callback(key)
            //  wx.showToast({ title: '上传成功', icon: 'success', duration: 3000 });
          }
        })
      } else if (data != null) {
        callback(key)
      }
    })
  })
}
```

- 组件中使用

```javascript
import { uploadFile } from '@/utils/uploadfile'

export default {
  mounted() {
    document.getElementById('file-selector').onchange = function () {
      var file = this.files[0]
      if (!file) return
      this.cosUploadFile(file)
    }
  },
  methods: {
    // 通过腾讯云 cos-js-sdk-v5 上传
    cosUploadFile(file) {
      const that = this
      uploadFile(file, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          that.$emit('getUploadFiles', data)
        }
      })
    }
  }
}
```

## 参考链接
- [cos-js-sdk-v5](https://github.com/tencentyun/cos-js-sdk-v5)
- [spark-md5](https://www.npmjs.com/package/spark-md5)
