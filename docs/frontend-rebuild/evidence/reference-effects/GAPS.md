# GAPS —— 未取到证 / 不确定 / 与本项目已确认差异（T00R）

本文只列**缺口与不确定项**。已确证的数值在 `SPEC.md`；截图元信息在 `frames/INDEX.md`。

状态标记：
- **[缺口]** 完全没有证据
- **[弱证]** 只有源码证据，没有真实浏览器实测，或只有间接实测
- **[存疑]** 有实测但与源码/另一处实测不一致，规律未定
- **[差异]** 参考站与本项目已确认方案不同，**以本项目为准**

---

## G-01 [缺口] 没有任何真机 / 真浏览器移动端验证

SPEC 里所有「移动端 ≤1024px 降级」都来自**桌面 Chrome 153 headless 的窄视口**（`captures/deep-mobile.json` 与 `frames/mobile/*`）。
未覆盖：

- 真实触屏设备（无 `touchstart` / 手势滚动 / 惯性差异）
- 移动端 UA（参考站有 UA 分支吗？**未查**）
- iOS Safari 的 `100vh` 行为（`.index4 { height: 100vh }`、`.start_mask { height: 100vh }`、`.index3 #canvas { height: 100vh }` 在 iOS 上会被地址栏影响）
- 微信内置浏览器
- 参考站 `function.js` 里有 `window.navigator.msPointerEnabled` 分支（IE/Edge 老内核），未验证

后续若要声称「手机端 1:1 还原」，必须补真机或至少 Playwright 的设备模拟（`hasTouch: true` + 真机 UA + `isMobile: true`）。

## G-02 [弱证] `prefers-reduced-motion` 的降级未验证

`model.js` 里有 `if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) { app.ticker.add(...) } else { ...只画一帧... }` 分支，
但该模块因 CORS **从未执行**（见 D-01），所以实测不到。
`env-check.txt` 实测该 query 在默认环境下 `matches = false`（未开启减少动态效果）。
`prefers-reduced-motion` 下**页面其余动效（AOS、GSAP 光标、swiper）是否有降级：未查证 —— 从源码看没有**。

## G-03 [存疑] `.index1 .inline .swiper` 文字轮播的「应有取值」

实测 `captures/deep-index1text.json`：`slides.length = 0`、`wrapRect 0×0`、`realIndex` 恒为 **6**、`transform` 恒为 `none`、`autoplay.running = true` 但 `autoplay.paused = true`，连续 60s 无变化。
它位于 `home.html:2274` 的 `<div style="display: none">` 里。

结论是「死代码」是安全的，但**它在参考站设计意图中的可见形态无法取证**（源码参数 `speed 800 / delay 1000 / direction vertical / loop true` 是清楚的，实际观感不是）。
若 B/C 想还原「介绍段落里的服务名轮换」，只能按参数实现，**不能声称是 1:1**。

## G-04 [存疑] 客户墙各槽是否同步

- `captures/deep-customers.json`（本轮）：12 个实例 `realIndex` **完全同步**（t=0 → 全 2；t=1505 → 全 0；t=4512 → 全 1；t=9001 → 全 2）。
- 上一轮采集曾观察到「前 4 槽已到 2、后 4 槽仍在 1」的错位，以及程序化 `scrollTo` 时 `transform` 从 −160 回退到 −80。

两轮观察冲突，**规律未定**。可能原因：12 个实例在同一个 `new Swiper(...)` 循环里各自计时，页面负载/`update()` 时机不同会导致相位漂移。
本轮没能在大量重复试验下复现错位，**因此 SPEC M-11 只声明「12 个独立实例、参数一致」，不声明同步或不同步**。
另外后 4 槽 `slides.length = 0`（桌面下不可见），其行为同样无法取证。

## G-05 [存疑] `.public_text` 的 `start` 会随渲染位置漂移

`function.js:4603` 用 `$(e).offset().top`（**渲染位置，含 transform**）算 `start`，于是：

