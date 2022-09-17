/**
 * @author Zhao YuanDa
 * @parms:
 * @description: //监听xhr
 * @date 2022-09-17 09:15
 */
// 导入原来的xhl对象

import { lazyReportCache } from '../base/report'
import { originalOpen, originalProto, originalSend } from '../base/xhr'
import { getPageUrl } from '../utils'

export function xhr(config: any) {
  overWirteXhr()
  function overWirteXhr() {
    originalProto.open = function newOpen(this: any, ...args: any) {
      // 这里面的this代表originalProto这个对象
      this.method = args[0]
      this.url = args[1]
      // 调用原生 并注意this的指向
      originalOpen.apply(this, args)
    } as never

    originalProto.send = function newSend(this: any, ...args: any) {
      this.startTime = Date.now()

      const onLoadend = () => {
        this.endTime = Date.now()
        this.duration = this.endTime - this.startTime
        const { status, duration, startTime, endTime, url, method } = this
        const reportData = {
          status,
          duration,
          startTime,
          endTime,
          url,
          pageURL: getPageUrl(),
          method: (method || 'GET').toUpperCase(),
          success: status >= 200 && status < 300,
          subType: 'xhr',
          type: 'performance',
        }

        lazyReportCache(config, reportData)

        this.removeEventListener('loadend', onLoadend, true)
      }
      // 相当于是一个发送结束的一个事件
      this.addEventListener('loadend', onLoadend)

      originalSend.apply(this, args)
    }
  }
}
