import { AnimatePresence, motion } from 'framer-motion'
import { useGame } from '../store'
import { achById } from '../logic/achievements'
import { burst } from '../celebrate'
import { Icon, type IconName } from './Icon'

const ACH_ICON: Record<string, IconName> = {
  wk1: 'calendar', t10: 'gem', t30: 'gem', t100: 'gem', t365: 'gem',
  p3: 'trophy', p10: 'trophy', e10: 'hiit', e50: 'hiit', early20: 'sunset',
}
const iconOf = (id: string): IconName => ACH_ICON[id] ?? 'flame'

/** 成就解锁弹窗队列（全应用唯一挂载） */
export const CelebrationLayer = () => {
  const queue = useGame((s) => s.pendingCelebrate)
  const dismiss = useGame((s) => s.dismissOneCelebrate)
  const ach = queue.length > 0 ? achById(queue[0]) : undefined

  return (
    <AnimatePresence>
      {ach && (
        <motion.div
          className="cele-mask"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={ach.id}
        >
          <motion.div
            className="cele-card"
            initial={{ scale: 0.4, y: 80, rotate: -3 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            role="dialog"
            aria-modal="true"
            aria-label={`解锁成就 ${ach.name}`}
          >
            <div className="rays" />
            <div className="cele-kind">成 就 解 锁</div>
            <motion.div
              className="cele-emoji"
              initial={{ scale: 0.2, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 11, delay: 0.12 }}
            >
              <Icon name={iconOf(ach.id)} size={76} style={{ color: 'var(--berry-deep)' }} />
            </motion.div>
            <div className="cele-title">{ach.name}</div>
            <div className="cele-desc">{ach.desc}</div>
            <div className="cele-xp">
              <Icon name="sparkle" size={17} /> +{ach.tier * 25} 经验
            </div>
            <div>
              <motion.button
                type="button"
                className="cta mint"
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  burst({ x: 0.5, y: 0.6 })
                  dismiss()
                }}
              >
                收下！
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