- `.index1 .title.public_text` 的 p0 offset 在 y=200…2000 全程恒为 **1018**（它一开始就是 `aos-animate`）→ 公式逐点吻合，SPEC M-13 的钉值可信。
- `.index2 .blue.public_text` 的 p0 offset 实测在 **2107.7 – 2164** 之间变化：AOS 加上 `.aos-animate` 会一次性上移 50px（2164 → 2114.65），之后随 `.index2` 列位移在 2107.7–2114.65 间持续抖动（≤7px）。

因此第二个实例的 `clip-path` 与「用静态 offset 代入公式」的结果会有 **最多约 50px 的相位差，且每帧抖动数 px**。
SPEC M-13 给出的 `1364.65 / 1631.65` 取的是 `aos-animate` 之后的稳定读数；复现时若不做同样的实时读取，观感会有偏差。

## G-06 [缺口] `.index4 .mask` 使用的 `mask.svg` 素材未获取

本任务不下载素材（T00A 职责）。因此：

- 遮罩的开槽几何只能**从截图测量**：`frames/index4/index4-030.png`（scale 35.5621）第 100/220/340/820 行实测亮区 x **569–870**（宽 302px，中心 719.5）→ 反推 scale 1.05 时开槽宽 ≈8.9px。
- 测量用亮度阈值（`lum > 40`）判定，**边界含抗锯齿误差，建议按 ±2px 理解**。
- `frames/index4/index4-000.png` 目视可见**三条竖向开槽**（左/中/右），但只对中槽做了像素测量。
- 未验证 `mask.svg` 是否为纯黑 + 透明镂空、有无渐变边。

## G-07 [存疑] `.index4` mask 在参考站自身会「回退」

源码 `function.js:2723-2726`：`if (scrollTop >= .index4.next().position().top - clientHeight) { animation-delay = '-8s' }`。

实测：y=15513 时 delay = `-11.1991s`（动画已跑满，`scale(300)`）；y=17365 时 delay 被写回 **`-8s`** → `scale` 变成 **283.229**。
即参考站在接近底部时遮罩会**从 300 缩回 283**，属参考站自身的瑕疵。

SPEC M-19 记录了两者（真实映射式 + 钳制分支），**建议本项目取干净版本的 `-8s` 上限**，不要把回退照抄。

另外 `.index4` 高度（7900px）只在 `scroll_content()` 里写入：首次加载 `Limit.y = 10151`，一次真实滚轮后 10365，连续滚动后 17365。
**纯程序化 `scrollTo` 无法复现完整的 17365 行程**（`frames/capture-*.json` 里的 `limit` 字段请对照 `meta.limit` 一起读）。

## G-08 [缺口] 深色主题下未逐条实测

全部截图与数值都在**亮色**下采集（参考站默认按本地时间 19:00–08:00 进深色，采集时本地 22:12，故强制亮色）。
`pattern.css` 里对以下元素有深色覆盖，**均未实测**：

- `.public_text`（`pattern.css:35`、`593`）
- `.header.on`（`pattern.css:128-142`）
- `.index3 .move`、`.index1 .content .picture .img { filter: var(--filter) }`
- `.index3 #canvas:after`（亮色 `opacity:0` / 深色 `opacity:1`，见 D-09）
- `.index4 .fix:after`（亮色 `rgba(0,0,0,0.3)` / 深色 `rgba(0,0,0,0.5)`，`home.html:1718-1720`）

## G-09 [弱证] 视频与素材全部未下载（T00A 职责）

本任务只记录触发规则与时序，不下载任何 mp4 / ts / jpg / svg：

- banner 视频：实测 `duration = 56.237s`、`muted = true`、`loop = false`、`playsInline = false`；切换由 `ended` → `slideNext()` 触发（SPEC M-07）。
- `.index3 .wrap .content .item` 的 12 个 `.picture .animate_video video`：实测 `muted = false`、`duration ≈ 1.80–1.88s`，命名规则 `<old+1>_<index+1>`。
- 手机 `.sj_banner_video` 用 JSMpeg 播 `static/images/banner.ts?v=1`。
- `.index4 .bg` 用 CDN 大图，实测渲染高 **1006.36px**（决定位移上限 106.36px）。

