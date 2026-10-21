import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { TopBar } from './components/TopBar'
import { TabBar, type TabId } from './components/TabBar'
import { TodayView } from './components/TodayView'
import { CalendarView } from './components/CalendarView'
import { AchievementsView } from './components/AchievementsView'
import { StatsView } from './components/StatsView'
import { CelebrationLayer } from './components/CelebrationLayer'

export default function App() {
  const [tab, setTab] = useState<TabId>('today')

  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <TopBar />
        <main aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {tab === 'today' && <TodayView onGoCalendar={() => setTab('calendar')} />}
              {tab === 'calendar' && <CalendarView />}
              {tab === 'achievements' && <AchievementsView />}
              {tab === 'stats' && <StatsView />}
            </motion.div>
          </AnimatePresence>
        </main>
        <TabBar tab={tab} onTab={setTab} />
        <CelebrationLayer />
      </div>
    </MotionConfig>
  )
}
