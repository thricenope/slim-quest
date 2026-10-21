import { chainIndex } from './stats'
import type { DayRecord } from '../types'

export interface GemSkin {
  id: string
  name: string
  base: string
  light: string
  dark: string
  glow: string
}

/** 六色宝石：草莓 / 蜜橘 / 柠檬 / 薄荷 / 葡萄 / 天空 */
export const GEMS: GemSkin[] = [
  { id: 'berry', name: '草莓石', base: '#FF5D8F', light: '#FFB3CC', dark: '#C23364', glow: '#FF9FBF' },
  { id: 'tange', name: '蜜橘石', base: '#FF9838', light: '#FFD1A1', dark: '#C26A12', glow: '#FFBE73' },
  { id: 'lemon', name: '柠檬石', base: '#FFC93C', light: '#FFF0B3', dark: '#C79212', glow: '#FFDE7A' },
  { id: 'mint', name: '薄荷石', base: '#2ED3A3', light: '#A9F0DC', dark: '#128A6B', glow: '#75E6C6' },
  { id: 'grape', name: '葡萄石', base: '#9D6CFF', light: '#D4BEFF', dark: '#6640B8', glow: '#B995FF' },
  { id: 'sky', name: '天空石', base: '#4FC3F7', light: '#B5E4FA', dark: '#2381AC', glow: '#8AD6F9' },
]

/** 链内每 3 颗一组同色（连续 3 天成功 = 一次「消除」） */
export const gemColorOf = (date: string, records: Record<string, DayRecord>): number => {
  const idx = chainIndex(date, records)
  if (idx < 0) return Math.abs(hash(date)) % GEMS.length
  return Math.floor(idx / 3) % GEMS.length
}

export const hash = (s: string): number => {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return h
}

/** 连击称号 */
export const comboTitle = (n: number): string => {
  if (n >= 30) return '月度传奇'
  if (n >= 21) return '习惯铸造师'
  if (n >= 14) return '两周不屈'
  if (n >= 10) return '十天十捷'
  if (n >= 7) return '周冠军'
  if (n >= 5) return '五连爆'
  if (n >= 3) return '三连消'
  if (n >= 2) return '双倍快乐'
  if (n >= 1) return '首战告捷'
  return ''
}
