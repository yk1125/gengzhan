# Session B handoff · T02-H 首页样板（2026-09-14）

## 0. 身份、基准与提交链

- 分支：`codex/rebuild-brand`（worktree `D:\桌面\gengzhan-worktrees\session-b`）。**未合并进 main**，等 A 处理。
- 基准：`6312c90`（`git merge main` 后的门禁点，取得 T00R 的 SPEC 与 T00A 的素材）。
- 本轮提交链：

| 提交 | 说明 | 变更 |
| --- | --- | --- |
| `6312c90` | `git merge main` → **Fast-forward**（reflog：`merge main: Fast-forward`）；该提交是 A 的 docs 提交，SPEC 与素材随其祖先 `9e83917`、`9231087` 到位 | — |
| `96d1208` | Step 2 格式整理（压缩单行 → 正常缩进） | `frontend/src/views/Home/index.vue` 152+ / 4− |
| `ec8cf4d` | Step 3 按 SPEC 实现首页 | 5 files, 1894+ / 126− |
| `b8e5ba1` | M-24 改位置驱动 + 移除内部备注文案 | `useHomeScroll.js` 28+ / 23− |
| `docs(handoffs): …` | 本文件 + 截图 + 采集数据 | docs only |

Step 0 现场（真实输出，接手时）：

```text
$ git rev-parse --abbrev-ref HEAD
codex/rebuild-brand
$ git log --oneline -8
ec8cf4d feat(home): implement the home page sample from the T00R motion spec
96d1208 style(home): reformat Home page markup for readable diffs
6312c90 docs: decide header entrance threshold (use >1024, not reference site's >1365)
9231087 merge: T00A 参考站客户 Logo 与过渡视频素材（含 SHA256 登记）
9e83917 merge: T00R 动效取证规格（SPEC + 复现 demo + 112 张截帧）
c1afb1a docs(t00r): 参考站首页动效取证与规格（SPEC + 复现 demo + 截帧）
005089b docs: record T00A commit hash and post-commit blob verification
3ca8cb9 feat(assets): add reference-site customer logos, transition videos and banner
$ git status --short
 M frontend/src/views/Home/useHomeScroll.js
?? docs/frontend-rebuild/handoffs/B/
```

接手时 `useHomeScroll.js` 有未提交改动（M-24 的位置驱动改写），已单独提交为 `b8e5ba1`。旧 B.md 的两条记录**已作废**：「客户墙改用参考站 CDN 图标 jun_01—jun_24」「运行时 CDN 失败隐藏图标」——当前实现只读本地 `public/assets/customers/jun_<n>.svg`。

## 1. 前置门禁（Step 1，逐条实测）

| 门禁 | 结果 | 证据 |
| --- | --- | --- |
| 1. `git merge main` | 通过（Fast-forward） | `6312c90`；随后确认 SPEC.md 与素材已在工作树内 |
| 2. SPEC.md 存在、每条有具体数值 | 通过 | `docs/frontend-rebuild/evidence/reference-effects/SPEC.md` 793 行；M-01…M-34 每条含起始/结束值、时长、缓动、滚动区间与实测钉值 |
| 3. 客户墙素材 | 通过 | `frontend/public/assets/customers/` 24 个 SVG |
| 4. 过渡视频素材 | 通过 | `frontend/public/assets/transitions/` 6 个亮色 mp4 + `transitions/black/` 6 个暗色 mp4 |
| 5. `node_modules` + build | 通过 | `frontend/node_modules` 存在；`npm.cmd run build` ✓ built in 12.41s |
| 6. `check:routes` 能跑通 | 通过 | PASS 34 / FAIL 0 / PENDING 2（2 条 PENDING 都是 `contact`，属 B·T05 未创建页面，不在本次范围） |

门禁全通过后才动代码；未自造数值、未自行抓素材。

## 2. 交付物

### 2.1 代码（只碰 B 的文件）

| 文件 | 作用 |
| --- | --- |
| `frontend/src/views/Home/index.vue` | 页面模板 + `<style scoped>`（本页单独样式，不动全局） |
| `frontend/src/views/Home/motion.js` | 本页动效数值，逐字来自 SPEC，键上标条目号 |
| `frontend/src/views/Home/useHomeScroll.js` | M-08 / M-12 / M-13 / M-18—M-24 滚动流水线 |
| `frontend/src/views/Home/useHomeSwipers.js` | M-11 客户墙 + M-34 手机横滑 |
| `frontend/src/content/home.js` | 客户 Logo 表（原始高度 + 固定换序）、双语文案、服务 ↔ 过渡视频映射（B 新增文件） |

未改动：`src/style.css`、`src/styles/*`（全局样式）、`router`、公共组件、`package.json`/lock —— 都属 A。

### 2.2 截图与数据（本轮新增，均在 `docs/frontend-rebuild/handoffs/B/`）

| 路径 | 内容 |
| --- | --- |
| `shots/` | **59 张 PNG** 运行态截帧：`01` 首屏 1、`02` M-13 实例 1（5 相位）、`03` index2（5 相位）、`04`/`05` index3 四项 4、`06` index4（5 相位）、`07` index5（5 相位）、`08` 入场 11（`step1-3` 3 张 + 与参考站同毫秒的 `0200/0400/0700/1000/1600/2200/3200/4500ms` 8 张）、`09` 8 张组合、`10` 手机 390 分段 8、`11` 暗色分区 2、`12` M-13 实例 2（5 相位） |
| `compare/` | 43 张 JPEG：**参考站静帧（左） vs 本页同相位静帧（右）并列**，命名 `<SPEC条目>-<相位>.jpg` |
| `measure-part1.json` … `measure-part5.json` | 实测数值原始数据（锚点、逐条动效、手机、Swiper） |
| `measure-entrance.json`、`measure-index2-blue.json` | 入场逐帧与 M-13 第二实例逐帧 |

采集环境：本机 Chrome + `playwright-core@1.56.0`，直连 `npm.cmd run preview -- --port 3001`；截图与数值均取自与 `b8e5ba1` 完全相同的源码（当次 build 7:24:13 → 截图 7:24:51–7:26:09）。采集脚本放在仓库外（`%TEMP%\t00r-browser\bshot*.js`），未进仓库。

## 3. 逐条对应表（SPEC → 实现位置 → 本页实测 → 对照静帧）

两页锚点（1440×900，zh-CN 亮色）：参考站 banner 0 / index1 900 / index2 1985 / index3 7614 / index4 8512 / index5 16414，`limit = 17365`；本页 banner 0 / index1 900 / index2 1838 / index3 3223 / index4 4164 / index5 12064，`docHeight = 13613`、`limit = 12713`。**两页高度不同，所以对照一律用「同一效果相位/锚点相对偏移」，不比对绝对 y。**

| SPEC | SPEC 规定 | 实现位置 | 本页实测 | 对照静帧 |
| --- | --- | --- | --- | --- |
| M-07 banner 淡入切换 | `new Swiper('.banner .swiper', {speed:1000, effect:'fade', allowTouchMove:false})`；`autoplay.delay` 4000 → 首次切换后 3000 | `motion.js banner.slideSpeedMs / autoplayDelayMs`；`index.vue` 首屏 | 只有 1 张素材，无自动切换。元素状态：`count=1`、`autoplay=false`、`loop=false`、`muted=true`、`paused=false`、`playsInline=true`、`src=/yunzhan-hero.mp4`。参数已落在 `motion.js`，等第 2 条素材即可启用 | `compare/M-07-M-08-banner.jpg` |
| M-08 首屏视差 | `translate3d(0, scrollTop*0.9, 0)`；`scrollTop >= clientHeight` 时 `display:none`（阈值 900） | `useHomeScroll.scrollContent` 开头 | y=0 → `translate3d(0px, 0px, 0px)`；300 → 270px；600 → 540px；899 → 809.1px（`display` 仍为默认）；901 → `display:none`（该帧内联值 810.9px 已不再可见）。逐点 = 0.9×y ✓ | `compare/M-07-M-08-banner.jpg` |
| M-10 逐字入场 | `index*0.08 + 0.3` 秒、`transition 1s ease`、起始 `translateX(10px)`、空格 `min-width:10px`；**行内重新计数** | `motion.js banner.char*`；`index.vue` `heroChars`/`titleOn`（挂载后 10ms 起播） | 24 个字；前 8 个 `transitionDelay` = 0.3 / 0.38 / 0.46 / 0.54 / 0.62 / 0.7 / 0.78 / **0.3** 秒 —— 第 8 个是第 2 行首字，证实按行重新计数，与参考站 `capture-entrance.json` 的 0.3 / 0.38 / … / 0.3 一致。加载后逐帧：~517ms 可见 0/24、840ms 8/24、1492ms 19/24、2144ms 24/24 | `compare/M-10-entrance-0200/0400/0700/1000/1600/2200/3200/4500.jpg`（与参考站同名毫秒帧并列） |
| M-11 客户墙纵向轮播 | `speed:800, loop:true, direction:'vertical', allowTouchMove:false, autoplay.delay:3500`；参考站 12 个实例（8 槽×3 + 4 槽×6） | `useHomeSwipers` + `motion.js wall`；`content/home.js customerSlots()` | `.swiper.slot` 共 12 个（PC 8 + 手机 4）；PC 每槽 3 张 slide、手机每槽 6 张。8 个 PC 槽同步步进：active 索引 0 → 1（约 3.0s，wrapper `translate3d(0px, -96px, 0px)`）→ 2（约 7.0s，-192px），步进节奏 ≈3.5s ✓，方向为纵向 ✓ | `compare/M-24-index5-*.jpg`（客户墙整屏）、`shots/11-1440-zh-dark-index1.png` |
| M-12 index2 双列视差 | 第一组锚点 `flex1 = sectionTop - clientHeight/3`、第二组 `flex2 = sectionTop + .fist:first-child 高度`；系数左 −0.02 / 右 +0.1；无 clamp、未达锚点不写值 | `useHomeScroll.measure()` + `a.columns` | 以 `flex1` 为原点、取 SPEC 公布的同一批偏移：<br>`+300` → f1 `-6` / f2 `+30`（SPEC −6 / +30）<br>`+1989` → `-39.78` / `+198.9`（SPEC 同值）<br>`+3115` → `-62.3` / `+311.5`（SPEC 同值）<br>`+4240` → `-84.8` / `+424`（SPEC 同值）<br>`+5929` → `-118.58` / `+592.9`（SPEC 同值）<br>第一组逐点误差 0。第二组锚点本页 `flex2 = 2429`（1838 + 591），参考站 4386（1985 + 2401）：公式相同，绝对位置差异只因两页 `.fist:first-child` 高度不同（591 vs 2401） | `compare/M-12-index2-000/030/050/070/100.jpg` |
| M-13 `.public_text` 逐行擦除（实例 1：`.index1 .title`） | `dis = 200`、`start = offset - clientHeight/1.2`、允许负值、无 transition 逐帧直写 | `useHomeScroll.collectPublicText` + `scrollContent` | 本页 `start = 355`（行 offset 1105 − 750）。偏移 0 → `inset(0px 100% 0px 0px)`；+120 → `40%`；+200 → `0%`；+280 → `-40%`（p0）/ `91%`（p1）；+400 → `inset(0px)`（p0）/ `31%`（p1）。与参考站 pt1 钉值（268→100%；300→84%；400→34%；500→−16%；600→p0 −66% / p1 61%）同相位一致 | `compare/M-13-pt1-000/030/050/070/100.jpg` |
| M-13（实例 2：`.index2 .blue.public_text`） | 同上（`len=2`、`dis=200`） | 同上 | 本页 `start = 1208`。偏移 0 → p0 `100%`；+120 → `40%`；+200 → `0%`；+280 → `-40%`；+400 → `inset(0px)`；p1 依次 `100% / 100% / 100% / 91% / 31%`。SPEC 记录参考站该实例 `T0 = 1364.65`，但因 AOS 容器位移，其 offset 在 2107.7–2114.65 间抖动（≈7px，G-05 同源）；本页用布局位置计算，读数稳定。**该行以公式+相位为准，不比绝对 y** | `compare/M-13-pt2-000/030/050/070/100.jpg` |
| M-14 index3 跟随框 | `.move { transition: all 0.4s }`、`translateY(index * item.clientHeight)`；参考站 item 高 189px；`:after` 5×61、left −5px、`#184DC4`、`box-shadow: 10px 0 17px 0 rgba(24,77,196,.8)`、`transition .6s` | `motion.js serviceSwitch`；`index.vue` 服务列表 | 点击第 2 项 → `.move` `matrix(1, 0, 0, 1, 0, 175)`；第 3 项 → `(…, 350)`；第 4 项 → `(…, 525)`。步长 = 本页 item 实测高 **175px**（参考站 189px；本页服务项文案更短导致行高不同，公式一致） | `compare/M-14-index3-asLoaded.jpg`、`compare/M-14-M-15-index3-click-item2.jpg`、`…click-item3.jpg` |
| M-15 文本翻动 + 视频切换 | `.item { transition: .6s }`、文字 `translateY(-100%)`；视频槽切换时播放对应方向素材 | `useHomeSwipers`/`index.vue` + `content/home.js SERVICE_TRANSITIONS` | 点击后 `onIndex` 0 → 1 → 2 → 3；`.index3 .picture video` 共 12 个（6 亮 + 6 暗）；点第 2 项时 `1-2` 的 `on` 视频 `paused=false`、`currentTime=0.9`、`muted=true`、`loop=false`、`autoplay=false`，其余 11 个保持 `paused=true / currentTime=0` ✓ | 同上 + `compare/GAP-index3-item4-no-asset.jpg` |
| M-18 index4 高度注入 | 高 = `clientHeight + 7000` = 7900 | `useHomeScroll`（挂载即写入） | `index4.style.height = 7900px`（挂载后立即，无需等待真实滚轮） | `compare/M-19-M-23-index4-000.jpg` |
| M-19 mask 负 delay scrub | `animation: 10s mask_ cubic-bezier(0.79,0.06,0.33,0.94) forwards` + 暂停 + 负 delay；`delay = -(scrollTop - sectionTop)/5000×8`；`scrollTop >= nextTop - clientHeight` 钳到 `-8s` | `motion.js statement.mask`；`useHomeScroll` | 锚点相对偏移 0 / 2100 / 3500 / 4900 / 7000 → `0s / -3.36s / -5.6s / -7.84s / -8s(钳制)`，scale `1.05 / 35.5824 / 166.244 / 280.432 / 283.229`。参考站同点位（`capture-index4.json`）：`0s / -3.35915s / -5.59915s / -7.83915s / -11.1991s`，scale `1.05 / 35.5621 / 166.155 / 280.417 / 300`。前 4 点相对误差 ≤0.06%。最后一点：参考站那一帧取在钳制边界**前 2px**，因此仍是未钳制值（−11.1991s 已超过 10s 动画 → scale 停 300）；本页取样点正好落在钳制边界 → 取 SPEC 记录的钳制值 **−8s / scale 283.229**（= 动画 80% 处） | `compare/M-19-M-23-index4-050.jpg` 等 5 张 |
| M-20 `.bg` 位移 | `y = (scrollTop - sectionTop)/(sectionH - clientHeight) × -(bgH - clientHeight)`；上限 = 参考站 −106.36px | 同上 | `translateY(0 / -31.8 / -53 / -74.2 / -106)`px；参考站 `0 / -31.8999 / -53.1719 / -74.4439 / -106.352`px，逐点相对误差 ≤0.6%（本页 `.bg` 图高 1006px，参考站 1006.36px） | 同上 5 张 |
| M-21 `.fix` 固定位移 | `clamp(scrollTop - sectionTop, 0, sectionH - clientHeight)` → 上限 7000px | 同上 | `translate(0px, 0 / 2100 / 3500 / 4900 / 7000)`；参考站 `0 / 2099.47 / 3499.47 / 4899.47 / 6999.47`（0.5px 差 = 参考站逐帧 `$(el).offset()` 的相位漂移，G-05） | 同上 5 张 |
| M-22 / M-23 文案插值（`data-view`） | 第 1 组 outer `distance 4000 / animate 1000 / opacity 1→0`，inner `distance 3000 / animate 1000 / scale .9→1 / opacity 0→1`；第 2 组 outer `6000/1000/1→0`，inner `5000/1000/.9→1/0→1`；线性、无过渡 | `motion.js statement.copyGroups`；`useHomeScroll.applyDataView` | 4 个 `[data-view]` 节点的内联值随滚动推进：`opacity 1\|0\|1\|0` → `1\|0\|1\|0` → `1\|0.5\|1\|0` → `0.1\|1\|1\|0` → `0\|1\|0\|1`（第 5 点完成两组淡出/淡入交换） | `compare/M-19-M-23-index4-070/100.jpg` |
| M-24 AOS 通用入场 | 判定 `rect.top - clientHeight + all_num < 0`（桌面 150 / 手机 0）；`1.5s cubic-bezier(.175,.885,.32,1.275)`、`fade-top` 位移 50px、`delay 100/200ms`、once | `motion.js reveal`；`useHomeScroll.revealCheck` | 新开页面逐级下滚：y=0 → 1/21、400 → 2/21、700 → 4/21、1200 → 6/21、1800 → 12/21、2600 → 18/21、index5（12064）→ 21/21、limit（12713）→ 21/21。另一次「加载后直接跳到页尾」也是 **21/21，且 `opacity:0` 的 `[data-aos]` 为 0 个** | `compare/M-24-index5-*.jpg`、`shots/02/03/06/07-*` |
| M-26 `.headline .line` 横线展开 | `2s ease`、由父级 `.aos-animate` 触发、起始 `scaleX(0)` → `scaleX(1)` | `motion.js line`；`index.vue` `.headline`/`.line` | `.headline` offsetTop=1056；y=320（rect.top 786）未触发、y=400（rect.top 663）已触发，与阈值 `rect.top < 750` 一致。触发后 400ms 采样 `matrix(0.288984, 0, 0, 1, 0, 0)`、再 400ms `matrix(0.683401, …)`（2s ease 在 t≈0.2 / 0.4 的理论值 0.30 / 0.68）→ 逐点吻合 | `compare/M-13-pt1-030.jpg`（同屏可见横线）、`shots/02-index1-publictext-000` |
| M-34 index5 手机横滑 | `speed:1000`、Swiper 默认缓动 | `motion.js insights`；`useHomeSwipers` | 390×844 实测 `slidesPerView=2 / speed=1000 / spaceBetween=20 / loop=true`、4 个 bullet；拖动一次 `realIndex 0 → 2`、wrapper `translate3d(-371px, 0px, 0px)`；点末页 bullet → `realIndex=3` | `compare/mobile-top.jpg`、`compare/mobile-approx-100.jpg` |
| M-16 / M-17 | index3 three.js 相机转场、`.canvas_alert` 弹层链 | **未实现** | 本页没有 canvas 三维场景与弹层 | — （见第 8 节未完成项） |
| M-03 / M-04 / M-05 / M-06 / M-27—M-33 | 页头入场与阈值、光标、磁吸、footer、侧边浮动、主题按钮 | **不在 B 范围**（A 的公共组件） | 未实现，已写成契约变更申请（第 6 节） | — |

