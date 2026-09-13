# 参考站首页交互动效规格（T00R）

本文件是 **取证结果 + 可照抄的实现规格**，不是产品设计提案。每条记录的每个数值都来自
真实浏览器观测或源文件行号，B/C 可直接照抄「起始值 / 结束值 / 时长 / 缓动 / 滚动区间」四栏。

- 参考站：https://www.seniorweb.cn/ （山久网络，2026-09-14 实测可达）
- 观测环境（全部截图与数值）：Chrome 153.0.8010.36 headless，viewport 1440×900 / DPR 1 / zoom 100%，亮色主题
  （用 `sessionStorage.ifTime='false'` 强制亮色；参考站默认按本地时间 19:00–08:00 进入深色）。
  手机降级记录另用 390×844 DPR 3、1024×900 DPR 1、1025×900 DPR 1 三个视口实测。
- 源文件快照与哈希：`sources/`（`function.js` 5272 行、`style.css` 2710 行、`index.css`、`main.css`、`pattern.css`、`home.html` 3545 行、`bundle.js`、`main.js`、`model.js`）
- 截图与采集 JSON：`frames/`、`captures/`，索引见 `frames/INDEX.md`
- 未取到证 / 存疑 / 与本项目差异：`GAPS.md`
- 复现 demo：`reference-implementation/`

## 字段说明

| 字段 | 含义 |
| --- | --- |
| 编号 | 本文件内唯一 ID，`M-xx` 为活代码，`D-xx` 为死代码 |
| 名称 | 效果名 + 主要选择器 |
| 触发条件 | 什么事件/条件让它开始、结束 |
| 起始值 | 触发瞬间的初始属性值（照抄用） |
| 结束值 | 稳定后的属性值（照抄用） |
| 时长 | 动画/过渡时长（毫秒或秒） |
| 缓动 | 缓动函数或逐帧插值公式 |
| 是否 scrub | 「滚动进度驱动」还是「触发一次播放」 |
| 滚动区间 | 相对视口 / 相对元素的高度或像素区间 |
| 移动端 ≤1024px 降级 | 断点 ≤1024px 时的真实行为（实测） |
| 证据源 | 文件 + 行号 + 选择器 / 采集产物 |

## 两个必须知道的计量前提

1. **所有「滚动区间」都以 `clientHeight = 900px`（1440×900 视口）、`limit.y` 见下为前提。**
   首屏各 section 绝对顶端（y=0 时，实测 `frames/capture-global.json` → `ranges`）：
   `banner` 0、`index1` 900、`index2` 1985、`index3` 7614、`index4` 8514、`index5` 16414。
2. **`limit.y` 不是常量。** 首次加载 `limit.y = 10151`、`.index4` 高度仍为 900px；
   在一次真实滚轮之后 `scroll_content()` 才把 `.index4` 写成 7900px（= clientHeight+7000），
   `limit.y` 随后刷新到 10365 → 17365（见 `captures/damp2.json`：单次滚轮后 `limitY=10365`；
   `frames/capture-global.json` 连续滚动后 `limit=17365`）。
   因此本文件所有 index4 区间数值取 **`limit.y = 17365` 的稳定态**。

---

# Part A：活代码

## M-01 全局自定义滚动惯性

- **编号**：M-01
- **名称**：smooth-scrollbar 桌面惯性滚动（`#my-scrollbar` / `.scroll-content`）
- **触发条件**：桌面（`clientWidth > 1024`）任何滚动输入（wheel / 拖拽 / 键盘），每次 `requestAnimationFrame` 推进一次
- **起始值**：一次 wheel 的 `momentum.y` = 输入 deltaY 归一化后的像素值（实测 deltaY=900 → 初始 momentum 900，`scrollTop=0`）
- **结束值**：`scrollTop = 0 + deltaY`（实测 900），`momentum` 归零
- **时长**：按帧计 **约 110 帧**收敛（|momentum| ≤ 0.1 时归零）。真实墙钟时间取决于刷新率：本次实测（无头 Chrome，等效 ~141 fps）为 **841.5 ms**；60 Hz 屏等效 **≈1.83 s**
- **缓动**：逐帧指数衰减，无缓动函数。`momentum *= (1 - damping)`；`position += momentum_prev - momentum_next`；`|momentum| <= 0.1` 时直接归零。完整行程 Σ = 初始 momentum（实测 900px 精确等于 deltaY）
- **是否 scrub**：否（属于滚动容器本身，不是内容动画）
- **滚动区间**：整页 0 … `limit.y`
- **移动端 ≤1024px 降级**：`Scrollbar.destroyAll()`，回退浏览器原生滚动，**无惯性**（实测：wheel deltaY=900 → 单帧内直接 `scrollY = 900`，33.9 ms）
- **证据源**：
  - `sources/function.js:1475` `Scrollbar.initAll({damping: damp, renderByPixels: false})`
  - `sources/function.js:5-8` `var damp = 0.25; if (clientWidth > all_mobile) { damp = 0.08 }`
  - `sources/function.js:4290-4291` `if (clientWidth <= all_mobile) { Scrollbar.destroyAll() … }`
  - `sources/main.js`（smooth-scrollbar 打包源码）`_nextTick`：`var u = i*(1-e.damping); … {momentum:u, position:o+i-u}`，配合 `_render` 每 rAF 调用
  - 实测 `captures/damp2.json`（`runs[0]` desktop-1440：damping 0.08、renderByPixels false、`tTo1px=841.5ms`、行程 900；`runs[1]` mobile-1024：`sbPresent=false`、33.9 ms 到位）

## M-02 滚动驱动管线（决定每条动效是 scrub 还是只播一次）

- **编号**：M-02
- **名称**：`scroll_content()` / `scrollTop_start()` 的调用顺序与 mobile 分支
- **触发条件**：桌面由 `scrollbar.addListener` 每帧回调；移动端由 `window.addEventListener('scroll')` 回调
- **起始值**：—
- **结束值**：—
- **时长**：`scroll_content` 内部对 `AOS.init` 与 `scrollTop_start` 包了 `setTimeout(…, 100)`，即这两者**比滚动慢 100 ms**
- **缓动**：—
- **是否 scrub**：本条定义 scrub 语义本身：桌面 `scroll_content(scrollTop)` 直接执行 + 100 ms 后 `AOS.init()` 与 `scrollTop_start(scrollTop)`
- **滚动区间**：整页
- **移动端 ≤1024px 降级**：**只调用 `scroll_content(scrollTop)`，不调用 `scrollTop_start()`（不注销 AOS）** —— 即 `[data-view]` 插值引擎在手机上完全不被滚动驱动（`.index4 .text` 等停在初始值，并被 CSS `!important` 接管）
- **证据源**：
  - `sources/function.js:1477-1482` `scrollbar.addListener((status) => { window.pageYOffset = scrollbar.scrollTop; scroll_content(...); scrollTop_start(...); … })`
  - `sources/function.js:4580-4585` `function scroll_content(scrollTop) { setTimeout(function () { AOS.init({...}); scrollTop_start(scrollTop) }, 100) … }`
  - `sources/function.js:4292-4296` 移动端 `window.addEventListener('scroll', function () { … scroll_content(scrollTop) // scrollTop_start(scrollTop) })`
  - 实测 `captures/deep-mobile.json`（`vp.390`、`vp.1024`：`sbPresent=false`，`documentElement.scrollHeight` 9716 / 9379）

## M-03 页头入场逐项下坠

- **编号**：M-03
- **名称**：`.header` 的 `fadeInDown` 入场（logo / nav li / 工具栏图标）
- **触发条件**：`document.body.clientWidth > 1365` 时页面加载即执行（`head_animate()`）。**1025–1365px 之间不播放入场**
- **起始值**：`opacity: 0`；`transform: translate3d(0, -100%, 0)`
- **结束值**：`opacity: 1`；`transform: translate3d(0, 0, 0)`
- **时长**：`animation-duration: 1s`，`animation-fill-mode: both`
- **缓动**：animate.css `fadeInDown` 键帧内部 `animation-timing-function: ease`（`main.css` 未覆写该键帧的 timing-function）
- **是否 scrub**：否，只播一次
- **滚动区间**：无（与滚动无关）
- **延迟**：`.header .logo` `0 ms`；`.header .nav li` 第 n 项 `n*200 + 200 ms`（实测 7 项 = `0.2s / 0.4s / 0.6s / 0.8s / 1.0s / 1.2s / 1.4s`）；`.header .r .outdated svg` `1300 ms`；`.header .r .sun` `1400 ms`
- **移动端 ≤1024px 降级**：`head_animate()` 的 `clientWidth > 1365` 判断直接跳过，页头不做任何入场动画（元素本来就可见）
- **证据源**：
  - `sources/function.js:4557-4567` `head_animate()`，`index * 200 + 200`、`'1300ms'`、`'1400ms'`
  - `sources/main.css:814-819` `.animated { animation-duration: 1s; animation-fill-mode: both }`
  - `sources/main.css:2055-2067` `@keyframes fadeInDown`（`translate3d(0,-100%,0)` → `translate3d(0,0,0)`）
  - 实测 `frames/capture-global.json` → `samples[0].state.entrance`（7 项 delay 与 `dur:1s`）；截图 `frames/entrance/ent-0200ms.png` … `ent-4500ms.png`

## M-04 页头 `.on` 阈值与配色反转

- **编号**：M-04
- **名称**：`.header.on`（滚过阈值后页头底色与图标配色切换）
- **触发条件**：`scrollTop > clientHeight - $('.header').height()/2` 时加 `.on`，否则移除
- **阈值实测值**：1440×900 下 `header` 高 `65.25px` → **867.375px**（实测 y=767 无 `.on`，y=868 有 `.on`）
- **起始值**：`.header` 透明底、深色字；`.logo` `filter: none`；nav 链接与太阳图标为原色
- **结束值**：`background: #F2F1E4`；`.header .l .logo img { filter: invert(1) }`；`.header .l .nav li a`、`.header .r .sun` 文字/图标 `#000`
- **时长**：`.header { transition: .6s }`（属性默认 → `all .6s ease`）
- **缓动**：`ease`（`transition` 未指定 timing-function 时取默认 `ease`）
- **是否 scrub**：否，类名在越过阈值瞬间翻转
- **滚动区间**：`[0, 867.375)` 无 `.on`；`[867.375, limit.y]` 有 `.on`
- **移动端 ≤1024px 降级**：`distance = clientHeight - clientHeight/2`，`header` 高 60px → 阈值 **870px**（`clientWidth ≤ 1024`；实测 390/1024 视口下 `y>0` 即为 `header on`）。`.header.on` 后的深色主题覆盖见 `pattern.css`
- **证据源**：
  - `sources/function.js:4587-4591` `var distance = clientHeight - $('.header').height()/2; scrollTop > distance ? addClass('on') : removeClass('on')`
  - `sources/style.css:586-607` `.header.on` 底色 `#F2F1E4`、logo `invert(1)`、nav/sun `#000`
  - `sources/style.css:228` `.header { transition: .6s }`
  - `sources/pattern.css:128-142` 深色主题下的 `.header.on` 覆盖
  - 实测 `frames/capture-header.json`（`headerOnThreshold: 867.375`、`headerHeight: 65.25`；截图 `hdr-01-below-767.png` / `hdr-02-above-868.png` / `hdr-03-deep-3000.png`）

