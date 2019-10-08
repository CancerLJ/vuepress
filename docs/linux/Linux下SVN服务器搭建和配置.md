# Linux下SVN服务器搭建和配置

## SVN安装
参考网站：http://blog.xiguajun.com/network/6.html
> 1. 查看Linux是否已经安装SVN版本控制器：`rpm -qa | grep subversion`
> 2. 安装SVN：`yum install subversion`
> 3. 测试是否安装成功：`/usr/bin/svnserve --version`


## 创建svn用户
> `#groupadd svn`
> `#useradd -g sky user`    //是将user加入到sky組內
> 切换用户
> `#su svn`
> 以后代码库的创建维护等，都用这个帐户来操作。


## 配置Linux SVN服务
> 1. 新建一个目录repos（名称路径等可以自定义），用于存储SVN所有文件：`mkdir -p /data/svn`
> 2. 创建版本库（见下文）
> 3. 启动SVN服务（哪个用户启动的，就以哪个用户运行）：`svnserve -d --listen-port 9095 -r /data/svn`
> 如果已经有svn在运行，可以换一个端口运行。同一台服务器可以运行多个svnserver。
> 4. 建议采用TortoiseSVN， 连接地址为: svn://URL/项目名称 （如果指定端口需要添加端口:端口号）。
> 5. 如果连接出错，请检查防火墙设置。
> `#vi /etc/sysconfig/iptables`
> 加入: `-A INPUT -m state --state NEW -m tcp -p tcp --dport 3690 -j ACCEPT`
> `#service iptables restart`
> 6. 查看SVN进程：`#ps aux | grep svn`
> 7. 杀死进程 (64434为进程ID)。
> `#kill -s 9 64434`
> 8. 查找`svnserve`位置：`whereis svnserve`
> 9. SVN服务设置为开机自启动：编辑`vim /etc/rc.d/rc.local`
> `/usr/bin/svnserve -d -r /xvdb1/svn/ --listen-port 3690`

## 创建版本库
命令：`svnadmin create /var/svn/svnrepos`
> **备注：**
> - 在SVN项目库下面创建，不要创建到其他地方去了。上面的SVN项目库地址：`/data/svn`
> - 建议切换到SVN项目库地址，然后用相对地址。  eg：`cd /data/svn && svnadmin create about`
> - 客户端上面的该SVN地址就是 SVN地址+目录  eg：`svn://xxx.xxx.xxx.xxx/about`
> - 执行了这个命令之后会在/data/svn目录下生成一个文件夹`about`。该文件夹下面有`conf`、`db`、`format`、`hooks`、`locks`等文件和文件夹。


## 配置文件
### 配置账号信息
在conf/passwd文件中
> 打开passwd文件：`vim passwd`
> 在[users]块中添加用户和密码，格式：帐号=密码，eg：`liuj = 123456`
> 修改后保存退出。ESC   `:wq`

### 配置账号权限
在conf/authz文件中
> 打开authz文件：`vim authz`
> 在末尾添加如下代码：
> `[/]`
> `* = r`
> `[/trunk/]`
> `dan = r`
> `liuj = r`
> `[/branches/]`
> `dan = rw`
> `liuj = rw`
> 修改后保存退出。ESC   `:wq`
> 备注：配置的是trunk目录只读，branches目录有读写权限。

要求：
- 根目录：管理组 liw 和 liuj 有读写权限，其他人只有读的权限。
- trunk目录：组员只有读的权限。其他人没有权限。
- tags目录：组员只有读的权限。其他人没有权限。
- branches：组员有读写权限。其他人没有权限。

```
[groups]
y_manager = liw, liuj
y_group = test

[/]
@y_manager = rw
* = r

[/trunk]
@y_manager = r
@y_group = r
* =

[/tags]
@y_manager = r
@y_group = r
* =

[/branches]
@y_manager = rw
@y_group = rw
* =
```
备注：
- `*` 表示除了上面提到的那些人之外的其余所有人。
- `* = r`：除了上面提到的那些人之外的其余所有人只能读，不能写。
- `* =`：除了上面提到的那些人之外的其余所有人没有这一级目录的任何权利，既不可读，更不可写。

### 启用配置信息
在conf/svnserve.conf文件中
>  打开svnserve.conf文件：`vim svnserve.conf`
>  打开下面的几个注释：
> `anon-access = read`          #匿名用户可读  `read`修改为`none`
> `auth-access = write`          #授权用户可写
> `password-db = passwd`     #使用哪个文件作为账号文件，这里可以使用绝对路径，用项目外的passwd：`/data/svn/passwd`。
> `authz-db = authz`              #使用哪个文件作为权限文件
> `realm = /data/svn` # 认证空间名，版本库所在目录
>  修改后保存退出。ESC   `:wq`

## 读写权限
用root建立的文件夹和文件，所属组和所属主均为root，其他账户没有相应的读写权限，会出现不能commit的情况。
可以通过设置文件和文件夹的读写权限的方式解决：比如均设置为777
建议新建一个用户svn，专门来管理SVN文件，将所属组和所属主更改为svn。


## 同步虚拟主机
例如：虚拟主机目录`/data/www/about`
### 检出到虚拟主机
1. 切换到www目录下：`cd /data/www`
2. 检出：`svn co svn://xxx.xxx.xxx.xxx/about` 或者 `svn co svn://xxx.xxx.xxx.xxx/about --username=www`

### 虚拟主机目录权限
修改网站目录权限
```
chmod -R 777 /data/www/about
chown -R www:www /data/www/about
```

### 自动同步设置
在hooks/post-commit文件中
> 进入hooks目录：`cd /data/svn/about/hooks`
> 查看hooks目录下文件：`ll`
> 没有post-commit的话，复制一份：`cp post-commit.tmpl post-commit` 或者到其他地方复制一份：`cp post-commot /data/svn/about/hooks`
> 修改post-commit文件：`vim post-commit`
> ```
export LANG=en_US.UTF-8
svn update /data/www/about --username liuj --password 123456 --no-auth-cache
> ```
> 修改后保存退出。ESC   `:wq`

**备注：**
上面的自动同步是整个SVN同步。SVN很大时速度很慢。如果想只更新修改的代码，可以编辑`post-commit`如下
```
export LANG=en_US.UTF-8
for dir in `svnlook dirs-changed /data/svn/about`
do
	svn update /data/www/about/$dir --username liuj --password 123456 --no-auth-cache
done
```

### SVN常用命令
> - 回滚版本（本地回滚）：svn up -r 2016 article.php
> - 回滚版本（修改版本库）：svn update -r 2016 article.php
> - 查看SVN地址等相关信息：svn info


## 相关网站
- [linux（centos）搭建SVN服务器](http://blog.163.com/longsu2010@yeah/blog/static/173612348201202114212933/)
- [SVN冲突解决](http://zccst.iteye.com/blog/1765519)
- [linux(centos,ubuntu)安装svn及实现web代码自动同步部署更新](http://blog.xiguajun.com/network/6.html)
- [SVN服务器从Windows迁移到LInux](http://my.oschina.net/grnick/blog/161424?fromerr=kKWqDTrl)
- [SVN “不能打开文件.svn/lock 权限不够”](http://blog.sina.com.cn/s/blog_4628968e01011swx.html)
- [Linux下SVN命令大全](http://www.jb51.net/os/RedHat/2461.html)