
# css 常见布局

## 1) 传统布局
文档流布局；浮动布局float；定位布局positon

## 2) flex布局

### 父元素

```css

/** flex-direction 主轴的方向和顺序 **/
.ele {
  flex-direction: row;                // 默认值，主轴为水平方向，起点在左端。
  flex-direction: row-reverse;        // 主轴为水平方向，起点在右端。
  flex-direction: column;             // 主轴为垂直方向，起点在上。
  flex-direction: column-reverse;     // 主轴为垂直方向，起点在下。
}

/** flex-wrap 如果一行排不下的时候 **/
.ele {
  flex-wrap: nowrap;          // 默认，不换行
  flex-wrap: wrap;            // 换行，第一行在上方。
  flex-wrap: wrap-reverse     // 换行，第一行在下方。
}

/** justify-content 主轴上的对齐方式 **/
.ele{
  justify-content: flex-start;      // 默认，左对齐
  justify-content: flex-end;        // 右对齐
  justify-content: center;          // 居中
  justify-content: space-between;   // 两端对齐，项目之间的间隔都相等。
  justify-content: space-around;    // 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
}

/** flex-flow 简写形式 **/
.ele {
  flex-flow: <flex-direction> || <flex-wrap>;
}

/** align-items 交叉轴上的对齐方式 **/
.ele{
  align-items: flex-start;    // 交叉轴的起点对齐。
  align-items: flex-end;      // 交叉轴的终点对齐。
  align-items: center;        // 交叉轴的中点对齐。
  align-items: baseline;      // 项目的第一行文字的基线对齐。
  align-items: stretch;       // 默认，如果项目未设置高度或设为auto，将占满整个容器的高度。
}

/** align-content 多根轴线的对齐方式 **/
.ele{
  align-content: flex-start;   // 与交叉轴的起点对齐
  align-content; flex-end;     // 与交叉轴的终点对齐。
  align-content: center;       // 与交叉轴的中点对齐。
  align-content: space-between;// 与交叉轴两端对齐，轴线之间的间隔平均分布。
  align-content: space-around; // 每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
  align-content: stretch;     // 默认 轴线占满整个交叉轴。
}
```



### 子元素

```css
/** order 越小越靠前 **/
.ele{
   order: num;
}

/** 增长比例 **/
.ele{
    flex-grow: <number>; /* default 0 */
}

/** 缩减比例，需要父容器的flex-wrap 为 nowrap **/
.ele{
    flex-shrink: <number>; /* default 0 */
}

/** 不伸缩情况下的原始尺寸 **/
.ele{
    flex-basis: <length> | auto; /* default auto */
}

/** flex-grow,flex-shrink 和 flex-basis **/
.ele{
    flex: 0 1 auto;
}

/** 交叉轴上的对齐方式，可以覆盖掉父容器的 **/
.ele{
  align-self: auto;             // 继承父元素的 align-items 属性
  align-self: flex-start;       // 交叉轴的起点对齐。
  align-self: flex-end;         // 交叉轴的终点对齐。
  align-self: center;           // 交叉轴的中点对齐。
  align-self: baseline;         // 项目的第一行文字的基线对齐。
  align-self: stretch;          // 默认，如果项目未设置高度或设为auto，将占满整个容器的高度。
}

```


## 3) 网格布局

flex是一维布局，grid网格布局是二维布局

### 子元素
```css
.num-0{
  grid-row-start: 2;      /** 行，从第几个开始 */
  grid-column-start: 3;   /** 列，从第几个开始 */
  grid-row-end: 4;        /** 行，从第几个结束 */
  grid-column-end: 4;     /** 列，从第几个结束 */
}
```

## 4) 常见布局

水平居中：
- 绝对定位居中；
- 父元素设置text-align center，然后子元素设为内联；
- flex布局，主轴水平，主轴居中对齐；

垂直居中：
- 绝对定位
- flex布局，主轴竖直，主轴交叉轴都居中对齐





## 4) 什么时候父元素会被撑开，什么时候撑不开
子元素float 或者绝对定位了，父亲会撑不开
