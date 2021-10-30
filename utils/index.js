/**
 * 防抖
 * 立即执行版实现
 * @param {*} func 
 * @param {*} wait 
 * @param {*} immediate 
 * @returns 
 */
export function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 立即执行
      console.log('!timeout', !timeout)
      if (!timeout) func.apply(context, args)
      timeout = setTimeout(function () {
        timeout = null;
      }, wait)
    } else {
      // 不立即执行
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }
  }
}