import { MD5, SHA1, enc } from 'crypto-js'

/**
 * md5加密字符串
 */
export const md5 = (str: string): string => {
  return MD5(str).toString(enc.Base64)
}

/**
 * sha1加密字符串
 */
export const sha1 = (str: string): string => {
  return SHA1(str).toString(enc.Base64)
}

/**
 * 使用特定加密范式加密
 */
export const encode = (str: string): string => {
  return md5(sha1(md5(str)))
}
