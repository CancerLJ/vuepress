# Linux命令学习

## 文件操作
>- `ls`：显示当前目录下的所有文件及文件夹
>- `ll`：以详细方式显示所有文件与文件夹。（相当于 `ls -l` 命令） 
>- `cd /user`：打开user文件夹
>- `pwd`：显示当前目录路径

**文件的增、删、查、移**
>- `mkdir test`：创建test目录
>- `touch test.txt`：创建test.txt文件
>- `cp test.txt test2.txt`：把test.txt文件当前文件夹下复制出个test2.txt
>- `cp test.txt  /hzh/test`：将test.txt 复制到/hzh/test  目录下 
>- `rm aa.txt`：删除aa.txt文件
>- `rm -r bb`：删除bb目录（包括目录下的所有文件）
>- `rm -rf bb`：删除bb目录（不对目录下的每个文件提醒删除） 
>- `mv dd.txt ..`：将dd.txt文件移动上一级目录（注意尾部的两个点）
>- `mv bb.txt  /hzh/test/`：将bb.txt文件移动到hzh/test/目录下
>- `mv  dd.txt  dd2.txt`：将dd.txt改名为dd2.txt

**文件查找**
>- `find /etc -name ini?`：查找/etc目录下，以ini打头且后面一位的文件
>- `find /etc -name ini*`：查找/etc目录下，以ini打头的文件
>- `locate aa.txt`：查整个系统中的aa.txt文件，`locate\slocate`命令后面跟文件或文件夹。不过在执行这个命令之前要先更新数据库，所以选执行 `updatedb` 命令


## 用户权限
Linux下面的三类用户：
- u：所有者
- g：所属组
- o：其他人

修改权限符号：
- +：加权限
- -：减权限
- =：等于什么权限

>- `chmod  u+w  a`：给a文件的所有者加上写权限
>- `chmod 641  a`：给a文件的设置权限641

## 软链接与硬链接
**软链接：**类似于我们windows系统的“快捷方式”。主要是文件名过长，不便于输入。

>- `ln -s ruanlianjie.abc /hzh/test/rlj.soft`：对当前目录下的ruanlianjie.abc文件，在/hzh/test/目录下创建一个软链接，名为rlj.soft
>- `vi rlj.soft`：编辑rlj.soft文件，其实也就是编辑ruanlianjie.abc文件

**硬链接：**相当于把原文件拷贝了一份，唯一特殊的地方就是，两个文件是同步的。当你对其中一个文件进行修改时，另一个文件也就会同步更新你的修改。

>- `ln yinglianjie.abc /hzh/test/ylj.hard`：对yinglianjie.abc文件在/hzh/test/目录下创建一个硬链接文件ylj.hard 
>- `vi ylj.hard`：对硬链接ylj.hard文件进行修改。yinglianjie.abc也会同步修改


## 文件压缩与解压
**gzip**
- 只能压缩文件，不能压缩目录
- 不保留源文件

>- `gzip aaa`：将aaa文件进行压缩
>- `gunzip aaa.gz`：将aaa.gz文件进行解压
>- `gzip -d aaa.gz`：将aaa.gz文件进行解压


**tar**
参数：
- `-c`：创建新的档案文件。如果用户想备份一个目录或是一些文件，就要选择这个选项。相当于打包。
- `-x`：解包.tar文件
- `-t`：列出档案文件的内容，查看已经备份了哪些文件。
- `-v`：压缩的过程中显示文件！这个常用
- `-f`：指定解压文件，使用档名，请留意，在 f 之后要立即接档名喔！不要再加其他参数！
- `-z`：是否同时具有 gzip 的属性？亦即是否需要用 gzip 压缩或解压？ 一般格式为xx.tar.gz或xx. tgz
- `-p`：使用原文件的原来属性（属性不会依据使用者而变）

**注意：**
- 在linux下扩展名不是标识文件的属性
- 在参数的下达中， c/x/t 仅能存在一个！不可同时存在！因为不可能同时压缩与解压缩。


>- `tar -zcvf tatga.tar.gz tatgz`：压缩tatgz文件夹为tatga.tar.gz压缩文件
> 
>- `file [文件名]`：查看任何一个文件的类型
>- `tar -cf tatga.tar  tatgz`：对tatgz文件打包
>- `gzip tatga.tar`：对tatga.tar包文件压缩
>- `tar -zxvf tatga.tar.gz`：对压缩文件进行解压


**zip**
**功能：**可以压缩文件和目录，是windows 和linux 通用的压缩格式
 
