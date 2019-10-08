# 自动化构建工具gulp入门

## gulp简介
gulp是一款基于node.js前端自动化构建工具，利用 Node.js 流的威力，你可以快速构建项目并减少频繁的 IO 操作。增强前端开发工作流程。
## gulp安装
1. 安装node.js。此处不再累述。
2. 使用node.js的包管理工具npm安装gulp。（-g ： 全局安装）
```
npm install -g gulp
```
3. 安装完成后使用 `gulp -v`命令，确认gulp安装成功。

## gulp使用
1、 创建package.json，安装模块依赖（项目位置：d:\mtest\gulp\demo）
```
d:
cd mtest\gulp\demo
npm init
npm install gulp --save-dev
npm install gulp-uglify gulp-watch-path stream-combiner2 gulp-sourcemaps gulp-clean-css gulp-autoprefixer gulp-less gulp-ruby-sass gulp-imagemin gulp-util del gulp-rename --save-dev
```
代码解析：
>- `npm init`：可以生成package.json文件
>- gulp重新在项目下安装的原因：防止全局gulp升级后与此项目gulpfile.js代码不兼容
>- `--save-dev`：将依赖的模块更新到package.json文件中
>-`gulp-util`：gulp最基础的工具，基本上每个项目都会用到
>- `gulp-uglify`：压缩JavaScript
>- `gulp-watch-path`：检测修改的文件
>- `stream-combiner2`：文件中有js错误时，显示信息，继续执行
>- `gulp-sourcemaps`：生成maps，便于调试
>- `gulp-clean-css`：压缩 CSS。原来是`gulp-minify-css`
>- `gulp-autoprefixer`：给 CSS 增加前缀。解决某些CSS属性不是标准属性，有各种浏览器前缀的情况
>- `gulp-less`：less编译
>- `gulp-ruby-sass`：sass编译
>- `gulp-imagemin`：除了能压缩常见的图片格式，还能压缩 SVG
>- `gulp-rename`：修改文件名称。比如有时我们需要把app.js改成app.min.js
>- `del`：删除
>- `gulp-htmlmin`：压缩 HTML
>- `gulp-concat`：合并文件

2、 生成package.json等配置后，其他人安装依赖的模块，只需要运行命令：`npm install`即可。

3、 新建`gulpfile.js`作为入口文件

4、 设计目录：例如
```
src
		css
		js
		images
		fonts
		less
		sass
dist
```

5、 编写`gulpfile.js`文件代码

6、 使用`gulp`命令执行。备注：不带参数时，默然执行的是default

## gulpfile.js代码
1、 配置错误信息输出
```javascript
var gulp = require('gulp'),
	gutil = require('gulp-util');
var handleError = function(err){
	var colors = gutil.colors;
	console.log('\n');
	gutil.log(colors.red('Error!'));
	gutil.log('fileName: ' + colors.red(err.fileName));
	gutil.log('lineNumber: ' + colors.red(err.lineNumber));
	gutil.log('message: ' + err.message);
	gutil.log('plugin: ' + colors.yellow(err.plugin));
}
```
2、 js代码压缩
```javascript
var uglify = require('gulp-uglify');
//代码压缩
gulp.task('uglifyjs', function(){
	var combined = combiner.obj([
		gulp.src('src/js/**/*.js'),
		sourcemaps.init(),
		rename({suffix : '.min'}),
		uglify(),
		sourcemaps.write('./map/'),
		gulp.dest('dist/js')
	])

	combined.on('error', handleError)
	//gulp.src('src/js/**/*.js')
	//	.pipe(uglify())
	//	.pipe(gulp.dest('dist/js'))
});
//代码修改检测
gulp.task('watchjs', function(){
	gulp.watch('src/js/**/*.js', function(event){
		var paths = watchPath(event, 'src/', 'dist/');
		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
		gutil.log('Dist ' + paths.distPath);

		var combined = combiner.obj([
			gulp.src(paths.srcPath),
			sourcemaps.init(),
			rename({suffix : '.min'}),
			uglify(),
			sourcemaps.write('./map/'),
			gulp.dest(paths.distDir)
		])

		combined.on('error', handleError)
	})
})
```

3、 css代码压缩
```javascript
gulp.task('lesscss', function(){
	var combined = combiner.obj([
		gulp.src('src/less/**/*.less'),
		sourcemaps.init(),
		less(),
		rename({suffix : '.min'}),
		minifycss(),
		sourcemaps.write('./map/'),
		gulp.dest('dist/css')
	])

	combined.on('error', handleError);
});
```

4、 images图片压缩
```javascript
gulp.task('image', function(){
	gulp.src('src/images/**/*')
		.pipe(imagemin({
			progressive : true
		}))
		.pipe(gulp.dest('dist/images'))
})
```

5、 fonts文件迁移
```javascript
gulp.task('fonts', function(){
	gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts/'))
})
```

6、 less文件编译
```javascript
gulp.task('lesscss', function(){
	var combined = combiner.obj([
		gulp.src('src/less/**/*.less'),
		sourcemaps.init(),
		less(),
		rename({suffix : '.min'}),
		minifycss(),
		sourcemaps.write('./map/'),
		gulp.dest('dist/css')
	])

	combined.on('error', handleError);
});
```

7、 sass文件编译
```javascript
gulp.task('sasscss', function(){
	sass('src/sass/')
		.on('error', function(err){
			console.error('Error!', err.message);
		})
		.pipe(sourcemaps.init())
		.pipe(rename({suffix : '.min'}))
		.pipe(minifycss())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/css'))
});
```

Demo下载：[猛戳这里](/download/gulp.zip)

## 相关网站
>- [gulp中文网](http://www.gulpjs.com.cn/)
>- [gulp使用小结一](http://www.cnblogs.com/Darren_code/p/gulp.html)
>- [前端构建工具gulp入门教程](https://segmentfault.com/a/1190000000372547)