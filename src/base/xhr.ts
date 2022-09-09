const originalProto = XMLHttpRequest.prototype
const originalOpen = originalProto.open
const originalSend = originalProto.send

/*
 *@Author: 赵元达
 *@Date: 2022-09-09 11:20:49
 *@parms:
 *@Description: 通过传统的方式进行post处理
 */
export function reportWithXHR(url: string, data: any) {
  const xhr = new XMLHttpRequest()
  originalOpen.call(xhr, 'post', url, true)
  originalSend.call(xhr, JSON.stringify(data))
}