## M-05 页头按滚动方向收起

- **编号**：M-05
- **名称**：`.header.hide`（向下滚隐藏、向上滚恢复）
- **触发条件**：`window` 的 `wheel` 事件；`deltaY > 0` 加 `.hide`，`deltaY < 0` 移除
- **起始值**：`transform: none`（页头可见）
- **结束值**：`transform: translateY(-100%)`（页头移出视口）
- **时长**：继承 M-04 的 `transition: .6s`
- **缓动**：`ease`
- **是否 scrub**：否，由滚轮方向事件驱动（不是滚动位置）
- **滚动区间**：无位置阈值；任何 `scrollTop` 都生效。实测 y=3000 向下滚 → `header on hide`；向上滚回 2300 → `header on`
- **移动端 ≤1024px 降级**：`MouseScroll()` 的 wheel 监听仍然注册，但手机通常无 wheel 事件；实测 390/1024 视口滚动后 `headerCls` 只有 `header on`，未出现 `hide`
- **证据源**：
  - `sources/function.js:4662-4670` `window.addEventListener('wheel', (e) => { if (e.deltaY > 0) { $('.header').addClass('hide') } else if (e.deltaY < 0) { $('.header').removeClass('hide') } })`
  - `sources/style.css:624-626` `.header.hide { transform: translateY(-100%) }`
  - 实测 `frames/capture-header.json`（`hdr-04-wheelup` / `hdr-05-wheeldown` 的 `headerCls`）

## M-06 页头导航 hover 底色衬垫

- **编号**：M-06
- **名称**：`.header.undertone`（鼠标进入桌面导航项时出现的底部衬垫）
- **触发条件**：`mouseenter` 于 `.header .l .nav li` 加 `.undertone`；`mouseleave` 移除
- **起始值**：`.header` 无额外底衬
- **结束值**：`border-bottom: 1px solid #DDDCCE`；`background: #F2F1E4`
- **时长**：继承 `.header { transition: .6s }`
- **缓动**：`ease`
- **是否 scrub**：否
- **滚动区间**：无
- **移动端 ≤1024px 降级**：`.header .l .nav` 在 ≤1024px 为 `display: none`（实测），无 hover 目标，效果不存在；页头改用 `.header .menu`（64×38px 汉堡）
- **证据源**：
  - `sources/function.js:4570-4576` `$('.header').addClass('undertone')` / `removeClass('undertone')`
  - `sources/style.css:628-643` `.header.undertone { border-bottom: 1px solid #DDDCCE; background: #F2F1E4 }`
  - 实测 `captures/deep-mobile.json`（390/1024：`nav.display = "none"`、`headerMenu.display = "block"` 64×38）

## M-07 首屏 banner 淡入切换（视频驱动）

- **编号**：M-07
- **名称**：`.banner .swiper`（`effect: 'fade'`）与 slide 的 `.on` / `.unset`
- **触发条件**：Swiper 初始化 + autoplay；若当前 slide 含 `<video>` 则 `autoplay.stop()` 并由 `video` 的 `ended` 事件调用 `slideNext()`
- **起始值**：首个 slide 加 `.on`（初始化后 `setTimeout(…, 10)`），其余加 `.unset`
- **结束值**：`.on` 追加到 `slides[realIndex]`，其余 slide 加 `.unset`
- **时长**：`speed: 1000`（淡入淡出 1000 ms）
- **缓动**：Swiper fade 内部线性（未配置 `easing`）
- **是否 scrub**：否，事件驱动
- **滚动区间**：无
- **自动切换间隔**：`autoplay.delay` 初始 **4000 ms**；`realIndex > 0` 时改为 **3000 ms**（实测：切到 realIndex=1 后 `params.autoplay.delay` = 3000）。实测时间线：video `duration = 56.237 s`，`ended` 触发切换，切换后 `realIndex = 1`、`delay = 3000`、`autoplay.running = true`，约 4.1 s 后回到 `realIndex = 0`、`delay` 读回 4000
- **视频属性实测**：`muted = true`、`loop = false`、`autoplay` 属性 false、`playsInline` false、`currentTime` 从 5.0 连续播到 56.24
- **移动端 ≤1024px 降级**：见 M-09
- **证据源**：
  - `sources/function.js:4369-4410` `new Swiper('.banner .swiper', { speed:1000, effect:'fade', allowTouchMove:false, autoplay:{delay:4000, disableOnInteraction:false}, on:{ init(){…}, slideChange(){…} } })`
  - `sources/function.js:4385` `!!video && this.autoplay.stop(); video.play();`
  - `sources/function.js:4387-4389` `video … addEventListener('ended', function () { this_swiper.slideNext() })`
  - `sources/function.js:4405-4407` `if (this.realIndex > 0) { this.params.autoplay.delay = 3000 }`
  - 实测 `frames/capture-banner.json`（`banner` 模式截图 `banner-00000ms.png` …；slide class 实测 `swiper-slide swiper-slide-visible swiper-slide-active on` 与 `swiper-slide unset swiper-slide-prev`）

## M-08 首屏 banner 视差下移与满屏隐藏

- **编号**：M-08
- **名称**：`.banner .parallax`（内部 img 视差 + 整块在滚过一屏后 `display:none`）
- **触发条件**：滚动位置 `0 < scrollTop <= clientHeight` 时写 transform；`scrollTop >= clientHeight` 时 `.hide()`，否则 `.show()`
- **起始值**：`transform: translate3d(0px, 0px, 0px)`
- **结束值**：`translate3d(0px, scrollTop*0.9 px, 0px)`（`scrollTop = 900` 时 810px）
- **时长**：无过渡，逐帧直写（`transition` 未设置，随滚动即时跟手）
- **缓动**：线性（`speed = scrollTop * 0.9`）
- **是否 scrub**：是，滚动进度驱动
- **滚动区间**：`scrollTop ∈ (0, 900]`；`scrollTop >= 900` 后 `display: none`
- **移动端 ≤1024px 降级**：`.banner .swiper_banner .back { display: none }`、`.sj_back { display: block !important }`（改用手机专用背景图）
- **证据源**：
  - `sources/function.js:2686-2690` `var speed = scrollTop*0.9; banner_parallax.style.transform = 'translate3d(0px,' + speed + 'px,0px)'`
  - `sources/function.js:2730-2734` `if (scrollTop >= clientHeight) { $('.banner .parallax').hide() } else { $('.banner .parallax').show() }`
  - `sources/index.css:1593-1598` 手机 `.back` / `.sj_back` 互换
  - 实测 `frames/capture-global.json` → `samples` 的 `bannerParallax`：y=0 → `flex`，y=5210 → `none`

## M-09 首屏 ≤1024px 的 JSMpeg(TS) 视频替代

- **编号**：M-09
- **名称**：`.banner .swiper_banner video` → `.sj_banner_video`（JSMpeg 播 `.ts`）
- **触发条件**：`document.documentElement.clientWidth < 1024`（严格小于，1024 不触发）
- **起始值**：DOM 中先 `$('.banner .swiper_banner video').remove()`，再向首个 slide 追加 `<div class="sj_banner_video" data-video="static/images/banner.ts?v=1" style="display:none;">`
- **结束值**：`new JSMpeg.VideoElement(el, videoUrl, { loop: true, autoplay: true, control: false, audio: false, volume: 0 })`，外层 `display: block !important`、`width/height: 100%`、`transform: scale(1.01)`
- **时长**：无（循环直播式解码）
- **缓动**：无
- **是否 scrub**：否
- **滚动区间**：无
- **移动端 ≤1024px 降级**：本条**就是** ≤1024px 分支本身，没有二次降级。反向：`clientWidth < 1024` 严格小于才触发，1024 与 1025 实测均为 **0** 个 `.sj_banner_video`，桌面改用 `.banner .swiper_banner video` + Swiper 淡入（M-07）
- **断点实测**：390×844 → `.sj_banner_video` 数量 **1**；1024×900 → **0**；1025×900 → **0**
- **说明**：本任务不下载素材，只记录触发规则与时序；`.ts` 资源属于 T00A
- **证据源**：
  - `sources/function.js:4505-4522` `var html = '<div class="sj_banner_video" …>'; if (document.documentElement.clientWidth < 1024) { … new JSMpeg.VideoElement(e, videoUrl, {loop:true,autoplay:true,control:false,audio:false,volume:0}) }`
  - `sources/home.html:3509` 之前于 `home.html:3491` 引入 `jsmpeg-player.umd.min.js`
  - `sources/home.html:1754-1759` `.sj_banner_video { display:block!important; width:100%; height:100%; transform:scale(1.01) }`
  - 实测 `captures/deep-mobile.json`（`vp.390.probe.counts.sjBannerVideo = 1`，`vp.1024` = 0，`vp.1025` = 0）；截图 `frames/mobile/mobile-390-top.png`（首屏为 JSMpeg 画面）

## M-10 主标题逐字入场

