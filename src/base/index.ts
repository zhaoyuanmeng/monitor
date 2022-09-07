// 采用类的方式书写

import type { initOption } from '../types/base'
import { setConfig } from './config'
import { error } from './../error/index'
export class Ymonitor {
  public errorInfo = {}
  public performanceInfo = {}

  public init(option: initOption) {
    // 对option进行处理
    setConfig(option)

    // 收集错误信息
    error()
    // 收集页面指标信息
  }

  // TODO 后续可以添加一些操作
  public report() {}
}
