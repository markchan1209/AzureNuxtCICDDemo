/**
 * 函数防抖
 * @param {*} fun 被调用函数
 * @param {*} delay 延时执行（500）
 */
export function debounce(fun, delay) {
  let deferTimer = null
  return function(args) {
    // 获取函数的作用域和变量
    const [that, _args] = [this, args]
    // 每次事件被触发，都会清除当前的timeer，然后重写设置超时调用
    if (deferTimer) {
      clearTimeout(deferTimer)
      deferTimer = null
    }
    deferTimer = setTimeout(function() {
      fun.call(that, _args)
    }, delay)
  }
}