- **编号**：M-10
- **名称**：`.each_animate`（把标题拆成单字 `<div>` 后逐字右移淡入）
- **触发条件**：`document.querySelector('.index1')` 存在时 `setTimeout(…, 10)` 直接给所有 `.each_animate` 加 `.on`。**与滚动无关**
- **起始值**：每个字符 `<div style="display: inline-block;">`，内联 `opacity: 0`、`transform: translateX(10px)`、`transition-delay: index*0.08 + 0.3 s`；若该字符是空格再额外 `min-width: 10px`
- **结束值**：`opacity: 1`、`transform: translateX(0)`
- **时长**：`1s`（`.each_animate div { transition: 1s }` —— 未写属性名，等价 `all 1s ease`）
- **缓动**：`ease`（未显式声明）
- **是否 scrub**：否，加载后一次性播放
- **滚动区间**：无
- **字符延迟实测**：第一段「坚持长期主义」6 字 → `0.3 / 0.38 / 0.46 / 0.54 / 0.62 / 0.70 s`；第二段 12 字同规律，末端 `0.3 + 11*0.08 = 1.18 s`
- **移动端 ≤1024px 降级**：**完全相同**（`function.js:4440-4443` 手机分支同样 `setTimeout(…,10)` 加 `.on`）；但 ≤820px 时标题字号改为 `24px!important`（`index.css:1615-1621`）
- **证据源**：
  - `sources/function.js:4703-4755` `each_animate()`：`let delay = index * 0.08 + 0.3;`、`'opacity': '0'`、`'transform': 'translateX(10px)'`、空格 `'min-width': '10px'`
  - `sources/style.css:1241-1248` `.each_animate div { transition: 1s }` / `.each_animate.on div { opacity:1 !important; transform:translateX(0) !important }`
  - `sources/function.js:4439-4463` 桌面 `setTimeout(…,10)`、手机 `setTimeout(…,10)`
  - 实测 `frames/capture-entrance.json`（逐字 `transitionDelay` / `transitionDuration: 1s` / `transitionTimingFunction`，截帧 `frames/entrance/ent-0200ms.png` …）

## M-11 客户墙纵向轮播（12 个独立 Swiper 实例）

- **编号**：M-11
- **名称**：`.index1 .content .picture .img .swiper` 纵向循环轮播
- **触发条件**：Swiper 初始化即 autoplay，永久循环
- **起始值**：`realIndex = 0`（实测起测时已在第 3 张，见下）
- **结束值**：循环递增，`realIndex` 在 `0 → slots-1` 间回绕
- **时长**：`speed: 800`（单次换页过渡 800 ms）
- **缓动**：Swiper 默认 `ease`（未配置 `easing`）
- **是否 scrub**：否（与滚动无关，纯定时器）
- **滚动区间**：无
- **间隔**：`autoplay.delay: 3500` ms。实测 12 例同步步进采样：t=0 → real `2`；t=1505 → `0`；t=4512 → `1`；t=9001 → `2`（步进周期 ≈3.0–4.5 s，受 800 ms 过渡与页面负载影响）
- **实例构成（实测）**：共 **12** 个 Swiper 实例。前 8 个各 **3** 张真实 slide（+2 duplicate = 5）；后 4 个各 **6** 张真实 slide（+2 duplicate = 8）
- **参数（12 例一致）**：`speed 800`、`loop true`、`direction 'vertical'`、`allowTouchMove false`、`autoplay.delay 3500`
- **移动端 ≤1024px 降级**：手机客户墙为另外 4 个槽 × 6 Logo（即上表后 4 个实例）；本任务未逐槽截图，列为 GAP
- **证据源**：
  - `sources/function.js:4423-4432` `new Swiper('.index1 .content .picture .img .swiper', { speed:800, loop:true, direction:'vertical', allowTouchMove:false, autoplay:{delay:3500, disableOnInteraction:false} })`
  - 实测 `captures/deep-customers.json`（`config[0..11]`：参数、`slots`、`dupes`；`ticks[]`：12 例 `realIndex` 同步采样）

## M-12 index2 双列视差位移

- **编号**：M-12
- **名称**：`.index2 .wrap .fist .flex` 上下反向位移（左列 −0.02、右列 +0.1）
- **触发条件**：`scrollTop >= flex1` 写第一组；`scrollTop >= flex2` 写第二组
- **起始值**：`transform: none`（未达锚点时不写内联样式）
- **结束值**：
  - 第一组（`.fist:first-child`）：`.flex:first-child` → `translate3d(0, (scrollTop-flex1)*-0.02 px, 0)`；`.flex:nth-child(2)` → `translate3d(0, (scrollTop-flex1)*+0.1 px, 0)`
  - 第二组（`.fist:last-child`）：同上公式，把 `flex1` 换成 `flex2`
- **时长**：无过渡，逐帧直写（跟手）
- **缓动**：线性（系数 −0.02 / +0.1）
- **是否 scrub**：是，滚动进度驱动
- **滚动区间**：`flex1 = .index2.position().top - clientHeight/3 = 1985 - 300 = 1685`；`flex2 = .index2.position().top + .index2 .wrap .fist:first-child.height() = 4386`
- **实测校验**：y=1985 → f1 `-6` / f2 `+30`；y=3674 → `-39.78` / `+198.9`；y=4800 → f1 `-62.3`、f2 `+311.5`、f3 `-8.2834`、f4 `+41.417`；y=5925 → `-84.8 / +424 / -30.7834 / +153.917`；y=7614 → `-118.58 / +592.9 / -64.5634 / +322.817`
- **无上限、无回位**：公式没有 clamp；且未达锚点时**不写值也不复位**（样式中最后写入的位移会保留）
- **移动端 ≤1024px 降级**：`scroll_content` 仍在手机 `scroll` 事件里执行，公式照旧；但 `.index2 .wrap .fist .flex { width: 48% }`（`index.css:1671-1673`）改变列宽与高度，`flex2` 随之变化。**手机未做数值实测，列为 GAP**
- **证据源**：
  - `sources/function.js:2693-2707` 两段 `if (scrollTop >= flex1/flex2) { … css('transform','translate3d(0px,' + … + 'px,0px)') }`
  - 实测 `frames/capture-index2.json`（`samples[*].state.index2.f1..f4`）

## M-13 public_text 逐行 clip-path 擦除

- **编号**：M-13
- **名称**：`.public_text`（实心文字层逐行从左往右揭开，露出下面的 20% 黑「幽灵层」）
- **触发条件**：每个 `.public_text` 的每个 `.p:first-child p` 各自按滚动位置计算并写 `clip-path`
- **DOM 结构**（必须照抄）：`.public_text > .p + .p`，两个 `.p` 内容完全相同。第一个 `.p` 是实心层（`position:relative; z-index:55`），第二个 `.p` 是绝对定位覆盖层（`position:absolute; top:0; left:0; color: rgba(0,0,0,0.2); z-index:5`）
- **起始值**：`clip-path: inset(0 100% 0 0)`（完全遮住实心层）
- **结束值**：`clip-path: inset(0 0 0 0)`（完全揭开）
- **时长**：无 transition（`clip-path` 由 JS 逐帧直写，跟手）
- **缓动**：线性。逐段公式（`i` 为该段在 `.p:first-child` 内的 0 基序号）：
  - `dis = data-speed || 200`；`len = .p:first-child p` 数量；`all_dis = dis * len`；`ban = all_dis / len = dis`
  - `start = $(p_i).offset().top - clientHeight/1.2`；`T_i = start + i*ban`；`end_i = start + all_dis`
  - `T_i <= scrollTop <= end_i` → `clip-path: inset(0 (100 + (scrollTop-T_i)/ban*-100)% 0 0)`（**允许负值**）
  - `scrollTop <= T_i` → `inset(0 100% 0 0)`
  - `scrollTop >= end_i` → `inset(0 0 0 0)`（此分支在同一个 `each` 内、后执行，会覆盖前两个分支）
- **是否 scrub**：是，滚动进度驱动
- **滚动区间**（实测算例 1440×900）：
  - `.index1 .title.public_text`（`len=2`, `dis=200`）：p0 offset 1018 → `T0=268 / end0=668`；p1 offset 1072 → `T1=522 / end1=722`
  - `.index2 .blue.public_text`（`len=2`, `dis=200`）：p0 offset **2114.65** → `T0=1364.65 / end0=1764.65`；p1 offset 2181.65 → `T1=1631.65 / end1=1831.65`
- **实测钉值（`.index1 .title.public_text`，与公式逐点吻合）**：y=268 → `100%`；y=300 → `84%`；y=400 → `34%`；y=500 → `-16%`；y=600 → p0 `-66%` / p1 `61%`；y=700 → p0 已 `inset(0px)` / p1 `11%`；y=800 → 两段均 `inset(0px)`
- **重要实现陷阱（必读）**：`start` 每帧从**当时的渲染位置**读取。`.public_text` 自身带 `aos="fade-top"`（未 animate 时 `translate(0,50px)`），一旦 AOS 加上 `.aos-animate`，容器上移 50px，`start` 随之整体前移 50px（实测 `.blue.public_text` 的 p0 offset 从 2164 跳成 2114.65）。`.index1 .title` 从一开始就是 `aos-animate`，所以读数恒为 1018。`.index2 .blue` 还叠加了 M-12 的列位移，offset 实测在 2107.7–2114.65 间抖动（≤7px）
- **负值说明**：`inset(0 -40% 0 0)` 这类负百分比被浏览器按 0 处理，**不产生额外位移**，只是同一段落已在 `(row, end]` 区间后又继续按公式算出的数
- **移动端 ≤1024px 降级**：`.public_text { display: none !important }`；`.public_text.sj_text { display: block !important }` —— 手机改用**不擦除**的整段文案（`.sj_text`），效果完全消失
- **证据源**：
  - `sources/function.js:4593-4617`（公式全文）
  - `sources/style.css:1448-1467` `.public_text` / `.p:first-child` / `.p:not(:first-child)`
  - `sources/style.css:2655-2662` 手机 `.public_text` / `.public_text.sj_text` 切换
  - `sources/home.html:2231-2243`（index1 结构：两个 `.p` + 手机 `.sj_text`）、`sources/home.html:2600-2613`（index2 结构）
  - 实测 `captures/pt2.json`（y=200…2000 每 100px 的 p0/p1 offset 与 clip）、`captures/deep-ptdetail.json`（逐段 offset 与公式推导）、截图 `frames/publictext/pt1-*.png`、`pt2-*.png`

## M-14 index3 服务切换跟随框

