import { deepCopy } from '../utils/index'

export type cacheType<T> = Array<T>

const cacheData: cacheType<any> = []

export function addCache(data: cacheType<any>) {
  cacheData.push(data)
}
export function delCache() {
  cacheData.length = 0
}
export function getCache() {
  return deepCopy(cacheData)
}
