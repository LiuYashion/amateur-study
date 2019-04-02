// 常规类型
export default {
  data() {
    return {
      checked: true
    }
  },
  methods: {
    query() {

    }
  }
}

// 函数式组件
//   无状态
//   无实例
export default {
  name: 'function-button',
  functional: true,
  render(creatElement, context) {

  }
}