- **编号**：M-14
- **名称**：`.index3 .wrap .content .l .move`（点击服务项时白框滑到该项）
- **触发条件**：`click` 于 `.index3 .wrap .content .item`
- **起始值**：`transform: none`（框在列表第 1 项位置，`top:0`）
- **结束值**：`transform: translateY(index * item.clientHeight px)` —— 实测 `item` 高 **189px**，点击第 2 项 → `matrix(1,0,0,1,0,189)`，第 3 项 → `matrix(1,0,0,1,0,378)`
- **时长**：`transition: all 0.4s`（`.move`）
- **缓动**：`ease`（未声明 timing-function）
- **是否 scrub**：否，点击触发一次
- **滚动区间**：无
- **尺寸**：`.move` `width: 800px; height: 189px; border: 1px solid rgba(193,192,180,0.97); border-radius: 5px; position: absolute; top: 0; left: 0; pointer-events: none; z-index: 2`；`:after` 左侧指示条 `width:5px; height:61px; left:-5px; top:50%; background:#184DC4; box-shadow: 10px 0 17px 0 rgba(24,77,196,0.8); transition: all 0.6s`
- **移动端 ≤1024px 降级**：`.index3 .wrap .content { display: none }`，改用 `.sj_content`；且**首页在 ≤1024px 把整个 `.index3 { display: none }`**（`home.html:1745-1747` 内联样式），所以首页手机上这个切换面板根本不存在（详见 D-02 / D-03）
- **证据源**：
  - `sources/function.js:4487-4494` `click` 处理器与 `translateY(' + index * h + 'px)'`
  - `sources/index.css:558-569` `.index3 .wrap .content .l .move` 全部尺寸
  - `sources/index.css:1372-1374` 手机 `.move` 高 157px
  - `sources/home.html:1847-1852` 首页内联 `.index3 .wrap { display: none }`
  - 实测 `frames/capture-index3.json`（强制 `.wrap` 可见后 `forcedWrap` 组：截图 `i3-10-wrap-forced-item1.png` … `i3-13-wrap-click-item3.png`，item 高 189px、`.move` 位移 189/378）

## M-15 index3 服务项文本翻动与视频切换

- **编号**：M-15
- **名称**：`.item.on .attr p` / `.attr:after` 文本上翻 + `.picture .animate_video video` 换片播放
- **触发条件**：同 M-14 的 `click`；`on(this)` 切换 `.item.on`
- **起始值**：`.attr p` `transform: translateY(0)`、`.attr:after`（`content: attr(data-text)`）隐藏；`.text { opacity: 0 }`；旧视频移除 `.on` 并 `pause()`
- **结束值**：`.item.on .attr p { transform: translateY(-100%) }`；`.item.on .attr:after { transform: translateY(0) }`；`.item.on .blue:after { color:#184DC4 }`、`.item.on .h1:after { color:#000 }`、`.item.on .text { opacity: 1 }`；目标视频 `currentTime = 0` → 加 `.on` → `play()`
- **时长**：`.item { transition: .6s }`（`.attr` 的 `:after` 与 `p` 同组过渡）
- **缓动**：`ease`
- **是否 scrub**：否，点击触发
- **滚动区间**：无
- **实测**：强制 `.wrap` 可见后点击 item2 → 视频 `1_2` 由 `paused` 变 `playing`（`currentTime` 0.86）；点击 item3 → `2_3` playing。视频均 `muted=false`、`duration ≈ 1.80–1.88s`
- **`data-text` 来源**：初始化时 `$('.index3 .wrap .content .item').find('.attr').each(...)` 把 `.attr p` 的 HTML 写进 `data-text`，供 `:after { content: attr(data-text) }` 使用
- **移动端 ≤1024px 降级**：`.index3 .wrap .content { display:none }`；首页另有 `.index3 { display:none }`（整体不可见）
- **证据源**：
  - `sources/function.js:4487-4499` 视频 `currentTime=0` / `addClass('on')` / `trigger('play')`
  - `sources/function.js:4307-4310` 写入 `data-text`
  - `sources/index.css`（`.item` / `.attr` / `.text` 相关规则，`transition: .6s`）
  - 实测 `frames/capture-index3.json`（`videos`、`attrColors`、`canvasAlert*` 字段）

## M-16 index3 三维场景相机转场

- **编号**：M-16
- **名称**：`#canvas`（Three.js，bundle 内置 r165）相机位姿转场，由 `.canvasSide .flex .item.click_list` / `.go1.click_list` 触发
- **触发条件**：`click` 于 `.click_list`；执行 `eval($(this).attr('data-click') + '()')`。`data-click="to1|to2|to3|to"` 分别对应第 1/2/3 项与返回
- **起始值**：相机初始位姿 `start_position` / `start_rotation`（它同时也是 `to()` 的归位目标，即下表第 1 行）
- **结束值**：四个目标位姿，`to1` / `to2` / `to3` 分别对应 `start_position2/3/4` 及其 `start_rotation2/3/4`（照抄用，来自 bundle.js 常量）：
  - `start_position = {x:3.943, y:2.369, z:5.36}`，`start_rotation = {x:-26.94/180*PI, y:36.43/180*PI, z:16.8/180*PI}`
  - `start_position2 = {x:2.371, y:1.833, z:1.584}`，`start_rotation2 = {x:-1.614, y:1.2402, z:1.6173}`
  - `start_position3 = {x:1.46, y:1.936, z:3.074}`，`start_rotation3 = {x:-0.2798, y:0.5972, z:0.16022}`
  - `start_position4 = {x:2.891, y:1.037, z:3.174}`，`start_rotation4 = {x:-12.13/180*PI, y:28.72/180*PI, z:5.9/180*PI}`
- **时长**：`duration: 1.5` s（`gsap.to(camera.position, …)` 与 `gsap.to(camera.rotation, …)` 各一次）
- **缓动**：`ease: "power2.inOut"`
- **是否 scrub**：否，点击触发一次
- **滚动区间**：无
- **相机初始化**：`PerspectiveCamera(45, w/h, 0.1, 1000)`，`w/h = #canvas.clientWidth/clientHeight`；渲染器 `antialias:true, alpha:true`、`setPixelRatio(devicePixelRatio)`、`setClearColor(0,0)`
- **悬停**：`pointermove` 用 `Raycaster` 命中 `group` 时把对应 `colorList[n]` 的材质色设为 `1916402`（= `0x1D3A62`）并把 `body.style.cursor = 'pointer'`
- **移动端 ≤1024px 降级**：`home.html:1745-1747` 在 ≤1024px 设置 `.index3 { display: none }`，首页三维场景整体不渲染（`bundle.js` 仍会初始化）
- **证据源**：
  - `sources/bundle.js`（单行压缩；`start_position*` / `start_rotation*` 常量、`duration=1.5`、`ease="power2.inOut"`、`to1/to2/to3/to`、`onPointerMove`、`onPointerClick`）
  - `sources/home.html:2800-2820` `.go1.click_list[data-click="to"]`、`.item.click_list[data-click="to1|to2|to3"]`
  - `sources/home.html:1847-1852`、`1745-1747` 首页内联隐藏规则
  - 实测 `frames/capture-index3.json` + 截图 `frames/index3/i3-00-asLoaded.png` … `i3-06-close-2100ms.png`

## M-17 index3 弹层与遮罩链

- **编号**：M-17
- **名称**：`.canvas_alert` 弹层 + `.canvas_alert .mask` 蓝遮罩 + `.matter` 卡片
- **触发条件**：`pointerIs(e)`，`e !== -1`（点击某服务）；关闭为 `.canvas_alert .content .matter .close` → `to()` → `pointerIs(-1)`
- **三段时序（实测）**：
  1. `t+0`：`.canvasSide .go1` 移除 `.on`；`.canvasSide .flex .item` 清 `.on` 后给第 e 项加 `.on`；`#canvas` 与 `.canvasSide` `pointer-events: none`；`.canvas_alert` 加 `.on`
  2. `t+1200ms`（`setTimeout`）：`.canvas_alert .matter` 第 e 项加 `.on`；`#canvas`/`.canvasSide` 恢复 `pointer-events: auto`
  3. 关闭时：`.go1` 加 `.on`、`.canvas_alert` 与所有 `.matter` 移除 `.on`、`#canvas` 先 `pointer-events:none`，1200 ms 后恢复
- **起始值**：`.canvas_alert` `opacity: 0`；`.canvas_alert .mask` `opacity: 0`；`.matter` `opacity: 0; transform: translateY(20px)`
- **结束值**：`.canvas_alert.on` `opacity: 1; pointer-events: auto`；`.canvas_alert.on .mask` `opacity: 1`；`.matter.on` `opacity: 1; transform: translateY(0)`
- **逐元素完整声明（起始 → 结束）**：
  - `.canvas_alert`：`position: fixed`、`opacity: 0`、`transition-delay: .7s` → `.on { opacity: 1; pointer-events: auto }`。实测点击后 700 ms `opacity = 1`（`display:flex`）
  - `.canvas_alert .mask`：`background: rgba(24,77,196,0.3)`、`opacity: 0`、`transition: .3s` → `.on .mask { opacity: 1; transition-delay: 1.2s }`
  - `.matter`：`width:640px; height:360px; background:#fff; border-radius:20px; border-top:5px solid #184DC4; padding:0 68px; opacity:0; transform: translateY(20px); transition: 1s` → `.matter.on { opacity: 1; transform: translateY(0) }`。实测 2000 ms 时 `opacity 0.996`、`translateY(0.078px)`
- **时长**：`.canvas_alert` 未声明 transition（只声明 `transition-delay: .7s`）；`.mask` `0.3s`（延迟 1.2s）；`.matter` `1s`
- **缓动**：`ease`
- **是否 scrub**：否
- **滚动区间**：无
- **初始 display**：`.canvas_alert` 内联 `style="display: none;"`，由 `home.html` 内联 `setTimeout(…,100)` 改为 `display: flex`，同时 `$('body').css('opacity','1')`、`$('.start_mask').hide()`
- **移动端 ≤1024px 降级**：随 `.index3` 整体 `display:none`，弹层无触发源（`.canvas_alert` 本身仍在 DOM）
- **证据源**：
  - `sources/bundle.js` `pointerIs(e)` 全文
  - `sources/home.html:2059-2162` `.canvas_alert` / `.mask` / `.matter` / `.close` 样式
  - `sources/home.html:3477-3482` `setTimeout(…,100){ $('.canvas_alert').css('display','flex'); $('body').css('opacity','1'); $('.start_mask').hide() }`
  - 实测 `frames/capture-index3.json`（`canvasAlertOpacity`、`canvasMatterOn`）+ 截图 `i3-01-click-item1-700ms.png`、`i3-02-click-item1-2000ms.png`、`i3-05-close-700ms.png`、`i3-06-close-2100ms.png`

## M-18 index4 高度注入

