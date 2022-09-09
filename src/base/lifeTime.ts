/*
 *@Author: 赵元达
 *@Date: 2022-09-09 11:28:33
 *@parms:
 *@Description: 类似于生命周期的函数
 */

export function beforeCreate() {}
export function create() {}
export function deleteData() {}
export function beforeDeleteData() {}

type FN = (a: any, b: any) => any

// 延迟执行
// 原理：window.requestIdleCallback()**方法插入一个函数，这个函数将在浏览器空闲时期被调用。
// 这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。
// 函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。
export function lazyHandle(
  url: string,
  reportData: any,
  callback: FN,
  timeout = 3000,
) {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(
      () => {
        callback(url, reportData)
      },
      { timeout },
    )
  }
  else {
    setTimeout(() => {
      callback(url, reportData)
    })
  }
}
