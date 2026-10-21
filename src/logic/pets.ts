/** Q版小动物伙伴名册：点击吉祥物可轮换，选择持久化 */
export type PetId = 'mochi' | 'cat' | 'bunny' | 'panda' | 'pig'

export interface PetSkin {
  id: PetId
  name: string
  title: string // 一句话人设
}

export const PETS: PetSkin[] = [
  { id: 'mochi', name: '泡泡', title: '原住民麻薯，软软的' },
  { id: 'cat', name: '团团', title: '干饭监督员，喵' },
  { id: 'bunny', name: '雪球', title: '胡萝卜不限量梦想家' },
  { id: 'panda', name: '糯米', title: '躺平大师，但陪你坚持' },
  { id: 'pig', name: '布丁', title: '曾胖今瘦的传奇前辈' },
]

export const nextPet = (cur: PetId): PetId => {
  const i = PETS.findIndex((p) => p.id === cur)
  return PETS[(i + 1) % PETS.length].id
}

export const petById = (id: PetId): PetSkin => PETS.find((p) => p.id === id) ?? PETS[0]
