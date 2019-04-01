## Array

数组元素的进出
```js
let array = [1, 2, 3, 4, 5]
array.push(9)       //  入栈，返回数组长度
array.pop()         //  出栈，返回元素
array.shift()       //  出队，返回元素
array.unshift()     //  入队，返回元素
```

数组元素排序，反转
```js
array.sort((a, b) => a - b)   //   一次传入两个元素，return > 0就交换
array.reverse()     //  逆序数组，改变原数组
```

数组的创建
```js
Array.of(7) // [7]
Array(7)    // [ , , , , , , ]
```

数组的截取和拼接
```js
let array1 = [1, 2, 3]
let array2 = [6, 7, 9, 12, 4, 45]

array1.concat(array2)  // 拼接两个数组，返回新数组，不改变原数组
array2.splice(x, n)  //  从x开始截取n个元素，改变原数组
array2.slice(1, 5)  // 从索引1开始，截取到索引5之前。不改变原数组

```

深度数组的展开
```js
var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

//使用 Infinity 作为深度，展开任意深度的嵌套数组
arr3.flat(Infinity);
// [1, 2, 3, 4, 5, 6]
```

数组元素过滤和与或非
```js
let array = [1, 2, 3, 4, 5]
// 检测每一项是否都通过
const result = array.every((item, index, arr) => {
  return item > 3
})
// 检测至少有一项通过
const result = array.some((item, index, arr) => {
  return item > 3
})
// 检测至少有一项通过
const result = array.filter((item, index, arr) => {
  return item > 3
})
// 每一项都调用一次
array.forEach((item, index, arr) => {
  console.log(item);
});
```

map & reduce
```js
// 返回每个元素调用方法后的结果 所组成的数组
var array1 = [1, 4, 9, 16];
const map1 = array1.map(x => x * 2);
console.log(map1);  //  [2, 8, 18, 32]

const reduce1 = array1.reduce((item, value) => {
  return item + value
})
console.log(reduce1);  //  30
```

替换元素
```js
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
array.fill(0, 2, 4) // 用2填充，第2个到第4个之前的元素 会改变原数组
// [1, 2, 0, 0, 5, 6, 7, 8, 9]
```

查找元素，查找满足条件的第一个索引
```js
var array1 = [5, 12, 8, 130, 44];
var found = array1.find((element) => {
  return element > 10;
});
console.log(found); // 12

var found = array1.findIndex((element) => {
  return element > 10;
});
console.log(found); // 3
```

entries() 方法返回一个新的Array Iterator对象
```js
var array1 = ['a', 'b', 'c'];
var iterator1 = array1.entries();

console.log(iterator1.next().value);
// expected output: Array [0, "a"]
console.log(iterator1.next().value);
// expected output: Array [1, "b"]
```
