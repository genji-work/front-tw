export function throttle(fn, wait = 160) {
  let timeout
  let start = new Date;
  return function () {

    const context = this
    const args = arguments
    const curr = new Date() - 0

    //总是干掉事件回调
    clearTimeout(timeout)

    if(curr - start >= wait){
      //只执行一部分方法，这些方法是在某个时间段内执行一次
      fn.apply(context, args)
      start = curr;
    } else{
    //让方法在脱离事件后也能执行一次
      timeout = setTimeout(function(){
        fn.apply(context, args)
      }, wait);
    }
  }
}

export function delay(wait = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, wait);
  });
}
