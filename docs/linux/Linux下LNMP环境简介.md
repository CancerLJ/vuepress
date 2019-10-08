# Linux下LNMP环境简介

## LNMPA安装
- 网址：http://lnmp.org/install.html
- 安装步骤：
> 1. 使用putty、SSH Secure Shell Client或类似的SSH工具登陆VPS或服务器。
> 2. 安装前运行screen命令，创建screen会话，防止网络突然掉线或者不小心关闭putty等：`screen -S lnmp`
>      如果提示screen: command not found 命令不存在可以执行：`yum install screen` 或 `apt-get install screen`安装，详细内容参考[screen教程](http://www.vpser.net/manage/run-screen-lnmp.html)。
> 3. 下载并安装LNMP一键安装包：可以选择使用下载版（推荐国外或者美国VPS使用）或者完整版（推荐国内VPS使用），两者没什么区别，只是完整版把一些需要的源码文件预先放到安装包里。
>      安装LNMP执行：`wget -c http://soft.vpser.net/lnmp/lnmp1.2-full.tar.gz && tar zxf lnmp1.2-full.tar.gz && cd lnmp1.2-full && ./install.sh lnmp`。
>      需要安装LNMPA或LAMP，将./install.sh 后面的参数替换为lnmpa或lamp即可。
>      备注：安装命令可以分别执行
>      - `wget -c http://soft.vpser.net/lnmp/lnmp1.2-full.tar.gz`
>      - `tar zxf lnmp1.2-full.tar.gz`
>      - `cd lnmp1.2-full`
>      - `./install.sh lnmpa`
>      **备注：**
>      - lnmpa = lnmp + Apache
>      - MySQL版本：MySQL 5.5.42（default）（安装最新的吧）
>      - PHP版本：PHP 5.4.40（default）（ecshop建议安装5.4）
>      - Apache版本：Apache 2.4.10
>      - Nginx、MySQL、PHP都是running，80和3306端口都存在，并Install lnmp V1.2 completed! enjoy it.的话，说明已经安装成功。

## 安装 Memcached
进入lnmp解压后的目录，执行：`./addons.sh install memcached` 
[LNMP 开启 Memcached 内存缓存加速网站](https://www.cmhello.com/lnmp-memcached.html)
卸载是：`./addons.sh uninstall memcached`

YII用的是memcache，不是memcached，安装的时候，选择1

## 添加虚拟主机

`lnmp vhost add`
> **备注**
> 1. 带`www`和不带`www`的是不同的域名，若需同时访问，需要同时绑定。
> 2. 网站目录的路径必须为全路径（即以/开头的完整路径）。
> 3. 日志`Y `直接回车默认即可。
> 4. MySQL一般使用外部的数据库，此处`N`。

备注：虚拟主机默认是root账号所有，程序等读写文件会有权限问题，需要修改虚拟主机目录的读写权限。
例如虚拟主机目录：`/data/www/about`，命令如下：

```
chmod -R 777 /data/www/about
chown -R www:www /data/www/about
```


## 伪静态管理
> 虚拟主机配置文件：`/usr/local/nginx/conf/vhost/域名.conf`
> 伪静态规则文件需要放在`/usr/local/nginx/conf/`下面


## 列出网站（虚拟主机）

`lnmp vhost list`


## 删除网站（虚拟主机）

`lnmp vhost del`
> 以上命令只是删除虚拟主机配置文件，网站文件并不会删除，需要自己删除。
> chattr -i /网站目录/.user.ini后才能删除网站目录


## 默认网站（虚拟主机）
> LNMP默认网站配置文件：`/usr/local/nginx/conf/nginx.conf`
> LNMPA默认网站配置文件：`/usr/local/nginx/conf/nginx.conf`和`/usr/local/apache/conf/extra/httpd-vhosts.conf`
> LAMP默认网站配置文件：`/usr/local/apache/conf/extra/httpd-vhosts.conf`


## 修改虚拟主机配置
> Nginx配置文件：`/usr/local/nginx/conf/vhost/`目录下的相关文件。
> Apache配置文件：`/usr/local/apache/conf/vhost/`目录下的相关文件。
> 修改完成后，需重启Nginx或者Apache后才生效。


## 反向代理设置
1. 修改nginx的虚拟主机配置。eg：`www.abc.com.conf`。原文件内容如下：

```
server
    {
        listen 80;
        #listen [::]:80;
        server_name www.abc.com abc.com;
        index index.html index.htm index.php default.html default.htm default.php;
        root  /data/www/test;

        location /
        {
            try_files $uri @apache;
        }

        location @apache
        {
            internal;
            proxy_pass http://127.0.0.1:88;
            include proxy.conf;
        }

        location ~ [^/]\.php(/|$)
        {
            proxy_pass http://127.0.0.1:88;
            include proxy.conf;
        }

        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
        {
            expires      30d;
        }

        location ~ .*\.(js|css)?$
        {
            expires      12h;
        }

        access_log off;
    }
```

修改为

```
server
    {
        listen 80;
        server_name www.abc.com abc.com;

        location /
        {
            proxy_pass              http://xxx.xxx.xxx.xxx:xx;
            proxy_redirect          off;
            proxy_set_header        X-Real-IP       $remote_addr;
            proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for; 
        }

        access_log off;
    }
```

其中`http://xxx.xxx.xxx.xxx:xx`为代理的服务器。

2. 检查nginx的配置是否正常：`/usr/local/nginx/sbin/nginx -t`。正常时，提示代码如下

```
the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok
configuration file /usr/local/nginx/conf/nginx.conf test is successful
```

3. 使配置生效（可以直接lnmp restart 重启lnmpa环境）：kill -HUP `cat /usr/local/nginx/logs/nginx.pid` 。

4. 配置生效后就可以用域名访问代理的网站了。


## mySQL
### 重设mySQL的root密码
执行如下命令：
> `wget http://soft.vpser.net/lnmp/ext/reset_mysql_root_password.sh`
> `sh reset_mysql_root_password.sh`

### 防火墙开放3306端口
- 执行命令：`vi /etc/sysconfig/iptables`
- 添加以下记录：`-A INPUT -p tcp -m tcp --dport 3306 -j ACCEPT`
- 保存退出



## Nginx与Apache禁止目录执行php文件权限
服务器配置过程中，经常需要对指定的目录进行权限配置，比如上传目录，是属于不安全目录，我们需要禁止其执行php脚本的权限，nginx与apache禁止目录执行php文件权限方法如下：
**Nginx禁止目录执行php文件权限**
打开Nginx相应的虚拟主机配置文件，在server处添加如下代码
（禁止data/csv目录执行php文件权限）

```
location ~ /data/csv/.*.(php|php5)?$
{
	deny all;
}
```

（禁止data与upload目录执行php文件权限）

```
location ~ /(data|upload)/.*.(php|php5)?$
{
	deny all;
}
```

配置完后，重启Nginx即可。

**Apache禁止目录执行php文件权限**
以Apache 模块方式运行 PHP，打开Apache相应的虚拟主机配置文件，在文件中添加如下代码：
（禁止data/csv目录执行php文件权限）

```
<Directory /data/www/about/trunk/data/csv>
	php_flag engine off
	<Files ~ ".php">
		Order allow,deny
		Deny from all
	</Files>
</Directory>
```

配置完成后，重启Apache即可。

> **参考网站**
> - [nginx与Apache禁止目录执行php文件权限](http://www.php100.com/html/program/nginx/2013/0905/5534.html)


## Nginx与Apache禁止.htaccess文件下载
**apache配置**
在虚拟主机的配置文件中的Directory里面，添加如下代码：

```
<Files .htaccess>  
	Order allow,deny  
	deny from all  
</Files>  
```

**nginx配置**
在虚拟主机的配置文件中，添加如下代码：

```
location ~ /.htaccess$
{
	deny all;
}
```

配置完成后，重启lnmp环境。

## LNMPA 设置404等错误页面
**方法一**：设置`.htaccess`文件，添加如下代码：

```
ErrorDocument 400 /errpage/400.html
ErrorDocument 401 /errpage/401.html
ErrorDocument 403 /errpage/403.html
ErrorDocument 404 /errpage/404.html
ErrorDocument 405 /errpage/405.html
ErrorDocument 500 /errpage/500.html
ErrorDocument 503 /errpage/503.html
```

**方法二**：设置nginx配置
①：修改`/usr/local/nginx/conf/nginx.conf`文件
在fastcgi_temp_file_write_size 128k; 下面添加 

```
fastcgi_intercept_errors on;
```

②：修改虚拟主机的配置文件，eg：`/usr/local/nginx/conf/vhost/www.abc.com.log`
添加如下代码：

```
error_page 400 = /errpage/400.html;
error_page 401 = /errpage/401.html;
error_page 403 = /errpage/403.html;
error_page 404 = /errpage/404.html;
error_page 405 = /errpage/405.html;
error_page 500 = /errpage/500.html;
error_page 503 = /errpage/503.html;
```
③：测试配置：`/usr/local/nginx/sbin/nginx -t`
④：没有错误就重启nginx：`/etc/init.d/nginx restart`

## LNMPA的IP访问的默认网站设置
1. 配置nginx：打开文件`/usr/local/nginx/conf/nginx.conf`文件，在`server` 处编辑站点绑定的目录

```
listen 80 default_server;
#listen [::]:80 default_server ipv6only=on;
server_name www.lnmp.org;
index index.html index.htm index.php;
root  /data/www/about;
```

2. 配置apache：打开文件：`/usr/local/apache/conf/extra/httpd-vhosts.conf`文件，编辑站点绑定的目录

```
<VirtualHost *:88>
ServerAdmin webmaster@example.com
#php_admin_value open_basedir "/data/www/about:/tmp/:/var/tmp/:/proc/"
DocumentRoot "/data/www/about"
ServerName www.lnmp.org
ErrorLog "/data/wwwlogs/IP-error_log"
CustomLog "/data/wwwlogs/IP-access_log" common
<Directory "/data/www/about">
    SetOutputFilter DEFLATE
    Options FollowSymLinks
    AllowOverride All
    Order allow,deny
    Allow from all
    DirectoryIndex index.html index.php
</Directory>
</VirtualHost>
```

3. 测试 nginx 和 apache 配置是否正确。

4. 重启 lnmp，使其生效即可 

**备注**
默认站点使用的端口号为80端口，apache使用的端口号为88端口。
在给该IP设置虚拟主机时，不要占用这两个端口。

## LNMPA使用IP + 端口号的形式访问站点设置
此IP为服务器分配的IP，以192.168.0.66:8880为例
1. 配置 nginx：打开文件`/usr/local/nginx/conf/vhost/192.168.0.66.conf`，为其添加站点配置

```
server
    {
        listen 8880;
        #listen [::]:80;
        server_name 192.168.0.66;
        index index.html index.htm index.php default.html default.htm default.php;
        root  /data/www/guide;

        location /
        {
            try_files $uri @apache;
        }

        location @apache
        {
            internal;
            proxy_pass http://127.0.0.1:880;
            include proxy.conf;
        }

        location ~ [^/]\.php(/|$)
        {
            proxy_pass http://127.0.0.1:880;
            include proxy.conf;
        }

        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
        {
            expires      30d;
        }

        location ~ .*\.(js|css)?$
        {
            expires      12h;
        }
        access_log  /data/wwwlogs/192.168.0.66.log  access;
    }
```

2. 配置 apache ：打开文件`/usr/local/apache/conf/vhost/192.168.0.66.conf`，为其添加站点配置（nginx里面为apache设置的端口号为880）

```
<VirtualHost *:880>
ServerAdmin webmaster@example.com
php_admin_value open_basedir "/data/www/guide:/tmp/:/var/tmp/:/proc/"
DocumentRoot "/data/www/guide"
ServerName 192.168.0.66
ErrorLog "/data/wwwlogs/192.168.0.66-error_log"
CustomLog "/data/wwwlogs/192.168.0.66-access_log" common
<Directory "/data/www/guide">
    SetOutputFilter DEFLATE
    Options FollowSymLinks
    AllowOverride All
    Order allow,deny
    Allow from all
    DirectoryIndex index.html index.php
</Directory>
</VirtualHost>
```

3. 测试 nginx 和 apache 配置是否正确。

4. 重启 lnmp，使其生效即可 


## 常用命令
>- 检测nginx配置是否正确：`/usr/local/nginx/sbin/nginx -t`
>- 重启nginx：`/usr/local/nginx/sbin/nginx -s reload`
>- 检测apache配置是否正确：切换到apache目录 `cd /usr/local/apache/bin/` 使用test：`./apachectl configtest`
>- 重启apache：`service httpd restart ` 或者 `/etc/rc.d/init.d/httpd restart`




nginx编译

```
./configure --user=www --group=www --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_spdy_module --with-http_gzip_static_module --with-ipv6 --with-http_sub_module --with-http_mp4_module --with-http_flv_module
make
```

## 相关网站
[LNMP一键安装包](http://lnmp.org/)
