# frames/ 截图索引（T00R）

## 采集环境（全部截图统一）

| 项 | 值 |
| --- | --- |
| 浏览器 | Google Chrome **153.0.8010.36**（`C:/Users/yk/AppData/Local/Google/Chrome/Application/chrome.exe`），**headless** |
| 驱动 | `playwright-core@1.56.0`，直连本机 Chrome（`chromium.launch({ executablePath })`） |
| 截图方式 | `page.screenshot()` 全视口，未裁剪 |
| 目标站 | `https://www.seniorweb.cn/`（首页） |
| 主题 | **Light**。参考站默认按浏览器本地时间 19:00–08:00 进入深色，故用 `addInitScript` 写 `sessionStorage.ifTime='false'` + 清 `sessionStorage.Pattern` 强制亮色（采集时本地时间 22:12，属深色区间） |
| 语言 | `locale: 'zh-CN'` |
| 网络等待 | `waitUntil: 'load'` + 额外等待 4000ms；滚动采样每步再等 650–1300ms |

### 桌面组：`viewport 1440×900`、`deviceScaleFactor (DPR) 1`、页面缩放 zoom 100%

适用于 `global/`、`publictext/`、`index2/`、`index3/`、`index4/`、`index5/`、`header/`、`entrance/`、`index1swiper/`、`cursor/`、`magnetic/`。

### 手机组：三个视口，见 `mobile/` 小节

| 目录前缀 | viewport | DPR | zoom |
| --- | --- | --- | --- |
| `mobile-390-*` | 390×844 | 3 | 100% |
| `mobile-1024-*` | 1024×900 | 1 | 100% |
| `mobile-1025-*` | 1025×900 | 1 | 100% |

### 采集前置动作（影响数值，必须知道）

桌面组所有滚动截图前，脚本 `tools/capture.js` 的 `kick()` 会先做一次**真实滚轮**（`mouse.wheel(0, 900)`）→ `Scrollbar.update()` → 回滚：
因为 `.index4` 的高度 (`clientHeight + 7000`) 只在 `scroll_content()` 里写入，纯程序化 `scrollTo` **不会**刷新 `Limit.y`。
实测 `Limit.y`：首次加载 10151 → 一次滚轮后 10365 → 连续滚动后 **17365**。本目录除特别说明外，均取 `Limit.y = 17365` 的稳定态。

---

## 顶层 `capture-*.json`

每个目录对应一份 `capture-<mode>.json`（与该目录同级），记录该轮采样的 `meta`（viewport / dpr / theme / limit / 控制台日志）、`ranges`（各 section 绝对顶端与锚点）与 `samples[]`（每张截图当时的 `__probe()` 计算样式快照）。

| JSON | 目录 | 关键内容 |
| --- | --- | --- |
| `capture-global.json` | `global/` | 5 个全局滚动点 + `ranges`（含 `headerOnThreshold`、`publicText` 区间） |
| `capture-publictext.json` | `publictext/` | 两组 `.public_text` 各 5 点 `clip-path` |
| `capture-index2.json` | `index2/` | f1–f4 的 `transform` |
| `capture-index4.json` | `index4/` | `maskDelay` / `maskTf` / `bgTf` / `fixInline` / `t1` / `t2` |
| `capture-index5.json` | `index5/` | AOS 计数、`dataViews: []` |
| `capture-header.json` | `header/` | `headerCls`、`fixedSideCls`、入场延迟表 |
| `capture-entrance.json` | `entrance/` | 逐字 `transitionDelay` / `transitionDuration` |
| `capture-index3.json` | `index3/` | `.move` 位移、视频 `paused/currentTime`、`canvas_alert` 状态 |
| `capture-index1swiper.json` | `index1swiper/` | 该 Swiper 的 `realIndex`（恒为 6） |
| `capture-cursor.json` | `cursor/` | `cursor` 的 `transform`、`.bor` 序列、`hoverButton` 几何 |

