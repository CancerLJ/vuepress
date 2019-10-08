# ThinkPHP跨域问题处理

## 简介
AOP思想，ThinkPHP5使用提供的行为拦截所有http请求，解决跨域问题

## 步骤
- 在`application/api/`目录下新建目录`behavior/`
- 在`application/api/behavior/`目录下新建文件`CORS.php`

```php
<?php

namespace app\api\behavior;

use think\Response;

class CORS
{
  // 与application/tags.php里面的一致
  public function appInit(&$params)
  {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: token,Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: POST,GET,PUT,DELETE');
    if(request()->isOptions()){
      exit();
    }
  }
}
```

- 修改`application/tags.php`文件

```php
<?php
// 应用行为扩展定义文件
return [
    // 应用初始化
    'app_init'     => [
        'app\\api\\behavior\\CORS'
    ],
    // 应用开始
    'app_begin'    => [],
    // 模块初始化
    'module_init'  => [],
    // 操作开始执行
    'action_begin' => [],
    // 视图内容过滤
    'view_filter'  => [],
    // 日志写入
    'log_write'    => [],
    // 应用结束
    'app_end'      => [],
];
```