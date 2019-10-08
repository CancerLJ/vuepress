# 数组Array属性和方法整理

## 常用属性
### Array.length
返回或设置一个数组中元素的个数

```javascript
//获取数组的长度。
let arr1 = ['a', 'b', 'c'];
let arr2 = [5, 2, 54, 22, 44, 0];
console.log(arr1.length);     // 3
console.log(arr2.length);     // 6
```

### Array.prototype
数组构造函数的原型，允许向`Array`对象添加新的属性和方法

```javascript
//JavaScript Array本身并不提供 test() 方法。
if(!Array.prototype.test) {
  Array.prototype.test = function() {
    //自定义方法。。。
    console.log('自定义test方法');
  }
}
```


## 常用方法
### Array.isArray()
确定传递的值是否是一个`Array`
返回`true`或者`false`

```javascript
Array.isArray([1, 2, 3]);  // true
Array.isArray({foo: 123}); // false
Array.isArray("string");   // false
Array.isArray(undefined);  // false
```

### Array.from()
从一个类数组或可迭代对象中创建一个新的数组实例

```javascript
console.log(Array.from('foo'));   // ["f", "o", "o"]
console.log(Array.from([1, 2, 3], x => x + x));   // [2, 4, 6]
```

### Array.of()
创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型

```javascript
//Array.of() 和 Array 构造函数之间的区别在于处理整数参数：
//Array.of(7) 创建一个具有单个元素 7 的数组，
//而 Array(7) 创建一个长度为7的空数组（注意：这是指有7个空位的数组，而不是7个undefined)
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]
 
Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```

### Array.pop()
从数组中删除最后一个元素，并返回该元素的值
此方法更改数组的长度

```javascript
let arr = ["angel", "clown", "mandarin", "surgeon"];
let popped = arr.pop();
console.log(arr);       // ["angel", "clown", "mandarin"]
console.log(popped);    // surgeon
```

### Array.push()
在数组的末尾添加一个或多个元素，并返回添加之后数组的长度

```javascript
let animals = ['pigs', 'goats', 'sheep'];
let pushed = animals.push('cows');
console.log(animals);   // ["pigs", "goats", "sheep", "cows"]
console.log(pushed);    // 4
```

### Array.shift()
移除数组的第一个元素，并返回该元素
此方法更改数组的长度

```javascript
let sports = ['swim', 'run', 'bike', 'climb'];
let shifted = sports.shift(); 
console.log(sports);    // ['run', 'bike', 'climb']
console.log(shifted);   // swim
```

### Array.unshift()
在数组的开头添加一个或多个元素，并返回添加之后的数组长度

```javascript
let arr = [1, 2, 3];
let unshifted = arr.unshift(4, 5);
console.log(arr);         // [4, 5, 1, 2, 3]
console.log(unshifted);   // 5
```

### Array.splice()
通过删除现有元素和/或添加新元素来更改一个数组的内容

```javascript
let months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');   // 从第1位开始删除0个元素，插入“Feb”
console.log(months);          // ['Jan', 'Feb', 'March', 'April', 'June']
months.splice(4, 1, 'May');   // 从第4位开始删除1个元素，然后插入“May”
console.log(months);          // ['Jan', 'Feb', 'March', 'April', 'May']
```

### Array.fill()
用一个固定值填充一个数组中从起始索引到终止索引内的全部元素，不包括终止索引
改变原数组

```javascript
let arr = [1, 2, 3, 4];
console.log(arr.fill(0, 2, 4));   // [1, 2, 0, 0]   用0填充索引2到4
console.log(arr.fill(5, 1));      // [1, 5, 5, 5]   用5从索引1开始填充
console.log(arr.fill(6));         // [6, 6, 6, 6]   用6填充整个数组
console.log(arr);                 // [6, 6, 6, 6]
```

### Array.reverse()
返回原数组的一个副本，并将该副本中的元素逆置
会改变原数组

```javascript
let arr = ['one', 'two', 'three'];
console.log(arr);         // ['one', 'two', 'three']

let reversed = arr.reverse(); 
console.log(reversed);    // ['three', 'two', 'one']
console.log(arr);         // ['three', 'two', 'one']
```