>- `zip a.zip a`：把a文件压缩成a.zip
>- `zip -r tatgz.zip tatgz`：压缩tatgz目录为tatgz.zip
>- `unzip tatgz.zip`：解压文件


**bzip2** 
- 和gzip功能基本相同
- 只能压缩文件
- 用 -k 命令可以保留原文件 

>- `bzip2 -k fnngj`：对fnngj文件进行压缩 
>- `bunzip2  fnngj.bz2`：对压缩文件fnngj.bz2进行解压

## 通信命令
Linux有别于Windows是的一个特性就是，多用户的操作系统。允许多个用户同进对系统进行操作。

- **`write`**：发给某个用户信息
>- `write fnngj`：给fnngj用户发送信息
>- 输入发送内容：hello fnngj !! I like you!!xixi
>- 按键`ctrl + D` 结束

- **`wall`**：发给所有使用系统的用户
>- `wall [信息内容]`

- **`ping`**：测试本机与某一地址时候连通的
>- `ping 192.168.203.128`
>- `ping www.baidu.com` 
>- `ping -c 4 192.168.203.1`：-c 相当于windows(dos) 下的默认情况（会发送4次数据时行测试）。其实，我们可以设置发送数据包的次数
>- `ping -s 5000 192.168.203.1`：设置ping包的个数为5000； 最大为65507

- **`ifconfig`**：这个命令类似于dos下面的ipconfig   
>- `ifconfig`：查看本机IP地址详细信息


## 命令链接符
有时候，我们为输入方便为把多个命令放在一起输入执行。有点类似于dos下的批处理。就是一组命令的集合。那么我们看看都有哪些符号用于命令之间的连接。


**管道**：将一个命令的输出传送给另一个命令，作为另一个命令的输入。

>- `ls -l /etc | more`：显示/etc目录下的所有文件，以分页形式more
>- `ls -l /etc | grep init | wc -l`：显示/etc目录下的所有文件，查找init文件，显示查找结果的数量。

**;（逗号）**：用；间隔的各命令按顺序依次执行
>- `pwd ; ll ; data`

**&&**：前后命令的执行存在逻辑与关系，只有&&前面的命令执行成功后，他后面的命令才能被执行
>- `ls kk && pwd`：如果第一个命令执行失败，第二个命令就不执行。

**||**：前后命令的执行存在逻辑或关系，只有||前面的命令执行失败后，他后面的命令才被执行。
>- `ls kk || pwd`：如果第一个命令执行失败，第二个命令就执行。


## 输入/输出重定向
Shell 对于每一个进程预先定义了个文件描述
- 0 （stdin）：标准输入
- 1 （stdout）：标准输出；
- 2 （stderr）：标准错误输出。


**输出重定向**：将某个输入的信息保存到一个文件中
>- `ls -l /tmp > /tmp.msg`：将查看tmp目录的信息保存到/tmp.msg 文件中。屏幕中不显示任何结果。
>- `data >>/tmp.msg`：“ >>”表示追加，在/tmp.msg 再追加一些新的信息。

**输入重定向**：将某个输入保存到一个文件中
>- `wall < /etc/motd`：将motd文件中的信息进行广播。

**错误输出重定向**： 假如，我要对一个目录进行备份（/usr），备份到/backup/usr.bak目录下。设置，如果备份时发生错误，将错误信息保存到/bak.error文件中。
>- `cp -R /usr /backup/usr.bak 2> /bak.error`

## 别名的使用
别名：顾名思义，不同的两个名字指的是一个人，不同的两个命令具有相同的作用。

>- `alias`：查询系统中的别名
>- `alias copy=cp`：给cp命令定义一个别名copy
>- `alias drm="rm -rf"`：将“ rm -rf ” 命令定义一个drm的别名。
>- `unalias  copy`：取消别名copy

## vim/vi编辑器
- `vim/vi`是一个功能强大的屏幕文本编辑器，是linux、UNIX 上最常用的文本编辑器，他的作用是建立、编辑、显示文本文件。
- `vim/vi`没有菜单，只有命令。
- `vim`是`vi`的加强版


vi的三种模式（命令模式、插入模式和编辑模式）转换：
- `命令模式` 下输入 a、i、o进入 `插入模式`
- `插入模式` 下按ESC进入  `命令模式`
- `命令模式` 下输入 : （冒号）进入 `编辑模式`
- `编辑模式` 下指令错误则返回 `命令模式`
- 即：vi 进入文件后，按 i 键可以对文件时行编辑了。编辑完成后，按Esc 键退出编辑模式。

