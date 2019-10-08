# ThinkPHP5 部署优化

## 简介
在代码层面，ThinkPHP5的很多请求都要进行重新加载。通过缓存可以提升部分性能

## 关闭调试模式

- 修改`application/config.php`文件。将`app_debug`的值修改成`false`

```php
// ...
return [
  // 应用调试模式
  'app_debug'              => false,
  // ...
];
```

## 生成路由缓存
可以免除你在打开这个应用时候路由注册的开销，从而改善路由的检测效率

- 运行命令`php think optimize:route`
- 操作成功后会在`runtime/`目录下生成`route.php`文件

## 生成数据表字段缓存
每次查询，ThinkPHP5 都会有类似这种SQL语句执行

```sql
SHOW COLUMNS FROM `USER`
```

可以通过生成字段缓存来减少查询

- 运行命令`php think optimize:schema`
- 操作成功后会在`runtime/`目录下生成`schema/`目录

## 生成类库映射文件
可以提高自动加载的性能

- 运行命令`php think optimize:autoload`
- 操作成功后会在`runtime/`目录下生成`classmap.php`文件