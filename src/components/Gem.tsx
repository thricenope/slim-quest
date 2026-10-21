import { GEMS } from '../logic/gems'

export interface GemProps {
  idx: number
  size?: number
  className?: string
  style?: React.CSSProperties
}

/** 六形六色宝石（形随色走，经典消除游戏规则） */
export const Gem = ({ idx, size = 36, className, style }: GemProps) => {
  const g = GEMS[((idx % GEMS.length) + GEMS.length) % GEMS.length]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`gg-${g.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={g.light} />
          <stop offset="0.45" stopColor={g.base} />
          <stop offset="1" stopColor={g.dark} />
        </linearGradient>
      </defs>
      {g.id === 'berry' && (
        <g>
          <polygon points="32,6 53,18 53,46 32,58 11,46 11,18" fill={`url(#gg-${g.id})`} stroke={g.dark} strokeWidth="3" strokeLinejoin="round" />
          <polygon points="32,6 53,18 32,30 11,18" fill={g.light} opacity=".55" />
          <polygon points="32,30 53,18 53,46 32,58" fill={g.dark} opacity=".22" />
        </g>
      )}
      {g.id === 'tange' && (
        <g>
          <path d="M32 5 C32 5 10 30 10 41 a22 22 0 0 0 44 0 C54 30 32 5 32 5 z" fill={`url(#gg-${g.id})`} stroke={g.dark} strokeWidth="3" strokeLinejoin="round" />
          <path d="M32 5 C32 5 10 30 10 41 L32 49 z" fill={g.light} opacity=".5" />
          <path d="M32 49 L54 41 C54 30 32 5 32 5 z" fill={g.dark} opacity=".18" />
        </g>
      )}
      {g.id === 'lemon' && (
        <g>
          <path d="M32 5 l7.6 16.5 18 2.1 -13.3 12.4 3.6 17.8 -15.9 -8.8 -15.9 8.8 3.6 -17.8 L6.4 23.6 l18 -2.1 z" fill={`url(#gg-${g.id})`} stroke={g.dark} strokeWidth="3" strokeLinejoin="round" />
          <path d="M32 5 l7.6 16.5 -7.6 11.9 -7.6 -11.9 z" fill={g.light} opacity=".55" />
          <path d="M39.6 21.5 l18 2.1 -13.3 12.4 -12.3 4.3 z" fill={g.dark} opacity=".16" />
        </g>
      )}
      {g.id === 'mint' && (
        <g>
          <polygon points="23,7 41,7 55,21 55,43 41,57 23,57 9,43 9,21" fill={`url(#gg-${g.id})`} stroke={g.dark} strokeWidth="3" strokeLinejoin="round" />
          <polygon points="23,7 41,7 32,32" fill={g.light} opacity=".5" />
          <polygon points="41,7 55,21 55,43 32,32" fill={g.dark} opacity=".18" />
        </g>
      )}
      {g.id === 'grape' && (
        <g>
          <polygon points="32,5 57,32 32,59 7,32" fill={`url(#gg-${g.id})`} stroke={g.dark} strokeWidth="3" strokeLinejoin="round" />
          <polygon points="32,5 57,32 32,32" fill={g.light} opacity=".5" />
          <polygon points="32,32 57,32 32,59" fill={g.dark} opacity=".2" />
        </g>
      )}
      {g.id === 'sky' && (
        <g>
          <circle cx="32" cy="32" r="26" fill={`url(#gg-${g.id})`} stroke={g.dark} strokeWidth="3" />
          <path d="M32 6 a26 26 0 0 1 0 52 z" fill={g.dark} opacity=".15" />
          <path d="M14 20 a26 26 0 0 1 22 -12 l-6 10 z" fill={g.light} opacity=".6" />
        </g>
      )}
      <ellipse cx="22" cy="20" rx="5" ry="7" transform="rotate(-24 22 20)" fill="#fff" opacity=".75" />
    </svg>
  )
}
