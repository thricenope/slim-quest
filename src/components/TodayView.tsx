import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { DayRecord, Verdict } from '../types'
import { useGame, useStats, useTodayRecord } from '../store'
import { EMPTY_RECORD, VERDICT_META, evaluate, isPerfect, isWin } from '../logic/scoring'
import { today, dateCn } from '../logic/dates'
import { computeStats } from '../logic/stats'
import { missedRecent } from '../logic/stats'
import { comboTitle } from '../logic/gems'
import { titleFor } from '../logic/level'
import { bigCelebration, burstAt } from '../celebrate'
import { petById, nextPet } from '../logic/pets'
import { Pet } from './Pet'
import { DayEditor } from './DayEditor'
import { Icon } from './Icon'

const PRAISE: Record<Verdict, string[]> = {
  pending: ['今晚吃了什么，跟我说说嘛～', '点下面的选项，我帮你算分！', '泡泡在等你打卡哦'],
  perfect: ['哇！教科书级别的完美日！', '这就是传说中的瘦身之神吗！', '今天可以给自己打满分！'],
  win: ['今天也是闪闪发光的减肥日！', '晚饭把控得漂亮，瘦意满满～', '你的身体在悄悄感谢你！'],
  plain: ['普普通通，但也稳稳当当～', '差一点点就成功啦，动一动？'],
  fail: ['吃多了没关系，明天赢回来！', '一顿饭决定不了什么，别慌～', '抱抱，明天早点吃就赢！'],
}

const pick = (arr: string[], seed: string) =>
  arr[Math.abs([...seed].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0)) % arr.length]

const dayXp = (r: DayRecord | undefined | null): number =>
  (isWin(r) ? 20 : 0) + (isPerfect(r) ? 10 : 0) + Math.min(r?.exercises.length ?? 0, 2) * 2

