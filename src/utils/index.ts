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
 *@Date: 2022-09-07 15:18:51
 *@parms:
 *@Description: 深拷贝
 */
export function deepCopyTwo(data: any) {
  if (typeof data !== 'object' || data === null)
    throw new TypeError('传入参数不是对象')

  const newData = {} as any
  const dataKeys = Object.keys(data)
  dataKeys.forEach((value: string) => {
    const currentDataValue = data[value]
    // 基本数据类型的值和函数直接赋值拷贝
    if (typeof currentDataValue !== 'object' || currentDataValue === null) {
      newData[value] = currentDataValue
    }
    else if (Array.isArray(currentDataValue)) {
      // 实现数组的深拷贝
      newData[value] = [...currentDataValue]
    }
    else if (currentDataValue instanceof Set) {
      // 实现set数据的深拷贝
      newData[value] = new Set([...currentDataValue])
    }
    else if (currentDataValue instanceof Map) {
      // 实现map数据的深拷贝
      newData[value] = new Map([...currentDataValue])
    }
    else {
      // 普通对象则递归赋值
      newData[value] = deepCopyTwo(currentDataValue)
    }
  })
  return newData
}

/*
 *@Author: 赵元达
 *@Date: 2022-09-07 15:22:17
 *@parms:
 *@Description: 深拷贝
 */
export function deepClone(target: any) {
  // 定义一个变量
  let result: any
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = [] // 将result赋值为一个数组，并且执行遍历
      for (const i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    }
    else if (target === null) {
      result = null
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    }
    else if (target.constructor === RegExp) {
      result = target
    }
    else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {}
      for (const i in target) result[i] = deepClone(target[i])
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  }
  else {
    result = target
  }
  // 返回最终结果
  return result
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

/*
 *@Author: 赵元达
 *@Date: 2022-09-09 10:51:39
 *@parms:
 *@Description: 随机生成一个id
 */
export function generateUniqueId(): string {
  return `v2-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`
}
