import { useLevel, useStats } from '../store'
import { Gem } from './Gem'
import { Icon } from './Icon'

/** 顶栏：logo + 连击火苗 + 等级 + 经验条 */
export const TopBar = () => {
  const streak = useStats().curStreak
  const lv = useLevel()

  return (
    <div>
      <header className="topbar">
        <div className="logo">
          <Gem idx={0} size={34} />
          <span className="name">瘦身大作战</span>
        </div>
        <div className="spacer" />
        <span className="chip-stat flame" title="连续成功天数">
          <Icon name="flame" size={17} />
          <span className="num">{streak}</span>
        </span>
        <span className="chip-stat" title={`${lv.title} · 距下一级 ${lv.need - lv.into} 经验`}>
          <Icon name="crown" size={17} style={{ color: '#e8a50f' }} />
          <span className="num">LV{lv.level}</span>
        </span>
      </header>
      <div
        className="xp-line"
        role="progressbar"
        aria-label="等级经验"
        aria-valuemin={0}
        aria-valuemax={lv.need}
        aria-valuenow={lv.into}
      >
        <i style={{ width: `${lv.into > 0 ? Math.max(4, lv.progress * 100) : 0}%` }} />
      </div>
    </div>
  )
}