**因此本文件与 SPEC 里的所有时长/尺寸都是「当前素材」的派生值；换素材后 `px = bg.height - clientHeight` 等必须重算。**

## G-10 [弱证] `bundle.js` / `main.js` 是单行压缩，行号证据不可用

- `bundle.js`（591,082 B）**整个文件是一行**，SPEC M-16/M-17 只能给「字符串定位」而不是行号。
- `main.js`（4,982,342 B）虽报 110,004 行，核心逻辑压在一行内，`_nextTick` 等只能给代码片段。
- 可检索的锚点：`start_position=`（字节偏移 584,883）、`start_rotation=`（584,923）、`pointerIs`（588,778）、`click_list`（590,821）、`_nextTick`（147,768）、`addTransformableMomentum`（`momentum` 相关，141,178 附近）。
- 若源站更新版本，这些偏移会失效；只有 `sources/` 里的快照哈希可以证明取证时的内容。

## G-11 [存疑] 惯性滚动的墙钟时长依赖刷新率

`damping` 是**每 `requestAnimationFrame` 帧**应用的（`main.js` `_render` → `_nextTick`），不是按时间积分。所以：

- 收敛所需**帧数**固定：`momentum_n = m0 * (1-0.08)^n`，`|momentum| <= 0.1` 归零 → `m0 = 900` 时 **110 帧**。
- 墙钟时间 = 110 / 刷新率。本次 headless 实测等效 **~141 fps** → `tTo1px = 841.5 ms`（`captures/damp2.json`）。
  在 60 Hz 设备上应为 **≈1.83 s**，在 120 Hz 设备上 ≈0.92 s。

SPEC M-01 同时给出帧数与两个刷新率下的换算值；**不要把一个墙钟秒数当成绝对规格**。

## G-12 [弱证] 部分数值只有源码证据

| 项 | 缺什么 |
| --- | --- |
| `.fixed_side .item.ClickTop` 回顶 | 只有源码 `scrollbar.scrollTo(0, 0, 1200)`（`function.js:5079-5081`），**未实测 1200ms 的观感** |
| `.index2` 手机 `flex2` 锚点 | 手机列宽变 48%（`index.css:1671-1673`）会改变 `.fist:first-child` 高度，**未实测手机 `flex2`** |
| AOS `all_num` 手机为 0 | 来自源码 `if (clientWidth > 1024) { all_num = 150 }`（`function.js:9-12`），**未用实验反证** |
| `.index3 .wrap .sj_content li` 的 sticky + scale | 首页 ≤1024px 整块 `display:none`（D-03），**没有可测样本**；公式 `1 + (scrollTop-start)/700*-0.08` 且**没有下限 clamp**（会一直缩下去），仅源码证据 |
| 页头 `.on` 阈值在手机的精确值 | 源码给 `clientHeight - header.height/2`，手机 header 60px → 870；实测只能区分「有/无 `.on`」，**未二分到 1px** |
| `.index3 .wrap .content .item` 点击时 `.item.on .text` 的 `-webkit-line-clamp: 2` 截断表现 | 文本折行与截断的视觉未逐项截图 |

## G-13 [缺口] 只覆盖了首页

本任务范围是**首页**（`https://www.seniorweb.cn/`）。以下未取证：

- 服务页 / 案例列表 / 案例详情 / 解决方案 / 关于 / 联系 / 动态列表 的路由动效
- `function.js` 里与首页无关的大段逻辑（`.caseInfo*`、`.pro_*`、`.matter1~4`、`.about*`、`.section_9/11/12`、`#caseInfo_zg` 横向滚动、`caseParallax()` 等）
- 手机菜单展开（`.header .menu` → `.active` / `header.sj_on` / `.menu_background.on`）的实际动画时序（`REFERENCE.md §5` 只有源码证据，本轮**未点开手机菜单截图**）
- 联系表单的成功/失败浮层（`.alert_text.correct/.error`）

