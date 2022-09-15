/**
   * @author Zhao YuanDa
   * @parms:
   * @description: //页面访问量
   * @date 2022-09-15 11:01
   */

import { lazyReportCache } from '../base/report'
import type { initOption } from '../types/base'
import { getPageUrl, getUUID } from '../utils'

export function pvHandle(config: initOption) {
  lazyReportCache(config, {
    type: 'behavior',
    subType: 'pv',
    startTime: performance.now(),
    pageURL: getPageUrl(),
    referrer: document.referrer,
    uuid: getUUID(),
  })
}