另有 `../captures/` 存补充采集：`damp2.json`（惯性收敛曲线）、`pt2.json`（`.public_text` 逐段 offset 扫描）、`deep-*.json`（逐字/移动端/客户墙/入口）、`magnetic-verify.json`（磁吸位移序列）。

---

## 各子目录明细

### `global/` —— 整页滚动 5 点（对应 SPEC M-04 / M-08 / M-24 / M-32）

| 文件 | 滚动位置 y | 该点实测特征 |
| --- | --- | --- |
| `global-000.png` | 0（全页 0%） | `header hide`、`fixed_side`（无 on）、`bannerParallax = flex`、AOS 16/54 |
| `global-030.png` | 5210（30%） | `header hide on`、`fixed_side on`、`parallax = none`、AOS 39/54 |
| `global-050.png` | 8683（50%） | AOS 49/54；`.index4` mask `-0.27115s` |
| `global-070.png` | 12156（70%） | AOS 49/54；mask `-5.82795s`、scale 189.117 |
| `global-100.png` | 17365（100%） | AOS **54/54**；mask 钳制 `-8s`、scale 283.229；`fixInline` 7000px |

### `publictext/` —— `.public_text` 擦除（SPEC M-13）

两组实例，各自按 `start / end` 区间取 0 / 30 / 50 / 70 / 100%：

| 文件 | y | `.index1 .title` p0 clip | p1 clip |
| --- | --- | --- | --- |
| `pt1-000.png` | 268 | `inset(0 100% 0 0)` | `inset(0 100% 0 0)` |
| `pt1-030.png` | 388 | `inset(0 40% 0 0)` | `inset(0 100% 0 0)` |
| `pt1-050.png` | 468 | `inset(0 0% 0 0)` | `inset(0 100% 0 0)` |
| `pt1-070.png` | 548 | `inset(0 -40% 0 0)` | `inset(0 87% 0 0)` |
| `pt1-100.png` | 668 | `inset(0px)`（已揭开） | `inset(0 27% 0 0)` |

| 文件 | y | `.index2 .blue` p0 clip | p1 clip |
| --- | --- | --- | --- |
| `pt2-000.png` | 1414 | `inset(0 100% 0 0)` | `inset(0 100% 0 0)` |
| `pt2-030.png` | 1534 | `inset(0 100% 0 0)` | `inset(0 100% 0 0)` |
| `pt2-050.png` | 1614 | `inset(0 -26.1629% 0 0)` | `inset(0 100% 0 0)` |
| `pt2-070.png` | 1694 | `inset(0 -65% 0 0)` | `inset(0 68.5% 0 0)` |
| `pt2-100.png` | 1814 | `inset(0px)` | `inset(0 8.41% 0 0)` |

> `pt2-*` 的读数偏早 50px：该实例在采样途中才拿到 AOS `.aos-animate`（容器上移 50px），`start` 随渲染位置变化。详见 SPEC M-13 的「实现陷阱」与 `../captures/pt2.json`、`GAPS.md` G-05。

### `index2/` —— 双列视差（SPEC M-12）

| 文件 | y | f1 | f2 | f3 | f4 |
| --- | --- | --- | --- | --- | --- |
| `index2-000.png` | 1985 | −6 | +30 | none | none |
| `index2-030.png` | 3674 | −39.78 | +198.9 | none | none |
| `index2-050.png` | 4800 | −62.3 | +311.5 | −8.2834 | +41.417 |
| `index2-070.png` | 5925 | −84.8 | +424 | −30.7834 | +153.917 |
| `index2-100.png` | 7614 | −118.58 | +592.9 | −64.5634 | +322.817 |

（单位 px；`f1/f2` = `.fist:first-child .flex:first-child / :nth-child(2)`，`f3/f4` = `.fist:last-child` 同位置）

### `index4/` —— 品牌宣言段（SPEC M-19 / M-20 / M-21 / M-22）