## 4. 用户点名的两处自查

### 4.1 客户墙

- 素材：`frontend/public/assets/customers/jun_1.svg … jun_24.svg`（本地）。
- **无热链**：`src/`、`public/`、构建产物 `dist/` 全量检索 `seniorweb` —— 唯一命中是 `src/content/services.js:3` 的 `source` 溯源字符串（未用于任何 `src`/`href`），运行时不加载参考站域名。产物中 `dist/assets/*.js` 里 `seniorweb` 出现 0 次。
- **各自原始高度，不统一**：`content/home.js CUSTOMER_SOURCE_HEIGHTS` 逐张登记（14–33px）。实测 PC 首槽 8 张 `style.height` = `28px / 30px / 23px / 28px / 22px / 21px / 32px / 32px`；手机 24 张 = `28/30/23/28/22/21/32/32/28/23/14/24.5/20/28/30/18/16/22/28/23/23/19/33/25.5`px（PC/手机同一套高度）。
- **槽位**：PC 8 槽 × 3 行 = 24 张（`wallPc.slots=8, imgs=24`）；手机 4 槽 × 6 行 = 24 张（`wallMobile.slots=4, imgs=24`）。
- **固定换序**：`CUSTOMER_REORDER = 7,19,2,14,23,5,11,1,17,9,24,4,16,8,21,12,3,20,6,22,10,15,18,13` 硬编码在 `content/home.js`，无随机、无洗牌。实测首槽 `src` = `jun_7 / jun_19 / jun_2 / jun_14 / jun_23 / jun_5 / jun_11 / jun_1` ✓；刷新、切语言（zh/en）、切主题（亮/暗）三组组合的 24 张高度数组完全一致（见 `measure-part2.json`）。
- **没有编造公司名**：客户区只渲染图片（`alt` 为空串），页面上不出现任何文字客户名；`jun_*` 全部来自 T00A 的本地素材与 SHA256 登记。

### 4.2 服务切换区（对应参考站 `.index3`）

- 视频组：`public/assets/transitions/` 亮色 6 个（`w1-2 / w2-1 / w1-3 / w3-1 / w2-3 / w3-2`）+ `transitions/black/` 暗色 6 个；暗色由 `html[data-theme=dark]` 切组（实测亮色 `darkGroupShown=none`、暗色 `block`）。
- `autoplay=false`、`loop=false`、JS 编排：实测点击后对应方向的视频 `paused=false / currentTime` 递增，未选中的保持 `paused=true / currentTime=0`。
- **首屏视频复用成 3 张工作卡的占位填充已不存在**：当前首屏只有 1 条自有 hero 视频（`/yunzhan-hero.mp4`，≤1024 用 `/yunzhan-hero-mobile-v3.mp4`），index3 的三张工作卡位置由服务切换视频组驱动，实测 index3 内共 12 个 `<video>`（6 亮 + 6 暗），没有复用首屏素材。
- **素材缺口（登记，不伪造）**：本产品有 4 个服务槽，参考站只抓到编号 1/2/3 之间的 6 对过渡视频；点第 4 项（web）没有对应方向素材 → 页面显示缺口文案、不播放替代画面（`SERVICE_TRANSITIONS` 只声明已抓到的 6 对，`HOME_SERVICES` 里 `transitionIndex=4` 的方向无键）。对照 `compare/GAP-index3-item4-no-asset.jpg`。

## 5. 有意差异（逐条，含理由与实测）

1. **首屏只有 1 张素材**（参考站 2 张轮播）：自有成品只有 `yunzhan-hero.mp4` 一条 + 手机版一条；M-07 的 `speed/effect/allowTouchMove/autoplay` 参数已写进 `motion.js banner`，等素材到位即可启用。
2. **首屏视频解码前有底色空窗**：实测起始约 517ms 时 `readyState=1`（仅元数据）、整屏只有视频底色（见 `shots/08-entrance-0200ms-1440-zh-light.png`），约 840ms 时 `readyState=4` 才出画。参考站首屏首帧是图片，不存在该空窗。未擅自新增 poster 素材，作为缺口登记。
3. **首屏 scrim 由纯 30% 黑改为左侧重的渐变**：自有视频右上高亮区会让标题末尾字符融进亮部。
4. **`.banner-wrap` 内边距改 `clamp(48px, 8.3vw, 120px)`**：英文主标 nowrap，1025–1100px 宽度原会被裁切。
5. **英文标题按「分组」渲染**（西文连续字母合为一组、组内 nowrap；中文/全角标点逐字）：避免手机上把 `applications` 拆成 `application / s`；字符延迟仍按整行连续计数（与参考站一致）。
6. **过渡视频统一 `muted`**（参考站 `muted=false`）：不带用户手势的自动播放按浏览器策略必须静音；参考站靠用户手势解锁音频。
7. **`.index4` 挂载即注入高度**（参考站要等一次真实滚轮才写高度）：SPEC「采集前置动作」记录参考站 `Limit.y` 会从 10151 跳到 17365；本实现挂载即稳定，避免首屏可滚动高度跳变。
8. **锚点用布局位置（offsetTop 链）计算**，在 resize / 高度注入后重算，不做参考站逐帧 `$(el).offset()` 读取：参考站因此有 GAPS G-05 的 ~50px 相位漂移与每帧抖动（本页 M-21 与参考站那 0.5px 的差就是参考站的漂移量）。
9. **M-24 用 SPEC 的位置比较，不用 IntersectionObserver**：参考站判定是 `rect.top - clientHeight + all_num < 0`。IO 的相交判定在「拖动滚动条跨段跳跃」时不会显影被跳过的节点；位置比较与参考站一样，直接跳到页尾也全部显影（实测 21/21、无 `opacity:0` 残留）。
10. **`mask.svg` 未抓到（G-06）**：用等效内联 SVG data URI 复现，竖缝中心位置是推算值，比参考站略偏右。
11. **手机端 `.index3` 不隐藏**（参考站 ≤1024px 是 `display:none`）：手机实测 4 个服务项照常渲染（`index3Items=4`），只把跟随框 `.move` 隐藏（`index3MoveDisplay=none`）。这符合项目不变量「手机端服务区不能消失」，是**故意与参考站不同**。
12. **手机 `.index4` 沿用同一张 `.bg`**（参考站用未抓取的 `.sj_bg`）。
13. **`.home` 背景按 section 声明**：全局 `src/style.css:759` 有 `.home{ background: transparent !important }`，本页在 section 层写背景，不改全局。
14. **`.item-hit` 中和全局按钮发光**：`src/style.css:944` 的 `button:hover` 发光来自 A 的全局样式。
15. **本页在 ≤768px 用 `.banner .back, .index3 .group video { height: 100% !important }` 收回全局规则**：`src/styles/responsive.css:184` 的 `img, video, iframe { height: auto !important }` 会让首屏视频在 390 宽只剩 195px 高。已列入给 A 的收窄建议。
16. **M-16（three.js 相机转场）、M-17（index3 弹层/`.canvas_alert`）未实现**。

## 6. 给 A 的共享契约变更申请（B 未自行实现）

1. `src/styles/motion.js` 的三组 token 值仍是 `MOTION_TODO`。请把 SPEC 数值填入并补亮/暗色 token；填好后本页 `views/Home/motion.js` 可**整份删除**（字段名已刻意与共享 token 同名）。
2. **主题切换入口与初始化缺失（阻塞验收）**：`src/stores/theme.js` 只写 `document.documentElement.dataset.theme`，全仓除本页的「只读跟随」外没有任何界面入口，也没有初始化逻辑。按不变量需要：当地时间 **19:00—07:00 为暗**、两态按钮、手动选择生效到下一个边界（不照抄参考站 08:00 规则）。**本文与 8 张组合截图中的暗色是手动设 `data-theme=dark` 得到的，不是通过界面切换**，请勿据此认为主题按钮已实现。
3. M-03 页头入场（logo 0s、导航 0.2/0.4/…/1.4s 各 1s `fadeInDown`、`>1365px` 才播放）在 `Header.vue` 内，本页未实现。
4. M-27/28/29（自定义光标：指数逼近、点击波纹、`.cut` 变形态）、M-30/31（footer 磁吸与圆形按钮发光）、M-32（侧边浮动出现与回顶）、以及 `clientWidth <= 100` 时移除 `aos`/`aos-delay` 属性的边界处理，均属全局交互，请统一实现。
5. M-17（index3 弹层 + `.canvas_alert` + 三维场景）与 M-16 需要 A 决策是否纳入 1.0。
6. 建议收窄三条全局规则（本页现在只能靠更高特异性覆盖）：`src/style.css:944` 的 `button:hover` 发光、`src/style.css:759` 的 `.home{ background: transparent !important }`、`src/styles/responsive.css:184` 的 `img, video, iframe { height: auto !important }`。
7. 存量问题（非本次范围，未代改）：导航缺「服务」菜单项；`Header.vue` 用 `$route.path === '/'` 判定当前项，导致 `/en` 首页不匹配。
8. `index2` 标题列的「更多」当前指向 `/ai-consultation`（本项目没有服务列表页）。请 A 决定是否新建 `/services` 或改指向。

## 7. 验证（Step 4，真实输出）

### 7.1 `npm.cmd run build`（在 `frontend/` 下）

```text
> company-website-frontend@1.0.0 build
> vite build

vite v4.5.14 building for production...
transforming...
[baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
(node:11572) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///D:/桌面/gengzhan-worktrees/session-b/frontend/postcss.config.js is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
Browserslist: browsers data (caniuse-lite) is 11 months old. Please run: npx update-browserslist-db@latest
✓ 1549 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                              0.58 kB │ gzip:   0.49 kB
dist/assets/index-55cf3a95.css              29.08 kB │ gzip:   7.16 kB
dist/assets/index-f7ae670b.css             530.49 kB │ gzip:  69.22 kB
dist/assets/index-0912e0a0.js               36.71 kB │ gzip:  14.91 kB
dist/assets/index-dd72bc97.js              100.97 kB │ gzip:  33.43 kB
dist/assets/index-2b77537b.js            1,139.35 kB │ gzip: 364.39 kB
(!) Some chunks are larger than 500 kBs after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit
✓ built in 12.41s
```

结论：**通过**。警告全部是既有环境类（caniuse-lite/baseline-browser-mapping 数据陈旧、postcss.config.js 的 module 类型、chunk 体积），非本页代码问题。

### 7.2 `npm.cmd run check:routes`（在 `frontend/` 下）

```text
> company-website-frontend@1.0.0 check:routes
> node scripts/check-routes.mjs

FRONTEND.md §3 路由契约检查（router routes ↔ routeManifest）
[PASS] home zh                `/`                  命中 / (Home)
[PASS] home en                `/en`                命中 /en (HomeEn)
…（34 条 PASS，含七类服务中英、案例/资讯/公司/隐私/法律/404 catch-all）…
[PENDING] contact zh             `/contact`           未实现：Contact/index.vue 尚未创建，中文 /contact 与英文 /en/contact 均未注册（B / T05）
[PENDING] contact en             `/en/contact`        未实现：Contact/index.vue 尚未创建，中文 /contact 与英文 /en/contact 均未注册（B / T05）
[WARN] routeManifest 尚未覆盖 §3 的 15 个 routeKey（T01 未完成，不属于本次修复范围）
尾斜杠规范化：match 31/31，router beforeEach 守卫 存在 → PASS
routeManifest：3 条记录，PASS

结果：PASS 34 / FAIL 0 / PENDING 2
```

结论：**通过**。两条 PENDING 都是 `contact`（B·T05 尚未创建 `Contact/index.vue`），与本轮首页改动无关。

### 7.3 只读 eslint

注意：仓库的 `npm run lint` 带 `--fix`，**不能当只读检查**；下表用的是显式只读调用。

```text
$ .\node_modules\.bin\eslint.cmd src/views/Home/index.vue src/views/Home/motion.js src/views/Home/useHomeScroll.js src/views/Home/useHomeSwipers.js src/content/home.js
✖ 124 problems (0 errors, 124 warnings)
  0 errors and 99 warnings potentially fixable with the `--fix` option.
EXIT=0
```

```text
$ .\node_modules\.bin\eslint.cmd . --ext .vue,.js,.jsx,.cjs,.mjs --ignore-path .gitignore
✖ 924 problems (7 errors, 917 warnings)
```

| 范围 | errors | warnings |
| --- | --- | --- |
| 本页 5 个文件 | 0 | 124（全部 `vue/max-attributes-per-line` / `vue/singleline-html-element-content-newline` 排版类） |
| 其余全仓 | 7 | 793 |