- **编号**：M-18
- **名称**：`.index4` 被写入 `height = clientHeight + 7000px`
- **触发条件**：在 `scroll_content()` 内，**每次滚动都会执行**（不是一次性初始化）
- **起始值**：`.index4 { height: 100vh }` = 900px（CSS 值，首次加载时未生效）
- **结束值**：内联 `style="height: 7900px;"`（= 900 + 7000）；`.scroll-content` 总高由 11265px 变为 18265px
- **时长**：无过渡，直接写内联样式
- **缓动**：—
- **是否 scrub**：否（是尺寸注入，为后面的 scrub 提供行程）
- **滚动区间**：—
- **关键耦合（实测）**：首次加载 `limit.y = 10151`；一次真实滚轮后 `.index4` 变 7900px、`limit.y` 刷新到 **10365**；连续滚动后 MutationObserver 把 `limit.y` 推到 **17365**（= 18265 − 900）。**纯程序化 `scrollTo` 不会触发这次刷新**，所以取数必须在真实滚轮之后
- **移动端 ≤1024px 降级**：`.index4 { height: auto !important }`（`!important` 覆盖 jQuery 写的内联高度），`scroll-content` 高不受影响
- **证据源**：
  - `sources/function.js:2710-2711` `var index4_h = clientHeight + 7000; $('.index4').css('height', index4_h + 'px')`
  - `sources/index.css:1484-1486` 手机 `.index4 { height: auto!important }`
  - 实测 `frames/capture-index4.json`（`index4.sectionInline = "height: 7900px;"`、`sectionH = 7900`、`nextTop = 16413`）、`captures/damp2.json`（单次滚轮后 `limitY = 10365`）

## M-19 index4 mask 停顿动画（负 animation-delay 做 scrub）

- **编号**：M-19
- **名称**：`.index4 .mask`（黑色遮罩图的 `mask_` 缩放动画，用负 `animation-delay` 当作进度条）
- **触发条件**：`scrollTop >= index4_start` 时写 `animation-delay`；`scrollTop <= index4_start` 时写 `0`
- **起始值**：`animation-delay: 0s`；`transform: scale(1.05)`
- **结束值**：`animation-delay: (scrollTop - index4_start)/5000*-8 + 's'`，动画关键帧末值 `transform: scale(300)`
- **时长**：`animation: 10s mask_ cubic-bezier(0.79, 0.06, 0.33, 0.94) forwards`，且 `animation-play-state: paused`（永远暂停，全靠负 delay 定位）
- **缓动**：`cubic-bezier(0.79, 0.06, 0.33, 0.94)`
- **是否 scrub**：**是**。映射关系：`delay = -(scrollTop-8513.53)/5000*8` 秒
- **滚动区间**：
  - `index4_start = 8513.53`（实测 `.index4.position().top`）
  - 滚动 5000px（y 8513.53 → 13513.53）跑完动画的 80%（delay 0 → −8s）
  - 动画跑满 100%（`scale(300)`）需 delay = −10s，对应 y ≈ **14763.5**
  - 末期 `if (scrollTop >= .index4.next().position().top - clientHeight)` 分支强行把 delay 写回 `-8s`，实测阈值 ≈ 15513.53
- **实测钉值**：y=8512 → `0s` / `scale(1.05)`；y=10613 → `-3.35915s` / `35.5621`；y=12013 → `-5.59915s` / `166.155`；y=13413 → `-7.83915s` / `280.417`；y=15513 → `-11.1991s` / `300`；y=17365（钳制分支生效）→ `-8s` / `283.229`
- **遮罩外观（实测截图测量）**：`mask.svg` 是黑色面板 + 中间一条竖向透明开槽。`frames/index4/index4-030.png` 第 100/220/340/820 行实测开槽 x 569–870（宽 **302px**，中心 719.5，scale=35.5621）→ 反推 scale=1.05 时开槽宽 ≈ 8.9px。截帧 `index4-000.png` 另可见左右各一条同宽开槽（三条竖槽）
- **移动端 ≤1024px 降级**：`.index4 .mask { display: none }`（同时 `home.html` 内联 `@media (max-width:1024px){ .index4 .mask { display: none!important } }`），手机上整个擦除效果不存在，改用静态图 `.sj_bg`
- **证据源**：
  - `sources/function.js:2712-2726`（`v` 计算、三条 `if` 分支）
  - `sources/index.css:677-696` `.index4 .mask` 与 `@keyframes mask_`
  - `sources/home.html:1729-1731` `.index4 .mask { display: block!important }`、`sources/home.html:1750-1752` 手机 `display: none!important`
  - 实测 `frames/capture-index4.json`（`maskDelay` / `maskTf` / `maskPlay: paused`）、`frames/capture-global.json` `samples`（y=17365 的 `-8s` / `283.229`）；截帧 `frames/index4/index4-000/030/050/070/100.png`

## M-20 index4 背景图位移

- **编号**：M-20
- **名称**：`.index4 .bg` 纵向位移
- **触发条件**：`scrollTop >= index4_start`
- **起始值**：`transform: translateY(0px)`
- **结束值**：`translateY((scrollTop-index4_start)/(index4_h - clientHeight) * -px px)`，其中 `px = .bg.height - clientHeight`
- **实测参数**：`.bg` 实测高 **1006.36px** → `px = 106.36`；`index4_h - clientHeight = 7900 - 900 = 7000`
- **时长**：无过渡，逐帧直写
- **缓动**：线性
- **是否 scrub**：是
- **滚动区间**：y ∈ [8513.53, 15513.53]（7000px）映射 `0 → -106.36px`
- **实测钉值**：y=10613 → `-31.8999px`；y=12013 → `-53.1719px`；y=13413 → `-74.4439px`；y=15513 → `-106.352px`；y=17365（钳制分支）→ `-106.36px`
- **移动端 ≤1024px 降级**：`.index4 .bg { position: static; transform: none !important; min-height: 357px }` + `.index4 .bg { height: 357px }`；且 `.sj_bg { display: block }`、`.bg { display: none }`
- **证据源**：
  - `sources/function.js:2714-2715` `var px = $('.index4 .bg').height() - clientHeight; var y = (scrollTop - index4_start) / (index4_h - clientHeight) * -px`
  - `sources/function.js:2718` / `2725` 写 `translateY`
  - `sources/index.css:1495-1499`、`1586-1588` 手机覆盖
  - 实测 `frames/capture-index4.json`（`bgH: 1006`、`bgTf`）

## M-21 index4 `.fix` 固定位移（data-view="auto"）

- **编号**：M-21
- **名称**：`.index4 .fix[data-view="auto"]` 跟随滚动的位移（等效「固定视口」）
- **触发条件**：`scrollTop_start()` 的 `data-view="auto"` 分支（桌面每次滚动，延迟 100 ms）
- **起始值**：`transform: translate(0px, 0px)`
- **结束值**：`transform: translate(0px, (scrollTop - start_distance) px)`，钳制到 `end_value = section.height - clientHeight = 7000`
- **时长**：无过渡（逐帧直写）；另注意 `data-view` 分支不写 `filter`，而 `.fix` 的内联里一直带着 `filter: blur(0px)`
- **缓动**：线性
- **是否 scrub**：是
- **滚动区间**：`start_distance = section.position().top + data-distance(0) = 8513.53`；`end = section.next().position().top - clientHeight = 16413.53 - 900 = 15513.53`
- **实测钉值**：y=10613 → `translate(0px, 2099.47px)`；y=12013 → `3499.47px`；y=13413 → `4899.47px`；y=15513 → `6999.47px`；y=17365 → `7000px`（钳制）
- **移动端 ≤1024px 降级**：`.index4 .fix { height: auto; transform: none !important }`，且手机端**根本不调用** `scrollTop_start`（见 M-02）
- **证据源**：
  - `sources/function.js:5251-5266` `data-view === 'auto'` 三分支与 `end_value`
  - `sources/function.js:5133-5147` `start` / `start_distance` / `end` / `end_value` 定义
  - `sources/home.html:2950` `<div class="fix" data-view="auto">`
  - `sources/index.css:1487-1490` 手机覆盖
  - 实测 `frames/capture-index4.json`（`fixInline`、`fixTf`）

## M-22 index4 文案淡出 / 缩放（data-view 线性插值）

- **编号**：M-22
- **名称**：`.index4 .text` 两组文案的 opacity / scale 滚动插值
- **触发条件**：同 M-21（`data-view` 引擎），**每组各有两个 `[data-view]` 节点：外层 div 管 opacity，内层 p 管 scale + opacity**
- **起始值**：两组外层 `opacity: 1`；两组内层 `scale: 0.9` 且 `opacity: 0`
- **结束值**：两组外层 `opacity: 0`；两组内层 `scale: 1` 且 `opacity: 1`
- **各组完整属性（照抄 `home.html:2956-2963`）**：
  - 第 1 组外层：`data-view data-distance="4000" data-animate="1000" data-opacity="1,0"`
  - 第 1 组内层：`p data-view data-distance="3000" data-animate="1000" data-scale="0.9,1" data-opacity="0,1"`
  - 第 2 组外层：`data-distance="6000"`；内层：`data-distance="5000"`，其余同上
- **时长**：`data-animate = 1000`（每 1000px 滚动跑完一次插值）
- **缓动**：**线性**（这些节点**没有** `data-ease` 属性。源码里只有 `data-ease=""` 空串才走 `easeOutQuad(t) = t*(2-t)`）
  - opacity：`start + (scrollTop-start_distance)/animate_end * ((start-end)*-1)`
  - scale：`start + (scrollTop-start_distance)/animate_end * ((start-end)*-1)`
- **是否 scrub**：是
- **滚动区间**（`sectionTop = 8513.53`）：
  - 第 1 组外层 `start_distance = 12513.53`，`[0,1) → opacity 1→0`
  - 第 1 组内层 `start_distance = 11513.53`，`[0,1) → scale 0.9→1`
  - 第 2 组外层 `start_distance = 14513.53`；内层 `13513.53`
- **实测钉值**：y=12013 → 第 1 组内层 `scale 0.949947`（公式 0.9 + 0.4995×0.1 ✓）；y=13413 → 第 1 组外层 `opacity 0.100531`（= 1 − 0.89947 ✓）、内层 scale 已满 1；y=15513 → 第 1 组外层 `opacity 0`、第 2 组外层 `opacity 0.00053125`（= 1 − 0.99947 ✓）
- **位置**：`.index4 .text { position:absolute; left:50%; top:57%; transform: translate(-50%,-50%); font-size:50px; color:#FFFFFF; text-align:center; white-space:nowrap; pointer-events:none; z-index:5 }` —— 在 `.fix` 内部，所以随 M-21 一起被位移，视觉上是定在视口内的
- **移动端 ≤1024px 降级**：`.index4 .text { position: static; transform: none!important; font-size: 17px }`、`.index4 .text > div { opacity: 1!important }`、`.index4 .text p { opacity: 1!important }`、`.index4 .sj_jump { position:absolute; width:100%; top:55px; left:50%; transform: translateX(-50%) }`。加上手机不跑 `data-view` 引擎，文案完全静态
- **证据源**：
  - `sources/home.html:2955-2966` 两组的全部 `data-*`
  - `sources/function.js:5144`（`start_distance`）、`5155-5168`（scale）、`5200-5211`（opacity）、`5160/5205`（`ease === ''` 才用 `easeOutQuad`）
  - `sources/index.css:663-675`（桌面 `.text`）、`1500-1516`、`1582-1584`（手机覆盖）
  - 实测 `frames/capture-index4.json`（`t1` / `t2` 的 `o`、`sc`）

