/**
 * @author Zhao YuanDa
 * @parms:
 * @description: //页面访问高度
 * @date 2022-09-15 11:00
 */

import { executeAfterLoad, onBeforeunload } from '../base/lifeTime'
import { lazyReportCache, report } from '../base/report'
import type { initOption } from '../types/base'
import { getPageUrl, getUUID } from '../utils'

export function pageAccessHeightHandle(config: initOption) {
  let timer: any = null

  let startTime = 0

  let hasReport = false

  let pageHeight = 0

  let scrollTop = 0

  let viewPortHeight = 0

  // 这是页面销毁之前做的事
  onBeforeunload(handleBeforeUnloadCallback)
  // 这是滚动的时候做的事
  handleScroll()
  // 这个会先执行
  executeAfterLoad(() => {
    startTime = performance.now()
    pageHeight
      = document.documentElement.scrollHeight || document.body.scrollHeight
    scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    viewPortHeight = window.innerHeight
  })
  function handleScroll() {
    window.addEventListener('scroll', handleScrollCallback)
  }
  function handleScrollCallback() {
    clearTimeout(timer)

    const now = performance.now()

    if (!hasReport) {
      hasReport = true
      lazyReportCache(config, {
        startTimeData: now,
        duration: now - startTime,
        type: 'behavior',
        subType: 'page-access-height',
        pageURL: getPageUrl(),
        value: toPercent((scrollTop + viewPortHeight) / pageHeight),
        uuid: getUUID(),
      })
    }

    timer = setTimeout(() => {
      hasReport = false
      startTime = now
      pageHeight
        = document.documentElement.scrollHeight || document.body.scrollHeight
      scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      viewPortHeight = window.innerHeight
    }, 500)
  }

  function handleBeforeUnloadCallback() {
    const now = performance.now()
    report(
      config,
      {
        startTimeData: now,
        duration: now - startTime,
        type: 'behavior',
        subType: 'page-access-height',
        pageURL: getPageUrl(),
        value: toPercent((scrollTop + viewPortHeight) / pageHeight),
        uuid: getUUID(),
      },
      true,
    )
  }

  /**
   * @author Zhao YuanDa
   * @parms:
   * @description: //转换成百分比
   * @date 2022-09-15 19:54
   */
  function toPercent(val: number) {
    if (val >= 1)
      return '100%'
    return `${(val * 100).toFixed(2)}%`
  }
}
