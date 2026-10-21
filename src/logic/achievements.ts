import type { Stats } from '../types'

export type AchKind = 'streak' | 'total' | 'special'

export interface Achievement {
  id: string
  emoji: string // 展示用装饰符号（徽章中央主图另由 SVG 绘制）
  name: string
  desc: string
  kind: AchKind
  tier: number // 奖励经验 = tier * 25
  goal: number
  value: (s: Stats) => number
  /** 里程碑之路上的站点（连续类按用户点名的阶梯） */
  onRoad?: boolean
}

export const ACHIEVEMENTS: Achievement[] = [
  // —— 连续坚持（用户点名的阶梯：1/2/3/4/5/周末/一周/两周/一月/一年/两年…）
  { id: 's1', emoji: '🌱', name: '第一天', desc: '成功打卡第 1 天，故事开始了', kind: 'streak', tier: 1, goal: 1, value: (s) => s.maxStreak, onRoad: true },
  { id: 's2', emoji: '🌱', name: '两天连续', desc: '连击 x2，好苗头', kind: 'streak', tier: 1, goal: 2, value: (s) => s.maxStreak, onRoad: true },
  { id: 's3', emoji: '✨', name: '三连消', desc: '连续 3 天，凑齐第一组同色宝石！', kind: 'streak', tier: 1, goal: 3, value: (s) => s.maxStreak, onRoad: true },
  { id: 's4', emoji: '✨', name: '四连胜', desc: '连续 4 天，稳如老狗', kind: 'streak', tier: 1, goal: 4, value: (s) => s.maxStreak, onRoad: true },
  { id: 's5', emoji: '💥', name: '五连爆', desc: '连续 5 天，工作日全通关', kind: 'streak', tier: 2, goal: 5, value: (s) => s.maxStreak, onRoad: true },
  { id: 'wk1', emoji: '🏖️', name: '周末双杀', desc: '一个周六周日都成功，休息日也不松懈', kind: 'special', tier: 2, goal: 1, value: (s) => s.weekendPairs },
  { id: 's7', emoji: '🏅', name: '一周传说', desc: '整整一周连续成功！', kind: 'streak', tier: 2, goal: 7, value: (s) => s.maxStreak, onRoad: true },
  { id: 's14', emoji: '🏅', name: '两周不屈', desc: '连续 14 天，半个月的坚持', kind: 'streak', tier: 3, goal: 14, value: (s) => s.maxStreak, onRoad: true },
  { id: 's21', emoji: '🔮', name: '习惯成真', desc: '21 天连续，习惯已经长出来了', kind: 'streak', tier: 3, goal: 21, value: (s) => s.maxStreak, onRoad: true },
  { id: 's30', emoji: '👑', name: '满月王者', desc: '连续 30 天，一个月不断电', kind: 'streak', tier: 4, goal: 30, value: (s) => s.maxStreak, onRoad: true },
  { id: 's100', emoji: '👑', name: '百日筑基', desc: '连续 100 天，改写人生剧本', kind: 'streak', tier: 5, goal: 100, value: (s) => s.maxStreak, onRoad: true },
  { id: 's365', emoji: '🌟', name: '一岁一星', desc: '连续 365 天，整整一年的荣光', kind: 'streak', tier: 6, goal: 365, value: (s) => s.maxStreak, onRoad: true },
  { id: 's730', emoji: '🌠', name: '两载传说', desc: '连续 730 天，传说不过如此', kind: 'streak', tier: 7, goal: 730, value: (s) => s.maxStreak, onRoad: true },

  // —— 累计成功日
  { id: 't10', emoji: '🍬', name: '十全十美', desc: '累计 10 个成功日', kind: 'total', tier: 1, goal: 10, value: (s) => s.winDays },
  { id: 't30', emoji: '🍭', name: '糖果三十', desc: '累计 30 个成功日', kind: 'total', tier: 2, goal: 30, value: (s) => s.winDays },
  { id: 't100', emoji: '🎁', name: '百宝箱', desc: '累计 100 个成功日', kind: 'total', tier: 4, goal: 100, value: (s) => s.winDays },
  { id: 't365', emoji: '💎', name: '钻石之年', desc: '累计 365 个成功日', kind: 'total', tier: 6, goal: 365, value: (s) => s.winDays },

  // —— 特色成就
  { id: 'p3', emoji: '🏆', name: '完美三连', desc: '拿下 3 个完美日（≥6 分）', kind: 'special', tier: 2, goal: 3, value: (s) => s.perfectDays },
  { id: 'p10', emoji: '🏆', name: '完美主义', desc: '拿下 10 个完美日', kind: 'special', tier: 3, goal: 10, value: (s) => s.perfectDays },
  { id: 'e10', emoji: '💪', name: '撸铁初心', desc: '累计运动打卡 10 次', kind: 'special', tier: 1, goal: 10, value: (s) => s.exerciseCount },
  { id: 'e50', emoji: '💪', name: '流汗机器', desc: '累计运动打卡 50 次', kind: 'special', tier: 3, goal: 50, value: (s) => s.exerciseCount },
  { id: 'early20', emoji: '⏰', name: '早食主义者', desc: '20 次 17 点前解决晚饭', kind: 'special', tier: 2, goal: 20, value: (s) => s.earlyDinners },
]

export const achById = (id: string): Achievement | undefined =>
  ACHIEVEMENTS.find((a) => a.id === id)

/** 里程碑之路：只放连续类站点 */
export const ROAD = ACHIEVEMENTS.filter((a) => a.onRoad)

/** 找到下一个未解锁的连续里程碑（用于「还差 N 天」） */
export const nextRoad = (s: Stats, unlocked: Record<string, string>): Achievement | undefined =>
  ROAD.find((a) => !unlocked[a.id] && a.goal > s.maxStreak) ?? ROAD.find((a) => !unlocked[a.id])