## M-23 data-view 通用插值引擎

- **编号**：M-23
- **名称**：`scrollTop_start()` 的 `[data-view]` 引擎（通用滚动插值）
- **触发条件**：桌面每次滚动后 100 ms（`scroll_content` 的 `setTimeout`）；**手机不执行**
- **可用属性**：`data-view`（`"auto"` 走特殊分支）、`data-distance`、`data-distance-end`、`data-unit="vh"`、`data-animate`、`data-ease`、`data-x`、`data-y`、`data-scale`、`data-opacity`、`data-blur`
- **起始值**：各属性 `"起,止"` 的**前者**；无该属性时用默认（scale/x/y 默认 `1` / `0,0` / `0,0`；opacity 默认不写；blur 默认 `0`）
- **结束值**：各属性 `"起,止"` 的**后者**；无该属性时默认与起始值相同
- **时长**：由 `data-animate` 决定（滚动像素数，不是时间）
- **缓动**：`data-ease` **缺省 → 线性**；`data-ease=""`（空串）→ `easeOutQuad(t) = t*(2-t)`（`function.js:5270-5272`）
- **是否 scrub**：是
- **滚动区间**：
  - `start_distance = $(ele).parents('section').position().top + data-distance`（缺省 0）
  - `end = section.next().position().top - clientHeight`；`end_value = section.height() - clientHeight`
  - `data-distance-end` 非空时：`vh = clientHeight/10 * (data-distance-end/10)`，`end += vh`、`end_value += vh`
  - `data-unit="vh"` 且 `data-distance` 含 `-` 时：`distance = -clientHeight/10 * (distance*-1/10)`
- **三分支**：`start_distance <= scrollTop < start_distance+animate_end` 写插值；`scrollTop < start_distance` 写起始值；`scrollTop >= start_distance+animate_end` 写结束值
- **首页实际用量**：`[data-view]` 节点 **5 个**，全部在 `.index4`（`.fix` 的 `auto`、两组文案各 2）
- **移动端 ≤1024px 降级**：**整个引擎不运行** —— `scroll_content()` 里延迟调用 `scrollTop_start` 的那一段只在桌面走（`function.js:4580-4585`，手机不调用 `scrollTop_start`）。所以 `[data-view]` 节点在手机上永远停在初始状态，必须靠各元素自己的手机端 CSS 兜底（例：M-22 的 `.index4 .text > div { opacity: 1!important }`）
- **证据源**：`sources/function.js:5128-5272`（`scrollTop_start` 与 `easeOutQuad` 全文）；实测 `frames/capture-index5.json`（`dataViews: []`，证明 index5 无 data-view）

## M-24 AOS 通用入场

- **编号**：M-24
- **名称**：`[aos]` 元素进入视口后淡入/上移
- **触发条件**：自定义 `AOS.init()`（本站在 `function.js:13-33` 自行实现，不是 aos 库）：`offset = el.getBoundingClientRect().top - clientHeight + all_num`，`offset < 0` 加 `.aos-animate`
- **起始值**：`[aos^=fade] { opacity: 0 }` + 变体位移（见下）
- **结束值**：`.aos-animate { opacity: 1 }` + `transform: translate(0,0)`
- **时长**：`transition-duration: 1.5s`（`body [aos]`）
- **缓动**：`cubic-bezier(.175, .885, .32, 1.275)`（回弹式 ease-out-back）
- **是否 scrub**：否，进入视口触发一次；`once: true`，触发后**不再移除**（`function.js:23-25` 的移除分支只在非 once 时执行）
- **滚动区间**：触发阈值 = 元素顶到 `clientHeight - all_num`。`all_num = 150`（`clientWidth > 1024`），手机 `all_num = 0`。**即桌面提前 150px 触发，手机要等元素真正进入视口**
- **变体（`main.css:103-160`）**：`fade-top` → `translate(0,50px)`；`fade-top_` → `translate(0,150px)`；`fade-left` → `translate(-50px,0)`；`fade-right` → `translate(50px,0)`；`fade-in` → 仅 opacity
- **延迟表（`main.css:16-101`）**：`aos-delay="100"` → `transition-delay: .1s`，`"200"` → `.2s`，逐百递增至 `"2000"` → `2s`
- **首页实际用量**：`[aos]` 共 **54** 个，属性值只有 `fade-top` 与空串 `aos=""`；`aos-delay` 只有 `100` / `200` / 无
- **触发进度实测（`.aos-animate` 计数）**：y=0 → 16/54；y=5210 → 39/54；y=8683 → 49/54；y=12156 → 49/54；y=17365 → 54/54。index5 段：y=16014 → 51/54；y=16387 → 54/54
- **移动端 ≤1024px 降级**：**仍然运行**（`scroll_content` 里调用 `AOS.init`），但 `all_num = 0`。实测 390 视口：y=2662 → 26/54；y=4436 → 37/54；y=6210 → 46/54；y=8872 → 54/54。另 `document.body.clientWidth <= 100` 时会走 `execution()` 直接移除 `aos` / `aos-delay` 属性（`function.js:27-30`）
- **证据源**：`sources/function.js:9-12`、`13-33`、`4583`；`sources/main.css:2-160`；实测 `frames/capture-global.json`（`aos.total/anim`）、`frames/capture-index5.json`、`captures/deep-mobile.json`（`states[*].aos`）

## M-25 AOS `fade-clip` 变体（保留可复用实现）

- **编号**：M-25
- **名称**：`[aos=fade-clip]` 擦除式入场
- **触发条件**：同 M-24
- **起始值**：`opacity: 1!important`、`clip-path: inset(0 100% 0 0)`、`transition: 2s!important`（**覆盖 M-24 的 1.5s**）
- **结束值**：`clip-path: inset(0 0% 0 0)`
- **时长**：`2s`
- **缓动**：继承 `body [aos]` 的 `cubic-bezier(.175, .885, .32, 1.275)`
- **是否 scrub**：否
- **滚动区间**：同 M-24
- **首页使用情况**：**首页 0 个**（属性值只有 `fade-top` 与空串）。作为可复用变体记录，供 B/C 在其他页面照抄
- **移动端 ≤1024px 降级**：同 M-24
- **证据源**：`sources/main.css:124-132`

## M-26 `.headline .line` 横线展开

- **编号**：M-26
- **名称**：`.index1 .wrap .content .headline .line`（「我们的客户」左侧细线）
- **触发条件**：父级 `.headline` 拿到 `.aos-animate`（即 `[aos]` 入场，同 M-24）
- **起始值**：`transform: scaleX(0)`；`flex:1; height:1px; background:#ADADAD; transform-origin: left`
- **结束值**：`transform: scaleX(1)`
- **时长**：`transition: 2s`
- **缓动**：`ease`（`transition: 2s` 未写属性名与曲线 → `all 2s ease`）
- **是否 scrub**：否
- **滚动区间**：跟随 M-24 的父级触发阈值
- **实测**：computed `transitionDuration: 2s`、`transform-origin: 0px 0.5px`；1440 下 `.line` 宽 856px、高 1px；390 视口宽 265px
- **移动端 ≤1024px 降级**：无专门覆盖规则，随父级照常播放；≤820px 时 `.index1 .wrap { max-width: 90% }` 改变宽度
- **证据源**：`sources/index.css:250-261`；实测 `frames/capture-global.json` `samples[*].state.cursor`/`aos.rows` 与 `captures/deep-mobile.json`（`.headline .line` 尺寸）

## M-27 自定义光标跟随（GSAP 指数逼近）

- **编号**：M-27
- **名称**：`.fixed_cursor .cursor` 跟随鼠标
- **触发条件**：`document.body` 的 `mousemove` 写入目标点；`gsap.ticker.add()` 每帧逼近
- **起始值**：光标初始停在视口中心 `r = {x: window.innerWidth/2, y: window.innerHeight/2}`；`gsap.set(e, {xPercent:-50, yPercent:-50})`
- **结束值**：`r → o`（鼠标坐标），用 `gsap.quickSetter(t,"x","px")` / `("y","px")` 写 `transform`
- **时长**：无固定时长（指数逼近）。**系数**：`speed = data-speed/10`，属性缺失时 `0.9`；首页实测 `data-speed="8"` → **0.8**
- **缓动**：逐帧 `e = 1 - Math.pow(speed, gsap.ticker.deltaRatio()); r.x += (o.x - r.x)*e`
- **是否 scrub**：否，鼠标驱动
- **滚动区间**：无
- **实测**：鼠标移到 (1100,700) 后稳定在 `transform: translate(-50%, -50%) translate(1100px, 700px)`，1.2 s 收敛
- **外层样式**：`.fixed_cursor { position:fixed; top:0; left:0; z-index:99999; pointer-events:none; transition:.6s; transition-delay:.6s; mix-blend-mode: exclusion }`；`.cursor { opacity: 0; transition: opacity .3s }`；`body:hover .cursor { opacity: 1 }`
- **移动端 ≤1024px 降级**：`.fixed_cursor { display: none }`（实测 390 / 1024 视口 computed `display: none`；1025 视口 `display: block`、20×20）
- **证据源**：
  - `sources/function.js:4757-4785` `MouseFollow()` 全文（含 `speed === null ? speed = 0.9 : speed = speed / 10`）
  - `sources/style.css:1053-1068`；`sources/style.css:2456-2458` 手机隐藏
  - 实测 `frames/capture-cursor.json`、截帧 `frames/cursor/cur-00-rest.png` … `cur-04-moveB-settled.png`

## M-28 自定义光标点击波纹