| 文件 | y | mask delay | mask scale | bg translateY | .fix translateY |
| --- | --- | --- | --- | --- | --- |
| `index4-000.png` | 8513 | `0s` | 1.05 | 0px | 0px |
| `index4-030.png` | 10613 | `-3.35915s` | 35.5621 | −31.8999px | 2099.47px |
| `index4-050.png` | 12013 | `-5.59915s` | 166.155 | −53.1719px | 3499.47px |
| `index4-070.png` | 13413 | `-7.83915s` | 280.417 | −74.4439px | 4899.47px |
| `index4-100.png` | 15513 | `-11.1991s` | 300（已满） | −106.352px | 6999.47px |

`index4-000.png` 可见遮罩的竖向开槽（约 9px 宽）；`index4-030.png` 开槽放大到 302px（实测 x 569–870）；`index4-070.png` 起整屏为背景图。

### `index5/` —— 品牌价值 / CTA 段（SPEC M-24；该段无 data-view）

| 文件 | y | AOS |
| --- | --- | --- |
| `index5-000.png` | 16014 | 51/54 |
| `index5-030.png` | 16387 | 54/54 |
| `index5-050.png` | 16635 | 54/54 |
| `index5-070.png` | 16883 | 54/54 |
| `index5-100.png` | 17256 | 54/54 |

### `header/` —— 页头状态（SPEC M-04 / M-05）

| 文件 | y | 说明 |
| --- | --- | --- |
| `hdr-00-load.png` | 0 | 加载态，class `header hide` |
| `hdr-01-below-767.png` | 767 | 阈值下沿，无 `.on` |
| `hdr-02-above-868.png` | 868 | 阈值上沿（实测阈值 867.375），有 `.on` |
| `hdr-03-deep-3000.png` | 3000 | `header hide on` |
| `hdr-04-wheelup.png` | 真实滚轮向上后 | `.hide` 被移除 |
| `hdr-05-wheeldown.png` | 再向下滚后 | `.hide` 重新加回 |

### `entrance/` —— 页头入场逐帧（SPEC M-03 / M-10）

按「期望时刻」命名，括号内为该帧**实际**触发时间（导航与首帧渲染带来偏移）：

| 文件 | 期望 | 实测 |
| --- | --- | --- |
| `ent-0200ms.png` | 200ms | 563ms |
| `ent-0400ms.png` | 400ms | 937ms |
| `ent-0700ms.png` | 700ms | 1320ms |
| `ent-1000ms.png` | 1000ms | 1651ms |
| `ent-1600ms.png` | 1600ms | 1981ms |
| `ent-2200ms.png` | 2200ms | 2564ms |
| `ent-3200ms.png` | 3200ms | 3478ms |
| `ent-4500ms.png` | 4500ms | 4812ms |

### `index1swiper/` —— `.index1 .inline .swiper` 观测（SPEC 死代码 D-04）

每 1200ms 一帧，共 8 帧（实际 87 → 8503ms）。**8 帧的 `realIndex` 恒为 6、`transform` 恒为 `none`** —— 证明该轮播在真实页面上不可见。

### `index3/` —— 服务区（SPEC M-14 / M-15 / M-16 / M-17 + 死代码 D-02）

两组：`i3-00..i3-06` 为**首页真实状态**（`.wrap` 为 `display:none`，可见的是 Three.js 场景 + `.canvasSide`）；`i3-10..i3-13` 为**用 `addStyleTag` 强制 `.wrap` 可见**后的对照（验证被隐藏的切换逻辑本身是活的）。

| 文件 | 说明 |
| --- | --- |
| `i3-00-asLoaded.png` | 首页加载态 |
| `i3-01-click-item1-700ms.png` | 点击侧栏第 1 项后 700ms（弹层开始出现） |
| `i3-02-click-item1-2000ms.png` | 2000ms（`.matter` 已到位） |
| `i3-03-click-item2-2000ms.png` | 第 2 项 |
| `i3-04-click-item3-2000ms.png` | 第 3 项 |
| `i3-05-close-700ms.png` | 关闭后 700ms |
| `i3-06-close-2100ms.png` | 关闭后 2100ms |
| `i3-10-wrap-forced-item1.png` | 强制 `.wrap` 可见，初始态 |
| `i3-12-wrap-click-item2.png` | 点击第 2 项（`.move` → `translateY(189px)`） |
| `i3-13-wrap-click-item3.png` | 点击第 3 项（`.move` → `translateY(378px)`） |