- 7 个 error 全在存量文件：`src/components/CompetitiveAdvantage.vue`（3）、`src/views/Cases/detail.vue`（4），不是本次改动。
- 本页 124 条 warning 与全仓同类页面量级一致（`ServiceLanding.vue` 129 条最多、`Cases/detail.vue` 62 条）；没有为了消 warning 而降级规则，也没有叠加 `!important` 掩盖结构问题。
- AGENTS.md 记录的基线是「7 errors / 846 warnings」。本次只读读数在 `b8e5ba1` 上是 7 / 917；其中本页占 124，其余页面 793。两个数字不可直接相减（基线的 revision 与本轮不同），仅列出供 A 归档。

### 7.4 8 张组合截图（1440/390 × zh/en × 亮/暗）

均为该组合下的首屏视口截图（1440×900 / 390×844 @DPR2 = 780×1688），`consoleErrors=0`、`externals=0`。

| 文件 | 视口 | theme | locale | docHeight | limit | `.home` 背景 | 客户墙 | 暗色视频组 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `shots/09-1440-zh-light.png` | 1440×900 | 亮 | zh-CN | 13613 | 12713 | `rgb(242, 241, 228)` | PC 8 槽 / 24 图 | — |
| `shots/09-1440-zh-dark.png` | 1440×900 | 暗 | zh-CN | 13613 | 12713 | `rgb(20, 20, 15)` | PC 8 槽 / 24 图 | `block` |
| `shots/09-1440-en-light.png` | 1440×900 | 亮 | en | 13755 | 12855 | `rgb(242, 241, 228)` | PC 8 槽 / 24 图 | — |
| `shots/09-1440-en-dark.png` | 1440×900 | 暗 | en | 13755 | 12855 | `rgb(20, 20, 15)` | PC 8 槽 / 24 图 | `block` |
| `shots/09-390-zh-light.png` | 390×844 | 亮 | zh-CN | 5905 | 5061 | `rgb(242, 241, 228)` | 手机 4 槽 / 24 图 | — |
| `shots/09-390-zh-dark.png` | 390×844 | 暗 | zh-CN | 5905 | 5061 | `rgb(20, 20, 15)` | 手机 4 槽 / 24 图 | `block` |
| `shots/09-390-en-light.png` | 390×844 | 亮 | en | 6233 | 5389 | `rgb(242, 241, 228)` | 手机 4 槽 / 24 图 | — |
| `shots/09-390-en-dark.png` | 390×844 | 暗 | en | 6233 | 5389 | `rgb(20, 20, 15)` | 手机 4 槽 / 24 图 | `block` |

配套分区证据（同一批组合下的分栏）：`shots/10-mobile390-top/index1/index2/index3/index4/index5/index5-swiped/index5-bullet.png`（390 亮色分段 + M-34 拖动/点 bullet）、`shots/11-1440-zh-dark-index1.png`、`shots/11-1440-zh-dark-index2.png`（暗色分区；客户 Logo 反白 `filter: invert(1)`）。

手机端实测：`publicTextDisplay=none` + `sjTextDisplay=block`（M-13 手机降级）、`index3Items=4`（服务区未消失）、`.move display:none`、`.group-dark display:none`（亮色）。

### 7.5 每条效果的对照静帧

`handoffs/B/compare/` 共 43 张，命名 `<SPEC条目>-<相位>.jpg`：**左 = 参考站 `docs/frontend-rebuild/evidence/reference-effects/frames/**`，右 = 本页 `shots/**` 同相位帧**，顶部标注两侧文件名。

| 效果 | 对照文件（相位 000/030/050/070/100 对应 0/30/50/70/100% 区间） | 参考站帧 |
| --- | --- | --- |
| M-07 / M-08 首屏 | `M-07-M-08-banner.jpg` | `global/global-000.png` |
| M-10 逐字入场 | `M-10-entrance-{0200,0400,0700,1000,1600,2200,3200,4500}.jpg`（8 张） | `entrance/ent-*ms.png` 同名毫秒 |
| M-13 实例 1 | `M-13-pt1-{000,030,050,070,100}.jpg` | `publictext/pt1-*.png` |
| M-13 实例 2 | `M-13-pt2-{000,030,050,070,100}.jpg` | `publictext/pt2-*.png` |
| M-12 index2 双列 | `M-12-index2-{000,030,050,070,100}.jpg` | `index2/index2-*.png` |
| M-14 / M-15 index3 | `M-14-index3-asLoaded.jpg`、`M-14-M-15-index3-click-item2.jpg`、`M-14-M-15-index3-click-item3.jpg`、`GAP-index3-item4-no-asset.jpg` | `index3/i3-00-asLoaded.png`、`i3-03-click-item2-2000ms.png`、`i3-04-click-item3-2000ms.png` |
| M-18—M-23 index4 | `M-19-M-23-index4-{000,030,050,070,100}.jpg` | `index4/index4-*.png` |
| M-24 index5 / AOS | `M-24-index5-{000,030,050,070,100}.jpg` | `index5/index5-*.png` |
| 手机整体 | `mobile-top.jpg`、`mobile-approx-{30,50,70,100}.jpg` | `mobile/mobile-390-{top,30,50,70,100}.png` |

对照的取样口径（重要）：

- 桌面组相位一一对应：参考站截帧就是按「该效果的区间 0/30/50/70/100%」或「锚点 + 固定偏移（如 publictext 的 +0/120/200/280/400、index2 的 +300/1989/3115/4240/5929）」采集的，本页用同一套相位/偏移复拍。
- 绝对 y 必然不同（本页 `docHeight 13613` vs 参考站 `17365` 量级），所以对照看的是**同一效果相位的形态**，不是像素重合。
- 参考站手机组是 DPR=3（1170×2532），本页是 DPR=2（780×1688）；`mobile-approx-*` 的 4 张是按「文档高度百分比」近似对齐（参考站按全页 % 取样，本页按 section 锚点取样），只有 `mobile-top.jpg` 是精确同位置。
- `GAP-index3-item4-no-asset.jpg` 不是等价比对，而是缺口登记：左侧是参考站第 3 项帧，右侧是本页点第 4 项的缺口文案。

## 8. 未完成项 / 缺口 / 下次第一步

### 8.1 未完成项

| 项 | 状态 | 归属/依赖 |
| --- | --- | --- |
| 首屏第 2 条 banner 素材（M-07 轮播）+ 图片首帧（消除解码空窗） | 缺素材；参数已在 `motion.js banner` 就位 | A / 用户 |
| index3 第 4 槽（web）方向的过渡视频 | 缺素材；页面显示缺口文案、不伪造画面 | A / 用户 |
| M-16 three.js 相机转场、M-17 index3 弹层与遮罩链 | 未实现 | A 决策是否纳入 1.0 |
| 主题切换界面入口 + 19:00—07:00 自动暗 + 两态按钮 | **未实现（阻塞验收口径）**，本轮暗色截图是手动设 `data-theme` | A |
| M-03 页头入场、M-27—M-31 光标/吸附、M-32 侧边浮动 | 未实现 | A |
| 手机端 M-12 数值实测 | 未测（SPEC 也把它列为 GAP） | B（可补） |
| 手机 4 槽客户墙逐槽对照截帧 | 未做（SPEC 列为 GAP），只有整段截图 | B（可补） |
| 真机 / Safari / 微信 | **未验证**，一律按未验证处理 | 后续 |
| 暗色下客户墙 Logo 反白（`filter: invert(1)`） | 本页自行决定；参考站暗色客户墙未取证，无对照 | B（需 A 确认） |
| `contact` 页面（`/contact`、`/en/contact`） | 未创建，`check:routes` 的 2 条 PENDING | B / T05 |

### 8.2 交接注意

- 本轮的截图/数值（`shots/`、`compare/`、`measure-*.json`）都是本轮**新增产物**，全部在 `docs/frontend-rebuild/handoffs/B/` 下；采集脚本在仓库外，未提交、不可复现时需重写。
- 截图对应的源码状态 = `b8e5ba1`：`01`–`11` 系列取自 build 7:24:13（截图 7:24:51–7:26:09）；`08-*-ms` 8 张与 `12-index2-blue-*` 5 张是随后用同源重跑 build 后再拍的，源码未变。之后仅改 docs。
- 本地预览仍在 `http://localhost:3001/`（`npm.cmd run preview -- --port 3001 --strictPort`）；vite preview 不热更新，改源码后必须重新 build 再截。
- 未覆盖用户环境文件、未提交密钥、未清理他人未提交内容、未做任何破坏性 Git 操作；**没有 merge 进 main**。

### 8.3 下次第一步

1. 把本分支交给 A 收口（B 不自行 merge）；同时提请 A 决策第 6 节的 8 条契约变更，尤其第 2 条（主题入口/19:00—07:00 规则）——它直接决定「亮/暗」这个验收维度能不能由界面走通。
2. 向用户申请**首页样板验收**：入口 `/` 与 `/en`，按 1440/390 × 中/英 × 亮/暗 组合看 `shots/09-*`，按效果逐条看 `compare/` 的 43 张对照，重点确认第 5 节 16 条有意差异是否接受（尤其「手机端 index3 不隐藏」「首屏单素材」「过渡视频第 4 槽缺口」）。
3. 用户批准样板后再并行定稿其余页面（B 的下一批是公司/联系/法律，含 T05 的 `contact`）；如需先补手机端 M-12/客户墙的实测与截帧，可在同一分支上继续。

## 9. 验收反馈处理（2026-09-14，用户 6 条意见）

### 9.0 用户本轮裁决与授权

- 授权 B **临时接管公共层**（页头 / 全局自定义光标 / 磁吸 / 全局引入），完成后交 A 复核（见 9.4）。
- 授权 B **抓取参考站素材**入库占位；执行仍按 T00A 纪律（登记来源 + SHA256，不做运行时热链）。
- 对 B 的可改文件范围无额外限制。
- 用户决定：**index5 保留 4 块**（四块可用同一张动图）；**index2 的「四项主服务」「交付能力」要有动图**；**index3 整块删除**。

### 9.1 已做：删除 index3（用户决定，理由=与 index2 内容重复）

- 复核依据：`index2`（`#capability`）已经列出「四项主服务 + 交付能力」，`index3`（`#services`）把同一批四项服务又列了一遍（`content/home.js:132-144` vs 服务切换文案）。
- 改动文件：`frontend/src/views/Home/index.vue`（删 index3 模版、脚本段、样式段、≤1024px 分支、减少动效分支，以及只被它使用的 `SERVICE_TRANSITIONS`/`TRANSITION_KEYS` 导入）。
- 实测：section 序列 = `banner / index1 / index2 / index4 / index5`；`document.querySelector('.index3')` → `false`；浏览器 `pageerror` 0 条、console error 0 条。
- 连带影响（登记，不删素材）：SPEC M-14/M-15/M-16/M-17 从首页撤下；`frontend/public/assets/transitions/`（亮 6 + 暗 6）与 `content/home.js` 的 `SERVICE_TRANSITIONS`/`TRANSITION_KEYS` 首页不再引用，**保留供 C 的服务页复用**。
- 踩坑记录：删导入时漏了 `HOME_SERVICES`（`capabilityRows` 仍在用），`npm.cmd run build` **不报错**，运行时 `ReferenceError: HOME_SERVICES is not defined` 直接把首页打成空白。→ 本轮起，凡改本页必须跑浏览器探针看 `pageerror`，不能只看 build 通过。

### 9.2 已做：index4 钉屏抖动修复（用户第 5 条）

- 根因（逐帧实测，非推测）：钉屏由 JS 在 rAF 写 `transform`，而原生滚动跑在合成线程 → 每步滚轮整屏内容先滑出再弹回；参考站没有这个问题是因为它用 M-01 自定义惯性滚动（主线程滚），本项目未实现 M-01。
- 改前实测（真实滚轮 12×300，逐帧采样 `.fix` 的 `getBoundingClientRect().top`）：`向下 min=-299.6 max=0.4`、`向上 min=0.4 max=300.4`，**极差 300.0px**；样本可见 `[9964, 300.4] → [9964, 0.4]`。
- 改法：`.index4 .fix` 由 `position:absolute` + JS 写位移改为 `position: sticky; top: 0`（交给合成线程钉屏），并删掉 JS 的 `.fix` 位移写入；`.index4` 的 `overflow: hidden` 改 `overflow: clip`（`hidden` 会变成滚动容器，会破坏 sticky）。行程不变：`sectionHeight - clientHeight = 7000px`。
- 改后实测（同一探针）：`向下 fixTop min=0 max=0`、`向上 fixTop min=0 max=0`，**极差 0.0px**。
- 数值侧未动：mask 负 delay、bg 位移、`[data-view]` 插值区间与钳制分支保持 SPEC 原值。补充实测：`-8s` 在 `sectionTop+5000` 即已达上限，因此本项目**本来就没有**参考站 `-11.1991s → -8s` 那次回跳；用户反馈的「反向很怪」由上面的 300px 撕裂解释。
- 复现/验证脚本：`bx-verify.js`（仓库外 `C:\Users\yk\AppData\Local\Temp\t00r-browser\`，含 pageerror 断言 + 逐帧采样 + 5 张静帧）。静帧：同目录 `probe-index4/fixed-index4-000/030/050/070/100.png`。

### 9.3 未做（已授权，下一批）

- 需求 1：Header 顶部透明 + M-04 `.on` 阈值/配色反转 + M-05 wheel 方向收放（含 M-03 入场）。
- 需求 2：全局自定义光标 M-27/28/29（含 `.cut` 蓝盘）+ 磁吸 M-30/31 + 侧边浮动 M-32。
- 需求 4：index2 一图一文（动图）+ 蓝盘（蓝盘依赖上面的光标层，先落光标层）。
- 需求 6：index5 四块加动图 + 蓝盘。
- 动图素材：**等用户裁决转码策略**（见 9.5）。

### 9.4 给 A 的告知：B 临时接管公共层（已获用户授权，A 请复核）

| 文件 | 计划改动 | 依据 |
| --- | --- | --- |
| `frontend/src/layout/components/Header.vue` | M-04 `.on` 阈值 867.375px + 底色 `#F2F1E4`（暗色走 token）+ logo `invert(1)`、M-05 `wheel` 方向 `translateY(-100%)`、过渡 `.6s ease` | SPEC M-04/M-05，用户第 1 条 |
| 新增 `frontend/src/components/CustomCursor.vue` | M-27 指数逼近跟随（首页 `data-speed=8` → 0.8）、M-28 点击波纹、M-29 `.cut` 134px 蓝盘 | SPEC M-27/28/29，用户第 2 条 |
| 新增 `frontend/src/composables/useMagnetic.js` | M-30 磁吸 `((mouse-rect)/size-0.5)*strength` + `TweenMax` 1s `Power4.easeOut` 等价实现 | SPEC M-30，用户第 2 条 |
| 新增 `frontend/src/styles/cursor.css` + `frontend/src/main.js` 一行 import | 光标层全局样式（`mix-blend-mode: exclusion`、≤1024px 隐藏） | 同上 |

B 的原则：公共层只做「新增文件 + 一行引入 + Header 内部改动」，不改其它全局规则；主题色一律走 A 的既有 token / `html[data-theme]`，不新造状态。

### 9.5 等用户裁决：动图素材的转码策略

index2 的 8 张动图（动图 WebP，`<img>` 自动播放、`loopCount=65535` ≈ 无限循环）**原图合计 93.75MB**：

| 图 | 尺寸 | 帧 | 体积 |
| --- | --- | --- | --- |
| `36b6cab0….webp` | 1080×1080 | 500 | 49.88 MB |
| `ee92f48e….webp` | 720×405 | — | 11.60 MB |
| `e42f54a2….webp` | 1400×488 | — | 9.35 MB |
| `ec76207e….webp` | 630×630 | — | 7.47 MB |
| `c032eff1….webp` | 720×405 | — | 7.18 MB |
| `c61e07c8….webp` | 630×630 | 80 | 5.62 MB |
| `019048b1….webp` | 960×540 | — | 1.59 MB |
| `83db3640….webp` | 640×360 | 152 | 1.07 MB |

