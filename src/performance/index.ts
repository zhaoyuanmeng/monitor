/*
 *@Author: 赵元达
 *@Date: 2022-09-06 13:58:16
 *@parms:
 *@Description: 收集页面指标信息
 */

import { xhr } from './xhr'
import { fetch } from './fetch'
export function performance(config: any) {
  fetch(config)
  xhr(config)
}
