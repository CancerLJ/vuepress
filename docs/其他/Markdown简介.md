---
sidebar: auto
tags: markdown
---

# Markdown简介
## Markdown是什么鬼
就像HTML一样，Markdown是一种轻量级的标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。
Markdown语法非常简单。常用的标记符号也不超过十个，学习成本不需要太多，且一旦熟悉这种语法，会有一劳永逸的效果。
Markdown可以导出为html文件、pdf文件、md文件。

## Markdown的用途
word文件、网上比较流行的富文本编辑器等。在编写完文字之后，为了达到想要的版面效果，还需要进行排版。过程略显复杂。
Markdown是为文档编写而生的。它可以让你专注于你的文字内容本身而不是排版样式。纯文本内容，兼容所有的文本编辑器与字处理软件。可读、直观，适合所有人。
由于语法简单明了，学习容易，且功能比纯文本更强，因此很多人用它写博客。世界上最流行的博客平台WordPress和大型CMS如Joomla、Drupal都能很好的支持Markdown。
用于编写说明文档，并且以“README.MD”的文件名保存在软件的目录下面。
有道云笔记等也开始支持Markdown编写日志。印象笔记支持Markdown显示，但编写推荐使用马克飞象（Markdown编辑利器，但如果想自动同步到印象笔记的话需要购买收费版的，貌似79元/年）。

## Markdown编辑器
工欲善其事必先利其器，好的编辑器可以起到事半功倍的效果。以下是比较常用的Markdown编辑器：
> 1.MarkdownPad：windows下很好用的一款Markdown编辑器。
> 2.Mou：Mac下用户体验很好的Markdown编辑器。
> 3.马克飞象：重度印象笔记依赖者不可或缺的编辑器。
> 4.CMD markdown：作业部落出品的在线Markdown编辑器。可以使用此款在线编辑器来进行语法学习，里面有语法帮助

当然你也可以自己DIY。比如使用Sublime Text，通过安装Markdown插件支持Markdown

## Markdown基本语法
- 标题 (几个#就是几级标题，标题可用来生成目录)
```
# 标题一
## 标题二
### 标题三
#### 标题四
##### 标题五
###### 标题六
```
- 目录
```
[TOC]
```
- 斜体
```
*斜体*
```
- 粗体
```
**粗体**
```
- 链接
```
[链接](http://www.baidu.com)
```
- 图片
```
![图片](https://www.3658mall.com/themes/3658mall/images/logo.png)
```
- 复选框
```
	- [ ] 未选中的复选框
	- [x] 已选中的复选框
```
- 无序列表
```
	- 无序列表
	- 无序列表
	
	+ 无序列表
	+ 无序列表
```
- 有序列表
```
	1.有序列表
	2.有序列表
	3.有序列表
```
- 引用
```
	&gt; 引用
	&gt; 引用
```
- 行内代码
```
	`行内代码`
```
- 代码区块
```
	上面用三个‘`’,下面也用三个‘`’包裹起来
```

`markdown`代码块支持的语言(可能不全)

| 名称 | 关键字 | 说明 |
| :-- | :-- | :-- |
| AppleScript | applescript | - |
| ActionScript 3.0 | actionscript3 , as3 | - |
| Shell | bash , shell | - |
| ColdFusion | coldfusion , cf | - |
| C | cpp , c | - |
| C# | c# , c-sharp , csharp | - |
| CSS | css | - |
| Delphi | delphi , pascal , pas | - |
| diff&patch | diff patch | 用代码版本库时,遇到代码冲突,其语法就是这个 |
| Erlang | erl , erlang | - |
| Groovy | groovy | - |
| Java | java | - |
| JavaFX | jfx , javafx | - |
| JavaScript | js , jscript , javascript | - |
| JSON | json | - |
| Perl | perl , pl , Perl | - |
| PHP | php | - |
| text | text , plain | 就是普通文本 |
| Python | py , python | - |
| Ruby | ruby , rails , ror , rb | - |
| SASS&SCSS | sass , scss | - |
| Scala | scala | - |
| SQL | sql | - |
| Visual Basic | vb , vbnet | - |
| XML | xml , xhtml , xslt , html | - |
| Objective C | objc , obj-c | - |
| F# | f# f-sharp , fsharp | - |
| - | xpp , dynamics-xpp | - |
| R | r , s , splus | - |
| matlab | matlab | - |
| swift | swift | - |
| GO | go , golang | - |



- 表格
```
| Item      |    Value | Qty  |
| :-------- | --------:| :--: |
| Computer  | 1600 USD |  5   |
| Phone     |   12 USD |  12  |
| Pipe      |    1 USD | 234  |
```