`handoffs/T00A.md:14` 的抓取纪律是「保留原始文件名与原始格式（未重命名、未转码、未压缩）」。三个选项：(a) 原样入库（首页背 90+MB）；(b) 转码压缩入库并在 manifest 登记「派生自 X + 转码参数 + 源/派生各自 SHA256」（有意偏离 T00A 的未转码纪律）；(c) 只抓小体积的几张。**B 建议 (b)**，等用户点头后才抓。

### 9.6 本轮验证（真实输出）

```
$ npm.cmd run build        # 在 frontend/ 下
(!) Some chunks are larger than 500 kBs after minification. …（既有告警，非本轮引入）
✓ built in 14.99s

$ npm.cmd run check:routes
尾斜杠规范化：match 31/31，router beforeEach 守卫 存在 → PASS
routeManifest：3 条记录，PASS
[PENDING] contact — Contact/index.vue 尚未创建（B / T05）
结果：PASS 34 / FAIL 0 / PENDING 2

$ .\node_modules\.bin\eslint.cmd src/views/Home/index.vue src/views/Home/useHomeScroll.js --ext .vue,.js
✖ 114 problems (0 errors, 114 warnings)
```

- 浏览器探针（dev `http://localhost:3000/`，1440×900）：`pages error 无`、`fixPosition: "sticky"`、`index3Present: false`、`index4Top: 3223`、`index4H: 7900`、`pageH: 12671`。
- 删 index3 后锚点前移：`.index4` 的布局 top 4164 → 3223（前移 941px = index3 原占位高度），改后 `pageH = 12671`；下游锚点全部由 `measure()` 在挂载时重算，无需手工改常量。

### 9.7 已做：占位动图落地（用户决定「只抓体积小的、允许重复复用、先占位」）

- 抓取：3 张**动图 WebP**（保留原文件名、未转码未压缩），落在 `frontend/public/assets/cases/`，合计 **8.27 MB**。参考站 index2 原本共 8 张动图、原图合计 93.75 MB，按用户决定只取最小的 3 张。

| 文件 | 尺寸 | 帧 | 时长 | 字节数 | SHA256（前 12 位） |
| --- | --- | --- | --- | --- | --- |
| `83db3640125b7463feef8d0221cc5f27.webp` | 640×360 | 152 | 7.6s | 1,119,156 | `540b67f5afc4` |
| `019048b100726a98fcc517959dad7e33.webp` | 960×540 | 194 | 9.7s | 1,667,200 | `d89d604d71c4` |
| `c61e07c88f465c23dfbdb6ccf8411064.webp` | 630×630 | 80 | 4.0s | 5,888,814 | `f53f0953ac8c` |

- 登记：已追加进 `docs/frontend-rebuild/evidence/reference-assets/assets-manifest.json` 的 `items`（+3 条，含源 URL / 本地路径 / 字节数 / SHA256 / 尺寸帧数 / 对应选择器 / 来源归属 / 抓取时间 / 备注）。三个文件都实测过 VP8X `ANIMATION` 位 + `ANMF` 帧数与总时长。代码与配置里没有出现参考站域名。
- 复用：`content/home.js` 新增 `HOME_CASE_PLACEHOLDERS`；index2 的 8 个图文条目按槽位循环复用（0,1,2,0,1,2,0,1），index5 四张卡统一用最小那张（用户：「四个都一样」）。
- 实现：index2 的 `.item` 改成「一图一文」（图在上、文在下，图各自保持原始比例，照参考站 `.item > .img + .text`）；index5 每张卡顶部加图；两处容器加 `public_hover` 类，作为 SPEC M-29 蓝盘的钩子（等光标层落地即生效）。
- 实测（1440×900，dev `http://localhost:3000/`）：index2 进入视口即 **8/8** 张加载完成（`i.complete && i.naturalWidth > 0`）；index5 **4/4** 张加载完成；`pageerror` / console error / 请求失败 **0 条**；`npm.cmd run build` ✓ 16.02s。静帧：`probe-index4/imgs-index2.png`、`probe-index4/imgs-index5-fixed.png`（仓库外采集目录）。
- 仍未做：自定义光标 M-27/28/29 + 磁吸 M-30/31（`public_hover` 已就位，落地后蓝盘立即生效）、Header M-04/05。

### 9.8 已做：全局自定义光标层 + 磁吸（用户第 2 条；B 临时接管）

- 新增 `frontend/src/components/CustomCursor.vue`：M-27 跟随 / M-28 点击波纹 / M-29 `.cut` 蓝盘；样式用该组件自己的非 scoped `<style>` 随组件加载 —— **没有**单独建 `styles/cursor.css`，也**没有**改 `main.js`，比 §9.4 预告的少碰两个文件。
- 新增 `frontend/src/composables/useMagnetic.js`：M-30 磁吸，公式、时长、缓动照抄参考站（strength 50、1s、`Power4.easeOut`）。在光标层里统一绑定 `.hover_button`，路由切换后自动重绑；首页 index5 的 CTA 主按钮已挂 `hover_button` 类。
- `frontend/src/layout/index.vue`：`<Footer />` 之后挂 `<CustomCursor />`（A 的文件，请复核）。

实测（1440×900，dev `http://localhost:3000/`，探针 `bx-cursorcheck.js`）：

| 项 | 实测结果 |
| --- | --- |
| M-27 层样式 | `position: fixed` / `mix-blend-mode: exclusion` / `z-index: 99999` / `pointer-events: none` |
| M-27 收敛 | 鼠标到 (1100,700) → 1.3s 后 `matrix(1, 0, 0, 1, 1090, 690)`，即 `translate(-50%,-50%) translate(1100px,700px)`，与 SPEC 实测值逐位一致 |
| M-29 悬停 `.index2 .item .img` | `cut` 类 = true、blend 切 `normal`、蓝盘 `opacity 1`、尺寸 **114×114**、底色 **rgb(24, 77, 196) = #184DC4**、文案「探索更多 ↗」 |
| M-29 移开 | `cut` 类 = false |
| M-28 `mousedown` | `.whole` 加 `.on`、`.bor` 生成；+400ms 后 `.bor` 已被 `remove()` |
| M-30 磁吸 | `.hover_button`（133×51）指针推到 95% 位置时，1.2s 后偏到 `translate(22.37px, 21.47px)`（理论值 (0.95−0.5)×50 = 22.5） |（gsap 版重测见 §9.10：22.37 / 21.96）
| ≤1024px | `.fixed_cursor` computed `display: none` |
| 运行时报错 | `pageerror` / console error 0 条 |

- 静帧：`probe-cursor/cut-on-image.png`（蓝盘悬停在 index2 动图上）。
- ✅ **环境缺口已解决（§9.9）**：`package.json` 与 `package-lock.json` 都登记了 `gsap@3.15.0` 与 `lenis@1.3.26`，但 `frontend/node_modules` 早于 pin 依赖的 `f918efa` 提交，导致本轮最初 `vite build` 报 `Rollup failed to resolve import "gsap"`。经用户授权后 B 已在 `frontend/` 执行 `npm ci`（276 包 / 42s / EXIT 0）物化依赖，`package.json`、`package-lock.json` 零改动；M-27/M-30 已按 SPEC 字面改回 gsap 实现。
- 仍未做：Header M-04/M-05（顶部透明 + 滚向收放）、M-03 入场、M-31 footer 圆形按钮 hover 发光、M-32 `.fixed_side`（项目现有 `.studio-float` 属 A，且没有 `scrollTop >= 300 加 .on` 的逻辑）。


### 9.9 已做：依赖物化 + M-27/M-30 改回 SPEC 字面 gsap 实现（用户本轮授权）

授权原话：「授权物化 + 停 dev → `npm ci` → 重启 → 把 M-27/M-30 改回 SPEC 字面实现」。

**① 依赖物化（B 执行，未动契约层）**

```
$ npm.cmd ci                    # 在 frontend/ 下；先停 dev(3000, PID 20808) 与 preview(3001, PID 35260)
added 276 packages in 42s
=== EXIT: 0 ===

$ node -e "console.log(require('./node_modules/gsap/package.json').version, require('./node_modules/lenis/package.json').version)"
gsap 3.15.0
lenis 1.3.26

$ git status --short            # 空输出 → package.json / package-lock.json 零改动
```

- 根因：`frontend/node_modules` mtime = 2026-09-14 04:09，而 pin 依赖的提交 `f918efa`（chore(deps): pin gsap 3.15.0 and lenis 1.3.26）在 05:26 → 该工作树的 node_modules 早于 pin 提交。
- 契约层本来就是完整的：`package.json` 里 `gsap 3.15.0` / `lenis 1.3.26`；lockfileVersion 3，两条 `resolved` 指向 `registry.npmmirror.com` + `sha512`。`npm ci` 只物化、不写 package/lock。
- **建议由 A 定稿进 SESSIONS.md 的边界**：物化（`npm ci`，按 lock 复现）归各工作树自己执行；契约（`package.json` / `package-lock.json` 的增删与版本变更）仍归 A 单写。依据 `SESSIONS.md:69`「每个工作树使用本身 node_modules 与环境配置；安装使用锁文件」与 `INTEGRATION.md:50`「frontend/node_modules 只在主仓存在」。
- 只允许 `npm ci`：裸 `npm install` 或带包名的 `npm install <pkg>` 会改写 lock，属 A 的契约层。

**② M-27 改回 gsap 字面实现**（`frontend/src/components/CustomCursor.vue`）

| SPEC（`SPEC.md:578-582`） | 现在的实现 |
| --- | --- |
| `gsap.set(e, { xPercent:-50, yPercent:-50 })` | `gsap.set(el, { xPercent: -50, yPercent: -50 })` |
| `gsap.quickSetter(t,"x","px")` / `("y","px")` | `gsap.quickSetter(el, 'x', 'px')` / `('y', 'px')` |
| `gsap.ticker.add()` 每帧 `e = 1 - Math.pow(speed, gsap.ticker.deltaRatio())`；`r.x += (o.x - r.x) * e` | 逐字照抄 |
| `speed = data-speed/10`，首页 `8` → 0.8（缺失 0.9） | `FOLLOW_SPEED = 0.8` |
| 写 `transform` 的对象 `t = e = $('.cursor')` | 由「整层 `.fixed_cursor`」改为 `.cursor`，与参考站一致 |

- 副产物：删掉自建的单帧上限 `MAX_FRAME_MS`；切标签页回来的跳变交给 gsap 自带 lagSmoothing。
- 实测（`bx-cursorcheck2.js`，1440×900）：`.cursor` 的 inline 是 gsap 签名输出
  `translate: none; rotate: none; scale: none; transform: translate(-50%, -50%) translate(720px, 450px);`
  → computed `matrix(1, 0, 0, 1, 710, 440)`（视口中心 720,450 减去 20px 半宽 10px），与参考站 `cur-00-rest` **逐位一致**。
- 鼠标到 (1100,700) → **`matrix(1, 0, 0, 1, 1090, 690)`**，与参考站 `cur-04-moveB-settled` **逐位一致**。

**③ M-30 改回 gsap 字面实现**（`frontend/src/composables/useMagnetic.js`）

- 参考站 `TweenMax.to(el, 1, { x, y, ease: Power4.easeOut })` → `gsap.to(el, { duration: 1, x, y, ease: 'power4.out' })`；`mouseout` 回 `0, 0` 同一缓动。
- 删除手写的 `easePower4Out()` 与 rAF 补间。

**④ M-28 保持原样**：参考站该段（`sources/function.js:4787-4816`）本身就是 jQuery DOM + `setTimeout`，不含 gsap。

### 9.10 已做：修掉全局 `transition: all .3s` 与 gsap 抢 `transform`（本轮最大发现）

**根因**：`frontend/src/style.css:917-921`

```css
a, button, .el-button, [role="button"], .clickable {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}
```

首页的磁吸实例是 `<a class="pill hover_button">`（`views/Home/index.vue:208`），正好命中。gsap 每帧写 `transform`，CSS 过渡也在每帧对**同一个属性**重新计时，位移被拖成「先停滞、后追赶」。

实测（同一元素、同一次 95% 偏移，`bx-mag3.js`）：

| 时刻 | gsap 写的 inline | 屏幕上看到的 computed |
| --- | --- | --- |
| +56ms | `translate3d(9.1601px, 8.8333px, 0px)` | `matrix(1, 0, 0, 1, 0, 0)` |
| +305ms | `translate3d(19.753px, 19.0482px, 0px)` | `matrix(1, 0, 0, 1, 1.14026, 1.09957)` |
| +906ms | `translate3d(22.3684px, 21.5703px, 0px)` | `matrix(1, 0, 0, 1, 3.25191, 3.13588)` |
| +1003ms（tween 已结束） | `translate(22.3684px, 21.5703px)` | `matrix(1, 0, 0, 1, 8.965, 8.64513)` |
| +1300ms | 同上 | `matrix(1, 0, 0, 1, 22.3684, 21.5703)` |

即：动画写完 0.3s 之后，屏幕上的位移才走完。

**修法**（只动 B 自己的文件，不碰 A 的全局样式）：`useMagnetic` 在绑定期间把元素 inline `transition-property` 置为 `none`，解绑时还原元素原本的 inline 值。参考站那个 `.circle.hover_button` 是 `<div>` 且自身没有 `transition`，所以参考站不受此影响——本项目的差异来自全局规则，不是实现选型。

**修后实测**（`bx-mag2.js`；理论位移 22.662px，理论曲线 `1-(1-t)^5`）：

| 时刻 | 实测 | 理论 |
| --- | --- | --- |
| +53ms | 5.422 | 5.402 |
| +108ms | 9.807 | 9.865 |
| +156ms | 12.902 | 12.957 |
| +254ms | 17.235 | 17.426 |
| +405ms | 20.714 | 20.972 |
| +502ms | 21.69 | 21.968 |
| +702ms | 22.318 | 22.609 |
| +902ms 起 | 22.368（收敛） | 22.662 |

→ 逐点吻合 `power4.out`。

**给 A 的两条（B 未动全局样式）**

1. `style.css:917-921` 把 `transform` 也纳入了 `transition`。任何后续由 JS/gsap 驱动的 `transform`，只要元素是 `<a>` / `<button>` / `.el-button` / `[role="button"]` / `.clickable`，都会中同样的招。建议 A 评估把 `transform` 从这条规则里摘掉（改成只过渡 `color / background-color / border-color / box-shadow / opacity`），或统一给需要 JS 驱动的元素加排除。B 本轮只在磁吸元素上做了局部排除。
2. 同一文件 `style.css:947-957` 的 `button:hover:not(:disabled) { … transform: translateY(-2px) !important }`。**`!important` 会压过 gsap 写的 inline transform**，所以 `.hover_button` 目前只能挂在 `<a>` 上；若以后要挂到 `<button>`，这条 `!important` 必须先处理。

### 9.11 本轮对照静帧（与参考站同名状态一一配对）

目录：`docs/frontend-rebuild/handoffs/B/compare/`（均为 1440×900 viewport JPEG q80）

