import { motion } from 'framer-motion'
import { Icon, type IconName } from './Icon'

export type TabId = 'today' | 'calendar' | 'achievements' | 'stats'

const TABS: { id: TabId; label: string; icon: IconName }[] = [
  { id: 'today', label: '今日', icon: 'sparkle' },
  { id: 'calendar', label: '日历', icon: 'calendar' },
  { id: 'achievements', label: '成就', icon: 'trophy' },
  { id: 'stats', label: '统计', icon: 'chart' },
]

export const TabBar = ({ tab, onTab }: { tab: TabId; onTab: (t: TabId) => void }) => (
  <nav className="tabbar" aria-label="主导航">
    {TABS.map((t) => (
      <motion.button
        key={t.id}
        type="button"
        className={`tab${tab === t.id ? ' on' : ''}`}
        whileTap={{ scale: 0.88 }}
        transition={{ type: 'spring', stiffness: 500, damping: 22 }}
        aria-current={tab === t.id ? 'page' : undefined}
        onClick={() => onTab(t.id)}
      >
        <Icon name={t.icon} size={21} />
        {t.label}
      </motion.button>
    ))}
  </nav>
)
