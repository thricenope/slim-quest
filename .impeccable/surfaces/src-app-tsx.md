---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

# Surface Brief — 瘦身大作战 App Shell（src/App.tsx 及全部视图）

## Scope & Visitor Mode

Operate（每日打卡任务为主，带 Experience 的游戏外衣）。移动优先 Web，桌面居中手机栏。四个标签面：今日 / 日历 / 成就 / 统计。

## Audience · Job · Action · Proof · Constraints

- 受众：正在减肥的中文用户本人，晚间手机场景。
- 任务：≤30 秒记录晚饭时间/食量/饮料/运动，得到判定与正反馈。
- 行动：点选 chips → 完成/修改打卡 → 查看连续与里程碑。
- 证据：本地真实数据；首屏演示数据为合成（清空即真实）。
- 约束：纯前端 localStorage；正向语气；规则透明可见。

## Direction Contract

THESIS: 日历即棋盘——每个成功日是一颗糖果宝石，连续成功凑成同色三连"消除"，坚持的天数本身是收集物；拒绝记账面板的默认形态（灰色列表、红色警告、羞耻图表）。
OWN-WORLD: 奶油底上的糖果街机：可可描边的贴纸卡片+硬偏移投影、果冻渐变按钮带深色底边、六色宝石（草莓/橘/柠/薄荷/葡萄/天空）、麻薯吉祥物；去掉内容仍可辨认。
STORY: 秒级记完四件事 → 当场判定+彩带+宝石入袋 → 看见"距下一里程碑还差 N 天" → 为了下一颗宝石明天再来。
FIRST VIEWPORT: 手机单栏；顶部 streak 火焰+等级条；吉祥物判定卡；四个输入区（时间/食量/饮料/运动图标格）；底部大果冻按钮"完成今日打卡"；实时分数预览。
FORM: 需求钉住的消消乐糖果世界（concept-seed 5c77c21e）；融合捐助：动物园导览图的 0.4s 过冲运动语法（zoo-gardens）、角色目录的徽章名牌+一行人设（character-goods）、定向地图的检查点里程碑课程线（orienteering）、ikeda 的致密条形统计场（ikeda-datamatics，降级行）。
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved Decisions

无（评分权重自定并已在 UI 透明展示）。