| 参考站静帧 | 我的对照帧 | 参考站实测 | 我的实测 |
| --- | --- | --- | --- |
| `frames/cursor/cur-00-rest.png` | `M-27-cursor-MINE-cur-00-rest.jpg` | `matrix(1,0,0,1,710,440)` | **`matrix(1,0,0,1,710,440)`** |
| `frames/cursor/cur-01-moveA-250ms.png` | `M-27-cursor-MINE-cur-01-moveA-250ms.jpg` | `304.007, 295.002` | `293.48, 291.243` |
| `frames/cursor/cur-02-moveA-settled.png` | `M-27-cursor-MINE-cur-02-moveA-settled.jpg` | `290, 290` | **`290, 290`** |
| `frames/cursor/cur-03-moveB-250ms.png` | `M-27-cursor-MINE-cur-03-moveB-250ms.jpg` | `1065.71, 677.854` | `1084.43, 687.215` |
| `frames/cursor/cur-04-moveB-settled.png` | `M-27-cursor-MINE-cur-04-moveB-settled.jpg` | `1090, 690` | **`1090, 690`** |
| `frames/cursor/cur-05-mousedown.png` | `M-28-cursor-MINE-cur-05-mousedown.jpg` | `.whole.on` + `.bor` 已生成 | 同（`bor=true`, `on=true`） |
| `frames/cursor/cur-06-mouseup-ripple.png` | `M-28-cursor-MINE-cur-06-mouseup-ripple.jpg` | 波纹可见 | 同 |
| `frames/cursor/cur-07-ripple-hide.png` | `M-28-cursor-MINE-cur-07-ripple-hide.jpg` | `.bor.hide` | 同 |
| `frames/cursor/cur-08-ripple-removed.png` | `M-28-cursor-MINE-cur-08-ripple-removed.jpg` | `.bor` 已 `remove()` | 同（`bor=false`） |
| （SPEC M-29，参考站 index2 作品图） | `M-29-cut-MINE-index2-blue.jpg` | 蓝底 134×134、`cir` 环 114、`#184DC4` | 蓝盘 114×114、`#184DC4`、blend `normal`（尺寸差异待用户裁决，见 §9.4 / §9.13） |
| （SPEC M-29，本项目 index5 卡片动图；参考站该处无 hover 盘） | `M-29-cut-MINE-index5-blue.jpg` | — | 蓝盘正常展开 |
| `frames/magnetic/magnetic-rest.png` | `M-30-magnetic-MINE-rest.jpg` | `transform: none` | 同 |
| `frames/magnetic/magnetic-br-150ms.png` | `M-30-magnetic-MINE-br-150ms.jpg` | `11.41px` | `18.9879px` |
| `frames/magnetic/magnetic-br-500ms.png` | `M-30-magnetic-MINE-br-500ms.jpg` | `19.29px` | `24.9307px` |
| `frames/magnetic/magnetic-br-1200ms.png` | `M-30-magnetic-MINE-br-1200ms.jpg` | `19.96px` | `25px`（= 理论极值 (1−0.5)×50） |
| `frames/magnetic/magnetic-tl-1200ms.png` | `M-30-magnetic-MINE-tl-1200ms.jpg` | `-20.1351px, -20.1648px` | `-34.3985px, -49.4841px` |
| `frames/magnetic/magnetic-out-200ms.png` | `M-30-magnetic-MINE-out-200ms.jpg` | `-6.354px` | `-6.1627px` |
| `frames/magnetic/magnetic-out-1500ms.png` | `M-30-magnetic-MINE-out-1500ms.jpg` | `translate(0px, 0px)` | **`translate(0px, 0px)`** |

两处数值差异的说明（都不是实现差异）：

- **`br-150/500/1200ms` 我的值大于参考站**：参考站 1.2s 只到 `19.96px`，是理论极值 25 的 79.9%，相当于 `power4.out` 在 t≈0.73s 的取值——即它那份采样时 tween 尚未走完（幂等口径相同，曲线形状一致）。我的 1.2s 已达 25.0，是 `power4.out` 在 t=1 的正确值。上一轮 rAF 版在 0.95 偏移下实测 22.37 / 理论 22.5，同样量级。
- **`tl-1200ms` 两边都超过 −25**：探针在派发 `mousemove` 前取的 `rect` 是位移**之前**的，而 `moveMagnet()` 内部读的是**当前** `rect`；按钮已被 `br` 推开 25px，于是算出的相对偏移小于 −0.5。参考站 `-20.1351` 与我 `−34.3985` 是同一个测量口径造成的，不是公式差异。

### 9.12 本轮验证（真实输出）

```
$ npm.cmd run build          # frontend/
...
(!) Some chunks are larger than 500 kBs after minification. …
✓ built in 30.30s
=== EXIT: 0 ===

$ npm.cmd run check:routes   # frontend/
结果：PASS 34 / FAIL 0 / PENDING 2
=== EXIT: 0 ===

$ npx.cmd eslint src/components/CustomCursor.vue src/composables/useMagnetic.js --ext .vue,.js
✖ 4 problems (0 errors, 4 warnings)      # 全是 vue/max-attributes-per-line，与基线同类
=== EXIT: 0 ===

$ rg -l "lagSmoothing|quickSetter" frontend/dist/assets
frontend/dist/assets/index-299f074c.js     # 80.88 kB，gsap 确实进了产物
```

- 浏览器探针 `bx-cursorcheck2.js`：`pageerror` / console error **0 条**。
- 服务：dev `http://localhost:3000/`（PID 37392）、preview `http://localhost:3001/`（PID 13460，dist = 本提交）。

### 9.13 未完成项与下次第一步（本轮更新）

- **下次第一步：请用户验收本批两件**（入口 `/` 与 `/en`）：
  1. 需求 1 —— Header 透明顶 + M-04 `.on` / M-05 wheel 收放（§9.15.1）；
  2. 需求「footer 黑底突兀」—— 首页 footer 米色排版（§9.15.2）。
  两者在同一批提交里；看 `compare/HDR-MINE-*.jpg`、`compare/FTR-MINE-*.jpg`、`shots/09-*.png`。
- 仍未做：M-03 页头入场、M-31 footer 圆形按钮 hover 发光、M-32 `.fixed_side`。
- 用户本轮已裁决（B 未改）：M-29 的三处保真度差异**全部接受** —— 114px 蓝盘、白色「探索更多」文案、CSS `dashed` 环。
- **待 A**：见 §9.14（三项申请 + 两项登记）。素材/结构缺口：见 §9.17。

### 9.14 给 A 的变更申请（三项 + 两项登记；用户已认可该方案）

> 渠道：IM 先发「占用声明 + 三项申请」，A 回一句「收到」即可；正式版即本节。

**申请 1（必须）：把 `transform` 从全局 `transition: all` 里摘掉**

- 位置：`frontend/src/style.css:938-946`

```css
a,
button,
.el-button,
[role="button"],
.clickable {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}
```

- 理由与逐帧实测见 §9.10：gsap 每帧写 `transform`，CSS 过渡对同一属性每帧重新计时 → 位移被拖成「先停滞、后追赶」（实测：动画写完 0.3s 之后屏幕上的位移才走完）。
- 改法：这行展开成显式属性、**不含 `transform`**（`color / background-color / border-color / box-shadow / opacity / filter`）；确实需要过渡 `transform` 的元素各自补 `transition: transform .3s …`。
- **影响面**（机械扫描口径：`:hover` 里写 `transform:`、该规则自身没有 `transition:`、选择器命中 `a / button / .el-button / [role=button] / .clickable`，共 **8** 处）：

| # | 文件:行 | 选择器 |
| --- | --- | --- |
| 1 | `style.css:280` | `.el-button--primary:hover, button:hover:not(:disabled), .el-button:hover:not(.is-disabled)` |
| 2 | `style.css:957` | `button:hover:not(:disabled), .el-button:hover:not(.is-disabled), .el-button--primary:hover` |
| 3 | `style.css:977` | `.el-button--primary:hover, button.primary:hover` |
| 4 | `style.css:1023` | `button:disabled:hover, .el-button.is-disabled:hover` |
| 5 | `style.css:2078` | `:is(.ai-development,.app-development,.web-development) .cta-section .el-button:hover` |
| 6 | `layout/index.vue:90` | `.studio-float button:hover` |
| 7 | `views/AiDevelopment/index.vue:968` | `.cta-section :deep(.el-button:hover)` |
| 8 | `views/ServiceLanding.vue:59` | `.service-cta button:hover` |

  第 1–5 条（`.el-button`）可能还有 Element Plus 自带的 transition 兜着，请 A 逐条确认；B 没动它们，只做了扫描。
- B 已做的局部兜底：`useMagnetic` 在绑定期间把元素 inline `transition-property` 置 `none`，解绑时还原（§9.10）。

**申请 2（建议）：抽一个 JS transform guard**

- 约定：凡「逐帧写 `transform`」的元素（gsap / rAF / 惯性）统一过同一个 guard —— 例如 `useJsTransformGuard(el, on)`：进入时把 inline `transition-property` 置 `none`，退出时还原。
- 收益：后续 C/D 加动效不必各自再踩一遍 §9.10；B 现在这段实现可以直接从 `useMagnetic` 里搬出来复用。
- 归属：`frontend/src/composables/` 是 A 的目录，请 A 落地；B 到时不改其它页。

**申请 3（建议）：加一条只读门禁**

- 照 `frontend/scripts/check-routes.mjs` 的先例加脚本（例：`npm.cmd run check:motion`），只读扫描：
  1. 新增 `transition: all`；
  2. `:hover` 改 `transform`、选择器主体命中 `a / button / .el-button / [role=button] / .clickable`、且该规则自身没有 `transition` 的地方（即上表 8 处的规则）。
- 现状没有这条门禁，同类问题只能人肉发现（§9.10 是靠逐帧比对才挖出来的）。

**登记 1：动效元素不要挂 `<button>`**

- `style.css:282-286`：`button:hover:not(:disabled){ transform: translateY(-2px) !important }` 会压掉 JS 写的 inline `transform`。当前 `.hover_button` 挂在 `<a class="pill hover_button">` 上所以没事（`views/Home/index.vue`）；要挂 `<button>` 必须先处理这条 `!important`。
- （更正：§9.10 里写的 `style.css:947-957` 是旧行号，规则实际在 `282-286`。）

**登记 2：footer 的样式是三段叠加的**

- 内页 footer 的**有效**声明分布在 `style.css` 的 `1703-1736`（原浅色板）与 `2130-2131`（深色覆盖），`615` 段那一组早已被压死。
- B 本轮已把两处消费点改成 `var(--footer-*)`（默认值 = 改前生效值），删掉 `615` 段的 5 条死规则，调色板收敛成一张表（`style.css:621-650`）。
- 但「同一组件两套叠加 `!important`」的结构还在（正是 AGENTS「不得继续叠加全局 `!important` 掩盖结构错误」说的成因）。建议 A 后续合并成一处；B 本轮不动，一动就要重测所有内页。

### 9.15 本批已做（Header M-04/M-05 + 首页 Footer 米色）

- 本批代码提交：`f726c50` `feat(header,footer): 首页页头 M-04/M-05 + 首页 footer 米色排版，并修掉 /en 首页不生效`（3 files, 173+/82−）；本文件与截图随下一条 `docs` 提交。

#### 9.15.1 Header：透明顶 + M-04 `.on` + M-05 wheel 收放

文件：`frontend/src/layout/components/Header.vue`（A 的；用户授权 B 临时接管，见 §9.4）。

- 模板：`ref="headerRef"`、`:class="{ 'header-fixed': !isHome && isFixed, 'header-home': isHome, on: isOn, hide: isHidden }"`。
- `isOn` 阈值照 SPEC：`window.scrollY > document.documentElement.clientHeight - headerHeight()/2`；`isHidden` 由 `wheel` 驱动（`deltaY>0` 收起、`<0` 恢复），监听 passive。
- 样式：`.header.header-home` 双类前缀（为压过 `style.css` 里那几条 `.header { … !important }`）—— 基线 `background: transparent !important`、`transition: all .6s ease !important`；`.on` → `#F2F1E4` + logo `invert(1)` + 文字转黑；`.hide` → `transform: translateY(-100%) !important`。参考站：`sources/style.css:213-228 / 586-607 / 624-626`。
- **本轮修掉一个缺陷**：`isHome` 原来只判 `route.path === '/'`，而英文站首页是独立路由 `/en`（router: `Home` / `HomeEn`）→ `/en` 拿不到 `.header-home`，M-04/M-05 在英文站根本没生效。改为 `'/' || '/en'`（口径同 `Home/index.vue:250` 的 locale 判断）。

实测（`bx-hdr.js`、`bx-enhdr.js`；preview `3001` = 本批 dist）：

| 场景 | 结果 |
| --- | --- |
| `/` y=0 | `header header-home`、`position: fixed`、`bg: rgba(0,0,0,0)`、`transition: 0.6s ease`、nav 白、headerH 76、阈值 862.5 |
| `/` y=900（过阈） | `header header-home on`、`bg: rgb(242,241,228)` = **#F2F1E4**、nav `rgb(0,0,0)` |
| `/` y=400（回退） | `.on` 移除、bg 回透明 |
| `/` wheel 向下 | `header header-home on hide`、`transform: matrix(1,0,0,1,0,-76)` |
| `/` wheel 向上 | `.hide` 移除、`transform: none` |
| `/en` y=0 / y=900 / wheel↓ / wheel↑ | 与 `/` 逐项一致（修缺陷后） |
| `/ai-development`、`/en/about` | `header`、`header header-fixed on`、`rgba(17,17,17,0.98)`（内页零变化） |
| `pageerror` / console error | 0 条 |

#### 9.15.2 Footer：首页米色排版

文件：`frontend/src/layout/components/Footer.vue`、`frontend/src/style.css`。

- 用户方案 A：**内页保持深色现状，只有首页切参考站的米色排版**（用户裁决「1.可以 2.标语 3.授权」；锚点用标语）。
- `Footer.vue`：根元素挂 `:class="{ 'footer-home': isHome }"`（`isHome` 同 Header，含 `/en`）；`.footer-home` 的硬编码色改 `var(--footer-icon / --footer-link-hover / --footer-line, 原值)`；新增首页排版块（≥981px）与 logo `multiply`。
- `style.css`：调色板收敛成一张表（`621-650`，默认值 = 内页**生效**值，逐字一致）；`1703-1736` / `2130-2131` 两处消费点改 `var()`。
- 参考站依据：`sources/style.css:905-915`（`background:#F2F1E4`、`.wrap { margin:146px auto 111px; max-width:90% }`）、`931-938`（正文 18/32、tel 19/45）、`977-988`（链接 14/28）。
- 正文/链接**沿用本项目组件原生的深蓝灰**（`#1e2f48 / #40546a / #4a5d72` 本来就是给浅底设计的，在米底上对比度 6.8:1），不照抄参考站的 `#7B7B7B`（在 `#F2F1E4` 上只有 3.7:1）。这是**有意差异**，理由 = 可读性。
- **主题感知**：米色只在浅色模式生效（选择器 `html:not([data-theme='dark'])`）。暗色模式下首页其它区块是深底，接米色 footer 会造出新的硬接缝，所以暗色回落全站深色收尾（前后对比：`compare/FTR-MINE-home-1440-dark-ctx.jpg`）。
- logo：`logo-new.png` 是无 alpha 的**白底方图**（1254×1254，且内嵌了公司名与微信号），在内页深底上一直显示为一个白方块；首页米底上用 `mix-blend-mode: multiply` 让白底融进底色（只作用于首页浅色）。
- 桌面排版块：`gap 56 / brand max-width 330 / logo 56 / 标题 30px / 副标 9px(.3em) / 正文 15px(1.9) / 栏目标题 13px(.14em) / 链接 15px(1.6) / bottom margin-top 74 / entries 13px / legal 12px`。

实测（`bx-ftr5.js`；preview `3001`）：

| 场景 | footer class | bg | padding-top | h3 | 栏目链接 | legal |
| --- | --- | --- | --- | --- | --- | --- |
| `/` 1440 亮 | `footer corporate-footer footer-home` | **rgb(242,241,228)** | **146px** | rgb(30,47,72) `#1e2f48` | rgb(64,84,106) `#40546a` | rgb(90,109,130) `#5a6d82` |
| `/` 1440 暗 | 同上 | rgb(17,17,17) | 68px | rgb(255,255,255) | 同 | 同 |
| `/` 390 亮 | 同上 | rgb(242,241,228) | 34px（移动断点未被污染） | `#1e2f48` | 同 | 同 |
| `/` 390 暗 | 同上 | rgb(17,17,17) | 34px | 白 | 同 | 同 |
| `/ai-development` 1440 亮 | `footer corporate-footer` | rgb(17,17,17) | 68px | rgb(255,255,255) | `#40546a` | `#5a6d82` |

