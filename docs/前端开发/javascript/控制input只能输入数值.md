# 控制input只能输入数值
## 要求
页面中input输入框。输入时候判断输入的规则是否正确。规则如下
>- 输入的数值在1~10000之间；最多两位小数
>- 最好禁止中文输入法
>- 禁止粘贴

## 分析
事件可以使用keypress、keydown、keyup等，也可以检测input输入框变化事件。不能使用change事件（此事件貌似仅在焦点离开这个输入框的时候才触发）
判断输入的字符。符合相应规则，继续执行；不符合规则，阻止默认行为
禁止粘贴使用`onpaste="return false;"`阻止默认行为
禁止中文使用css3属性`ime-mode:disabled`(此方法在新Chrome浏览器中已经不支持)

## 实现一
```html
<input type="text" id="mywant_money" placeholder="请输入金额" onpaste="return false;">
<script type="text/javascript">
$("input#mywant_money").keypress(function(event) {
    var getValue = $(this).val();

    //控制第一个不能输入小数点"."或者"0"
    if(getValue.length == 0 && (event.which == 46 || event.which == 48)){
        event.preventDefault();
        return;
    }
    //控制只能输入一个小数点"."
    if (getValue.indexOf('.') != -1 && event.which == 46) {
        event.preventDefault();
        return;
    }
    //控制只能输入的值
    if (event.which && (event.which < 48 || event.which > 57) && event.which != 8 && event.which != 46) {
        event.preventDefault();
        return;
    }
    if(event.which != 46 && event.which >= 48 && event.which <= 57 && ((parseFloat(getValue) * 10 + event.which - 48) > 10000) && getValue.indexOf('.') == -1){
        //getValue = getValue.substring(0, getValue.length - 1);
        layer.msg("补贴花费不能超过1万元哦！" , {icon: 2 , shade: 0.3  , closeBtn: 1 });
        event.preventDefault();
        return;
    }
    if (getValue.indexOf('.') != -1 && getValue.toString().split(".")[1].length >= 2){
        event.preventDefault();
        return;
    }
}).css("ime-mode", "disabled");
</script>
```
说明：
Chrome中不能禁止中文输入，这种方式可以在输入框中输入中文

## 实现二
```html
<input type="text" id="mywant_money" placeholder="请输入金额" onpaste="return false;">
<script type="text/javascript">
$("input#mywant_money").keyup(function(){
    $(this).val(numValidate($(this).val()));
});
function numValidate(obj){
    obj = obj.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
    obj = obj.replace(/^\./g,""); //验证第一个字符是数字
    obj = obj.replace(/^0/g,""); //验证第一个字符是不是0
    obj = obj.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
    obj = obj.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
    if(obj > 10000){
        obj = obj.substring(0, obj.length - 1);
        layer.msg("补贴花费不能超过1万元哦！" , {icon: 2 , shade: 0.3  , closeBtn: 1, title: "温馨提示" });
    }
    return obj;
}
</script>
```
说明：
在输入之后再进行判断，不合适的删除
切换到中文输入法，输入字母+space键可以处理；但输入字母+Enter键没有触发keyup事件，尚未找到原因

## 实现三
```html
<input type="text" id="mywant_money" placeholder="请输入金额" onpaste="return false;">
<script type="text/javascript">
$("input#mywant_money").bind("input propertychange", function() {
    $(this).val(numValidate($(this).val()));
});
function numValidate(obj){
    obj = obj.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
    obj = obj.replace(/^\./g,""); //验证第一个字符是数字
    obj = obj.replace(/^0/g,""); //验证第一个字符是不是0
    obj = obj.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
    obj = obj.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
    if(obj > 10000){
        obj = obj.substring(0, obj.length - 1);
        layer.msg("补贴花费不能超过1万元哦！" , {icon: 2 , shade: 0.3  , closeBtn: 1, title: "温馨提示" });
    }
    return obj;
}
</script>
```
说明：
与方法二基本相同，只是用propertychange事件和input事件响应（为了兼容不同的浏览器，这两个事件都需要响应）。
函数里面的`if(obj > 10000){}` 推荐使用 `while(obj > 10000){}`