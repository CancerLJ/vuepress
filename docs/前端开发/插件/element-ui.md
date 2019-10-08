---
meta:
  - name: description
    content: Vue常用插件之element-ui：UI框架
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,element-ui
---

# element-ui

## 简介
`Vue`配套的一个`UI库`

## 安装使用
插件安装：`npm i element-ui --save`

`src/main.js`入口文件中引入
```javascript
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
```

## 案例
### 图片上传，带请求头

```html
<el-upload
  class="avatar-uploader"
  :action="urlUpload"
  :headers="headers"
  :show-file-list="false"
  :on-success="handleAvatarSuccess">
  <img v-if="url" :src="url" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
```

```javascript
import { getToken } from '@/utils/auth'

export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      headers: {
        "QQ-Token" : getToken()
      }
    };
  },
  computed: {
    urlUpload() {
      return process.env.BASE_API + '/xxx'
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.code === 0) {
        this.$emit('success', res.data.url, this.name)
      } else {
        this.$message.error(res.msg)
        // this.$refs.imageUpload.uploadFiles = this.$refs.imageUpload.uploadFiles.filter((item, index) => {
        //   if (item.response !== undefined) {
        //     return item.response.code === 0
        //   } else {
        //     return true
        //   }
        // })
      }  
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
```

### mp3文件上传（base64格式）

```html
<el-upload
  ref="upload"
  class="upload-demo"
  drag
  :multiple="false"
  :file-list="fileList"
  :limit="1"
  accept=".mp3"
  :http-request="handleMp3Upload"
>
<!-- :auto-upload="false" :on-success="handleSuccess" -->
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
</el-upload>
```

```javascript
import fetch from '@/utils/fetch'

export default {
  data() {
    return {
      fileList: [],
      headers: {
        "QQ-Token" : getToken()
      }
    }
  },
  methods: {
    handleMp3Upload() {
      let file = this.$refs.upload.uploadFiles[0].raw
      let name = file.name
      // 通过DOM取文件数据
      let reader = new FileReader()
      let f = file
      reader.readAsDataURL(f)
      let that = this
      reader.onload = function(e) {
        let binary = e.target.result
        //上传文件
        fetch({
          method: 'post',
          url: '/xxx',
          data: {
            name: name,
            file: binary
          }
        }).then(res => {
          if(res.code === 0) {
            that.$message.success(res.msg)
            that.$emit('success', res.data.url)
          } else {
            that.$message.error(res.msg)
            that.$refs.upload.uploadFiles = that.$refs.upload.uploadFiles.filter((item, index) => {
              if (item.response !== undefined) {
                return item.response.code === 0
              } else {
                return true
              }
            })
          }
        }).catch(error => {
          //失败继续处理
        })
      }
    }
  }
}
```

## 参考链接
- [Element-ui官方文档](http://element-cn.eleme.io/#/zh-CN/component/installation)
