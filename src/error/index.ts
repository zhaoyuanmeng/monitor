import { lazyReportCache } from '../base/report'
import type { initOption } from '../types/base'
import { getPageUrl, onBFCacheRestore } from '../utils/index'
/*
 *@Author: 赵元达
 *@Date: 2022-09-06 13:57:16
 *@parms:
 *@Description: 处理收集错误信息
 */
export function error(config: initOption) {
  // 拿到原来的api
  const oldConsoleError = window.console.error

  // 切片改写
  window.console.error = function (...arg) {
    // 绑定this
    oldConsoleError.apply(this, arg)

    // 新加上自己的补充 也就是收集和上传
    lazyReportCache(config, {
      type: 'error', // 这个可以做成枚举类型
      subType: 'console-error',
      // performance是全局对象可以直接引用在v8引擎下
      startTime: performance.now(),
      errData: arg,
      pageURL: getPageUrl(),
    })
  }

  // 监听promise的错误
  window.addEventListener('unhandledrejection', (e) => {
    lazyReportCache(config, {
      reason: e.reason?.stack,
      subType: 'promise',
      type: 'error',
      startTime: e.timeStamp,
      pageURL: getPageUrl(),
    })
  })

  // TODO 捕获上层框架里面的错误 比如vue react

  // 保证缓存的时候也会执行
  onBFCacheRestore(() => {
    error(config)
  })
  //
}
