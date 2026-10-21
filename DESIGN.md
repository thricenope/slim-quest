---
name: 瘦身大作战 SlimQuest
description: 消消乐式减肥打卡游戏的糖果街机设计系统
colors:
  berry: "#FF5D8F"
  berry-deep: "#C92F60"
  tange: "#FF9838"
  tange-deep: "#C26A12"
  lemon: "#FFC93C"
  lemon-deep: "#9A7410"
  mint: "#2ED3A3"
  mint-deep: "#0E8F6C"
  grape: "#9D6CFF"
  grape-deep: "#6640B8"
  sky: "#4FC3F7"
  sky-deep: "#2381AC"
  cherry: "#E8467A"
  ink: "#3F2E4F"
  ink-2: "#8A7799"
  ink-3: "#B3A4BF"
  bg: "#FFF4E3"
  card: "#FFFFFF"
  line: "#F0E2CB"
  line-strong: "#E6D3B2"
typography:
  display:
    fontFamily: "'ZCOOL QingKe HuangYou', ui-rounded, 'PingFang SC', sans-serif"
    fontWeight: 400
    letterSpacing: "0.02em"
  headline:
    fontFamily: "'ZCOOL QingKe HuangYou', ui-rounded, 'PingFang SC', sans-serif"
    fontSize: "20-22px"
    fontWeight: 400
  body:
    fontFamily: "ui-rounded, -apple-system, 'SF Pro Rounded', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "ui-rounded, 'PingFang SC', sans-serif"
    fontSize: "12-14.5px"
    fontWeight: 600-700
  num:
    fontFamily: "'Baloo 2', 'ZCOOL QingKe HuangYou', sans-serif"
    fontWeight: 800
    fontVariantNumeric: tabular-nums
rounded:
  sm: "13px"
  md: "16px"
  lg: "18px"
  xl: "20-26px"
  pill: "999px"
spacing:
  xs: "4-6px"
  sm: "9-10px"
  md: "14-16px"
  lg: "18-24px"
components:
  button-primary:
    backgroundColor: "linear-gradient(180deg,#DE4474,#C92F60)"
    textColor: "#FFFFFF"
    typography: "{typography.display}"
    rounded: "{rounded.xl}"
    padding: "16px"
  button-mint:
    backgroundColor: "linear-gradient(180deg,#17A583,#0E8F6C)"
    textColor: "#FFFFFF"
    rounded: "{rounded.xl}"
    padding: "16px"
  chip:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "15px"
    padding: "9px 13px"
  chip-selected:
    backgroundColor: "linear-gradient(180deg,#DE4474,#C92F60)"
    textColor: "#FFFFFF"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "16px"
---

# Design System: 瘦身大作战 SlimQuest

## Overview

**Creative North Star: "装在手机里的糖果街机"**

日历即棋盘：每天的成功是一颗六色宝石，连续三天同色即一次「消除」，坚持的天数本身是收集物。整个系统把休闲消除游戏的物理质感（果冻按钮的按压位移、宝石的高光切面、贴纸卡片的可可描边）搬到健康打卡的操作界面上，用游戏机的外壳包裹最小的记录摩擦。全部材质为手绘矢量几何（宝石切面、麻薯吉祥物、40 枚统一 2.1px 圆头描边图标），不模仿照片材质，不做拟物浮雕。

**Key Characteristics:**
- 奶油底 + 三角糖果色（草莓/蜜橘/柠檬/薄荷/葡萄/天空）+ 可可紫墨水
- 果冻控件（按压下沉 3-5px、深色底边挤出）、贴纸卡片（2px 可可描边 + 柔和偏移投影）
- 全部动效 0.4s 内过冲回落（spring/stiff overshoot），庆祝时刻才动用全屏彩带
- 数值一律 Baloo 2 表格数字；标题一律黄油体

## Colors

六色宝石是游戏道具不是 UI 主题色；UI 的强调色只用草莓（行动/选中）与薄荷（成功/健康）。

