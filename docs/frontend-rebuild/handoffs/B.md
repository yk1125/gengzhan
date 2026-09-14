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
- ⚠️ **上线阻断项**：占位画面里是参考站客户（海天集团 `HAITIAN LASER MACHINERY`、旭升集团 `XUSHENG`）的品牌案例动画，**上线前必须替换成耘栈自有素材**；已同时写进 manifest 的 `备注`。
- 仍未做：自定义光标 M-27/28/29 + 磁吸 M-30/31（`public_hover` 已就位，落地后蓝盘立即生效）、Header M-04/05。
