import type { initOption } from '../types/base'
import { generateUniqueId } from '../utils'
import { addCache, getCache } from './cache'
import { reportWithXHR } from './xhr'
import { lazyHandle } from './lifeTime'

type Timeout = /* unresolved */ any
type ReportData = any[]
const uuid: string = generateUniqueId()
const log = console.log
/*
 *@Author: 赵元达
 *@Date: 2022-09-09 11:12:27
 *@parms:
 *@Description: 判断是否支持sendBeacon
 */

function isSupportSendBeacon(): boolean {
  return !!window.navigator?.sendBeacon
}
/*
 *@Author: 赵元达
 *@Date: 2022-09-09 10:56:54
 *@parms: 这个参数就是为了模拟sendBeacon这种形式造出来的
 *@Description:整合数据的传递方式（传递给服务器）
 */
const sendBeacon = isSupportSendBeacon()
  ? window.navigator.sendBeacon.bind(window.navigator)
  : reportWithXHR

/*
 *@Author: 赵元达
 *@Date: 2022-09-07 10:48:29
 *@parms: isImmediate：是否立即执行
 *@Description: 上报入口函数
 */
export function report(config: initOption, data: any, isImmediate = false) {
  if (!config.url) {
    log('请设置上传url的地址!!!')
    return
  }

  // 封装一下需要上传的数据
  const reportData = JSON.stringify({
    id: uuid, // 这个可以随机生成一个id
    appID: config.appID,
    userID: config.userID,
    data,
  })

  // 立即执行
  if (isImmediate) {
    // 传递给后端
    sendBeacon(config.url, reportData)
    return
  }
  // 延迟执行
  lazyHandle(config.url, reportData, sendBeacon, 2000)
}

/*
 *@Author: 赵元达
 *@Date: 2022-09-07 10:48:40
 *@parms: TODO:更新data的类型（好好想想）
 *@Description: 懒上报
 */
export function lazyReportCache(config: initOption, data: any, timeout = 3000) {
  let timer: Timeout

  // 添加到缓存种
  addCache(data)

  clearTimeout(timer)

  timer = setTimeout(() => {
    // 取出所有的缓存数据来
    const cacheData = getCache()
    report(config, cacheData)
  }, timeout)
}