- **编号**：M-28
- **名称**：`.fixed_cursor .cursor .whole .bor` 点击扩散圆环
- **触发条件**：`mousedown`（在 `document` 上）→ `.whole` 加 `.on` 并 `do_div()`
- **起始值**：`.bor { width:200%; height:200%; border:1px solid #ece9e8; opacity:.3; transform: translate(-50%,-50%) scale(0.2) }`
- **结束值**：`.bor.on { transform: translate(-50%,-50%) scale(1) }` → 250 ms 后 `.bor.hide { opacity: 0 }` → 再 300 ms `remove()`
- **时长**：`.bor { transition: ease .5s }`（扩展 500 ms）；`setTimeout` 序列 **+10 ms 加 `.on`、+250 ms 加 `.hide`、+300 ms 后 `remove()`**
- **缓动**：`ease`
- **是否 scrub**：否
- **滚动区间**：无
- **`.whole` 本体的按下态**：`.whole { width:20px; height:20px; transition:.3s }`；`:after` 白色圆 `transition: all .25s ease-out`；`:before` 120% 圆环 `border:1px solid #ece9e8`、`transition: all .3s`。`.whole.on:after { transform: scale(0.5) }`、`.whole.on:before { opacity:.3; transform: translate(-50%,-50%) scale(1) }`
- **`mouseup`**：移除 `.whole.on`；若按住时长 `> 300ms` 再 `do_div()` 一次
- **移动端 ≤1024px 降级**：整个 `.fixed_cursor { display: none }`
- **证据源**：`sources/function.js:4787-4816`；`sources/style.css:1070-1131`；截帧 `frames/cursor/cur-05-mousedown.png`、`cur-06-mouseup-ripple.png`、`cur-07-ripple-hide.png`、`cur-08-ripple-removed.png`

## M-29 自定义光标 `.cut` 变形态

- **编号**：M-29
- **名称**：`.fixed_cursor.cut`（悬停可点区域时光标变小并展开「探索更多」圆盘）
- **触发条件**：`mouseenter` / `mouseleave` 于 `.public_hover .item .img`、`.public_hover .background`、`.item_hover`
- **起始值**：`.whole { opacity: 1; transform: scale(1) }`；`.content_pro { transform: translate(-50%,-50%) scale(0); opacity: 0 }`
- **结束值**：`.cut .whole { opacity: 0; transform: scale(0) }`；`.cut .content_pro { scale(1); opacity: 1 }`
- **时长**：`.content_pro { transition: ease .3s }`
- **缓动**：`ease`
- **是否 scrub**：否
- **滚动区间**：无
- **`.content_pro` 结构**：`width/height:100%; border-radius:50%`；`::after` 蓝底 `#184DC4` + `filter: blur(10px)` + `scale(1.1)`；`.cir { animation: ants 10s linear infinite }`（`@keyframes ants { to { rotate: 360deg } }`）；`.text .end .iconfont { animation: arrowRun 5s infinite }`（`@keyframes arrowRun`：0%/14% 归位，7% 出到 `translate3d(150%,-150%,0)`，7.1% 从 `translate3d(-150%,150%,0)` 进）
- **`.fixed_cursor2`**：`mix-blend-mode: unset`；`.cursor { width:134px; height:134px }`；≤1024px 另有覆盖（`style.css:2509`）
- **首页实例实测**：`.public_hover` **4** 个、`.public_hover .item .img` **14** 个、`.item_hover` **0** 个
- **移动端 ≤1024px 降级**：`display: none`，不存在
- **证据源**：`sources/function.js:4818-4824`；`sources/style.css:1133-1278`、`1218-1237`、`2509`；实测 `frames/capture-cursor.json`

## M-30 `.hover_button` 磁吸

- **编号**：M-30
- **名称**：`.hover_button`（footer 圆形按钮被鼠标「吸引」偏移）
- **触发条件**：`mousemove` 于元素自身；`mouseout` 复位
- **起始值**：`x: 0, y: 0`
- **结束值**：`x = ((clientX - rect.left)/offsetWidth - 0.5) * strength`，`y = ((clientY - rect.top)/offsetHeight - 0.5) * strength`
- **参数实测**：首页仅 **1** 个 `.hover_button`（`footer` 里的 `.circle.hover_button`），**没有 `data-speed` 属性** → `strength2 = 50`；`offsetWidth = offsetHeight = 134`
- **时长**：`TweenMax.to(el, 1, {...})` → **1 s**
- **缓动**：`Power4.easeOut`
- **是否 scrub**：否，鼠标驱动
- **滚动区间**：无
- **实测（人为把光标推到相对中心偏移 0.5，理论极值 25px）**：t+150 ms → 11.41px；t+500 ms → 19.29px；t+1200 ms → 19.96px（Power4 尾段极慢）；反向 `translate(-20.1351px, -20.1648px)`；`mouseout` 后 t+200 ms → `-6.354px`，t+1500 ms → `translate(0px, 0px)`
- **复现注意**：`page.mouse.move()` **不触发**该监听（实测 transform 恒为 `none`），必须用 `el.dispatchEvent(new MouseEvent('mousemove', {clientX, clientY, bubbles:true}))`；`mouseout` 同理
- **移动端 ≤1024px 降级**：`.hover_button` 仍在 DOM，但触屏无 `mousemove`；`footer .position_circle` 布局按手机样式重排
- **证据源**：`sources/function.js:4341-4367`；实测 `frames/capture-cursor.json`（`hoverButton` / `hoverButtonInside`）、截帧 `frames/magnetic/magnetic-rest.png`、`magnetic-br-150ms.png`、`magnetic-br-500ms.png`、`magnetic-br-1200ms.png`、`magnetic-tl-1200ms.png`、`magnetic-out-200ms.png`、`magnetic-out-1500ms.png`

## M-31 footer 圆形按钮 hover 发光

- **编号**：M-31
- **名称**：`footer .position_circle .circle` 悬停发光
- **触发条件**：CSS `:hover`
- **起始值**：`:before { background: #184DC4; transform: none; filter: none }`
- **结束值**：`:hover::before { filter: blur(10px); transform: scale(1.1) }`
- **时长**：`transition: all .4s`
- **缓动**：`ease`
- **是否 scrub**：否
- **滚动区间**：无
- **同元素持续动画**：`.cir img { animation: ants 10s linear infinite }`（360° 匀速旋转）；`.text .iconfont { animation: arrowRun 5s infinite }`（箭头 5s 一轮跑出再跑入）
- **容器尺寸实测**：`footer .position_circle` = 134×134
- **移动端 ≤1024px 降级**：hover 在触屏无效；旋转/箭头动画仍运行
- **证据源**：`sources/style.css:819-903`（`.position_circle .circle` 及其 `:before` / `:hover::before`）、`style.css:1254-1278`（`arrowRun` / `ants`）；截帧 `frames/magnetic/footer-hover-out.png`、`footer-hover-inside.png`

## M-32 侧边浮动工具出现与回顶

- **编号**：M-32
- **名称**：`.fixed_side` 浮出 + `.item.ClickTop` 回顶
- **触发条件**：`scrollTop >= 300` 加 `.on`，否则移除
- **起始值**：`opacity: 0; pointer-events: none`
- **结束值**：`opacity: 1; pointer-events: auto`
- **时长**：`transition: .6s`
- **缓动**：`ease`
- **是否 scrub**：否（阈值类名切换）
- **滚动区间**：`[0, 300)` 隐藏；`[300, limit.y]` 显示。实测 y=0 → class `fixed_side`；y=767 → `fixed_side on`
- **尺寸与外观**：`position:absolute; right:10px; bottom:150px; z-index:9999; width:57px; background:#FFFFFF; border-radius:29px; border:1px solid #D7D7D7; padding:5px 0 10px 0`
- **回顶**：`.item.ClickTop` 点击 → `scrollbar.scrollTo(0, 0, 1200)`（**1200 ms**，走 M-01 的惯性）
- **主题切换**：`.item.mode` 下两个子项切换亮/暗
- **移动端 ≤1024px 降级**：`.fixed_side { display: none !important }`（实测 390 / 1024 视口 `display: none`）
- **证据源**：`sources/function.js:4642-4646`；`sources/function.js:5079-5081`（回顶 1200 ms）；`sources/function.js:5045-5055`（主题子项）；`sources/style.css:2064-2082`；`sources/style.css:2471-2473`（手机隐藏）；实测 `frames/capture-global.json`（`fixedSideCls` 在 5 个采样点的取值）

## M-33 亮/暗主题切换

- **编号**：M-33
- **名称**：`.header .r .sun` 太阳/月亮切换 `body#Pattern`
- **触发条件**：点击图标；亮色 `body` 无 id，暗色 `body#Pattern`；切换写入 `sessionStorage.Pattern` 与 `sessionStorage.ifTime='false'`（手动覆盖）
- **起始值**：按浏览器本地时间初始化；参考站分界 **08:00 / 19:00**
- **结束值**：`body#Pattern` + `pattern.css` 覆盖层生效
- **时长**：`pattern.css` 内各元素过渡，另 `.header` 继承 `.6s`
- **缓动**：`ease`
- **是否 scrub**：否
- **滚动区间**：无
- **⚠️ 与本项目已确认差异（不许照抄）**：本项目主题时段为 **07:00 / 19:00 + 手动选择到下一个边界到期**；参考站是 08:00 / 19:00 且 `sessionStorage.ifTime` 一旦设置即永久覆盖。以本项目为准（`docs/frontend-rebuild/REFERENCE.md` 差异 V04）
- **移动端 ≤1024px 降级**：图标位置与尺寸随手机 header 重排（header 高 60px）
- **证据源**：`sources/function.js:4986-4987`（8 / 19）、`sources/function.js:5023-5043`（手动覆盖与 `sessionStorage`）、`sources/pattern.css`；实测 `frames/capture-global.json` 的 `meta.theme`

## M-34 index5 手机横向 Swiper

- **编号**：M-34
- **名称**：`.index5 .wrap .content.sj_content .scroll_x`（手机端资讯横向滑动）
- **触发条件**：Swiper 初始化，用户可拖动；分页可点击
- **起始值**：首个 slide
- **结束值**：按 `slidesPerView: 2` 步进，`loop: true`
- **时长**：`speed: 1000`
- **缓动**：Swiper 默认 `ease`
- **是否 scrub**：否
- **滚动区间**：无
- **参数**：`speed 1000`、`spaceBetween 20`、`slidesPerView 2`、`loop true`、`pagination { el: '.swiper-pagination', clickable: true }`
- **移动端 ≤1024px 降级**：本效果**只在手机结构上存在**（`.sj_content`）；`.scroll_x { width: 160vw }`、`.item { width: 73vw; margin: 0 20px 0 0 }`、`.swiper-pagination { position: static!important; width: 90vw }`、`.swiper-pagination-bullet-active { background: #184DC4 }`、容器滚动条隐藏
- **证据源**：`sources/function.js:257-266`；`sources/index.css:1562-1580`

---

# Part B：死代码清单（**不要照实现**）

判定标准：真实浏览器里 DOM 存在但**永远不渲染 / 永远不执行 / 被更具体的规则完全覆盖**，或依赖的模块在真实浏览器中加载失败。