### `cursor/` —— 自定义光标（SPEC M-27 / M-28 / M-30）

| 文件 | 说明 |
| --- | --- |
| `cur-00-rest.png` | y=0 静止 |
| `cur-01-moveA-250ms.png` | 移到 (300,300) 后 250ms |
| `cur-02-moveA-settled.png` | 1.25s 后（已收敛） |
| `cur-03-moveB-250ms.png` | 移到 (1100,700) 后 250ms |
| `cur-04-moveB-settled.png` | 1.45s 后（`translate(-50%,-50%) translate(1100px,700px)`） |
| `cur-05-mousedown.png` | `mousedown` |
| `cur-06-mouseup-ripple.png` | `mouseup`（`.bor` 在扩散） |
| `cur-07-ripple-hide.png` | +260ms（`.bor.hide`） |
| `cur-08-ripple-removed.png` | +860ms（`.bor` 已移除） |
| `hb-00-enter.png` | 鼠标进入 footer `.hover_button` 附近 |
| `hb-01-inside.png` | 进入 `.hover_button` 内部 |

### `magnetic/` —— 磁吸位移序列（SPEC M-30 / M-31）

由 `tools/magnet2.js` 采集（必须用 `dispatchEvent(new MouseEvent('mousemove'))`，`page.mouse.move` 不触发该监听）。位移读数见 `../captures/magnetic-verify.json`。

| 文件 | 采集时点 | 实测 transform |
| --- | --- | --- |
| `magnetic-rest.png` | 静止 | `none` |
| `magnetic-br-150ms.png` | 右下偏移 150ms | `translate3d(11.4066px, 11.383px, 0)` |
| `magnetic-br-500ms.png` | +500ms | `translate3d(19.2865px, 19.2571px, 0)` |
| `magnetic-br-1200ms.png` | +1200ms | `translate3d(19.9612px, 19.9314px, 0)` |
| `magnetic-tl-1200ms.png` | 反向（左上）1200ms | `translate(-20.1351px, -20.1648px)` |
| `magnetic-out-200ms.png` | `mouseout` 后 200ms | `translate3d(-6.3541px, -6.3635px, 0)` |
| `magnetic-out-1500ms.png` | `mouseout` 后 1500ms | `translate(0px, 0px)` |
| `footer-hover-out.png` / `footer-hover-inside.png` | footer 圆形按钮 hover 前后 | 对照 M-31 的 `blur(10px)` + `scale(1.1)` |

### `mobile/` —— ≤1024px 降级实测（SPEC 各条目的「移动端降级」栏）

每视口 5 张：`-top` 为 kick 之后的初始态，其余为 `Limit.y` 的 30/50/70/100%。

| 文件 | 对应 | 说明 |
| --- | --- | --- |
| `mobile-390-top.png` | 390×844 DPR 3 | 可见 JSMpeg `.sj_banner_video` 首屏、`.header .menu` 汉堡、`.sj_text` 蓝字文案 |
| `mobile-390-30/50/70/100.png` | 同上 | 各滚动位置 |
| `mobile-1024-top.png` 等 | 1024×900 DPR 1 | 断点下沿（=1024 仍是手机结构） |
| `mobile-1025-top.png` 等 | 1025×900 DPR 1 | 断点上沿（=1025 已是桌面结构） |

对应状态数据（`counts` / `css` / `states` / `damping`）在 `../captures/deep-mobile.json`。

---

### `demo/` —— 复现 demo 的自测截图（`../reference-implementation/`）

这组不是参考站截图，而是**复现 demo 自己在真实浏览器里跑出来的结果**，用来证明 `reference-implementation/` 确实复刻了 SPEC 里的数值。
采集脚本 `tools/demoverify.js` + `tools/demomobile.js`，状态数据在 `demo-verify.json` / `demo-mobile.json`。

