# HTML5中的video标签


## 禁止video在ios系统中自动全屏播放
在移动端用video播放视频时，会自动全屏播放，我们可以用如下设置`webkit-playsinline='true' playsinline='true'`来禁止自动全屏播放。

```html
<video width="100%" height="auto" id="videoPlay1" poster="/hyData/weixinPages/images/video-img.png"
  controls=controls webkit-playsinline='true' playsinline='true'>
	<source src="" type="video/mp4">
</video>
```

## video的默认显示
在微信浏览器/safari/chrome上默认展示：`poster`

```html
<video controls poster="/images/w3html5.gif">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  您的浏览器不支持 video 标签。
</video>
```

`chrome`应用了默认行为截取了视频第一帧作为显示

微信浏览器和`safari`显示空白
可以通过canvas截取视频第一帧作为默认显示的图片

```javascript
var cut = function() {
  let canvas = document.createElement("canvas");//创建画布
  canvas.width = video.videoWidth * scale;
  canvas.height = video.videoHeight * scale;//设定宽高比
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);//将视频此刻帧数画入画布
  let img = document.createElement("img");
  img.src = canvas.toDataURL("image/png");
  Dom.appendChild(img);//写入到Dom
};
video.addEventListener('loadeddata',cut);//在视频帧数已加载时执行截取
```

## 视频铺满全屏
```css
#video{
	object-fit: fill;
}
```

## 视频结束时执行事件
```javascript
$("#video").get(0).addEventListener("ended", function() {
}, false);
```

## 微信浏览器下实现自动播放
```javascript
document.addEventListener("WeixinJSBridgeReady", function() {
  video.play()
}, false)
```