export const TodayView = ({ onGoCalendar }: { onGoCalendar: () => void }) => {
  const saved = useTodayRecord()
  const setDay = useGame((s) => s.setDay)
  const clearDay = useGame((s) => s.clearDay)
  const pet = useGame((s) => s.pet)
  const setPet = useGame((s) => s.setPet)
  const stats = useStats()

  const t = today()
  const [draft, setDraft] = useState<DayRecord>(saved ?? EMPTY_RECORD(t))
  const [xpFloat, setXpFloat] = useState<{ id: number; text: string } | null>(null)
  const [combo, setCombo] = useState<{ n: number; title: string } | null>(null)
  const [levelUp, setLevelUp] = useState<number | null>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setDraft(saved ?? EMPTY_RECORD(t))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, saved?.date])

  const ev = useMemo(() => evaluate(draft), [draft])
  const meta = VERDICT_META[ev.verdict]
  const touched = draft.slot !== null || draft.amount !== null || draft.drink !== null || draft.exercises.length > 0
  const recordedToday = !!saved

  const missed = useMemo(() => missedRecent(useGame.getState().records), [recordedToday, stats.totalDays])

  const doSave = () => {
    const oldXp = dayXp(saved)
    const result = setDay(t, draft)
    const gained = dayXp(draft) - oldXp

    if (gained > 0) {
      setXpFloat({ id: Date.now(), text: `+${gained} 经验` })
      setTimeout(() => setXpFloat(null), 1500)
    }

    if (result.verdict === 'win' || result.verdict === 'perfect') {
      bigCelebration()
      burstAt(ctaRef.current)
      const streak = computeStats(useGame.getState().records).curStreak
      if (streak >= 2) {
        setCombo({ n: streak, title: comboTitle(streak) })
        setTimeout(() => setCombo(null), 1900)
      }
    } else if (gained > 0) {
      burstAt(ctaRef.current)
    }

    if (result.levelAfter > result.levelBefore) {
      setTimeout(() => setLevelUp(result.levelAfter), 700)
    }
  }

  const meterLeft = Math.min(96, Math.max(4, 44 + ev.score * 6.5))

  return (
    <div>
      {stats.totalDays === 0 && (
        <div className="card guide-card">
          <div className="g-title">欢迎来到瘦身大作战！</div>
          <ol>
            <li>每天晚饭后回来，<b>点几下</b>记录时间和食量</li>
            <li>成功的一天会收进一颗<b>宝石</b>，连续 3 天凑成一次「消除」</li>
            <li>从 1 天、一周、一个月到两年，<b>里程碑</b>等你解锁</li>
          </ol>
        </div>
      )}

      {missed && !recordedToday && (
        <div className="done-banner" style={{ background: '#fff8ec', borderColor: '#ffe2b8' }}>
          <Icon name="calendar" size={20} style={{ color: '#c26a12' }} />
          <span className="t" style={{ color: '#9a6410' }}>
            {dateCn(missed)}还没打卡
          </span>
          <button className="cal-today-btn" onClick={onGoCalendar}>
            去补卡
          </button>
        </div>
      )}

      <div className="card mascot-card">
        <button
          type="button"
          className="mascot-btn"
          aria-label={`切换伙伴，当前是${petById(pet).name}`}
          title="点我换伙伴"
          onClick={() => setPet(nextPet(pet))}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={pet}
              initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 8 }}
              transition={{ type: 'spring', stiffness: 420, damping: 18 }}
              style={{ display: 'flex' }}
            >
              <Pet petId={pet} mood={ev.verdict} />
            </motion.span>
          </AnimatePresence>
          <span className="pet-tag">{petById(pet).name}</span>
        </button>
        <div className="bubble">
          <AnimatePresence mode="wait">
            <motion.div
              key={ev.verdict}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <div className="hi">{pick(PRAISE[ev.verdict], t + ev.verdict)}</div>
              <div className="sub">
                {petById(pet).title} · 点伙伴可以换
              </div>
              <div className="sub">
                {recordedToday ? '已打卡 · 可随时修改' : dateCn(t)}
                {stats.curStreak > 0 && ` · 连击 ${stats.curStreak} 天`}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {recordedToday && (
        <div className="done-banner">
          <Icon name="check" size={20} style={{ color: '#0e8f6c' }} />
          <span className="t">今天已打卡：{VERDICT_META[evaluate(saved).verdict].title}</span>
          <span className="s">{evaluate(saved).score} 分</span>
        </div>
      )}

      <DayEditor value={draft} onChange={(p) => setDraft((d) => ({ ...d, ...p }))} />

      <div className="card live-verdict">
        <div className="row">
          <span className={`vpill ${meta.cls}`}>{meta.title}</span>
          <span
            className={`score-num ${ev.score > 0 ? 'pos' : ev.score < 0 ? 'neg' : 'zero'}`}
            aria-label={`今日 ${ev.score} 分`}
          >
            {ev.score > 0 ? `+${ev.score}` : ev.score}
          </span>
        </div>
        <div className="meter" aria-hidden="true">
          <span className="tick" />
          <span className="dot" style={{ left: `${meterLeft}%` }} />
        </div>
        {ev.parts.length > 0 ? (
          <div className="parts">
            {ev.parts.map((p, i) => (
              <div className="p" key={i}>
                <span>{p.label}</span>
                <b className={p.pts > 0 ? 'plus' : p.pts < 0 ? 'minus' : 'zero'}>
                  {p.pts > 0 ? `+${p.pts}` : p.pts}
                </b>
              </div>
            ))}
            <div className="p">
              <span style={{ color: 'var(--ink-3)' }}>≥ 2 分算成功日 · ≥ 6 分完美日</span>
            </div>
          </div>
        ) : (
          <div className="parts">
            <div className="p">
              <span style={{ color: 'var(--ink-3)' }}>≥ 2 分算成功日 · ≥ 6 分完美日</span>
            </div>
          </div>
        )}
      </div>

      <motion.button
        ref={ctaRef}
        type="button"
        className={`cta${ev.verdict === 'fail' ? '' : ' mint'}`}
        whileTap={{ scale: 0.97 }}
        disabled={!touched}
        onClick={doSave}
      >
        <Icon name={recordedToday ? 'pencil' : 'sparkle'} size={22} />
        {recordedToday ? '保存修改' : '完成今日打卡'}
      </motion.button>

      {recordedToday && (
        <div style={{ textAlign: 'center' }}>
          <button
            className="ghost-link"
            onClick={() => {
              if (window.confirm('清除今天的记录吗？')) {
                clearDay(t)
                setDraft(EMPTY_RECORD(t))
              }
            }}
          >
            <Icon name="trash" size={14} /> 清除今日记录
          </button>
        </div>
      )}

      <AnimatePresence>
        {combo && (
          <motion.div
            className="combo-banner"
            initial={{ scale: 0.3, opacity: 0, rotate: -6 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.6, opacity: 0, y: -30 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
          >
            ×{combo.n} 连击！
            <small>{combo.title}</small>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {xpFloat && (
          <motion.div
            key={xpFloat.id}
            className="xp-float"
            style={{ left: '50%', top: '58%' }}
            initial={{ y: 0, opacity: 1, x: '-50%' }}
            animate={{ y: -70, opacity: 0, x: '-50%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: 'easeOut' }}
          >
            {xpFloat.text}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {levelUp !== null && (
          <motion.div
            className="cele-mask z-top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLevelUp(null)}
          >
            <motion.div
              className="cele-card"
              initial={{ scale: 0.5, y: 60 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rays" />
              <div className="cele-kind">等 级 提 升</div>
              <motion.div
                className="cele-emoji"
                initial={{ rotate: -20, scale: 0.4 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.15 }}
              >
                <Icon name="crown" size={72} style={{ color: '#e8a50f' }} />
              </motion.div>
              <div className="cele-title">LV {levelUp}</div>
              <div className="cele-desc">获得称号「{titleFor(levelUp)}」</div>
              <div className="cele-xp">继续瘦，继续升！</div>
              <button type="button" className="cta mint" onClick={() => setLevelUp(null)}>
                太棒了！
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
