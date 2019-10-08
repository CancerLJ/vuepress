# crontab常用命令

## crontab简介
crontab是Linux的内置服务，常用来定时执行某些操作。

## 常用命令
>- `yum install vixie-cron`：vixie-cron软件包是cron的主程序
>- `yum install crontabs`：crontabs软件包是用来安装、卸载、或列举用来驱动cron守护进程的表格的程序。
>- 启动服务：`service crond start`
>- 停止服务：`service crond stop`
>- 重启服务：`service crond restart`
>- 重新加载配置：`service crond reload`
>- 查看配置：`crontab -l`
>- 编辑配置：`crontab -e`
>- 删除配置：`crontab -r`
>- 查看运行日志：`tail -f /var/log/cron` `tail -n 100 /var/log/cron`

crontab默认不会开机自动启动，将crontab设为开机自动启动方法如下：
在`/etc/rc.d/rc.local`脚本中加入`/sbin/service crond start`即可。或者使用命令：`chkconfig crond on`。

## 格式说明

| 00 | 00 | * | * | * | /bin/bash /data/sh/cut_nginx_logs.sh |
| :-- |:-- |:-- |:-- |:-- |:-- |
| minute | hour | day | month | dayofweek | command |
| 分钟 | 小时 | 天 | 月 | 星期几 | 需要执行的命令 |

**各参数说明**
>- `minute` : 从0到59的整数 
>- `hour` : 从0到23的整数
>- `day` : 从1到31的整数 (必须是指定月份的有效日期)
>- `month` : 从1到12的整数 (或如Jan或Feb简写的月份)
>- `dayofweek` : 从0到7的整数，0或7用来描述周日 (或用Sun或Mon简写来表示)
>- `command` : 需要执行的命令


## 示例
```bash
00 00 * * * /bin/bash /xvdb1/sh/cut_nginx_logs.sh       //每天00:00执行cut_nginx_logs.sh（需要有执行权限）
1 0 * * 1 /usr/local/php/bin/php /xvdb1/www/blogwap/trunk/game_week.php          //每周一00:01运行game_week.php
*/4 * * * * /usr/local/php/bin/php /xvdb1/www/blogweb/trunk/orders_lunxun.php      //每4分钟执行一次orders_lunxun.php
0 2 * * * /usr/bin/curl http://www.abc.com/return_check       //每天2:00执行http链接
0 11 4 * 1-3 command line       //每个月的4号和每个礼拜的礼拜一到礼拜三的早上11点

```
