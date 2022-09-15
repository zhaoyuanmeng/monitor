/**
 * @author Zhao YuanDa
 * @parms:
 * @description: //页面改变
 * @date 2022-09-15 11:02
 */

import { lazyReportCache } from '../base/report'
import type { initOption } from '../types/base'
import { getPageUrl, getUUID } from '../utils'

export function pageChangeHandle(config: initOption) {
  // 从哪个页面过来的
  let from = ''
  const oldUrl = ''
  handlePopstate()
  handlehashchange()
  function handlePopstate() {
    // 第三个参数设置为true表示代表捕获阶段处理 否则冒泡阶段
    window.addEventListener(
      'popstate',
      () => {
        const to = getPageUrl()

        lazyReportCache(config, {
          from,
          to,
          type: 'behavior',
          subType: 'popstate',
          startTime: performance.now(),
          uuid: getUUID(),
        })

        from = to
      },
      true,
    )
  }
  function handlehashchange() {
    window.addEventListener(
      'hashchange',
      (event) => {
        const newUrl = event.newURL

        lazyReportCache(config, {
          from: oldUrl,
          to: newUrl,
          type: 'behavior',
          subType: 'hashchange',
          startTime: performance.now(),
          uuid: getUUID(),
        })
      },
      true,
    )
  }
}