退出时命令：
- `:q`：是退出（文件没发生更改时）
- `:q!`：不保存退出（文件发生改变时）
- `:wq`：保存并退出 vim/vi的具体操作    

## 修改本机的软硬件时间
软件时间指的是系统时间。硬件时间指的是CMOS时间。

>- `date`：查看本机的软件时钟
>- `hwclock`：查看本机的硬件时钟
>- `hwclock  --help`：查看帮助信息
>- `hwclock  --hctosys`：设置系统时间与硬件时间对应。
>- `hwclock  --systohc`：设置硬件时间与系统时间对应。
>- `hwclock  --set --data="月/日/年  时:分:秒"`：假如两个时间都是错误的，我们自己设置时间

## 挂载光盘
>- `mkdir /mnt/cdrom`：创建一个目录存放挂载光盘的内容
>- `mount /dev/cdrom /mnt/cdrom`：挂载光盘的内容（/dev/cdrom）到  /mnt/cdrom目录下。
>- `cd /mnt/cdrom`：进入目录
>- `ls`：查看光盘下有的所有文件


## RPM包管理
rpm软件包的一个例子：`sudo-1.7.2pl-5.el5. 5.el5 .rpm`
其中包括软件名（sudo）,版本号（1.7.2pl），发行号（5.el5）和硬件平台（5.el5）

**参数：**
- `-i`：  安装所选择的一个或多个软件包
- `-H`：  用“#”显示完成的进度
- `-q`：  查询软件包系统或所选择的一个或多个软件包
- `-e`： 删除所有选择的一个或多个软件包
- `-u`： 把一个已经安装好的软件包升级到新版本
- `-v`： 验证已安装或已选择的一个或多个软件包
- `--excludedocs`：不安装软件包中的文档文件
- `--prefix PATH`：将软件包安装到由PATH指定的路径下
- `--test`：只对安装时行测试，并不实际安装
- `--replacepkgs`：覆盖安装，假如我们不小心删除掉了安装包里的某些软件，这个参数就非常有用了
- `-U` ：在参数中加入大写的U可以对软件进行升级

>- `rpm -ivh sudo-1.7.2pl-5.el5. 5.el5 .rpm`：安装**sudo-1.7.2pl-5.el5. 5.el5 .rpm**
>- `rpm -ivh sudo`：查询sudo软件包是否被安装
> **注意**：如果其它软件包有依赖关系，卸载时会产生提示信息，可使用--nodeps强行卸载
>- `rpm -e --nodeps sudo`：但是一般不推荐这样用，我们可以先卸载依赖的软件包然后再卸载。

## YUM包的管理
首先我们要确保可以连接互联网，当然你也可以在局域网设置一个yum仓库，但意义不大。

**好处**：
- 自动解决软件包的依赖关系
- 方便的软件包升级

**相关操作**：
- `yum install`：安装
- `yum check-update`：检测升级
- `yum update`：升级
- `yum list`：软件包查询
- `yum info`：软件包信息
- `yum remove`：卸载
- `yum -help`： 
- `man yum`：帮助 

>- `yum install mysql`：自动帮我们下载安装mysql

