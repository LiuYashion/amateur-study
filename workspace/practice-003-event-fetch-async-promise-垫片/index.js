let sayName = (name) => {
  console.log(`my name is ${name}`)
}
let sayAge = (name) => {
  console.log(`my age is ${name}`)
}

let person = {
  name: 'LiuYaXiong',
  age: 18,
}

let promise = new Promise((resolve, reject)=>{
  resolve(11111)
})

promise.then(res=>{
  console.log(res)
})