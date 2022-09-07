/*
 *@Author: 赵元达
 *@Date: 2022-09-06 13:57:16
 *@parms:
 *@Description: 处理收集错误信息
 */
export function error() {
  // 拿到原来的api
  const oldConsoleError = window.console.error

  // 切片改写
  window.console.error = function (...arg) {
    // 绑定this
    oldConsoleError.apply(this, arg)

    // 新加上自己的补充 也就是收集和上传
  }
}