## G-14 [缺口] `.canvasSide` 的 Three.js 场景没有「转场后」的静态证据

`frames/index3/i3-03-click-item2-2000ms.png` / `i3-04-click-item3-2000ms.png` 记录了点击后的弹层，
但**相机位姿转场本身**（`start_position2/3/4`）的中间帧没有逐帧截图；
只能说「相机被 gsap 以 1.5s / power2.inOut 补间到目标位姿」（源码 `bundle.js` 常量），**观感未定格证据**。
另外 `#canvas` 注入的是 `<canvas data-engine="three.js r165">`（实测），而 `window.THREE === "undefined"`（three 被打包，不挂全局）。

## G-15 [存疑] `.orb-canvas` 在手机上仍有盒尺寸

实测 `.orb-canvas` 中心像素 RGBA = `[0,0,0,0]`（**完全透明、从未绘制**，CORS 阻断，见 D-01），但元素本身有尺寸：

| 视口 | `.orb-canvas` 尺寸 | 来源 |
| --- | --- | --- |
| 1440×900 | 1440×360 与 1440×270 | 实测 `captures/env-check.txt`（`height: 40vh` × 两个不同的 100vh 父容器） |
| 390×844 | 390×101 | 实测 `captures/deep-mobile.json` |
| 1024×900 | 1024×108 | 同上 |
| 1025×900 | 1025×360 | 同上 |

手机另有 `style.css:2475-2477` `.orb-canvas { height: 12vh!important }`。**因从未绘制，这些尺寸没有视觉后果**，但 `filter: blur(100px)` 仍在生效——若本项目要用它，需自己实现。

---

# 与本项目已确认方案的差异（以本项目为准，**不要照抄参考站**）

参考站自身的「差异账本」在 `docs/frontend-rebuild/REFERENCE.md §7`（V01–V10）。T00R 在动效取证中新遇到并需强调的：

| ID | 参考站实测 | 本项目已确认 | 影响 |
| --- | --- | --- | --- |
| V04（复用） | 主题按本地时间 **08:00 / 19:00** 初始化；`sessionStorage.ifTime` 一旦被手动设置就**永久覆盖**（`function.js:4986-4987`、`5023-5043`） | **07:00 / 19:00**，手动选择只到**下一个边界到期** | SPEC M-33 **不得**照抄 08:00 或永久 session 覆盖 |
| V07（复用） | 存在 `.fixed_get` 弹窗：`document.addEventListener('mouseout', ...)` 当 `clientY < 0` 时弹「合作须知」，并用 `sessionStorage.get` 去重（`function.js:4525-4532`） | 本项目不引入源站客服/弹窗内容 | **SPEC 未收录该效果**；若要做同类入口，需重新定义触发与文案 |
| 新增 | 参考站 `function.js` 大量效果**依赖真实素材尺寸**（如 `.index4 .bg` 高 1006.36px 决定位移上限） | 本项目使用自有视频/图片 | 换素材后 `px`、`v`、`end_value` 等派生值必须重算，不能直接抄常数 |
| 新增 | 参考站首页 `.index3` 桌面是 **Three.js 场景 + 侧栏**，`.wrap` 服务列表是死代码（D-02） | 本项目七个服务共享模板、主导航只列四类服务 | **不要把首页那套 Three.js 交互当作「服务区唯一正确形态」**；服务切换应基于 `.index3 .wrap .content .item`（M-14/M-15）这套活逻辑 |
| 新增 | 参考站 ≤1024px **整个 `.index3` 隐藏**（首页没有服务区） | 本项目手机端需可完成任务（手机菜单、服务列表可读） | 手机降级**不能**照抄成「服务区直接消失」，需按 `REFERENCE`/`FRONTEND §3` 的路由契约自行给出手机形态 |
| 新增 | 参考站在 1025–1365px 区间**没有页头入场动画**（`> 1365` 才播，M-03） | 本项目用同一套公共页头 | 是否保留这个「窄桌面无入场」的特性需 Session A 明确；照抄会得到一个「有时不播」的页头 |
