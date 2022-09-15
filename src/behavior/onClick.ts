/**
import { initOption } from './../types/base';
 * @author Zhao YuanDa
 * @parms:
 * @description: //点击
 * @date 2022-09-15 11:02
 */

import { lazyReportCache } from '../base/report'
import type { initOption } from '../types/base'
import { getPageUrl, getUUID } from '../utils'

export function clickHandle(config: initOption) {
  // touchstart 触摸开始
  const eventTypeArr = ['mousedown', 'touchstart']
  eventTypeArr.forEach((eventType) => {
    let timer: any = null
    // 这里可以优化 针对想要监听的dom 而不是所有的window
    window.addEventListener(eventType, (event: any) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const target: any = event.target!
        const { top, left } = target.getBoundingClientRect()
        lazyReportCache(config, {
          top,
          left,
          eventType,
          pageHeight: document.documentElement.scrollHeight || document.body.scrollHeight,
          scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
          type: 'behavior',
          subType: 'click',
          target: target.tagName,
          paths: event.path?.map((item: { tagName: any }) => item.tagName).filter(Boolean),
          startTime: event.timeStamp,
          pageURL: getPageUrl(),
          outerHTML: target.outerHTML,
          innerHTML: target.innerHTML,
          width: target.offsetWidth,
          height: target.offsetHeight,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
          },
          uuid: getUUID(),
        })
      }, 500)
    })
  })
}
