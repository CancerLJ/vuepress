# Ajax上传图片

## 需求
使用`ajax`手动提交图片文件

## 实现
- 在`Vue`项目中写的`demo`
- `ajax`提交使用`axios`
- 在`Vue`中`file`不能像其他`input`一样使用`v-model`双向数据绑定，因为文件选择是只读，只能用`onchange`监控值得变化
- 创建一个`FormData`对象，通过`append`向`form`对象添加数据。准备好数据后发送`ajax`请求上传数据
- 上传文件需要设置请求头`'Content-Type': 'multipart/form-data'`

关键代码如下
```html
<input type="file" ref="file" @change="getFile" />
<button @click="uploadFile">上传</button>
```

```javascript
getFile (e) {
  this.image = e.target.files[0]
},
uploadFile () {
  // console.log(this.$refs.file.files)
  if (this.image) {
    let param = new FormData() // 创建form对象
    param.append('image', this.image, this.image.name) // 通过append向form对象添加数据
    param.append('id', 47)
    axios.post('http://xxx/api/upImage', param, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'usertoken': 'afelagfjlaewgj55feagj3qfasf'
      }
    }).then(res => {
      console.log(res)
    })
  }
}
```
