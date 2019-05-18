# js框架存在的原因
UI与状态同步十分困难。各种input focus事件都需要处理，所以需要一种框架来帮助我们自动实现同步

那么是如何同步的呢?
- react比较虚拟dom，再映射成真实的dom
- vue观察者模式，当被监听的属性变化时，属性的dom重新渲染

# 一些关于react的方法
## 1.0 JSX
JSX是js的一个语法拓展,用来定义UI是什么样子的,一种模板
```js
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
```


## 2.0 Rendering Elements
渲染元素 ReactDOM.render
```js
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```


## 3.0 Components and Props
组件使得你将UI分组多个独立的可复用部分,不要害怕抽象组件
> react组件对props的操作 都必须是纯函数的
```js

// 函数类组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);

// es6类组件
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// 组合组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```


## 4.0 State and Lifecycle
组件的state和生命周期
```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

生命周期
- componentWillMount()
  此时可以进行开启定时器、向服务器发送请求等操作

- componentDidMount()
  此时页面中有了真正的DOM的元素，可以进行DOM相关的操作

- shouldComponentUpdate()
  当组件接收到新属性，或者组件的状态发生改变时触发。组件首次渲染时并不会触发

- componentWillUnmount()
  组件被销毁时触发。这里我们可以进行一些清理操作，例如清理定时器，取消Redux的订阅事件等等



## 5.0 Handling Events
事件处理, 需要注意的就是绑定好this
```js
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    // 通过上面的方式来组织默认行为
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}


/** 构造器中绑定this */
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }
  //或者直接用箭头函数默认绑定this
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>

      // 或者onclick的时候 使用箭头函数
      // 唯一的一个小问题就是 这个箭头函数每次渲染都是会重新生成的
      // 所以当它作为pros传入子组件时 会触发子组件额外一次渲染
      // <button onClick={(e) => this.handleClick(e)}>
      //   Click me
      // </button>

    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);

/** 传入额外的参数 */
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

```



## 6.0 Conditional Rendering
条件渲染, 我们可以使用各种条件语句,
当我们不想要render的时候 直接return null;
当然, 子组件的componentDidUpdate仍然会被触发
```js

```



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

- 我们把map方法植入到jsx语法中
```js
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```



## 8.0 Forms
Form是react的一个独特的组件,因为它自己内部还要维护一些状态,
```js

```

## 9.0 Lifting State Up
提升state
