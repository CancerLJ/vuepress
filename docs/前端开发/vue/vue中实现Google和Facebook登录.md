---
meta:
  - name: description
    content: Google和Facebook的第三方登录在Vue中实现
  - name: keywords
    content: 喵巨人,前端,笔记,Vue,webpack,第三方登录,Google,Facebook
---

# Vue中实现Google和Facebook第三方登录

## 思路
> 第三方登陆简单可以分为以下几个步骤
>1. 获得第三方登陆许可认证
>2. 根据规范添加页面登录样式和js实现
>3. 后台对登录信息进行校验，并获取对应第三方登陆用户的信息
>4. 将第三方用户信息与本系统用户进行关联

## Google
这里使用`vue-google-signin-button-directive`

- 安装插件：`npm i vue-google-signin-button-directive --save`
- 登录页面添加相关指令和回调

```html
<button v-google-signin-button="clientId" class="login-third-btn google" type="button">Google</button>

<script>
import 'vue-google-signin-button-directive'

export default {
  data() {
    return {
      clientId: '*****' // 申请的GoogleKey
    }
  },
  methods: {
    OnGoogleAuthSuccess(idToken) {
      // 请求后端接口，对登录信息进行校验
      this.GoogleLoginWithIdToken(idToken)
    },
    OnGoogleAuthFail(error) {
      console.log(error)
    },
    async GoogleLoginWithIdToken(idToken) {
      let res = await GoogleLoginWithIdToken(idToken)
      if (res.code === 0) {
        console.log('Google login success')
      }
    }
  }
}
</script>
```

## FaceBook
- 引入`JS`文件

```javascript
(function (d) {
  var js, id = "facebook-jssdk";
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement("script");
  js.id = id;
  js.async = true;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  d.getElementsByTagName("head")[0].appendChild(js);
})(window.document);
```

- 异步初始化

```javascript
window.fbAsyncInit = function () {
  FB.init({
    appId: '******',  // 申请的appid
    cookie: true,
    xfbml: true,
    oauth: true,
    version: 'v3.2'
  });
};
```

- 登录页面登录操作

```html
<button class="login-third-btn facebook" type="button" @click="handleFaceBookLogin">Facebook</button>

<script>
export default {
  methods: {
    handleFaceBookLogin() {
      let vue_this = this;
      FB.login(function(response) {
        // get facebook user info
        // FB.api("/me?fields=id,name,picture", function(response) {
        //   // console.log('Good to see you, ' + response.name + '.')
        //   // console.log('picture=' + response.picture.data.url)
        // })
        // 登录回调函数
        vue_this.statusChangeCallBack(response)
      }, { scope: "public_profile" })
    },
    async statusChangeCallBack(response) {
      if (response.status === "connected") {
        var params = {
          id_token: response.authResponse.accessToken
        }
        const res = await FaceBookCallBack(params)
        if (res.code === 0) {
          console.log('Facebook login success')
        }
      }
    },
  }
}
</script>
```