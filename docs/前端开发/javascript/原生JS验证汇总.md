# 原生JS验证汇总

## 公共方法

```javascript
// 去掉字符串头尾空格
export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}
```

## 验证手机号

```javascript
export function telValidate(str) {
  str = trim(str)
  var reg = /^1(3|4|5|6|7|8|9)\d{9}$/
  return reg.test(str)
}
```

## 验证邮箱

```javascript
export function emailValidate(str) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(str)
}
```

## 验证QQ号

```javascript
export function qqValidate(str) {
  str = trim(str)
  var reg = /^\d{1,20}$/
  return reg.test(str)
}
```

## 验证身份证

```javascript
var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ] // 加权因子
var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ] // 身份证验证位值.10代表X
export function IdCardValidate(idCard) {
  idCard = trim(idCard.replace(/ /g, '')) // 去掉字符串头尾空格
  if (idCard.length === 15) {
    return isValidityBrithBy15IdCard(idCard) // 进行15位身份证的验证
  } else if (idCard.length === 18) {
    var arrIdCard = idCard.split('') // 得到身份证数组
    if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(arrIdCard)) { // 进行18位身份证的基本验证和第18位的验证
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}
/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param arrIdCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard(arrIdCard) {
  var sum = 0 // 声明加权求和变量
  if (arrIdCard[17].toLowerCase() === 'x') {
    arrIdCard[17] = 10 // 将最后位为x的验证码替换为10方便后续操作
  }
  for (var i = 0; i < 17; i++) {
    sum += Wi[i] * arrIdCard[i] // 加权求和
  }
  var valCodePosition = sum % 11 // 得到验证码所位置
  if (arrIdCard[17] === ValideCode[valCodePosition]) {
    return true
  } else {
    return false
  }
}
/**
  * 验证18位数身份证号码中的生日是否是有效生日
  * @param idCard 18位书身份证字符串
  * @return
  */
function isValidityBrithBy18IdCard(idCard18) {
  var year = idCard18.substring(6, 10)
  var month = idCard18.substring(10, 12)
  var day = idCard18.substring(12, 14)
  var tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day))
  // 这里用getFullYear()获取年份，避免千年虫问题
  if (tempDate.getFullYear() !== parseFloat(year) || tempDate.getMonth() !== parseFloat(month) - 1 || tempDate.getDate() !== parseFloat(day)) {
    return false
  } else {
    return true
  }
}
/**
* 验证15位数身份证号码中的生日是否是有效生日
* @param idCard15 15位书身份证字符串
* @return
*/
function isValidityBrithBy15IdCard(idCard15) {
  var year = idCard15.substring(6, 8)
  var month = idCard15.substring(8, 10)
  var day = idCard15.substring(10, 12)
  var tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day))
  // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
  if (tempDate.getYear() !== parseFloat(year) || tempDate.getMonth() !== parseFloat(month) - 1 || tempDate.getDate() !== parseFloat(day)) {
    return false
  } else {
    return true
  }
}
```