- **内页零变化**：`/ai-development` 与 `/cases` 的 9 项测量（bg / padding-top / h3 字号+行高+颜色 / 栏目链接 / brand 段落 / entries / legal / bottom border 色 / 整块高度）在改动前后**逐位相同**。
- **踩坑（值得 A 知道）**：B 第一版把 `style.css:615-625` 的 footer 硬编码色换成变量，看起来「默认值逐字未变」，实测却**毫无效果** —— 内页真正生效的是后面 `1703` / `2130` 两块（`body` 前缀 + 更晚 + `!important`），只改前面的等于改死代码。**教训：改这种叠加 `!important` 的全局样式，必须先实测「哪条规则在赢」，不能只看 diff。**

### 9.16 本批验证（真实输出）

```text
$ npm.cmd run build            # frontend/
dist/assets/index-f9412415.js            1,139.35 kB │ gzip: 364.39 kB
(!) Some chunks are larger than 500 kBs after minification. …
✓ built in 13.87s
=== EXIT: 0 ===

$ npm.cmd run check:routes     # frontend/
结果：PASS 34 / FAIL 0 / PENDING 2      （tail：contact 未实现 = B/T05，存量）
=== EXIT: 0 ===

$ npx.cmd eslint src/layout/components/Footer.vue src/layout/components/Header.vue --ext .vue
✖ 80 problems (0 errors, 80 warnings)
=== EXIT: 0 ===
```

- eslint 与基线对齐：`Footer.vue` 56 vs 基线 55、`Header.vue` 25 vs 基线 25 → 合计 80 vs 基线 80（**零增量**）。基线用 `git show HEAD:<file>` 拷到 `frontend/` 下临时文件实测后已删除；告警全部是 `vue/max-attributes-per-line` / `attributes-order` / `singleline-html-element-content-newline` / `html-self-closing` 这类格式族。
- 8 张组合截图（`shots/09-*.png`，preview 3001、本批 dist）：`bx-combo.js` 复跑，**每张 console error 0 条**，且 `[src]/[href]/[style]` 扫描 **external URLs: none**（无参考站热链）。

| 组合 | header | footer | bg | padding-top |
| --- | --- | --- | --- | --- |
| 1440 zh 亮 | `header header-home` | `…footer-home` | rgb(242,241,228) | 146px |
| 1440 zh 暗 | `header header-home` | `…footer-home` | rgb(17,17,17) | 68px |
| 1440 en 亮 | `header header-home` | `…footer-home` | rgb(242,241,228) | 146px |
| 1440 en 暗 | `header header-home` | `…footer-home` | rgb(17,17,17) | 68px |
| 390 zh 亮 | `header header-home` | `…footer-home` | rgb(242,241,228) | 34px |
| 390 zh 暗 | `header header-home` | `…footer-home` | rgb(17,17,17) | 34px |
| 390 en 亮 | `header header-home` | `…footer-home` | rgb(242,241,228) | 34px |
| 390 en 暗 | `header header-home` | `…footer-home` | rgb(17,17,17) | 34px |

### 9.17 缺口、未完成项与下次第一步

**A. 素材缺口（需要用户/A 决定，B 没有自行造素材）**

1. **footer logo**：`frontend/public/logo-new.png` 是 1254×1254 的**白底方图、无 alpha**，还内嵌了「北京耘栈科技有限公司」与「微信号 yunzhankk」两行字。放到 46/56px 的槽里，图形只占约 1/4、两行字糊成一团；内页深底上白方块尤其突兀。B 只做了 `mix-blend-mode: multiply` 兜住首页浅色底。**建议要一张透明底（或横向 lockup）的 footer 专用 logo**，落盘后 B 替换并登记 hash。
2. 首页占位动图：仍按用户「先占位」的裁决，来源与 SHA256 见 `evidence/reference-assets/`（§9.7）。

**B. 待裁决（B 未擅自改）**

1. **暗色模式下 Header `.on` 仍是米色**（`#F2F1E4`，与参考站 `.header.on` 一致）。首页暗色模式其它区块是深底，这个米色条会比较跳；要不要在 `html[data-theme='dark']` 下改成深色底 + 白字，请用户裁决（改法 1 行，但会偏离参考站字面值）。 **（2026-09-14 用户裁决「不需要」→ 关闭，保持参考站字面值；见 9.20 B2。）**

**C. 仍未做（已授权，下一批）**

1. M-03 页头入场；M-31 footer 圆形按钮 hover 发光（参考站 `sources/style.css:819-903`，截帧 `frames/magnetic/footer-hover-*.png`）；M-32 `.fixed_side`。
2. `lenis` 已物化但**未接入** —— 若要全局平滑滚动，需与 A 一起定 M-04/M-05 与 M-32 的口径后再动。

**D. 存量问题（不是本批引入）**

1. `/cases` 直连返回 500（`AxiosError`，后端未起），页面有失败态；本批探针里只在 `/cases` 命中过这条 console error。
2. `npm.cmd run lint` 带 `--fix`，不是只读检查（AGENTS 已记）。

**E. 下次第一步**

1. 等用户验收 §9.13 的两件（Header M-04/M-05、首页 footer 米色排版）；同时把 §9.14 的三项申请发给 A。
2. 验收通过后：接 §9.14 的门禁脚本（若 A 已落地），然后继续 M-03 / M-31 / M-32；用户已批准的其余页面（公司/联系/法律，含 T05 `contact`）排在其后。

### 9.18 本批已做（用户第 3 轮验收反馈的 4 条）

- 代码提交：`0fc035e` `fix(home): index4 文案改逐帧插值、图片本体改为可点击链接、暗色 CTA 取色下调`（2 files, 44+/25−）。本文件、截图与 measure JSON 随下一条 `docs` 提交。
- 本批起点 `8fe51df`；仍未 merge main（`main` = `6312c90`，且已是本分支祖先）。

#### 9.18.1 第 2 条 · index4（`section#statement`）文案「一卡一卡」——真 bug，本轮主修

**根因**（探针钉死，非推测）：`frontend/src/views/Home/useHomeScroll.js` 的 `onScroll()` 把 `data-view` 插值塞进了 100ms 去抖：

```js
if (state.delayed) clearTimeout(state.delayed)
state.delayed = setTimeout(() => { scrollDelayed(scrollTop) }, 100)   // 改前
```

于是整段 7000px 行程里插值只在**停手后**跑一次。

**参考站不是这样**：`sources/function.js:1480-1481` 在 smooth-scrollbar 每帧回调里同步调 `scroll_content()` + `scrollTop_start()`；`:4580-4585` 那个 `setTimeout(…, 100)` 只包 `AOS.init()`，**不包** `scrollTop_start`。

**改法**：删掉去抖（`state.delayed` 一并移除），把 index4 文案插值抽成 `applyIndex4Text()`（`useHomeScroll.js:230`），在 `scrollContent()` 里逐帧调（`:213-214`）。AOS 等价物 `revealCheck()` 本来就是逐帧，未动。

**实测（同一会话内「改前 / 改后」各跑一次，探针 `bx-i4text2.js`，preview `3001`）**

几何：`index4 top=4134 height=7900 clientH=900` → 行程 7000px；连续滚 `y 7034 → 8474`（1440px）。

| 滚动期间指标 | 改前 | 改后 |
| --- | --- | --- |
| 外层（`.text > div`）opacity 不同值 | **1** | **18** |
| 内层（`.text p`）opacity 不同值 | **1** | **6** |
| 内层 transform 不同值 | **1** | **6** |
| 期间实际取值 | 全程冻结 `1.000 / 0.747` | `0.747→0.807→0.867→0.927→0.987→…→0.000` |
| 停手瞬间 | 直接跳到 `0.000 / 1.000` | 已是 `0.000 / 1.000`，无跳变 |

改前可复现：`git checkout -- frontend/src/views/Home/useHomeScroll.js` 后跑同一条探针即得 1/1/1。

对照静帧（比例与参考站 `frames/index4/index4-0{00,30,50,70,100}.png` 一致，即同一滚动位置）：

- `compare/I4FIX-MINE-index4-0{00,30,50,70,100}.jpg`
- 逐比例数值见 `measure-round6-links-index4.json` → `index4.rows`：

| 比例 | y | 外层 opacity | p1 opacity / transform | p2 opacity / transform | mask delay | bg translateY |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 4134 | 1 | 0 / `scale(.9)` | 0 / `scale(.9)` | -2.3936s | -22.65px |
| 0.3 | 6234 | 1 | 0 / `scale(.9)` | 0 / `scale(.9)` | -4.7152s | -44.63px |
| 0.5 | 7634 | 0.653 | 1 / `scale(1)` | 0 / `scale(.9)` | -6.9552s | -65.83px |
| 0.7 | 9034 | 0 | 1 / `scale(1)` | 0.747 / `scale(.9747)` | -9.1952s | -87.03px |
| 1 | 11134 | 0 | 1 / `scale(1)` | 1 / `scale(1)` | -8s（钳位） | -106px |

与上一轮 `compare/M-19-M-23-index4-050.jpg` 的 MINE 侧逐像素目视一致 → 本批只把插值变连续，**没有改视觉**。

#### 9.18.2 第 4 条 · 图片上的「探索更多」蓝盘点击无反应

- 参考站 `sources/home.html`（`fist public_hover` 段）里 `.item` 内是 **`<a class="img" href=".../caseInfo_xxx.html">`** —— 图片本体就是链接。
- 我方原来是 `<div class="img">`，链接另挂在下方 `.item-link` 文本上；蓝盘出现在图片上，所以点图片当然没反应。
- 改法（`index.vue:131-138`、`:196-201`）：`.index2 .item .img` 与 `.index5 .card-img` 改 `router-link`。index2 里 4 张「事实」卡由 `asFact()` 生成、**没有 `path`**，保留 `<div v-else>`。
- `.img` / `.card-img` 加 `display: block`（原来是 div，改成 `<a>` 后是 inline，会丢盒模型）：`index.vue:739`、`:836`。
- **光标层不拦点击**：`CustomCursor.vue:218` 是 `pointer-events: none`，已实测确认。

实测（探针 `bx-fix4.js` / `bx-r6.js`，preview `3001`）：

| 场景 | 结果 |
| --- | --- |
| `.index2 .item .img` | `A` `href="/ai-development"` `display: block` |
| index2 8 个 item 的 `.img` 标签 | `["/ai-development","/miniprogram-development","/app-development","/web-development", null, null, null, null]`（后 4 个是事实卡，按设计无链接） |
| `.index5 .card-img` × 4 | `["/cases","/news","/ai-development","/web-development"]` |
| hover 图片 | `.fixed_cursor cut`、blend 切 `normal`、蓝盘 **114×114**、文案「探索更多 ↗」 |
| 点击蓝盘（index2） | URL → `http://localhost:3000/ai-development` |
| 点击蓝盘（index5） | URL → `http://localhost:3001/cases`（该页有存量 500，见 9.20 D1） |

- 静帧：`compare/LINK-MINE-index2-hover-disc.jpg`、`compare/LINK-MINE-index5-hover-disc.jpg`。
- **手机端不回归**（探针 `bx-mob5.js`，390×844 dpr2）：`.index2 .item .img` 与 `.index5 .card-img` 都是 `A`、`display: block`；Swiper `swiper-initialized` = true、4 slides、卡图 182×102；`.fixed_cursor` 该断点是 `display: none`（既不注册监听也不启动 ticker）；`pageerror` 0。静帧 `compare/LINK-MINE-index5-390.jpg`。

#### 9.18.3 第 3 条 · 暗色 `.cta` 卡片偏亮

- 新增 token `--home-cta-bg`：亮色 `var(--home-accent)`（`index.vue:528`）、暗色 `#2F55A8`（`:549`）；`.cta`（`:854`）与 `.cta .pill`（`:858`）改用它。
- **刻意不动 `--home-accent`**：它还被 `.blue.public_text`、`.index2 .item-link`、`.card-flag`、`.card-link`、`.swiper-pagination-bullet-active` 共用，改它会连带改这些地方。
- 相对亮度：#4D7CE8 ≈ 0.218 → #2F55A8 ≈ 0.100（白字对比度 3.9:1 → 7.0:1）。

| 组合 | `.cta` 底色 | `.pill` 底色 / 字色 | `.cta-title` |
| --- | --- | --- | --- |
| 亮色 | `rgb(24, 77, 196)` = `#184DC4`（未变） | `#FFFFFF` / `#184DC4` | `#FFFFFF` |
| 暗色 | `rgb(47, 85, 168)` = **`#2F55A8`** | `#FFFFFF` / `#2F55A8` | `#FFFFFF` |

截图：`compare/CTA-MINE-dark-1440.jpg`（卡片）、`compare/CTA-MINE-dark-1440-context.jpg`（暗色页面上下文，便于判断「是否够深」）、`compare/CTA-MINE-light-1440.jpg`。
`#2F55A8` 是 B 按「稍作调整」取的中间值，用户若仍嫌亮，改 `index.vue:549` 一行即可（例如 `#1B3573`）。

#### 9.18.4 第 1 条 ·「页面其他地方的交互也要渐变过渡 / 很丝滑」

这条分两半，B 只能做其中一半，另一半是全局层（见 9.20 申请 4）：

**B 已做（页内）**

1. index4 文案逐帧插值（9.18.1）—— 这是本页最明显的「不丝滑」。
2. `scrollContent()` 里**每帧**的 `querySelector` / `querySelectorAll` 全部去掉，改成 `measure()` 时缓存：
   - `.banner .parallax` → `anchors.bannerParallax`（`useHomeScroll.js:113`）
   - `.public_text` 的每一行 `<p>` → `rowAnchors.push({ el: row, … })`（`:92`）后逐帧直取 `row.el`（`:170`）

**逐帧实测（探针 `bx-r6b2.js`，preview `3001`，1440×900，全页扫描 45px/帧）**

| 效果 | 指标 | 实测 |
| --- | --- | --- |
| M-08 首屏视差 | `.parallax` 内联 transform 不同值 | **303**（帧帧不同） |
| M-12 index2 双列 | `.flex` 内联 transform 不同值 | **1033** |
| M-13 `.public_text` 擦除 | 每块 `clipPath` 不同值 | **11 / 11 / 7** |
| M-22/M-23 index4 内层 | `p` 的 `opacity+transform` 不同值 | **24 / 24**（改前 1） |
| M-22/M-23 index4 外层 | `div` 的 opacity 不同值 | **25 / 24**（改前 1） |
| M-24 通用入场 | 已显影节点推进 | `1→2→3→4→5→6→8→9→10→11→12→14→15→16→17→18→19→20→21` |
| 帧间隔 | 302 帧 | p50 **6.1ms** / p95 **8.5ms** / max 24.2ms / 长帧(>32ms) **0** |

（注：`display: none` 时 `getComputedStyle().transform` 恒为 `none`，第一版探针据此误报 M-08/M-13 只有 1 个值；上表已改用**内联样式**口径。探针误报而非页面问题，记录以免下次重复踩。）

**B 不做（全局）**：滚动**惯性**本身。SPEC M-01 是 smooth-scrollbar 的桌面全局惯性（`damping 0.08`，60Hz 等效 ≈1.83s），属 `src/styles/motion.js` + A 的 composables。A 的 `specs/FRONTEND.md` 第 10 行已定：滚动/显影基础能力归 A，页面只按语义名引用；`lenis@1.3.26` 已 pin 未接入。B 不在本页私接：那会与 A 的全局滚动容器抢 `scrollTop`，也会和 M-04/M-05 的 wheel 判定打架。

### 9.19 本批验证（真实输出）