### Array.concat()
用于合并两个或多个数组
不会更改现有数组，而是返回一个新数组

```javascript
let arr1 = ['a', 'b', 'c'];
let arr2 = ['x', 'y', 'z'];
console.log(arr1.concat(arr2));   // ["a", "b", "c", "x", "y", "z"]
console.log(arr1);                // ['a', 'b', 'c']
console.log(arr2);                // ['x', 'y', 'z']
```

### Array.find()
返回数组中满足提供的测试函数的第一个元素的值,否则返回`undefined`

```javascript
let arr = [5, 12, 8, 130, 44];
let found = arr.find(item => item > 10);
console.log(found);     // 12
```

### Array.findIndex()
返回数组中满足提供的测试函数的第一个元素的索引，否则返回`-1`

```javascript
let arr = [5, 12, 8, 130, 44];
let found = arr.findIndex(item => item > 10);
console.log(found);     // 1
```

### Array.indexOf()
返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回`-1`
不会改变原数组

```javascript
let arr = ['ant', 'bison', 'camel', 'duck', 'bison'];
console.log(arr.indexOf('bison'));      // 1
console.log(arr.indexOf('bison', 2));   // 4    从索引2开始找
console.log(arr.indexOf('giraffe'));    // -1
console.log(arr);                       // ['ant', 'bison', 'camel', 'duck', 'bison']
```

### Array.includes()
判断一个数组是否包含一个指定的值，根据情况，如果包含则返回`true`，否则返回`false`
不会改变原数组

```javascript
//arr.includes(searchElement) 
//arr.includes(searchElement, fromIndex)
 
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
```

### Array.some()
测试数组中的某些元素是否通过由提供的函数实现的测试
只要数组中有项通过就返回`true`
不会改变原数组

```javascript
/*
some 为数组中的每一个元素执行一次 callback 函数，直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）。如果找到了这样一个值，some 将会立即返回 true。否则，some 返回 false。
callback 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。
注意：对于放在空数组上的任何条件，此方法返回false。
*/
let arr1 = [2, 5, 8, 1, 4];
let arr2 = [12, 5, 8, 1, 4];

console.log(arr1.some(item => item > 10));  // false
console.log(arr2.some(item => item > 10));  // true
console.log(arr1);    // [2, 5, 8, 1, 4]
console.log(arr2);    // [12, 5, 8, 1, 4]
```

### Array.every()
测试数组的所有元素是否都通过了指定函数的测试
数组中每个项都通过才返回`true`
不会改变原数组

```javascript
var arr = [1, 30, 39, 29, 10, 13];
console.log(arr.every(item => item < 40));  // true
console.log(arr);   // [1, 30, 39, 29, 10, 13]
```

### Array.forEach()
对数组的每个元素执行一次提供的函数
不会改变原数组
没有返回值

```javascript
let arr1 = [1, 2, 3, 4];
let arr2 = [];
let res = arr1.forEach(item => {
  arr2.push(item * item);
});
console.log(arr1);  // [1, 2, 3, 4]
console.log(arr2);  // [1, 4, 9, 16]
console.log(res);   // undefined
```

### Array.map()
创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果
不会改变原数组

```javascript
let arr = [1, 2, 3, 4];
const map = arr.map(x => x * 2);
console.log(arr);   // [1, 2, 3, 4]
console.log(map);   // [2, 8, 18, 32]
```

### Array.filter()
创建一个新数组, 其包含通过所提供函数实现的测试的所有元素
不会改变原数组

```javascript
let arr = [12, 5, 8, 130, 44];
const filtered = arr.filter(item => item >= 10);     
console.log(arr);       // [12, 5, 8, 130, 44]
console.log(filtered);  // [12, 130, 44]
 
//ES2015实现
const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];
const filterItems = (query) => {
  return fruits.filter((el) =>
    el.toLowerCase().indexOf(query.toLowerCase()) > -1
  );
}

console.log(filterItems('ap'));     // ['apple', 'grapes']
console.log(filterItems('an'));     // ['banana', 'mango', 'orange']
```