- viewport `1440×900`、**DPR 1**、zoom 100%、headless Chrome **153.0.8010.36**（与参考站同机同版本）
- demo 的 `Limit.y = 13604`（`#content` 高 14504 − 视口 900）。**与参考站 17365 无关**，demo 是占位内容，高度本来就不同
- 采样用 `window.__t00r.setY(v)`（等价参考站采集脚本的 `__setY`），因此**页头 `.hide` 会在 `demo-000` 之后保持**（真实滚轮向下后 `.hide` 不自动恢复，属参考站既有行为）
- 滚动前先做一次真实滚轮并断言活着：`wheelCount 0 → 1`、`y 0 → 756.26`（120ms）→ 稳定 899.906（=`900 − 0.094`，单次 `deltaY=900` 在 damping 0.08 下的收敛终点）

| 文件 | y | 该点实测 | 覆盖 SPEC 条目 |
| --- | --- | --- | --- |
| `demo-000.png` | 0 | `header hide`（见上）、`aos 3/8`、两条 `.public_text` 的 `.p:first-child p` 均 `inset(0px 100% 0px 0px)`、`mask` `scale(1.05)` delay `0s` | M-13 / M-19 / M-24 |
| `demo-030.png` | 4081.2 | `header hide on`、`#content` `matrix(1,0,0,1,0,-4081.2)`、banner `display:none`、第 2 条 `.public_text` clip `inset(0px -50.6% 0px 0px)`、`index2` f1/f2 = `-49.026` / `245.13` | M-04 / M-12 / M-13 |
| `demo-050.png` | 6802 | `maskDelay -2.192s`、`mask` `scale(15.3011)`、`bg` `translateY(-98.8714px)`、`index2` 四列全部生效（`-101.71 / 508.55 / -46.11 / 230.55`） | M-12 / M-19 / M-20 |
| `demo-070.png` | 9522.8 | `maskDelay -6.54528s`、`mask` `scale(239.987)`、`.fix[data-view=auto]` `translate(0,3787.7)`、第 1 组文案内层 `p` `scale(0.97877)` opacity `0.7877` | M-19 / M-21 / M-22 |
| `demo-100.png` | 13604 | `maskDelay -8s`、`mask` `scale(283.229)`（**参考站同款回退瑕疵**，见 `../GAPS.md` G-07）、`.fix` `translate(0,7000)` = `endValue` 钳位、`aos 8/8` | M-19 / M-21 / M-24 |
| `demo-header-visible.png` | 0 | 向上滚轮后 `.hide` 被移除、`header`（无 `.hide`），页头入场后可见 | M-03 / M-05 |
| `demo-banner-450.png` | 450 | `.banner .parallax` `matrix(1,0,0,1,0,405)` = `450 × 0.9`；`display: block` | M-08 |
| `demo-index3-click3.png` | index3 | 点第 3 项：`.move` `translateY(304px)`（= `2 × item.clientHeight 152`）、`.item.on`、`.text` opacity `1`、视频槽切到 `_1_3.on`；同一时刻 `.canvas_alert` 已开：`opacity 1`、`.mask` opacity `1`、`matter[2].on` opacity `0.999551` / `translateY(0.00898566px)` | M-14 / M-15 / M-17 |
| `demo-cut-on.png` | index5 | `.public_hover .item .img` 悬停 → `.fixed_cursor` 加 `cut`；`.whole` opacity `0`、`.content_pro` `scale(1)` opacity `1`；`ants 10s linear infinite` + `arrowRun 5s infinite` | M-29 |
| `demo-circle-hover.png` | footer | `#circleBtn:hover::before` → `blur(10px)` + `matrix(1.1,0,0,1.1,0,0)`；`.off` 态 `filter: none` / `transform: none`，`transition-duration 0.4s` | M-31 |
| `demo-mobile-390.png` / `-1024.png` | 390×900 / 1024×900 | `body.native-scroll` 为真、`#scroller` `position: static`、`#content` `transform: none`、`.fixed_cursor` / `.fixed_side` / `.public_text` / `.index3` / `.index4 .mask` / `.header .nav` 全部 `display: none` | 各条目「移动端 ≤1024px 降级」栏 |
| `demo-mobile-1025.png` / `-1440.png` | 1025×900 / 1440×900 | 断点上沿：`native-scroll` 为假、`#scroller` `position: fixed`、上述元素全部恢复 | 同上 |

