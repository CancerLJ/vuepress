# thinkcmf在apache中无法启用rewrite的修改办法

## 简介
`thinkcmf`系统，在`nginx`中没有问题，但切换到`apache`环境下，一直无法正常使用`rewrite`。

## 解决
官方自带更目录下的`.htaccess`文件内容有点问题，改成以下代码即可

```bash
<IfModule mod_rewrite.c>
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ index.php [E=PATH_INFO:$1,QSA,PT,L]
</IfModule>
```