**参考网站**：
>- [linux yum命令详解 ](http://www.cnblogs.com/chuncn/archive/2010/10/17/1853915.html)


## 用户管理
### 用户信息与密码的配置文件
**相关配置文件**
- 用户信息文件：      `/etc/passwd`
- 密码文件：            `/etc/shadow`
- 用户组文件：        `/etc/group`
- 用户组密码文件： `/etc/gshadow`
- 用户配置文件：
   `/etc/login.defs`
   `/etc/default/useradd`
- 新用户信息文件：`/etc/skel`
- 登录信息：          `/etc/motd`


**用户信息文件：`/etc/passwd`**
每一行内容存放一个用户的信息，每个用户信息有7部分组成
`root:x:0:0:root:/root:/bin/bash`

| 命令 | 名称 | 备注 |
| :-- | :--: | :-- |
| `root`      |  用户名     |  用户登录系统时使用的用户名 |
| `x`         |  密码      |  密码位 |
| `2`         |  UID       | 用户标识号 |
| `2`         |  GID     　|  缺省组标识 |
| `root`      |  注释性描述 |  例如存放用户全名等信息 |
| `/root`     |  宿主目录   |  用户登录系统后的缺省目录 |
| `/bin/bash` |  命令解释器 |  用户使用的Shell ,默认为bash |

UID
关于上面的UID这里细说一下，其实决定用户是什么权限，是由UID号决定的。
- 超级用户：（root   UID=0）
- 普通用户： （UID 500~60000）
- 伪用户：  （UID  1~499）
>- 伪用户与系统和程序服务相关
> `bin`、`daemon`、`shutdown`、`halt`等，任何Linux系统默认都有这些伪用户。
> `mail`、`news`、`games`、`apache`、`ftp`、`mysql`及`sshd`等，与linux系统的进程相关。
>-  伪用户通常不需要或无法登录系统
>-  可以没有宿主目录


**密码文件：`/etc/shadow`**
用户密码文件，用户信息文件中留有密码位，为什么没密码了呢? 其实，最早的linux这个位置真的是放密码的，因为不全安，所以，就将密码单独存放了，现在只是用x表示这里有存放密码的位置。
linux对用户登录的验证就是通passwod文件来验证用户名是否存在，然后通过shadow文件来验证用户名对应的密码是否正确。


### 常用命令 

> **授权用户 chongshi 和 bugmaster 对目录/logs有写权限**
>- `mkdir /logs`：创建目录
>- `useradd chongshi`：创建用户
>- `passwd chongshi`：设置密码
>- `useradd bugmaster`
>- `passwd bugmaster`
>- `groupadd testing`：创建组
>- `grep testing /etc/group`：查看组信息
>- `usermod -G testing chongshi`：用户chongshi添加到组testing
>- `gpasswd -a bugmaster testing`：用户bugmaster添加到组testing
>- `grep testing /etc/group`
>- `chgrp testing /logs`：将logs目录的所属组修改为testing
>- `chmod g+w /logs`：对logs目录的所属组加写权限
>- `su -- chongshi`：切换用户
>- `touch /logs/abc`：创建文件

**添加用户**
参数：
- `-u`：UID
- `-g`：缺省所属用户组GID
- `-G`：指定所属多个组
- `-d`：宿目录
- `-s`：命令解释器Shell
- `-c`：描述信息
- `-e`：指定用户失效时间

>- `useradd -u 1888  -g webadmin -G sys,root -s /bin/bash  -c "market lisi"  -e 2012-12-12  jack`


**添加用户到组**
`usermod -G [组名]  [用户名]`

>- `usermod -G webadmin tom`：添加tom用户到组webadmin
>- `grep webadmin /etc/group`：查看组webadmin信息


**修改用户名**
`usermod -l  [新用户名]  [旧用户名]`

>- `usermod -l tom jack`：把jack改为tom


**删除用户**
`userdel -r [用户名]`
`-r`：删除用户组
手工删除：
使用find命令查找属于某个用户或用户组的文件
find选项 -user、-uid、-group、-gid、
1、对需要保留的文件进行移动和备份
2、对不需要的文件进行删除
3、清除用户文件中的相关表项
4、清除用户宿主目录

>- `find /home -user fnngj`


### 用户信息查看命令
**pwck**
检测/etc/passwd文件。
检测用户的设置文件是否正常。直接输入命令，后面不用带参数。

**vipw**
编辑/etc/passwd文件。
这个命令与vi最大的区别就是编辑的时候锁定文件。如果多人对passwd文件都有编辑权限，那么多人同时编辑就会造成混乱。使用vipw编辑passwd文件时，别人就无法打开passwd文件。

**id**
查看用户ID和组信息，直接输入命令，后面不用带参数。

**finger**
查看当前用户的登录信息。

**finger [用户名]**
查看某个用户的详细信息。

**su [用户名]**
切换用户（su- 环境变量切换）。

**su - [用户名]**
切换的时候也会把环境的时候也会切换环境变量。

**passwd -S [用户名]**
查看用户密码状态。

**who、w**
查看当前登录用户信息。

### 用户禁用与恢复
当一个用户在操作的时候经常有违规操作或近期一段时间不用，我们可以对这个用户进行锁定。就像你的游戏账号发生异常被禁用一样。

**禁用**
- `usermod -L username`
- `passwd -l username`
**恢复**
- `usermod -U username`
- `passwd -u username`

>- `passwd -l fnngj`：禁用fnngj用户
>- `passwd -S fnngj`：查看用户fnngj密码状态
>- `passwd -u fnngj`：密码解锁
>- `passwd -S fnngj`：查看用户fnngj密码状态


### 用户组常用操作命令
**添加用户组**
`groupadd  [用户组名]`

>- `groupadd webadmin`：添加一个组webadmin
>- `grep webadmin  /etc/group`：查看组信息
>- `groupadd  -g 8888 webuser`：添加一个组webadmin，添加时指派好组的ID
>- `grep webuser /etc/group`：  查看组信息


**删除用户组**
`groupdel [用户组名]`

>- `groupdel webadmin`：删除组webadmin


**修改用户组信息**
`groupmod -n  [新组名] [旧组名]`

>- `groupmod -n apache webadmin`：修改组名webadmin为apache

### 用户组信息查看命令

**groups**
查看用户隶属于哪些用户组。

>- `groups fnngj`

**newgrp**
切换用户组。

>- `newgrp fnngj`：不是组成员，知道组密码（如果有密码）一样可以切换。

**grpck**
 用户组配置文件检测。

**chgrp**
修改文件所属组。

**vigr**
编辑/etc/group文件（锁定文件）。
与vipw用法一样，在编辑group文件时，禁止其他人编辑。防止多人写操作，造成写混乱。

### 用户组管理命令

**gpasswd命令**

参数：
- `-a`：添加用户到组
- `-d`：从组删除用户
- `-A`：指定管理员
- `-M`：指定组成员和-A的用途差不多
- `-r`：删除密码
- `-R`：限制用户登入组，只有组中的成员才可以用newgrp加入该组
- `-h`：帮助

>- `gpasswd -a tom webadmin`：添加用户到组
>- `gpasswd -d tom webadmin`：把用户从组中删除
>- `gpasswd webadmin`：给用户组设置密码
>- `gpasswd -A tom webadmin`：将tom提升为组管理员
>- `gpasswd -r webadmin`：删除组密码
>- `gpasswd -R webadmin`：禁止其他用户切换到该组


## 进程管理

### 进程管理的概念
**进程和程序区别**
1. 程序是静态概念，本身作为一种软件资源长期保存；而进程是程序的执行过程，它是动态概念，有一定的生命期，是动态产生和消亡的。
2. 程序和进程无一一对应关系。一个程序可以由多个时程公用；另一一方面，一个进程在活动中有可顺序地执行若干个程序。

**父子进程的关系**
1. 子进程是由一个进程所产生的进程，产生这个子进程的进程称为父进程。
2. 在linux系统中，使用系统调用fork创建进程。fork复制的内容包括父进程的数据和堆栈段以及父进程的进程环境。
3. 父进程终止子进程自然终止。

**前台进程**
在shell提示处理打入命令后，创建一个子进程，运行命令，Shell等待命令退出，然后返回到对用户给出提示符。这条命令与Shell异步运行，即在前台运行，用户在它完成之前不能执行别一个命令。
>- `find / -name init`：在执行这个查找命令时，无法进行其它操作，这个查找就属于前台进程

**后台进程**
在Shell提示处打入命令，若后随一个&，Shell创建子进程运行此命令，但不等待命令退出，而直接返回到对用户给出提示。这条命令与Shell同步运行，即在后台运行。“后台进程必须是非交互式的”。
>- `find / -name init > /hzh/test/init.find &`：用同样的条件进行查找，把查找记过放到hzh/test/init.find这个文件中。不影响我们前台其它的操作。

### 常用进程命令

**w**
查看当前系统信息

w显示信息的含义：
- JCPU: 　　  以终端代号来区分，该终端所有相关的进程的进程执行时，所消耗的CPU时间会显示在这里
- PCPU：　　 cpu执行程序消耗的时间
- WHAT: 　　 用户下在执行的操作
- load average :分别显示系统在过去1、5、15分钟内的平均负载程度。
- FROM：　　显示用户从何处登录系统，“：0”的显示代表该用户时人X Windows下，打开文本模式窗口登录的
- IDLE：　　 用户闲置的时间，这是一个计时器，一旦用户执行任何操作，该计时器便会被重置

>- `w`：查看当前系统活动摘要
>- `w root`：查看root用户信息

## 相关网站
>- [Linux七天系列（第一天）](http://blog.csdn.net/m13666368773/article/details/7615103)
>- [Linux七天系列（第二天）](http://blog.csdn.net/m13666368773/article/details/7615108)
>- [Linux七天系列（第三天）](http://blog.csdn.net/m13666368773/article/details/7615121)
>- [Linux七天系列（第四天）-用户管理详解](http://blog.csdn.net/m13666368773/article/details/7615125)
>- [Linux七天系列（第五天）-用户管理常用命令](http://blog.csdn.net/m13666368773/article/details/7615132)
>- [Linux七天系列（第六天）-进程管理详解](http://blog.csdn.net/m13666368773/article/details/7615136)
>- [Linux七天系列（第七天）-文件系统管理](http://blog.csdn.net/m13666368773/article/details/7615146)
>- [普通用户授予sudo权限](http://jingyan.baidu.com/article/49ad8bce77a0365834d8fa95.html)