### Array.slice()
返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象
不会改变原数组

```javascript
let arr = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(arr.slice(2));      // ["camel", "duck", "elephant"]
console.log(arr.slice(2, 4));   // ["camel", "duck"]
console.log(arr.slice(1, 5));   // ["bison", "camel", "duck", "elephant"]
console.log(arr);               // ['ant', 'bison', 'camel', 'duck', 'elephant']
```

### Array.reduce()
创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果
不会改变原数组

```javascript
// reduce为数组中的每一个元素依次执行callback函数，接受四个参数：
// accumulator 累加器
// currentValue 当前值
// currentIndex 当前索引
// array 数组

let arr = [0, 1, 2, 3];
let sum1 = arr.reduce((a, b) => a + b, 0);
let sum2 = arr.reduce((a, b)=> a + b, 10);
console.log(sum1);    // 6
console.log(sum2);    // 16
console.log(arr);     // [0, 1, 2, 3]
```

### Array.sort()
对数组的元素进行排序，并返回数组，排序不一定是稳定的
默认排序顺序是根据字符串`Unicode码点`
改变原数组

```javascript
let arr = [4, 2, 5, 1, 3]; 
arr.sort((a, b) => a - b);  // 增序排列
console.log(arr);           // [1, 2, 3, 4, 5]

arr.sort((a, b) => b - a);  // 降序排列
console.log(arr);           // [5, 4, 3, 2, 1]
```

### Array.join()
接受一个`string`类型的参数，并用该参数将数组中的元素依次拼接起来，最后返回连接之后的字符串
默认使用`,`拼接
不会改变原数组

```javascript
let arr = ['Fire', 'Wind', 'Rain'];
console.log(arr.join());       // Fire,Wind,Rain
console.log(arr.join(''));     // FireWindRain
console.log(arr.join('-'));    // Fire-Wind-Rain
console.log(arr);              // ['Fire', 'Wind', 'Rain']
```

### Array.toString()
返回一个字符串，表示指定的数组及其元素
不会改变原数组

```javascript
let arr = [1, 2, 'a', '1a'];
console.log(arr.toString());    // "1,2,a,1a"
console.log(arr);               // [1, 2, 'a', '1a']
```

### Array.keys()
返回一个包含数组中每个索引键的`Array Iterator`对象
不会改变原数组

```javascript
let arr = ['a', 'b', 'c'];
let eArr = arr.keys();
console.log(arr);         // ['a', 'b', 'c']
for (let key of eArr) {
  console.log(key);       // 0 1 2
}
```

### Array.values()
返回一个新的`Array Iterator`对象，该对象包含数组每个索引的值
不会改变原数组

```javascript
let arr = ['w', 'y', 'k', 'o', 'p'];
let eArr = arr.values();
console.log(arr);               // ['w', 'y', 'k', 'o', 'p'] 
console.log(eArr.next().value); // w
console.log(eArr.next().value); // y
console.log(eArr.next().value); // k
console.log(eArr.next().value); // o
console.log(eArr.next().value); // p
```

### Array.entries()
返回一个新的`Array Iterator`对象，该对象包含数组中每个索引的键/值对
不会改变原数组

```javascript
let arr = ['a', 'b', 'c'];
let eArr = arr.entries();
console.log(arr);               // ['a', 'b', 'c']
console.log(eArr.next().value); // [0, "a"]
console.log(eArr.next().value); // [1, "b"]
console.log(eArr.next().value); // [2, "c"]

//iterator.next方法运行
let arr = ["a", "b", "c"];
let iter = arr.entries();
let a = [];
// for(let i=0; i< arr.length; i++){      // 实际使用的是这个 
for(let i = 0; i < arr.length + 1; i++){  // 注意，是length+1，比数组的长度大
  let tem = iter.next();                  // 每次迭代时更新next
  console.log(tem.done);                  // 这里可以看到更新后的done都是false
  if(tem.done !== true){                  // 遍历迭代器结束done才是true
    console.log(tem.value);
    a[i] = tem.value;
  }
}
console.log(a);                           // 遍历完毕，输出next.value的数组   [[0, "a"], [1, "b"], [2, "c"]]
```


