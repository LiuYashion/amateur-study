
# React or Vue


## 7.0 Lists and Keys
我们来渲染一个lists
```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);

// [2, 4, 6, 8, 10]
console.log(doubled);
```

- lists
这里会报错,因为每个li都没有对应的key标识, key能保证列表渲染时的稳定
```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

- lists里面 key的位置
key应该设置在直接被map的组件上, 而且key必须唯一
```js
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```