```text
$ npm.cmd run build            # frontend/
dist/assets/index-f498e96f.js            1,139.35 kB │ gzip: 364.40 kB
(!) Some chunks are larger than 500 kBs after minification. …
✓ built in 13.93s
=== EXIT: 0 ===

$ npm.cmd run check:routes     # frontend/
结果：PASS 34 / FAIL 0 / PENDING 2
=== EXIT: 0 ===

$ npx.cmd eslint src/views/Home/index.vue src/views/Home/useHomeScroll.js --ext .vue,.js
✖ 127 problems (0 errors, 127 warnings)      # 基线（git show HEAD: 同名文件）122 → +5
=== EXIT: 0 ===
```

- **+5 告警全部来自模板里被迫重复的那一个 `<img>`**：`.img` 既要能是 `<a>`（有链接）又要能是 `<div>`（事实卡），`v-if/v-else` 各写一份媒体节点，于是多出 1×`vue/html-self-closing` + 4×`vue/max-attributes-per-line`。规则族与既有 122 条完全同类（`vue/max-attributes-per-line` / `vue/singleline-html-element-content-newline` / `vue/html-self-closing`），**0 errors**。想消掉它只能换成 `<component :is>` 这类可读性更差的写法，B 选择保留。
- 基线对照法照旧：`git show HEAD:<file>` 导出到 `frontend/` 下临时文件实测后删除（`_base_index.vue` / `_base_useHomeScroll.js` / `_base.json` / `_cur.json` 均已清理，`git status` 已核对）。

8 张组合截图（`shots/09-*.png`，preview `3001`，dist = `0fc035e`）：

| 组合 | header | footer | footer bg | pad-top | console error | seniorweb 外链 |
| --- | --- | --- | --- | --- | --- | --- |
| 1440 zh 亮 | `header header-home` | `…footer-home` | rgb(242,241,228) | 146px | 0 | 0 |
| 1440 zh 暗 | 同上 | 同上 | rgb(17,17,17) | 68px | 0 | 0 |
| 1440 en 亮 | 同上 | 同上 | rgb(242,241,228) | 146px | 0 | 0 |
| 1440 en 暗 | 同上 | 同上 | rgb(17,17,17) | 68px | 0 | 0 |
| 390 zh 亮 | 同上 | 同上 | rgb(242,241,228) | 34px | 0 | 0 |
| 390 zh 暗 | 同上 | 同上 | rgb(17,17,17) | 34px | 0 | 0 |
| 390 en 亮 | 同上 | 同上 | rgb(242,241,228) | 34px | 0 | 0 |
| 390 en 暗 | 同上 | 同上 | rgb(17,17,17) | 34px | 0 | 0 |

`EXTERNAL URLS: none`（8 张全扫 `[src]/[href]/[style]`）；`measure-combos-batch.json` 已刷新。
本批全部探针 `pageerror` / console error 均为 0（`link-index5` 的 500 来自 `/cases` 后端未起，见 9.20 D1）。

### 9.20 缺口、申请与下次第一步

**A. 给 A 的申请（新增 1 条，前 3 条见 9.14）**

4. **M-01 全局滚动惯性（lenis）** —— 这是用户第 1 条「体验很丝滑」的最后一格，也是 B 唯一做不了的部分。
   - 规格：SPEC M-01（`damping 0.08`、`clientWidth > 1024` 才启用、逐帧指数衰减、`|momentum| ≤ 0.1` 归零、行程 Σ = 初始 momentum）。参考站证据 `sources/function.js:1475`、`:5-8`、`:4290-4291`。
   - 落地位置：`src/styles/motion.js` + A 的 composables（A 的 `specs/FRONTEND.md` 第 10 行已定的归属）。
   - 需要一起定的口径：M-04/M-05 的 wheel 收放判定、M-32 `.fixed_side`、以及 `[data-view]`/`[data-aos]` 触发点是否改用 lenis 的 `scroll` 事件（参考站是挂在 smooth-scrollbar 的每帧回调上）。B 这边接口很窄：只要仍按「每帧拿到一个 scrollTop」的形态暴露，`useHomeScroll` 不用改。

**B. 已裁决（2026-09-14，用户原话「够了；不需要；那就等A吧」）**

1. 暗色 CTA 取色 `#2F55A8` —— **够了，不再调**（保持 9.18.3 现状，`index.vue:549`）。
2. 暗色模式下 Header `.on` 仍是米色 —— **不需要改**，保持与参考站 `.header.on` 字面值一致（`#F2F1E4`）；9.17 B1 关闭。
3. M-01 全局滚动惯性 —— **等 A**，B 不做临时接管；9.20 A4 保持待发状态。

**C. 素材/内容缺口（未变）**

1. `HOME_STATEMENT_BG`（index4 背景）仍是占位素材，与参考站观感差距大（参考站是一张深色人物群像照，我方是一张 CMMI 证书）。这直接决定 index4 的观感，建议优先补一张合适的深色横图。 → **已关闭（2026-09-14）：用户提供公司 logo 墙实拍替换，见 §9.21。**
2. footer logo（9.17 A1）、index2/index5 占位动图（9.17 A2）均未变。

**D. 存量问题（不是本批引入）**

1. `/cases` 直连 500（后端未起），页面有失败态。
2. `npm.cmd run lint` 带 `--fix`，不是只读检查。

**E. 下次第一步**

1. 把 9.14 的三项申请 + 9.20 A4 一并发给 A（本批已无待用户裁决项，可直接发）。
2. A 的 `lenis` 合入后：复跑 `bx-r6b2.js` 确认页内逐帧口径未被全局滚动改变；复跑 `bx-hdr.js` / `bx-combo.js` 确认 M-04/M-05 的 wheel 判定仍成立。
3. 继续 §9.17 C1：M-03 页头入场、M-31 footer 圆形按钮 hover 发光。M-32 `.fixed_side` 与滚动惯性耦合，建议等 A 的 `lenis` 落地后一并做。
4. 用户已批准的其余页面（公司/联系/法律，含 T05 `contact`）排在其后。


### 9.21 本批已做：index4 背景素材替换（用户提供的公司 logo 墙实拍）

用户本轮指令：「要不换成这张 `D:\桌面\微信图片_20260914014848.jpg`」。

（路径更正：用户写的是 `D:\桌面\微信图片\_20260914014848.jpg`，本机没有 `微信图片` 这个子目录，真实文件是 `D:\桌面\微信图片_20260914014848.jpg`。已按真实文件复制；`home.js` 注释里记的也是这个真实路径。）

#### 9.21.1 改动清单

| 文件 | 改动 |
| --- | --- |
| `frontend/public/assets/home/statement-bg.jpg` | 新增。467,986 bytes，SHA256 `EAE77DB8B6908CDE59158ACFF791D524D71E78F75804BCF8A78C724C2869A071`，2048×1536 JPEG |
| `frontend/src/content/home.js` | `HOME_STATEMENT_BG`：`/services-showcase.jpg` → `/assets/home/statement-bg.jpg`（+6 行注释） |
| `frontend/src/views/Home/index.vue` | `.index4 .bg` 加 `filter: brightness(0.55) saturate(0.9)`（+4 行注释）；`.index4 .text` `top: 57%` → `76%`（+3 行注释） |
| `docs/frontend-rebuild/evidence/project-assets/manifest.json` | 新增「本项目自有 / 用户提供素材」登记表 |

- **字节级一致已复核**：`(Get-FileHash 'D:\桌面\微信图片_20260914014848.jpg').Hash` 与仓库副本逐位相同，未转码、未裁剪、未重压缩。
- 登记表与 T00A 的 `reference-assets/assets-manifest.json` **分开**：那张表只登记从参考站抓的素材（含抓取时间、源 URL 等），本表登记不来自参考站的（来源、字节数、SHA256、尺寸、权利归属、运行时处理）。既有素材（hero 视频、旧 logo）挂在「未登记项」待归属方补。
- `/services-showcase.jpg` 替换后**已无任何引用**：`rg services-showcase` 只剩 CSS 类名 `.about .services-showcase`（`style.css:1122` / `:1129` / `:1152` / `:1183`，与图片无关）与文档描述。原文件保留未删（属既有仓库内容，是否清理交由归属方）。
- 本批**没有动** router / 全局样式 / 公共组件 / package（按 AGENTS 的分工），也没有改其它页面。

#### 9.21.2 为什么必须压暗：不是审美偏好，是无障碍硬门禁

新素材是**办公区 logo 墙实拍，画面接近纯白**，而 index4 的宣言是**白字**。这是本轮真正的技术约束 —— 不压暗就是白字白墙。

同区域像素统计（关掉 `.index4 .mask`、隐藏 `.text`，只留背景 + scrim；区域 `x130–1310 / y633–735`，即文案盒实测位置；sRGB 相对亮度法，WCAG 2.1）：

| 背景处理 | 最差（区域最亮像素） | p99 | 均值 | 判定 |
| --- | --- | --- | --- | --- |
| **本批实现** `brightness(.55) saturate(.9)` + scrim `.3` | **9.44 – 9.58 : 1** | 9.58 – 9.85 | 11.76 – 12.18 | 过 AAA（≥7:1） |
| 原图 + SPEC 字面的 G-08 scrim `.3` | 4.04 – 4.06 : 1 | 4.06 – 4.26 | 5.73 – 6.10 | **不过 AA（<4.5:1）** |
| 原图、不叠 scrim | 2.05 – 2.07 : 1 | 2.07 – 2.18 | 3.08 – 3.33 | 严重不过 |

30% / 50% / 70% 三个滚动比例各测一遍，数值稳定；原始数据 `measure-i4bg-contrast-maskoff.json`。

**结论**：如果照 SPEC 字面只叠 G-08 的 0.3 压暗层，这张素材上白字最亮处只有 **4.04:1，不达 AA**；连「不叠 scrim」的 2.05:1 在内，三种做法里只有压暗能过。所以压暗是「这张素材能不能用」的前提，不是可选美化。

渲染态（`.mask` 开着）同区域 5 个比例的实测见 `measure-i4bg-contrast.json`：最差 9.44:1（30% 处）、均值 11.97–16.52:1。

#### 9.21.3 取舍：为什么是「压暗」而不是「模糊」

试过 10 个变体。压暗 + 模糊（blur 7/12px）文字最干净，但 `.text` 的 3D 翻转是**父 `.text` 与内层 `<div>`/`<p>` 同时插值**，过渡中两组文案本来就重叠，背景再一模糊就成了没法辨认的糊团；不模糊时背景仍有结构、可读性反而更好。故取「压暗 55% + 不模糊 + 文案下移到干净墙面」。

未加文字阴影：本页其余白字（banner、index4 原副标题）都没有阴影，单独给这块加会不一致。

#### 9.21.4 与 SPEC 的有意偏离：M-22 `top: 57% → 76%`

SPEC M-22 实测文案位置是 `.fix` 内 `top: 57%`。新素材的**公司名字样**（「北京耘栈科技有限公司」/「BEIJING YUNZHAN TECHNOLOGY CO., LTD.」）正好落在画面上 33–49% 一带，57% 会把宣言直接压在中英文名上（首轮就是这么压的，截图里叠字很难看）。整块下移到 **76%** 的干净墙面。

- 定位**模型没变**：仍是 `.fix` 内绝对定位 + `translate(-50%,-50%)` + `z-index:5`；只改数值。
- 这是**素材驱动的偏离**，不是参考站实测值被改写 —— SPEC 里的 57% 仍是对参考站的正确记录，SPEC 不需要改。
- 实测：滚动全程 `.text` 盒恒为 `x130 y633 w1180 h102`（1440×900），即中心落在 684/900 = 76%。

#### 9.21.5 与 SPEC 的逐条对应表

| SPEC 条目 | SPEC 值 | 本批实现 / 实测 | 是否一致 |
| --- | --- | --- | --- |
| M-18 高度注入 | `clientHeight + 7000` = 7900 | 未改。实测 `.index4` top=4134 height=7900（clientH 900，行程 7000） | 一致 |
| M-19 mask scrub | `scale 1.05 → 300`，负 `animation-delay` 定位 | 未改。实测 30% 处 `scale 88.547`、`animation-play-state: paused` | 一致 |
| M-20 `.bg` 几何 | 高 1006.36px、`px = 106.36` | 未改。实测 `.bg` rect `1440×1006` | 一致 |
| M-20 `.bg` 位移 | 线性 `translateY` `0 → -106.36px`，区间 7000px | 未改。实测 30% 处内联 `translateY(-44.626px)` | 一致 |
| M-20 背景图**内容** | 参考站是深色黑白人物群像 | 用户提供的 logo 墙实拍（同 `background-size: cover` 几何） | **素材不同，用户授权替换** |
| G-08 `.fix::after` 压暗层 | 亮 `rgba(0,0,0,.3)` / 暗 `.5` | 未改。实测分别为 `rgba(0,0,0,0.3)` / `rgba(0,0,0,0.5)` | 一致 |
| M-22 `.text` 位置 | `top: 57%` | **`top: 76%`** | **有意偏离，理由见 9.21.4** |
| M-22 字号 / 居中 / 不换行 | `font-size:50px; text-align:center; white-space:nowrap` | `clamp(26px,3.4vw,50px)`（1440 下即 50px）+ `text-align:center`；未写 `nowrap`，但主文案实测单行（盒高 102 = 65 + 18 + 21），结果等效 | 等效（沿用既有实现，本批未动） |
| M-22 手机降级 | `.text{position:static}` + `.text>div{opacity:1!important}` + `.sj_jump{position:absolute;top:55px}` | `.text` 与 `.text>div` 两条对齐；`.sj_jump` 改为 `bottom:22px` + `z-index:5`（用户裁决 ②，见 9.21.7） | **有意偏离**（位置 + 层序） |

`filter: brightness(0.55) saturate(0.9)` 是 SPEC 里**没有**的一层，属本批新增的素材适配，单独登记在 9.21.2，不混进 SPEC 数值。

#### 9.21.6 对照静帧（与参考站同一滚动位置）

- 参考站：`docs/frontend-rebuild/evidence/reference-effects/frames/index4/index4-{000,030,050,070,100}.png`
- 我方：`docs/frontend-rebuild/handoffs/B/compare/I4BG-MINE-{000,030,050,070,100}.jpg`（1440×900，preview `3001`，与参考站同比例的 0/30/50/70/100）
- 暗色主题：`I4BG-MINE-1440-dark-{000,050,100}.jpg`
- 被否掉的两种背景处理：`I4BG-REJECT-raw-withscrim-1440-050.png`（原图 + 0.3 scrim，白字糊掉）、`I4BG-REJECT-raw-noscrim-1440-050.png`

| 比例 | 参考站 | 我方 | 说明 |
| --- | --- | --- | --- |
| 000 | 整屏近黑，只见 3 条细竖槽 | logo 墙，整屏被 mask 压住，中间一条竖槽透出云 logo | 擦除模型一致；素材明暗基调不同（参考站本身就是暗调群像，我方是亮墙靠压暗压下来） |
| 030 | 中间竖槽撑开到 **302px**，槽内是群像 | 中间竖槽撑开到 **765px**，槽内是 logo 墙 | 展开速度对不上，见下 |
| 050 | 全屏铺满，宣言压在中灰台阶上 | 全屏铺满，宣言压在干净墙面 | 文案位置 57% vs 76%（9.21.4） |
| 070 | 同 050，外层 opacity 已开始掉 | 同 050 | 一致 |
| 100 | 第一组已淡出 | 第一组已淡出 | 一致 |

**顺带记录一条既有保真差距（不是本批引入）**：30% 处参考站竖槽 302px（`index4-030.png` 实测，SPEC M-19 记的就是这个值），我方是 765px。两边都是「负 `animation-delay` 定位 scale 1.05→300」，但展开速度对不上 —— 我方 30% 时 `scale 88.547`。这条**不属于本轮范围**（mask 本批未动），登记在此供后续轮次核对，不自行改数值。

#### 9.21.7 390 端 index4 宣言文字被背景盖住（存量缺陷；本批按用户裁决修复）

证据：`compare/I4BG-MINE-390-light-050.jpg`、`compare/I4BG-MINE-390-dark-050.jpg`、`measure-i4bg-390-stack.json`。

