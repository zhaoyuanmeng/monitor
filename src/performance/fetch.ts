/**
 * @author Zhao YuanDa
 * @parms:
 * @description: //监听fetch
 * @date 2022-09-17 09:17
 */

import { lazyReportCache } from '../base/report'

interface requestConfig {
  method: string
  body?: string
  headers?: any
}

export function fetch(config: any) {
  const originalFetch = window.fetch
  // 执行新的fetch
  overWirteFetch()
  function overWirteFetch() {
    // 重写fetch
    window.fetch = function (url: string, requestConfig: requestConfig) {
      const startTime = Date.now()
      const reportData = {
        startTime,
        url,
        endTime: 0,
        duration: 0,
        status: 0,
        success: false,
        method: (requestConfig?.method || 'GET').toUpperCase(),
        subType: 'fetch',
        type: 'performance',
      }
      return originalFetch(url, requestConfig)
        .then((res) => {
          // 这里面是对上传服务器的处理
          reportData.endTime = Date.now()
          reportData.duration = reportData.endTime - reportData.startTime
          const data = res.clone()
          reportData.status = data.status
          reportData.success = data.ok
          lazyReportCache(config, reportData)
        })
        .catch((err: string) => {
          reportData.endTime = Date.now()
          reportData.duration = reportData.endTime - reportData.startTime
          reportData.status = 0
          reportData.success = false

          lazyReportCache(config, reportData)

          throw err
        })
    } as never
  }
}