## 案例
### 某对象是否在对象数组中
文章列表`articleList`，文章`obj1`和`obj2`是否在文章列表数组中
判断条件：文章`id`相同即可

```javascript
const articleList = [
  { id: 1, title: '文章一', content: 'this is a test page'},
  { id: 2, title: '文章二', content: 'this is a test page'},
  { id: 3, title: '文章三', content: 'this is a test page'},
  { id: 4, title: '文章四', content: 'this is a test page'},
  { id: 5, title: '文章五', content: 'this is a test page'},
  { id: 6, title: '文章六', content: 'this is a test page'},
  { id: 7, title: '文章七', content: 'this is a test page'},
  { id: 8, title: '文章八', content: 'this is a test page'},
  { id: 9, title: '文章九', content: 'this is a test page'},
  { id: 10, title: '文章十', content: 'this is a test page'}
]
const obj1 = { id: 5, title: '文章5', content: 'this is a test page'}
const obj2 = { id: 20, title: '文章20', content: 'this is a test page'}

const itemInList = (item, list) => list.some(obj => item.id === obj.id)

console.log(itemInList(obj1, articleList))    // true
console.log(itemInList(obj2, articleList))   // false
```

### 对象数组合并去重
两个对象数组合并并去除重复项，然后根据`id`排序
重复条件：对象的`id`相同

```javascript
const list1 = [
  { id: 1, title: '文章一', content: 'this is a test page'},
  { id: 2, title: '文章二', content: 'this is a test page'},
  { id: 3, title: '文章三', content: 'this is a test page'},
  { id: 4, title: '文章四', content: 'this is a test page'},
  { id: 5, title: '文章五', content: 'this is a test page'},
  { id: 10, title: '文章六', content: 'this is a test page'},
  { id: 15, title: '文章七', content: 'this is a test page'},
]
const list2 = [
  { id: 3, title: '文章三', content: 'this is a test page'},
  { id: 4, title: '文章四', content: 'this is a test page'},
  { id: 5, title: '文章五', content: 'this is a test page'},
  { id: 6, title: '文章六', content: 'this is a test page'},
  { id: 7, title: '文章七', content: 'this is a test page'},
  { id: 8, title: '文章八', content: 'this is a test page'},
  { id: 9, title: '文章九', content: 'this is a test page'},
  { id: 10, title: '文章十', content: 'this is a test page'}
]
// 方法一：从list2筛选出不在list1的项。跟list1进行拼接
// let arr = list2.filter(item => {
//   return !list1.some(obj => obj.id === item.id)
// })
// let list = list1.concat(arr)      // 合并去重后的结果
// list.sort((a, b) => a.id - b.id)  // 根据id递增排序
// console.log(list)

// 方法二：list2循环，每一项判断是否在list1中，如果不在，往list1里面插
list2.forEach(item => {
  !list1.some(obj => obj.id === item.id) && list1.push(item)  // 若该项不在list1中，push进去
})
list1.sort((a, b) => a.id - b.id)   // 根据id递增排序
console.log(list1)
```

### 对象数组去除指定项
去除`id`为4、6、9的项

```javascript
const arr = [4, 6, 9]
let list = [
  { id: 1, title: '文章一', content: 'this is a test page'},
  { id: 2, title: '文章二', content: 'this is a test page'},
  { id: 3, title: '文章三', content: 'this is a test page'},
  { id: 4, title: '文章四', content: 'this is a test page'},
  { id: 5, title: '文章五', content: 'this is a test page'},
  { id: 6, title: '文章六', content: 'this is a test page'},
  { id: 7, title: '文章七', content: 'this is a test page'},
  { id: 8, title: '文章八', content: 'this is a test page'},
  { id: 9, title: '文章九', content: 'this is a test page'},
  { id: 10, title: '文章十', content: 'this is a test page'}
]

list = list.filter(item => arr.indexOf(item.id) === -1)
console.log(list)
```