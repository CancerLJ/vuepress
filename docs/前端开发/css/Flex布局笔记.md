# Flex布局笔记

## 简介
`flex`的核心的概念就是`容器`和`轴`。容器包括外层的`父容器`和内层的`子容器`，轴包括`主轴`和`交叉轴`

- 任何一个容器都可以指定为Flex布局。

```css
.box{
  display: flex;
}
```

- 行内元素也可以使用Flex布局。

```css
.box{
  display: inline-flex;
}
```

- Webkit内核的浏览器，必须加上-webkit前缀。

```css
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```

**备注**：
设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。


## 父容器
容器具有这样的特点：
- 父容器可以统一设置子容器的排列方式，子容器也可以单独设置自身的排列方式。
- 如果两者同时设置，以子容器的设置为准。

![容器](http://www.runoob.com/wp-content/uploads/2015/07/3791e575c48b3698be6a94ae1dbff79d.png)

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。

项目默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。

### 父容器：`justify-content`
主轴方向子容器对齐方式

![justify-content](//www.runoob.com/wp-content/uploads/2015/07/c55dfe8e3422458b50e985552ef13ba5.png)

>- `flex-start`：起始端对齐
>- `flex-end`：末尾段对齐
>- `center`：居中对齐
>- `space-around`：子容器沿主轴均匀分布，位于首尾两端的子容器到父容器的距离是子容器间距的一半。
>- `space-between`：子容器沿主轴均匀分布，位于首尾两端的子容器与父容器相切。

### 父容器：`align-items`
交叉轴方向子容器对齐方式

![align-items](//www.runoob.com/wp-content/uploads/2015/07/2b0c39c7e7a80d5a784c8c2ca63cde17.png)

>- `flex-start`：起始端对齐
>- `flex-end`：末尾段对齐
>- `center`：居中对齐
>- `baseline`：基线对齐，这里的 baseline 默认是指首行文字，即 first baseline，所有子容器向基线对齐，交叉轴起点到元素基线距离最大的子容器将会与交叉轴起始端相切以确定基线。
>- `stretch`：子容器沿交叉轴方向的尺寸拉伸至与父容器一致。

### 父容器：`align-content`
当子容器多行排列时，设置行与行之间的对齐方式。
如果子容器只有一根轴线，该属性不起作用

![align-content](//www.runoob.com/wp-content/uploads/2015/07/f10918ccb8a13247c9d47715a2bd2c33.png)

>- `flex-start`：起始端对齐
>- `flex-end`：末尾段对齐
>- `center`：居中对齐
>- `space-around`：等边距均匀分布
>- `space-between`：等间距均匀分布
>- `stretch`：拉伸对齐

### 父容器：`flex-direction`
主轴方向设置
主轴沿逆时针方向旋转`90°`就得到了交叉轴
起始端由`flex-start`表示，末尾段由`flex-end`表示

![flex-direction](//www.runoob.com/wp-content/uploads/2015/07/0cbe5f8268121114e87d0546e53cda6e.png)

>- 向右：`flex-direction: row`
>- 向下：`flex-direction: column`
>- 向左：`flex-direction: row-reverse`
>- 向上：`flex-direction: column-reverse`

### 父容器：`flex-wrap`
决定子容器是否换行排列，不但可以顺序换行而且支持逆序换行

![flex-wrap](//www.runoob.com/wp-content/uploads/2015/07/903d5b7df55779c03f2687a7d4d6bcea.png)

>- `nowrap`：不换行
> ![nowrap](//www.runoob.com/wp-content/uploads/2015/07/9da1f23965756568b4c6ea7124db7b9a.png)
>- `wrap`：换行
> ![wrap](//www.runoob.com/wp-content/uploads/2015/07/3c6b3c8b8fe5e26bca6fb57538cf72d9.jpg)
>- `wrap-reverse`：逆序换行
> ![wrap-reverse](//www.runoob.com/wp-content/uploads/2015/07/fb4cf2bab8b6b744b64f6d7a99cd577c.jpg)

### 父容器：`flex-flow`
轴向与换行组合设置。
子容器沿着哪个方向流动，流动到终点是否允许换行
是一个复合属性，相当于`flex-direction`与`flex-wrap`的组合

>- `row`、`column`等，可单独设置主轴方向
>- `wrap`、`nowrap`等，可单独设置换行方式
>- `row nowrap`、`column wrap`等，也可两者同时设置


## 子容器
### 子容器：`flex`
子容器是有弹性的（flex 即弹性），它们会自动填充剩余空间，子容器的伸缩比例由 flex 属性确定
flex 的值可以是无单位数字（如：1, 2, 3），也可以是有单位数字（如：15px，30px，60px），还可以是 none 关键字。子容器会按照 flex 定义的尺寸比例自动伸缩，如果取值为none 则不伸缩。

该属性是`flex-grow`、`flex-shrink`、`flex-basis`的简写。默认值：`0 1 auto`

### 子容器：`align-self`
单独设置子容器如何沿交叉轴排列
此属性的可选值与父容器 align-items 属性完全一致，如果两者同时设置则以子容器的 align-self 属性为准。

![align-self](//www.runoob.com/wp-content/uploads/2015/07/55b19171b8b6b9487d717bf2ecbba6de.png)

>- `flex-start`：起始端对齐
>- `flex-end`：末尾段对齐
>- `center`：居中对齐
>- `baseline`：基线对齐
>- `stretch`：拉伸对齐

### 子容器：`flex-basis`
在不伸缩的情况下子容器的原始尺寸。主轴为横向时代表宽度，主轴为纵向时代表高度。

### 子容器：`flex-grow`
子容器弹性伸展的比例。剩余空间按比例分配给子容器。
默认为0，即如果存在剩余空间，也不放大

![flex-grow](//www.runoob.com/wp-content/uploads/2015/07/f41c08bb35962ed79e7686f735d6cd78.png)

### 子容器：`flex-shrink`
子容器弹性收缩的比例。超出的部分按比例从给子容器中减去。
默认为1。设置为0的话，不缩小
负值无效

![flex-shrink](//www.runoob.com/wp-content/uploads/2015/07/240d3e960043a729bb3ff5e34987904f.jpg)

### 子容器：`order`
子容器的排列顺序，覆盖HTML代码中的顺序，默认值为 0，可以为负值，数值越小排列越靠前。

![order](//www.runoob.com/wp-content/uploads/2015/07/59e399c72daafcfcc20ede36bf32f266.png)
