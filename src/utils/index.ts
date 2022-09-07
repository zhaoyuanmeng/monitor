// 工具函数

/*
 *@Author: 赵元达
 *@Date: 2022-09-07 09:56:06
 *@parms:
 *@Description: 深拷贝
 */
// 方便提醒一下 深拷贝 和 浅拷贝

// 深拷贝 扩展运算符 json.parse(json.stringify()) array.slice()

// 浅拷贝 object.assign

export function deepCopy(target: any) {
  if (typeof target === 'object') {
    // 判断是否是数组类型
    const result = Array.isArray(target) ? target : ({} as any)
    let key: any
    for (key in target) {
      if (typeof target[key] === 'object')
        result[key] = deepCopy(target[key])
      else result[key] = target[key]
    }
    return result
  }
  return target
}

/*
 *@Author: 赵元达
 *@Date: 2022-09-07 10:46:25
 *@parms:
 *@Description: 获取当前页面的url
 */
export function getPageUrl(): string {
  return window.location.href
}