### Primary
- **草莓糖**（#FF5D8F / 深 #C92F60）：主行动与选中态——CTA、选中 chip、当前里程碑、火苗数值强调。渐变 #DE4474→#C92F60，白字对比 ≥4.8:1。
- **薄荷糖**（#2ED3A3 / 深 #0E8F6C）：成功语义——运动选中、成功日条形、绿色 CTA 变体、打卡完成横幅。

### Secondary
- **蜜橘**（#FF9838）：经验条渐变起点、引导卡、早食语义。
- **柠檬糖**（#FFC93C）：经验奖励、完美日色块、皇冠。

### Tertiary
- **葡萄**（#9D6CFF）：选中日描边、日历选中格。
- **天空糖**（#4FC3F7）：仅宝石棋盘第六色。

### Neutral
- **可可紫墨**（#3F2E4F）：正文与标题墨色（奶油底上 ≈10:1）。
- **薰衣草灰**（#8A7799 / #B3A4BF）：次要文字与未解锁。
- **奶油底**（#FFF4E3）：页面地面，叠三团糖果色柔光（粉/蓝/绿 radial）。
- **奶白卡**（#FFFFFF / 描边 #F0E2CB）：卡片与控件面。

### Named Rules
**The Two-Accent Rule.** 单屏同时高亮的强调色不超过两种语义：草莓=行动，薄荷=成功。其余四色只出现在宝石、图表与徽章里。  
**The Ink-on-Candy Rule.** 糖果色块上的文字永远是纯白或该色的 deep 变体（对比 ≥4.5:1），从不用灰字贴彩底。

## Typography

**Display Font:** ZCOOL QingKe HuangYou（黄油体，@fontsource 自托管）
**Body Font:** 系统圆体栈（ui-rounded → PingFang SC → Microsoft YaHei）
**Label/Mono Font:** Baloo 2（数字专用，600/800 两档，tabular-nums）

**Character:** 黄油体提供街机招牌式的浑圆笔画，承担全部标题、按钮与庆祝文案；正文交给系统圆体保证长可读性；数字独立用 Baloo 2 的糖果气泡字形，让分数与天数像游戏计分。

### Hierarchy
- **Display**（400，30-44px，1.2）：庆祝弹窗标题、大数字。
- **Headline**（400，20-24px）：分区标题（.sec-head h2）、卡片标题。letter-spacing 0.02em。
- **Title**（400，17-19px）：横幅、里程碑卡标题。
- **Body**（400，13.5-15px，1.55）：描述、提示、评分明细。
- **Label**（600-700，11-14.5px）：chip 文字、图例、导航标签。
- **Num**（800，15-40px，tabular）：分数、天数、等级、日期。

### Named Rules
**The Candy Ceiling Rule.** 黄油体只到 44px；再大改用 Baloo 2 数字或加装饰图标，不放大中文字标。

## Layout

手机优先单栏：`.app` 最大宽 430px 居中，桌面端两侧露出奶油底糖果光晕（body 固定 radial 渐变）。底部固定悬浮 TabBar（圆角 22px 胶囊，backdrop-blur），内容区 padding-bottom 96px + safe-area。分区节奏：`.sec-head` 上方 18px 下方 10px（标题上方留白大于下方），卡片间距 14px，chip 间距 9px。弹层为底部抽屉（max-height 86dvh，圆角 26px 顶角）。

## Elevation & Depth

双层深度语法，按控件材质二选一，从不同时叠加：
- **贴纸卡片**：2px 可可描边（#F0E2CB）+ 柔和偏移投影 `0 10px 24px rgba(94,60,115,.10)`。
- **果冻控件**（按钮/chip/Tab）：无描边，渐变本体 + 深色底边挤出 `0 3-6px 0 <deep>`，:active 时 translateY(3-5px) 吃掉挤出。