`demo-verify.json` 另含四组时序证据（与参考站实测量级一致）：

| 条目 | demo 实测 | 参考站实测 |
| --- | --- | --- |
| M-17 `.canvas_alert` 打开 | t+125ms `opacity 0`（`transition-delay .7s`）→ t+721ms `opacity 1` | 点击后 700ms `opacity 1` |
| M-17 `.mask` | delay `1.2s`，t+1332ms `0.697722` → t+2185ms `1` | `.3s` + `transition-delay 1.2s` |
| M-17 `.matter.on` | t+1332ms `opacity 0.130358` / `translateY(17.3928px)` → t+2185ms `0.999551` / `translateY(0.00898566px)` | 2000ms `opacity 0.996` / `translateY(0.078px)` |
| M-17 关闭 | +154ms `.on` 已移除、`.matter.on` 计数 0；+1370ms `opacity 0` | `pointerIs(-1)` 同步移除 `.on` |
| M-30 磁吸 | `134×134`；150ms `10.9652,11.0363` → 500ms `19.1667,19.291` → 1200ms `19.7761,19.9044` → `mouseout` 后 `0,0` | 150ms `11.4066` / 500ms `19.2865` / 1200ms `19.9612` / out 后 `0` |
| M-27 光标 | 目标 (1100,700)：120ms `966.414,628.207` → 稳定 `1090,690`；`data-speed="8"`、`mix-blend-mode: exclusion` | 指数逼近，落点 = 鼠标坐标 |
| M-05 `.hide` | `wheel deltaY>0` 保持 `.hide`；`deltaY<0` 移除（`header hide on` → `header on`） | 同向驱动 |

`demo-mobile.json` 记录 390 / 1024 / 1025 / 1440 四个宽度的断点快照，**四个宽度控制台均无 error**。
---

## 复现命令

```powershell
# 1) 准备临时驱动目录（不进仓库）
$d = "$env:TEMP\t00r-browser"; New-Item -ItemType Directory -Force $d
cd $d; npm i playwright-core@1.56.0

# 2) 把仓库里的脚本拷过去再跑（必须 tty=true + 轮询 write_stdin；
#    PowerShell 后台管道会让 Node 提前 abort）
Copy-Item "<repo>\docs\frontend-rebuild\evidence\reference-effects\tools\*.js" $d -Force
node capture.js global  "<repo>\docs\frontend-rebuild\evidence\reference-effects\frames\global"
node capture.js index4  "<repo>\docs\frontend-rebuild\evidence\reference-effects\frames\index4"
node deep.js    mobile  "$d\out\deep-mobile.json"
node deep.js    ptdetail "$d\out\deep-ptdetail.json"
node damp2.js   "$d\out\damp2.json"

# 3) 复现 demo 自测（demo 是本地文件，用 file:// 打开，不需要网络）
$demo = "<repo>\docs\frontend-rebuild\evidence\reference-effects\reference-implementation\index.html"
node demoverify.js "file:///$($demo -replace '\\','/')" "<repo>\docs\frontend-rebuild\evidence\reference-effects\frames\demo"
node demomobile.js "file:///$($demo -replace '\\','/')" "<repo>\docs\frontend-rebuild\evidence\reference-effects\frames\demo"
```

> demo 侧另有一条硬断言：滚动前先发一次真实滚轮，要求 `window.__t00r.wheelCount` 由 0 变 1 且 `y` 真的增加 ——
> 防止「页面看着正常但其实根本没滚动」的假阳性（本 demo 首版就踩过：`#scroller` 是 `position:fixed`，
> 可滚动上限取 `documentElement.scrollHeight` 会恒为 0，改取 `#content.offsetHeight` 才对）。

> `browser.close()` 偶发报错会让进程以 exit code 1 结束，但 JSON/PNG 通常已写出；判读产物是否生成即可。
