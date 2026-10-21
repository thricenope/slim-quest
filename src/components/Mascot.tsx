import { motion } from 'framer-motion'
import type { Verdict } from '../types'

export type Mood = 'pending' | 'perfect' | 'win' | 'plain' | 'fail'

export const moodOf = (v: Verdict): Mood => v

/** 吉祥物「泡泡」——草莓麻薯小怪兽，情绪随当日判定变化 */
export const Mascot = ({ mood, size = 118 }: { mood: Mood; size?: number }) => {
  const body = mood === 'fail' ? '#FF9DB6' : '#FFB7CC'
  const bodyDark = mood === 'fail' ? '#E37E9C' : '#F58FB1'

  const eyes = () => {
    switch (mood) {
      case 'perfect':
        return (
          <g stroke="#5A2B3C" strokeWidth="3.4" strokeLinecap="round" fill="none">
            <path d="M40 52 l5 -6 5 6 5 -6 5 6" />
            <path d="M64 52 l5 -6 5 6 5 -6 5 6" />
          </g>
        )
      case 'win':
        return (
          <g stroke="#5A2B3C" strokeWidth="3.6" strokeLinecap="round" fill="none">
            <path d="M44 54 q5 -7 10 0" />
            <path d="M68 54 q5 -7 10 0" />
          </g>
        )
      case 'fail':
        return (
          <g stroke="#5A2B3C" strokeWidth="3.6" strokeLinecap="round" fill="none">
            <path d="M44 56 q5 6 10 0" />
            <path d="M68 56 q5 6 10 0" />
          </g>
        )
      default:
        return (
          <g fill="#5A2B3C">
            <circle cx="49" cy="54" r="5" />
            <circle cx="73" cy="54" r="5" />
            <circle cx="51" cy="52" r="1.8" fill="#fff" />
            <circle cx="75" cy="52" r="1.8" fill="#fff" />
          </g>
        )
    }
  }

  const mouth = () => {
    switch (mood) {
      case 'perfect':
        return <path d="M54 68 q7 12 14 0 q-7 4 -14 0 z" fill="#5A2B3C" />
      case 'win':
        return <path d="M55 68 q6 8 12 0" stroke="#5A2B3C" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      case 'fail':
        return <path d="M56 72 q5 -6 10 0" stroke="#5A2B3C" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      default:
        return <ellipse cx="61" cy="70" rx="4" ry="5" fill="#5A2B3C" />
    }
  }

  const arms = () => {
    if (mood === 'perfect' || mood === 'win') {
      return (
        <g fill={bodyDark} stroke="#B23563" strokeWidth="2.5">
          <ellipse cx="24" cy="62" rx="8" ry="11" transform="rotate(38 24 62)" />
          <ellipse cx="98" cy="62" rx="8" ry="11" transform="rotate(-38 98 62)" />
        </g>
      )
    }
    return (
      <g fill={bodyDark} stroke="#B23563" strokeWidth="2.5">
        <ellipse cx="26" cy="80" rx="8" ry="6.5" />
        <ellipse cx="96" cy="80" rx="8" ry="6.5" />
      </g>
    )
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 122 122"
      aria-hidden="true"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* 耳朵 */}
      <g fill={bodyDark} stroke="#B23563" strokeWidth="2.5">
        <circle cx="38" cy="22" r="10" />
        <circle cx="84" cy="22" r="10" />
      </g>
      {/* 身体 */}
      <path
        d={`M61 14 C88 14 103 32 103 58 C103 88 88 106 61 106 C34 106 19 88 19 58 C19 32 34 14 61 14 z`}
        fill={body}
        stroke="#B23563"
        strokeWidth="3"
      />
      {/* 肚皮高光 */}
      <ellipse cx="46" cy="40" rx="12" ry="8" transform="rotate(-20 46 40)" fill="#fff" opacity=".5" />
      {arms()}
      {/* 腮红 */}
      <ellipse cx="36" cy="66" rx="7" ry="4.5" fill="#FF7FA5" opacity=".8" />
      <ellipse cx="86" cy="66" rx="7" ry="4.5" fill="#FF7FA5" opacity=".8" />
      {eyes()}
      {mouth()}
      {mood === 'fail' && (
        <path d="M88 60 q3 6 0 9 q-3 -3 0 -9 z" fill="#7EC9FF" stroke="#4FA3DC" strokeWidth="1.4" />
      )}
      {mood === 'perfect' && (
        <g fill="#FFC93C" stroke="#C79212" strokeWidth="1.6">
          <path d="M104 18 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 z" />
          <path d="M14 44 l2 4.6 4.6 2 -4.6 2 -2 4.6 -2 -4.6 -4.6 -2 4.6 -2 z" />
        </g>
      )}
    </motion.svg>
  )
}
