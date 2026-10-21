import { motion } from 'framer-motion'
import type { PetId } from '../logic/pets'

export type Mood = 'pending' | 'perfect' | 'win' | 'plain' | 'fail'

interface Palette {
  body: string
  bodyDark: string
  outline: string
  cheek: string
  extra?: 'dark-patch' | 'none'
}

const SKINS: Record<PetId, Palette> = {
  mochi: { body: '#FFB7CC', bodyDark: '#F58FB1', outline: '#B23563', cheek: '#FF7FA5' },
  cat: { body: '#FFE3C2', bodyDark: '#F2BE8C', outline: '#B87A4E', cheek: '#FF9D88' },
  bunny: { body: '#FFF4EE', bodyDark: '#F0D5CC', outline: '#C98A9E', cheek: '#FFA8C0' },
  panda: { body: '#FFFFFF', bodyDark: '#E9E2EA', outline: '#4A3F4A', cheek: '#FF9DB4', extra: 'dark-patch' },
  pig: { body: '#FFD6C4', bodyDark: '#F5AC94', outline: '#C96A78', cheek: '#FF8FA3' },
}

/** Q版小动物伙伴：情绪随当日判定变化（与判定卡联动） */
export const Pet = ({ petId, mood, size = 118 }: { petId: PetId; mood: Mood; size?: number }) => {
  const c = SKINS[petId] ?? SKINS.mochi
  const dark = c.extra === 'dark-patch' ? '#3F3542' : c.bodyDark
  const outline = c.outline

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
    if (petId === 'pig') {
      // 猪鼻子替代嘴
      return (
        <g>
          <ellipse cx="61" cy="70" rx="12" ry="9" fill="#FFB9A8" stroke={outline} strokeWidth="2.4" />
          <circle cx="56.5" cy="70" r="2" fill="#C96A78" />
          <circle cx="65.5" cy="70" r="2" fill="#C96A78" />
        </g>
      )
    }
    switch (mood) {
      case 'perfect':
        return <path d="M54 68 q7 12 14 0 q-7 4 -14 0 z" fill="#5A2B3C" />
      case 'win':
        return <path d="M55 68 q6 8 12 0" stroke="#5A2B3C" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      case 'fail':
        return <path d="M56 72 q5 -6 10 0" stroke="#5A2B3C" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      default:
        return petId === 'cat' ? (
          <g>
            <path d="M58.5 66.5 L61 69 L63.5 66.5" stroke="#5A2B3C" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M61 69 v2.5" stroke="#5A2B3C" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        ) : (
          <ellipse cx="61" cy="70" rx="4" ry="5" fill="#5A2B3C" />
        )
    }
  }

  const arms = () => {
    if (mood === 'perfect' || mood === 'win') {
      return (
        <g fill={dark} stroke={outline} strokeWidth="2.5">
          <ellipse cx="24" cy="62" rx="8" ry="11" transform="rotate(38 24 62)" />
          <ellipse cx="98" cy="62" rx="8" ry="11" transform="rotate(-38 98 62)" />
        </g>
      )
    }
    return (
      <g fill={dark} stroke={outline} strokeWidth="2.5">
        <ellipse cx="26" cy="80" rx="8" ry="6.5" />
        <ellipse cx="96" cy="80" rx="8" ry="6.5" />
      </g>
    )
  }

  const ears = () => {
    switch (petId) {
      case 'cat':
        return (
          <g>
            <path d="M30 34 L34 12 L52 26 z" fill={c.body} stroke={outline} strokeWidth="3" strokeLinejoin="round" />
            <path d="M92 34 L88 12 L70 26 z" fill={c.body} stroke={outline} strokeWidth="3" strokeLinejoin="round" />
            <path d="M36 28 L38 19 L46 25 z" fill="#FFB7CC" />
            <path d="M86 28 L84 19 L76 25 z" fill="#FFB7CC" />
          </g>
        )
      case 'bunny':
        return (
          <g>
            <ellipse cx="42" cy="12" rx="10" ry="21" transform="rotate(-12 42 12)" fill={c.body} stroke={outline} strokeWidth="3" />
            <ellipse cx="42" cy="14" rx="4.5" ry="13" transform="rotate(-12 42 14)" fill="#FFD3E0" />
            <ellipse cx="80" cy="10" rx="10" ry="21" transform="rotate(14 80 10)" fill={c.body} stroke={outline} strokeWidth="3" />
            <ellipse cx="80" cy="12" rx="4.5" ry="13" transform="rotate(14 80 12)" fill="#FFD3E0" />
          </g>
        )
      case 'panda':
        return (
          <g fill="#3F3542" stroke="#2E2730" strokeWidth="2.5">
            <circle cx="34" cy="24" r="12" />
            <circle cx="88" cy="24" r="12" />
          </g>
        )
      case 'pig':
        return (
          <g>
            <path d="M28 40 Q22 20 40 24 Q46 30 44 40 z" fill={c.bodyDark} stroke={outline} strokeWidth="3" strokeLinejoin="round" />
            <path d="M94 40 Q100 20 82 24 Q76 30 78 40 z" fill={c.bodyDark} stroke={outline} strokeWidth="3" strokeLinejoin="round" />
          </g>
        )
      default:
        return (
          <g fill={c.bodyDark} stroke={outline} strokeWidth="2.5">
            <circle cx="38" cy="22" r="10" />
            <circle cx="84" cy="22" r="10" />
          </g>
        )
    }
  }

  const extras = () => {
    const bits: React.ReactNode[] = []
    if (petId === 'cat') {
      bits.push(
        <g key="wh" stroke={outline} strokeWidth="1.8" strokeLinecap="round" opacity="0.8">
          <path d="M18 58 L32 60" />
          <path d="M20 68 L32 66" />
          <path d="M104 58 L90 60" />
          <path d="M102 68 L90 66" />
        </g>,
      )
    }
    if (petId === 'panda') {
      bits.push(
        <g key="patch" fill="#3F3542" opacity="0.92">
          <ellipse cx="49" cy="54" rx="10" ry="11" />
          <ellipse cx="73" cy="54" rx="10" ry="11" />
        </g>,
      )
    }
    if (petId === 'bunny') {
      bits.push(
        <g key="fang" fill="#fff" stroke={outline} strokeWidth="1.2">
          <rect x="58" y="70" width="5" height="6" rx="1.6" />
          <rect x="64" y="70" width="5" height="6" rx="1.6" />
        </g>,
      )
    }
    return bits
  }

  const bodyShape = () =>
    petId === 'bunny' ? (
      <path d="M61 16 C86 16 102 34 102 60 C102 88 88 106 61 106 C34 106 20 88 20 60 C20 34 36 16 61 16 z" fill={c.body} stroke={outline} strokeWidth="3" />
    ) : (
      <path d="M61 14 C88 14 103 32 103 58 C103 88 88 106 61 106 C34 106 19 88 19 58 C19 32 34 14 61 14 z" fill={c.body} stroke={outline} strokeWidth="3" />
    )

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 122 122"
      aria-hidden="true"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {ears()}
      {bodyShape()}
      <ellipse cx="46" cy="40" rx="12" ry="8" transform="rotate(-20 46 40)" fill="#fff" opacity={petId === 'panda' ? 0.7 : 0.5} />
      {arms()}
      {extras()}
      {petId !== 'panda' && (
        <>
          <ellipse cx="36" cy="66" rx="7" ry="4.5" fill={c.cheek} opacity=".8" />
          <ellipse cx="86" cy="66" rx="7" ry="4.5" fill={c.cheek} opacity=".8" />
        </>
      )}
      {petId === 'panda' && (
        <>
          <ellipse cx="34" cy="68" rx="6.5" ry="4.2" fill={c.cheek} opacity=".7" />
          <ellipse cx="88" cy="68" rx="6.5" ry="4.2" fill={c.cheek} opacity=".7" />
        </>
      )}
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
