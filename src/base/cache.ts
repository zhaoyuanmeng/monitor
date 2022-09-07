import { deepCopy } from '../utils/index'

export type cacheType<T> = Array<T>

const cacheData: cacheType<string> = []

export function addCache() {}
export function delCache() {}
export function getCache() {
  return deepCopy(cacheData)
}
export function updateCache() {}