**The One-Depth Rule.** 一个元素只声明一种 elevation：贴纸（描边+柔影）或果冻（挤出），混用即鬼卡。

## Shapes

半径阶梯：控件 13-16px、卡片 18px、抽屉/弹窗 22-26px、胶囊 999px。宝石为六种几何形（垂直六边形/水滴/五角星/八边形/菱形/圆球），形随色走；图标统一 viewBox 24、strokeWidth 2.1、圆头圆角。吉祥物是几何拼合的麻薯球（耳、腮红、手脚椭圆），表情仅换眼嘴路径。

## Components

### Buttons
- **Shape:** 20px 圆角的果冻块（CTA）或 16px（小按钮）。
- **Primary:** 草莓渐变 #DE4474→#C92F60，白字黄油体 21px，`0 6px 0 #A32250` 挤出 + 彩色环境投影；:active 下沉 5px。
- **Mint:** 成功语境同构（#17A583→#0E8F6C，挤出 #0A6B50）。
- **Ghost:** 白底 2px 描边 #E6D3B2、灰紫字，用于次级数据操作。
- **Disabled:** 55% 不透明度，保持果冻外形。

### Chips
- **Style:** 白底 2px #F0E2CB 描边、15px 圆角、墨色 600 字重 + 20px 线性图标；`0 3px 0` 微挤出。
- **State:** 选中 = 草莓（或薄荷）渐变 + 白字 + 深色挤出；提示文案（.chip-hint）只在选中后出现，140ms 淡入。

### Cards / Containers
- **Corner:** 18px；**Background:** 奶白；**Border:** 2px #F0E2CB；**Padding:** 14-16px。语义变体用渐变浅底 + 语义描边（如 done-banner 薄荷、guide-card 蜜橘）。

### Navigation
- 底部悬浮胶囊 TabBar：4 枚 Tab（图标 21px + 11.5px 标签），未选中薰衣草灰、选中草莓渐变白字 + 挤出；:active 缩放 0.88。

### Gem（签名组件）
六色六形宝石 SVG：渐变本体 + 顶部亮面多边形 + 55% 高光椭圆 + 深色描边。日历中成功日的棋子；链内每 3 颗同色（`floor(chainIdx/3)%6`）构成一次「消除」。入场 spring 弹出（scale 0 + rotate -30° → 1）。

### Mascot（签名组件）
草莓麻薯「泡泡」：SVG 几何拼合，2.4s 呼吸浮动，情绪由判定驱动（pending 圆眼 / win 弯眼 / perfect 星眼+双臂举起 / fail 垂眼+泪滴），失败也要可爱。

### Celebration（签名组件）
成就/升级弹窗：白卡 26px 圆角 3px 粉描边，conic-gradient 14s 旋转光芒背景，徽章 spring 入场 + canvas-confetti 双礼炮；连击横幅为 44px 黄油体白字 + 莓果投影，1.9s 自灭。层级：cele-mask 80 < 升级弹窗 88 < xp 飘字 95。

## Do's and Don'ts

### Do:
- **Do** 保持庆祝的正向语气：失败日用「明天赢回来」话术 + 委婉图标（云朵/饼干），从不用红色警告横幅。
- **Do** 让每个点选都有物理回应：chip/图标格 :active 缩放 + 选中 spring 过冲。
- **Do** 数字用 Baloo 2 tabular-nums，间距不跳动。
- **Do** 新增图标进 40 枚统一集（viewBox 24 / stroke 2.1 / 圆头），不从图标库混抄。

### Don't:
- **Don't** 在糖果色块上放灰字或渐变文字；不用 1px 发丝描边配宽柔影（鬼卡）。
- **Don't** 给卡片加单侧彩色粗边（side-tab）；强调靠整块色彩或图标，不靠边条。
- **Don't** 用 emoji 充当界面图标（文案里的表情符号可以，控件图标必须手绘 SVG）。
- **Don't** 打断式弹窗用于非庆祝信息；修改/补卡走底部抽屉。
