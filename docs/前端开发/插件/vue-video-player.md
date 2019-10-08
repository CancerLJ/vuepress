---
meta:
  - name: description
    content: Vue常用插件之vue-video-player：Vue项目中播放视频或直播
  - name: keywords
    content: 喵巨人,前端,笔记,vue,插件,video,视频播放,直播,vue-video-player
---

# vue-video-player

## 简介
适用于`Vue`的`video.js`播放器组件。
可以播放视频或者直播

## 步骤
### 安装
- 安装：`npm i vue-video-player --save`

### 引入
有全局引入和组件引入两种方式。一般只是特定页面播放视频的话推荐使用组件引入的方式

**全局引入**

- 修改`src/main.js`文件

```javascript
import Vue from 'vue'
import VueVideoPlayer from 'vue-video-player'

import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

// Vue.use(VueVideoPlayer, {
//   // options & events
// })
Vue.use(VueVideoPlayer)
```

**组件引入**

```javascript
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    videoPlayer
  }
}
```

### 使用
在页面组件中使用

```html
<video-player
  class="ga-video-player-box"
  ref="myvideoPlayer"
  :class="classname"
  :options="playerOptions"
  :playsinline="true"
  customEventName="customstatechangedeventname"
  @play="onPlayerPlay($event)"
  @pause="onPlayerPause($event)"
  @ended="onPlayerEnded($event)"
  @waiting="onPlayerWaiting($event)"
  @playing="onPlayerPlaying($event)"
  @loadeddata="onPlayerLoadeddata($event)"
  @timeupdate="onPlayerTimeupdate($event)"
  @statechanged="playerStateChanged($event)"
  @ready="playerReadied"
>
</video-player>

<script>
export default {
  data() {
    return {
      playerOptions : {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",// 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: this.sources // url地址
        }],
        poster: "../../static/images/test.jpg", //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  // 全屏按钮
        }
      }
    }
  }
  computed: {
    player() {
      return this.$refs.myvideoPlayer.player
    }
  }
}
</script>
```

### 备注
`vue-video-player`其实就是`video.js`集成到`vue`中，所以千万不要再安装 video.js，可能会出错。

播放`HLS`流，需要`videojs-contrib-hls`插件，（！直接引用，因为在安装`vue-video-player`插件时，`hls`插件是一并下载下来的）
如果需要`RTMP`流，需要`videojs-flash`插件，也是直接引用就可以了（ `flash`插件需要在`hls`之前引用）

```javascript
import 'videojs-flash'
import 'videojs-contrib-hls'
```

## 参考链接
- [vue-video-player](https://www.npmjs.com/package/vue-video-player)
- [Video.js Documentation](https://docs.videojs.com/)