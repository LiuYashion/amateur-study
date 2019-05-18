

/** 单位时间内，调用第一次 */
function callFirstCb(cb, duration = 300){
  let locked = false
  return function (){
    if(locked) return;
    locked = true
    setTimeout(() => {
      cb.apply(this, arguments);
      locked = false;
    }, duration);
  }
}

/** 单位时间内，调用最后一次 */
function callLastCb(cb, duration = 300){
  let timer = null
  return function(){
    if (timer){
      clearTimeout(timer)
    } else {
      timer = setTimeout(() => {
        cb.apply(this, arguments)
      }, duration);
    }
  }
}