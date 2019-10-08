# Nuxt.js项目部署

## 需求
`Nuxt.js`项目，服务器端框架使用的是`Koa`。根目录下的`config/`目录做了多环境相关配置

`package.json`文件的`scripts`部分配置如下：

```json
{
  // ...
  "scripts": {
    "dev": "cross-env NODE_ENV=development env_config=dev nodemon server/index.js --watch server",
    "build:sit": "cross-env NODE_ENV=production env_config=sit nuxt build",
    "start:sit": "cross-env NODE_ENV=production env_config=sit node server/index.js",
    "generate:sit": "cross-env NODE_ENV=production env_config=sit nuxt generate",
    "build:prod": "cross-env NODE_ENV=production env_config=prod nuxt build",
    "start:prod": "cross-env NODE_ENV=production env_config=prod node server/index.js",
    "generate:prod": "cross-env NODE_ENV=production env_config=prod nuxt generate"
  },
  // ...
}
```

部署到`CentOS`服务器上面，使用`Nginx`做反向代理

## 步骤
### node安装
安装`nodejs`、`npm`和脚手架`vue-cli`

```bash
node -v
curl -sL https://rpm.nodesource.com/setup_10.x | bash -
yum install nodejs -y
node -v
npm -v
npm i vue-cli -g
```

### 文件上传

将项目文件上传到服务器项目目录下，比如：`/data/www/culture`

> 需要上传的目录和文件
>- `.nuxt/`：使用`npm run build:prod`打包生成的
>- `config/`：多环境配置目录，没有的话忽略
>- `server/`：服务器端不使用默认的`Nuxt`框架的话，会有此目录
>- `static/`：静态文件目录
>- `nuxt.config.js`：`nuxt`的配置文件
>- `package.json`：配置文件

### Nginx配置
`Nginx`安装自行搜索。这里使用的是`Tengine`

虚拟主机配置如下：

```nginx
upstream nodenuxt {
	server 127.0.0.1:3000;
	keepalive 64;
}

server {
	listen 80;
	server_name xxx.xxx.com;
	location / {
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;  
		proxy_set_header Connection "upgrade";
		proxy_set_header Host $host;
		proxy_set_header X-Nginx-Proxy true;
		proxy_cache_bypass $http_upgrade;
		proxy_pass http://nodenuxt;
	}
}
```

### 启动项目
- 切换到项目目录下，安装所需插件`npm i`
- 执行命令启动：`npm run start:prod`
- 浏览器中输入对应的域名就可以访问了

### pm2进程守护
上述方式进程不能常驻内存。
使用`pm2`守护进程

- 安装`pm2`：`npm i pm2 -g`
- 切换到项目目录下，执行命令：`pm2 start npm --name "culture" -- run start:prod`

> 备注
>- `culture`：项目名称，就是`package.json`文件中的`name`值
>- `run start:prod`：就是执行`package.json`文件中的`scripts`配置的命令`start:prod`

- 启动后可以用`pm2 list`命令查看进程列表

> **pm2**常用命令
>- `pm2 list`：查看当前正在运行的进程
>- `pm2 start all` ：启动所有应用
>- `pm2 restart all` ：重启所有应用
>- `pm2 stop all`：停止所有的应用程序
>- `pm2 delete all`：关闭并删除所有应用
>- `pm2 logs`：控制台显示所有日志
>- `pm2 start 0` ：启动id为0的指定应用程序
>- `pm2 restart 0` ：重启id为0的指定应用程序
>- `pm2 stop 0`：停止id为0的指定应用程序
>- `pm2 delete 0`：删除id为0的指定应用程序
>- `pm2 logs 0`：控制台显示编号为0的日志
>- `pm2 show 0` ：查看执行编号为0的进程
>- `pm2 monit jsyfShopNuxt`：监控名称为jsyfShopNuxt的进程