**现象**：390×844 下 index4 只剩一条 440px 高的照片带，宣言文字**完全看不见**。

**根因**（实测 DOM，非推测）：

| 元素 | 手机端 computed | 来源 |
| --- | --- | --- |
| `.index4` | `height: 440px`（`height:auto`） | `index.vue:911` |
| `.index4 .bg` | `position: relative; z-index: 1` | `index.vue:914` 只覆盖了 position/height/transform，**`z-index:1` 从桌面规则 `:762` 残留** |
| `.index4 .sj_jump` | `position: absolute; top: 55px; z-index: auto` | `index.vue:915` |
| `.index4 .text`（在 `.sj_jump` 里） | `position: static; opacity: 1` | `index.vue:916`、`:918` |

定位元素按 `z-index` 分层绘制：`z-index:1` 的 `.bg` 把 `z-index:auto` 的 `.sj_jump` **整块盖住**。实测文案盒 `x0 y55 w390 h63`、`opacity:1`（CSS 明确写了 `1!important`，说明本意就要显示），但同点位 `elementFromPoint` 命中的是 `.bg` —— 文字被照片严严实实压住。

**这是存量缺陷，不是本批引入**：本批对 `index.vue` 的两处改动（`.bg` 的 `filter`、`.text` 的 `top`）都不在 `@media (max-width:1024px)` 块内（该块是 `:876–925`），且手机上 `top` 被 `position:static` 忽略。上一轮交付的 `shots/10-mobile390-index4.png`（改动前）同样看不到宣言文字。

**SPEC 依据**：SPEC M-22 手机降级（`:498`）明确要求文案静态可见（`.text>div{opacity:1!important}`），M-23（`:523`）也写明手机不跑 `data-view`、必须靠 CSS 兜底。参考站之所以不出这个问题，是因为它手机端用的是**另一个元素** `.sj_bg`（M-20 `:449`：`.sj_bg{display:block}`、`.bg{display:none}`），而 `.sj_bg` 没有 `z-index`，DOM 顺序自然让 `.sj_jump` 在上。我方手机端复用了同一个 `.bg`（`:873-875` 有登记），于是把桌面的 `z-index:1` 一起带了过来。

**本批已修（用户裁决 ②，2026-09-14）**：用户在 ① 最小修法 / ② 下移版 / ③ 不显示 里选了 **②**。改动只有 `≤1024px` 块里的一行（`index.vue:915–922` 含注释）：

```css
.index4 .sj_jump { position: absolute; bottom: 22px; left: 50%; width: 100%; transform: translateX(-50%); z-index: 5; }
```

- `top: 55px` → `bottom: 22px`：照片带固定 440px 高，文案块 126px（两组各 63px，因为手机端 `.text` 是 `static` 会自然堆叠），落在带内 `y292–418`，即**下半部干净墙面**；与桌面 76% 同思路。
- 加 `z-index: 5`：复刻桌面的层序（文案 5 > G-08 压暗层 4 > mask 3 > bg 1）。**放 5 而不是只把 `.bg` 改 `auto`，是因为 `.fix::after` 的压暗层在手机端同样生效** —— 如果文案只压过 `.bg`、却仍留在压暗层之下，白字会被再压一层，对比度会掉到 **2.85:1**（不过 AA）。这是选 ① 时会踩的坑，记录备查。

**修复前后实测（390×844 dpr2，preview `3001`）**

| 指标 | 修复前 | 修复后 |
| --- | --- | --- |
| `.sj_jump` computed | `position:absolute; top:55px; z-index:auto` | `position:absolute; bottom:22px; z-index:5` |
| `.sj_jump` / 文案盒 rect | `y55 h126`（被照片盖住） | `y293 h126` |
| 文案同点位 `elementFromPoint` | `.bg`（命中照片） | `.sj_jump`（命中文案层） |
| 亮色白字最差对比度 | 不可见 | **9.44:1**（均值 11.79） |
| 暗色白字最差对比度 | 不可见 | **12.85:1**（均值 14.84） |
| `pageerror` | — | 0 |

跨宽度核对（探针 `bx-mob-i4c.js`）：390 / 768 / 1024 三档都在 `≤1024` 分支内，文案均落在照片带下半部、`elementFromPoint` 命中 `.sj_jump`；**1025 / 1440 走桌面分支，`.sj_jump` 仍是 `static` + `z-index:auto`，桌面未受影响**。768 与 1024 两档下公司名字样落在带内 32–58%、文案块 65–95%，实测无叠字。

证据：`compare/I4BG-MOBFIX-390-{light,dark}.png`、`I4BG-MOBFIX-{768,1024}.png`、`I4BG-MOB-band-notext.png`（隐藏文案后的照片带，用来看干净墙面的纵向区间）、`measure-mob-i4-contrast.json`。

**遗留（已告知用户）**：手机端两组宣言都会显示（`.text>div{opacity:1!important}`），因此是 4 行叠读（两组各「标题 + 副标题」）。这与参考站手机端 CSS 的行为一致（SPEC M-22 `:498`），本批没有动它。若只保留第一组，改起来是一行 `display:none`。

### 9.22 本批验证（真实输出）

```text
$ npm.cmd run build            # frontend/
dist/assets/index-304c5695.js            1,139.35 kB │ gzip: 364.39 kB
dist/assets/index-b728fc9b.css              25.46 kB │ gzip:   6.61 kB
(!) Some chunks are larger than 500 kBs after minification. …
✓ built in 17.67s            # 只含素材替换（f2c1362）
✓ built in 20.88s            # 加上手机端 ② 修复后重跑（本批最终状态）
=== EXIT: 0 ===

$ npm.cmd run check:routes     # frontend/
结果：PASS 34 / FAIL 0 / PENDING 2
=== EXIT: 0 ===
（PENDING 仍是 T05 contact 未实现，与上批相同）

$ npx.cmd eslint src/views/Home/index.vue src/content/home.js --ext .vue,.js      # 只读
✖ 127 problems (0 errors, 127 warnings)

$ npx.cmd eslint _base_index.vue _base_home.js --ext .vue,.js                     # 基线（git show 453701f: ，本轮起点）
✖ 127 problems (0 errors, 127 warnings)
=== 增量：0 ===
```

- eslint 增量 **0**：基线 127 逐位相同，本批只加注释与一行 CSS，没有新增告警。
- 基线对照法照旧（`git show HEAD:<file>` → `Out-File -Encoding utf8` 导出临时文件实测后 `[IO.File]::Delete` 删除）。
  **踩坑记录**：第一次用 `Set-Content -NoNewline` 导出，把整个文件拼成了一行 → eslint 报 `Parsing error: Unexpected token import`（2 errors）。基线导出**必须**用 `Out-File` 或写行数组，不能用 `-NoNewline`。
- 8 张组合截图（`shots/09-*.png`，preview `3001`，dist = 本批工作树构建结果）：

| 组合 | header | footer | footer bg | pad-top | console error | seniorweb 外链 |
| --- | --- | --- | --- | --- | --- | --- |
| 1440 zh 亮 | `header header-home` | `…footer-home` | rgb(242,241,228) | 146px | 0 | 0 |
| 1440 zh 暗 | 同上 | 同上 | rgb(17,17,17) | 68px | 0 | 0 |
| 1440 en 亮 | 同上 | 同上 | rgb(242,241,228) | 146px | 0 | 0 |
| 1440 en 暗 | 同上 | 同上 | rgb(17,17,17) | 68px | 0 | 0 |
| 390 zh 亮 | 同上 | 同上 | rgb(242,241,228) | 34px | 0 | 0 |
| 390 zh 暗 | 同上 | 同上 | rgb(17,17,17) | 34px | 0 | 0 |
| 390 en 亮 | 同上 | 同上 | rgb(242,241,228) | 34px | 0 | 0 |
| 390 en 暗 | 同上 | 同上 | rgb(17,17,17) | 34px | 0 | 0 |

`EXTERNAL URLS: none`（8 张全扫 `[src]/[href]/[style]`，seniorweb 域名 0 命中）；`measure-combos-batch.json` 已刷新。

- index4 逐帧回归（探针 `bx-bg6.js`，preview `3001`，1440×900）：**163 帧，p50 6.1ms / p95 6.3ms / max 7.1ms / 长帧(>32ms) 0**，`pageerror` 0，数据在 `measure-i4bg.json`。
- **手机端 index4 修复后的回归**（探针 `bx-mob-i4b.js` / `bx-mob-i4c.js`，390×844 dpr2）：`.sj_jump` = `bottom:22px / z-index:5`、文案盒 `y293 h126`、`elementFromPoint` 命中 `.sj_jump`；白字最差对比度亮 **9.44:1** / 暗 **12.85:1**；`pageerror` 0。
- 本批新增探针：`bx-bg7.js`（390 端 5 比例 × 亮暗）、`bx-bg8.js`（390 端叠层根因）、`bx-bg9.js`（1440 亮/暗对位）、`bx-bg11.js`（覆盖前后几何对照）、`bx-contrast.js` / `bx-contrast2.js` / `bx-contrast3.js`（对比度）。均在 `C:\Users\yk\AppData\Local\Temp\t00r-browser\`。

### 9.23 缺口、申请与下次第一步（本轮更新）

**A. 需用户裁决（新增 1 条）**

**A. 用户裁决（本轮已闭环）**

1. **390 端 index4 宣言文字不可见** —— 用户选 **②**（最小修法 + 下移到照片带下半部干净墙面），已实现并实测，见 9.21.7。
2. **手机端照片带的构图** —— 随 ② 一并处理：文案不再压在公司名字样上。若后续想要手机端专用竖构图素材，见 C1（不阻塞，当前横图裁切后是中心构图）。

**B. 给 A 的申请（未变）**：9.14 三项 + 9.20 A4（M-01 lenis）。本批无新增。

**C. 素材/内容缺口（更新）**

1. ~~index4 背景是占位素材~~ → **本批已替换**（9.21），手机端文案叠层缺陷也已修（9.21.7）。**仍缺**：参考站手机端本来有一套专用竖构图 `.sj_bg`（素材未抓取）；如果想让手机端画面更满，需要一张竖版素材。当前不阻塞。
2. footer logo（白底方图无 alpha）、index2/index5 占位动图 —— 未变。
3. 新素材是 4:3 横图（2048×1536）：桌面 1440×1006 用 `cover` 刚好。

**D. 存量问题（不是本批引入）**

1. `/cases` 直连 500（后端未起），页面有失败态。
2. `npm.cmd run lint` 带 `--fix`，不是只读检查。
3. M-19 mask 展开速度与参考站对不上（30% 处 765px vs 302px），见 9.21.6 末段。

**E. 下次第一步**

1. ~~等用户对 9.23 A1/A2 的裁决~~ → **已闭环**（用户选 ②，见 9.21.7）。
2. 继续 §9.17 C1：M-03 页头入场、M-31 footer 圆形按钮 hover 发光。M-32 `.fixed_side` 与滚动惯性耦合，等 A 的 lenis。
3. A 的 `lenis` 合入后：复跑 `bx-r6b2.js` 确认页内逐帧口径未被全局滚动改变；复跑 `bx-hdr.js` / `bx-combo.js` 确认 M-04/M-05 的 wheel 判定仍成立。
# Session B / Task T05

## About 参考站交互修订（2026-09-18）

- 首屏改为参考站 `about1` 的文档流裁切视差：图片初始负偏移，按页面滚动距离以 0.9 倍像素平移；移除旧黑色 sticky hero 残留规则，移动端保持可读的静态裁切。
- 合作理念改为参考站 `about_fix` 的四屏固定视口卡片堆叠：每张左图右文卡片从视口底部进入，完成后按 20px 间距压叠；桌面滚动驱动，手机改为连续卡片布局。
- 数字计数改为 `IntersectionObserver` 进入触发、离开上方重置，2.4 秒递增，回滚重新进入会再次播放。
- CTA 颜色调整为深青绿色；保留本地办公室图及 `services-showcase.jpg`、`zhengshu.jpg`。

验证：`frontend/npm.cmd run build` 通过；About 定向 ESLint 0 errors（40 warnings，均为既有模板格式规则）。本地 `http://127.0.0.1:3012/about` 桌面首屏截图已检查，标题可读、首屏图片无空白断层。
状态：进行中（About 完成，Contact/Privacy/Legal 待本轮后续）
基准commit：`895e0f6`（已快进到用户指定起点）

## 本轮完成

- 重做 `frontend/src/views/About/index.vue`：沿用已验收公共 Header/Footer、主题、语言与咨询入口，新增品牌实拍首屏、公司介绍、四项服务、CMMI 3、24 个固定换序客户 Logo、合作理念和 CTA。
- 新增 `frontend/src/content/company.js`：中文/英文对应内容，使用 PRD 已确认事实（2015、200+、98%、24/7、CMMI 3、微信/邮箱/地区不在本页重复造入口）。
- 新增 `frontend/src/views/About/useAboutMotion.js`：消费 A 的 motion token，IntersectionObserver 显影、prefers-reduced-motion 降级、桌面磁吸 CTA；卸载清理 observer、动画和磁吸。
- 证书使用仓库现有本地 `frontend/public/services-showcase.jpg`，证书可放大查看，Esc/关闭恢复触发按钮焦点。

## 验证

- `frontend/npm.cmd run build`：通过（Vite，存在既有大 chunk / browserslist / module type 警告）。
- About 文件只读 ESLint：无 error；格式 warning 为既有规则。
- `npm.cmd run check:routes`：PASS 34 / FAIL 0 / PENDING 2（仅 Contact 路由未注册，按约定交 A）。
- `npm.cmd run check:motion`：PASS 2 / FAIL 0 / BASELINE-STALE 0。
- Playwright @ `http://127.0.0.1:4175/about`、`/en/about`：1440 / 390，中文/英文、亮/暗主题；页面无横向溢出，单 main；证书 dialog 打开、Esc 关闭、焦点恢复；`pageerror` 0。四种手机组合均为 24 logos、无坏图、无横向溢出；英文正文中文字符 0。
- 截图与检查数据：`docs/frontend-rebuild/handoffs/B/about/`（1440/390 × zh/en × light/dark，全页和首屏，`desktop-checks.json` 由浏览器探针生成）。

## 共享契约申请 / 外部缺口

- 无共享代码改动，无路由注册改动。请 A 继续消费现有 `Contact/ContactEn` 路由契约。
- Contact 表单仍待 B 后续实现；必须消费 A 的 `submitInquiry`，未接通只能 demo/unavailable，不显示真实成功。
- About 的办公室照片复用用户提供的本地 `assets/home/statement-bg.jpg`；CMMI 证书复用现有本地 `services-showcase.jpg`，外部素材未热链。

## 未完成事项与下次第一步

- 本提交只覆盖 About；Contact、Privacy、Legal 仍待后续 T05 提交。
- 下一步：读取 A 的 `submitInquiry` 最终导出和 DATA 校验模型，实现 Contact 双语/主题/失败保留/复制退路，再补 Privacy/Legal。

## About 交互重做（用户确认方案后）

- 用户确认六幕滚动叙事：品牌影像、公司介绍数字、双证书固定视口、客户墙横移、合作理念进度线、蓝色 CTA。
- 本轮已落地第三幕固定视口时间轴：`--quality-progress` 驱动 CMMI 证书与软件企业证书的连续位移、旋转、缩放、透明度；桌面完整，手机静态降级。
- 首屏继续使用本地品牌墙实拍 `assets/home/statement-bg.jpg`；`services-showcase.jpg` 与用户新增 `frontend/public/zhengshu.jpg` 均进入第三幕并按真实证书类型标注。
- 客户墙三组 Logo 随滚动以不同方向/速度横移；手机保持网格，避免横向溢出。
- 新截图：`handoffs/B/about/timeline-start.png`、`timeline-mid.png`、`timeline-mobile.png`。
- 实测：1440 时间轴五个进度点的两个证书 transform/opacity 均连续变化；390 英文页面无中文、无坏图、无横向溢出；build、motion gate 通过。
