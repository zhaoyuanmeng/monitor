import { addCache, type cacheType, getCache } from './cache'
type Timeout = /* unresolved */ any
type ReportData = any[]
/*
 *@Author: 赵元达
 *@Date: 2022-09-07 10:48:29
 *@parms:
 *@Description: 上报
 */
export function report(data: ReportData): boolean {
  // 这里就是给后端上传这些信息了
  return !!data
}

/*
 *@Author: 赵元达
 *@Date: 2022-09-07 10:48:40
 *@parms:
 *@Description: 懒上报
 */
export function lazyReportCache(data: cacheType<any>, timeout = 3000) {
  let timer: Timeout

  // 添加到缓存种
  addCache(data)

  clearTimeout(timer)

  timer = setTimeout(() => {
    // 取出所有的缓存数据来
    const cacheData = getCache()
    report(cacheData)
  }, timeout)
}
