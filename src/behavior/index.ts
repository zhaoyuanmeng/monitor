import type { initOption } from '../types/base'
import { clickHandle } from './onClick'
import { pageAccessHeightHandle } from './pageAccessHeight'
import { pageChangeHandle } from './pageChange'
import { pvHandle } from './pv'

/**
 * @author Zhao YuanDa
 * @parms:
 * @description: //行为入口
 * @date 2022-09-15 11:02
 */
export function behaviorHandle(config: initOption) {
  clickHandle(config)
  pageChangeHandle(config)
  pageAccessHeightHandle(config)
  pvHandle(config)
}
