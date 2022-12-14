// 采用类的方式书写

import type { initOption } from '../types/base'
import { behaviorHandle } from '../behavior'
import { performance } from '../performance'
import { setConfig } from './config'
import { error } from './../error/index'
export class Ymonitor {
  public errorInfo = {}
  public performanceInfo = {}

  public init(option: initOption) {
    // 对option进行处理
    const config = setConfig(option)

    // 收集错误信息
    error(config)

    // 收集行为
    behaviorHandle(config)
    // 收集页面指标信息
    performance(config)
  }

  // TODO 后续可以添加一些操作
  public report() {}
}