| 编号 | 名称 | 为什么是死代码（实测） | 证据源 |
| --- | --- | --- | --- |
| D-01 | `.orb-canvas`（PIXI 光斑） | `model.js` 从 `cdn.skypack.dev` import `pixi.js` 与 `simplex-noise`，真实浏览器报 CORS 阻断：`Access to script at 'https://cdn.skypack.dev/-/simplex-noise@v3.0.0-…' from origin 'https://www.seniorweb.cn' has been blocked by CORS policy` + `net::ERR_FAILED`，模块从未执行，canvas 无绘制（`.orb-canvas` 有盒尺寸但透明） | `sources/model.js`（全文）、`sources/home.html:2787`、`sources/home.html:3236`、`sources/home.html:3509`（`type="module"`）、`sources/style.css:1432-1441`（手机另有 `.orb-canvas { height: 12vh!important }`，`style.css:2475-2477`）；实测 console 日志见 `frames/capture-global.json` → `meta.logs` |
| D-02 | `.index3 .wrap .content`（首页桌面） | 首页内联 `home.html:1847-1852`：`.index3 .wrap { display: none }` 且 `.index3 .wrap .content .picture { display: none !important }`。实测桌面 `.index3 .wrap` computed `display: none`；`item` 只有 3 个、`picture video` 有 12 个但全不可见 | `sources/home.html:1847-1852`；实测 `frames/capture-index3.json`、强制可见截图组 `i3-10-wrap-forced-item1.png` … `i3-13-wrap-click-item3.png` |
| D-03 | `.index3 .wrap .sj_content li` 手机滚动缩放 | 该效果只在手机分支注册（`function.js:4446-4457`），但**首页在 ≤1024px 把整个 `.index3 { display: none }`**（`home.html:1745-1747`）。实测 390 / 1024 视口 `.index3` computed `display: none`，`sj_content li` 的 transform 恒为 `none` | `sources/function.js:4444-4458`、`sources/home.html:1744-1748`、`sources/index.css:1416-1448`；实测 `captures/deep-mobile.json`（`index3.display = "none"`、`sjList[*].tf = "none"`） |
| D-04 | `.index1 .inline .swiper` 文字轮播 | 该 Swiper 在 `home.html:2274` 的 `<div style="display: none">` 内。实测 `.index1 .inline` 高 0，Swiper `slides.length = 0`、`wrapRect` 0×0、`autoplay.running = true` 但 `autoplay.paused = true`、`realIndex` 恒为 **6**，60 s 内 `transform` 恒为 `none`（无可见轮播） | `sources/function.js:4412-4421`、`sources/home.html:2274-2285`、`sources/index.css:1589-1591`；实测 `captures/deep-index1text.json`；截帧 `frames/index1swiper/index1-0000ms.png` … `index1-8400ms.png` |
| D-05 | 客户墙第 9–12 槽（手机墙） | 12 个 `.img .swiper` 里后 4 个在桌面不可见；实测其 Swiper `slides.length = 0`、`realIndex` 恒为 6（初始化时容器尺寸为 0）。**前 8 槽是活的**（见 M-11） | 实测 `captures/deep-customers.json`（`config[8..11].slides = 0`） |
| D-06 | `.magnetic` 磁吸 | `function.js:4313-4320` 只取 `magnets` 并写 `strength`（缺省 20），而首页 `.magnetic` 元素数量为 **0**（`Select-String home.html -Pattern magnetic` 命中 0 行），`magnets.forEach` 空转。首页真正的磁吸是 `.hover_button`（M-30） | `sources/function.js:4313-4328`；`sources/home.html`（0 命中） |
| D-07 | `.link_transition` 页面转场 | `home.html:1658-1670` 有 11 个 `.circle`，`function.js:4858-4866` 只给它们写背景色与 `top`/`left`；真正的转场逻辑在 `function.js:4870-4899` **整块被注释**（含 `$('.link_transition').addClass('on'/'after_on')`、popstate 重放、1200ms 后跳转）。实测无任何点击行为 | `sources/home.html:1658-1670`、`sources/function.js:4858-4866`、`sources/function.js:4870-4899`（注释块） |
| D-08 | `.start_mask` 入场幕 | `home.html:1699` 的 `<div class="start_mask">` 全屏 `position:fixed; z-index: 99999999999999`，但**无背景色**，且 `home.html:3477-3482` 在加载后 100 ms 直接 `$('.start_mask').hide()`。实测 t=0 ms 起 `display: none`、`body` opacity 恒为 1 —— **没有人眼可见的入场遮罩/淡入** | `sources/home.html:1699`、`1701-1717`、`3477-3482`；实测 `captures/deep-entry.json`（`startMask.display = "none"`、`bodyOpacity = "1"`） |
| D-09 | `.index3 #canvas:after` 覆盖层 | 亮色下 `opacity: 0`（只有 `body#Pattern` 深色下 `opacity: 1`）。亮色取证期间该层不可见 | `sources/home.html:1831-1846` |
| D-10 | `view-index.js` / `cdn-index.js` 旧逻辑 | 这两份 4796 B 文件是大段注释的旧版脚本，`REFERENCE.md §4` 已标注「不可当作运行证据」 | `sources/view-index.js`、`sources/cdn-index.js`、`docs/frontend-rebuild/REFERENCE.md` §4 |
| D-11 | `bundle.js` 内其他路由的 GSAP 段 | `.matter1~4` / `.about*` / `.pro_*` / `.section_11/12` / `.sec7/9/12` 等大段逻辑属于 case/about/solution 等其他路由，**首页不生效**；`function.js:2029-2410` 另有整块被注释掉的旧 blur 逻辑 | `sources/function.js` 上述区间；实测首页无对应选择器命中 |

---

# Part C：实现速查表（照抄用）

## 时长 / 缓动 / 触发类型 一览

| 编号 | 时长 | 缓动 | scrub? |
| --- | --- | --- | --- |
| M-01 | 约 110 帧收敛 | 逐帧 `momentum *= (1-0.08)` | — |
| M-03 | 1s + 阶梯延迟 | `ease` | 否 |
| M-04 / M-05 / M-06 | .6s | `ease` | 否 |
| M-07 | 1000ms 过渡 / 4000ms→3000ms 间隔 | Swiper 默认 | 否 |
| M-08 | 无过渡（逐帧） | 线性 ×0.9 | 是 |
| M-10 | 1s + 每字 0.08s 延迟 | `ease` | 否 |
| M-11 | 800ms / 3500ms 间隔 | Swiper 默认 | 否 |
| M-12 | 无过渡（逐帧） | 线性 ×−0.02 / ×+0.1 | 是 |
| M-13 | 无过渡（逐帧） | 线性 | 是 |
| M-14 | .4s（框）/.6s（指示条） | `ease` | 否 |
| M-15 | .6s | `ease` | 否 |
| M-16 | 1.5s | `power2.inOut` | 否 |
| M-17 | .7s / .3s(+1.2s 延迟) / 1s | `ease` | 否 |
| M-19 | 10s 动画、靠负 delay 定位 | `cubic-bezier(0.79, 0.06, 0.33, 0.94)` | 是 |
| M-20 / M-21 / M-22 / M-23 | 无过渡（逐帧） | 线性（`data-ease=""` 才 easeOutQuad） | 是 |
| M-24 | 1.5s | `cubic-bezier(.175,.885,.32,1.275)` | 否 |
| M-25 | 2s | 同上 | 否 |
| M-26 | 2s | `ease` | 否 |
| M-27 | 无固定时长 | 逐帧 `1 - speed^deltaRatio` | 否 |
| M-28 | .5s 扩散 / +10/+250/+300ms 时序 | `ease` | 否 |
| M-29 | .3s | `ease` | 否 |
| M-30 | 1s | `Power4.easeOut` | 否 |
| M-31 | .4s | `ease` | 否 |
| M-32 | .6s | `ease` | 否 |
| M-34 | 1000ms | Swiper 默认 | 否 |

## 1440×900 下的关键锚点（`limit.y = 17365`）

| 名称 | 值 |
| --- | --- |
| `clientHeight` | 900 |
| `.header` 高 / `.on` 阈值 | 65.25px / 867.375px |
| `.fixed_side` `.on` 阈值 | 300 |
| `banner .parallax` 隐藏阈值 | 900 |
| `.index2` flex1 / flex2 | 1685 / 4386 |
| `.index1 .title.public_text` p0 / p1 `T` | 268 / 522（end 668 / 722） |
| `.index2 .blue.public_text` p0 / p1 `T` | 1364.65 / 1631.65（end 1764.65 / 1831.65） |
| `.index4` 高 | 7900（= 900 + 7000） |
| `index4_start` | 8513.53 |
| `.index4 .bg` 高 / 位移上限 | 1006.36px / −106.36px |
| mask delay 区间 | y 8513.53 → 13513.53 对应 `0s → −8s`；y≈14763.5 达 `scale(300)` |
| `.index4 .fix` 位移钳制值 | 7000px |
| `.index3 .wrap .content .item` 高 | 189px |
| `.hover_button` 尺寸 / strength | 134×134 / 50 |
| `.fixed_cursor` `data-speed` → 系数 | 8 → 0.8（缺失 → 0.9） |
| AOS `all_num` | 150（>1024px）/ 0（≤1024px） |

## 断点速查（实测两边都验过）

| 断点 | 实测行为 |
| --- | --- |
| `≤1024px` | `Scrollbar.destroyAll()`；`.header .nav` display:none、`.header .menu` display:block(64×38)；`.header` 高 60px；`.fixed_cursor` / `.fixed_side` / `.public_text` display:none；`.public_text.sj_text` display:block；`.index3` display:none；`.index4 .mask` / `.index4 .bg` display:none、`.index4 .sj_bg` display:block；`.index4` height auto!important；`.index4 .fix` / `.bg` / `.text` `transform:none!important`；`AOS all_num = 0`；`scrollTop_start()` 不执行 |
| `≥1025px` | 桌面全套生效；实测 1025 视口 `.fixed_cursor` display:block 20×20、`.nav` display:flex、`.menu` display:none、`.public_text` display:block、`.index3` display:block、`.index4 .mask` display:block |
| `<1024px`（严格） | 额外触发 JSMpeg `.sj_banner_video` 替换（实测 390 → 1 个；1024 → 0 个；1025 → 0 个） |
| `>1365px`（严格） | 才播放 M-03 页头入场（实测 1440 播放，1025 不播放） |
| `≤820px` | 标题 24px、`.index4 .text` 30px 等手机排版微调（`index.css:1608-1666`） |
| `clientWidth <= 100` | AOS 走 `execution()`：直接移除 `aos` / `aos-delay` 属性（`function.js:27-30`） |



