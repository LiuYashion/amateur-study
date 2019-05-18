


function Fun1() {
  global = 1
  Fun2 = function(){
    console.log(9999)
  }
}

Fun1()

function Fun2() {
  console.log('2222')
}

Fun2()  // 9999

