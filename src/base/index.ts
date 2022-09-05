// 采用类的方式书写

import type { initOption } from '../types/base'
import { setConfig } from './config'
export class Ymonitor {
  public init(option: initOption) {
    // 对option进行处理
    setConfig(option)
  }

  // TODO 后续可以添加一些操作
  public report() {}
}
