# 参考站素材接入说明（T00A）

本文件描述已入库素材（`frontend/public/assets/`）的接入约束与已核实事实。与 PRD / specs / REFERENCE / ACCEPTANCE 冲突时，以那些已确认规格与用户最新指令为准；本文件不改变任何已确认规格。

## 1. 放置位置与访问路径

| 素材组 | 仓库路径 | 运行时 URL | 数量 | 体积 |
| --- | --- | --- | --- | --- |
| 客户 Logo | `frontend/public/assets/customers/jun_1.svg` … `jun_24.svg` | `/assets/customers/jun_<n>.svg` | 24 | 354,951 B |
| 过渡视频（亮） | `frontend/public/assets/transitions/w<i>-<j>.mp4` | `/assets/transitions/w<i>-<j>.mp4` | 6 | 3,160,732 B |
| 过渡视频（暗） | `frontend/public/assets/transitions/black/<i>-<j>.mp4` | `/assets/transitions/black/<i>-<j>.mp4` | 6 | 4,858,299 B |
| banner 视频 | `frontend/public/assets/banner/banner.mp4` | `/assets/banner/banner.mp4` | 1 | 37,447,782 B |
| banner poster | `frontend/public/assets/banner/video.webp` | `/assets/banner/video.webp` | 1 | 80,738 B |

合计 45,902,502 字节。

- 文件放在 Vite 的 `public/` 下，不参与打包哈希，必须用绝对路径字符串引用（`/assets/...`），不要 `import`。构建时 `public/assets/**` 原样拷贝到 `dist/assets/**`；打包产物（带 hash 的 js/css）也在同目录，文件名不冲突，但不要把两者混淆。
- 仓库根 `frontend/public/` 下还有耘栈自有素材（`yunzhan-hero.mp4`、`logo-new.png` 等），本次未改动、未删除、未重命名。
- 保留原始文件名与原始格式：CDN 上的原始名就是 `w1-2.mp4`（亮色组）与 `1-2.mp4`（暗色组，无 `w` 前缀），未重命名、未转码、未压缩。
- 尺寸口径：24 个 SVG 只声明 `viewBox`（无 `width`/`height`），展示高度来自源站内联样式；视频字段由 MP4 box 实测（本机无 ffprobe）。

## 2. 客户 Logo 原始高度表

规则（源站实测）：

- 24 张在 PC 与移动端共用同一批、同一 DOM 顺序（jun_1 … jun_24），两端内联高度值一致。
- 各图宽高比不同，源站按每张自己的内联高度渲染。**不得统一高度**，否则标识会被拉伸变形。
- 下表「原始内联高度」是源站 `<img style="height: …">` 的原样值，同时登记在 `assets-manifest.json` 的同名字段。

| 源站序号 | 文件 | 原始内联高度 | 建议渲染高度 | viewBox (w×h) | 宽高比 | 固定换序后位置 |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | `jun_1.svg` | 32px | 32px | 95.93×32 | 2.998:1 | 8 |
| 02 | `jun_2.svg` | 23px | 23px | 104.35×23 | 4.537:1 | 3 |
| 03 | `jun_3.svg` | 16px | 16px | 158.14×14.83 | 10.664:1 | 17 |
| 04 | `jun_4.svg` | 24.5em | 24.5 px（见下方 em 说明） | 117.58×24.5 | 4.799:1 | 12 |
| 05 | `jun_5.svg` | 21px | 21px | 114.45×12.98 | 8.817:1 | 6 |
| 06 | `jun_6.svg` | 28px | 28px | 83.94×28 | 2.998:1 | 19 |
| 07 | `jun_7.svg` | 28px | 28px | 86.16×28 | 3.077:1 | 1 |
| 08 | `jun_8.svg` | 28px | 28px | 77.74×24.35 | 3.193:1 | 14 |
| 09 | `jun_9.svg` | 23px | 23px | 96.09×23 | 4.178:1 | 10 |
| 10 | `jun_10.svg` | 23px | 23px | 98.54×23 | 4.284:1 | 21 |
| 11 | `jun_11.svg` | 32px | 32px | 89.76×33 | 2.720:1 | 7 |
| 12 | `jun_12.svg` | 18px | 18px | 64.68×18 | 3.593:1 | 16 |
| 13 | `jun_13.svg` | 25.5em | 25.5 px（见下方 em 说明） | 117×25.5 | 4.588:1 | 24 |
| 14 | `jun_14.svg` | 28px | 28px | 112×28 | 4.000:1 | 4 |
| 15 | `jun_15.svg` | 19px | 19px | 110.59×19 | 5.821:1 | 22 |
| 16 | `jun_16.svg` | 20px | 20px | 95.46×20.47 | 4.663:1 | 13 |
| 17 | `jun_17.svg` | 28px | 28px | 128.74×28 | 4.598:1 | 9 |
| 18 | `jun_18.svg` | 33px | 33px | 56.69×33 | 1.718:1 | 23 |
| 19 | `jun_19.svg` | 30px | 30px | 93.42×30 | 3.114:1 | 2 |
| 20 | `jun_20.svg` | 22px | 22px | 97.54×22 | 4.434:1 | 18 |
| 21 | `jun_21.svg` | 30px | 30px | 95.42×31.11 | 3.067:1 | 15 |
| 22 | `jun_22.svg` | 23px | 23px | 86.48×22 | 3.931:1 | 20 |
| 23 | `jun_23.svg` | 22px | 22px | 92.19×22 | 4.190:1 | 5 |
| 24 | `jun_24.svg` | 14px | 14px | 123.2×13.71 | 8.986:1 | 11 |


em 两处的处理说明（重要）：

- `jun_4` 与 `jun_13` 的内联值写作 `24.5em`、`25.5em`（其余 22 张均为 px）。已核实 4 个外部样式表（style.css / index.css / main.css / pattern.css）与页面内联样式都没有给这两个 img 的任何祖先设置 `font-size`，因此桌面端它们会按 html 默认 16px 解析为 392px / 408px，与其余标识的量级不符。
- 这两个数值在数值上正好等于各自 SVG 的 viewBox 高（24.5 / 25.5），说明作者本意应为 `24.5px` / `25.5px`。建议按 24.5 / 25.5 px 渲染，并把「与源站字面 CSS 不同」记入样板验收。
- 实际渲染高度未做浏览器实测（见 §7 U1）。若验收时确认源站这两个标识确实异常巨大或被裁切，按上述 px 值渲染是本产品的有意修正。
- 宽度侧另有全局 `img:not(.none){ max-width:100%; max-height:100% }`，`min-height` 由页面内联 `14px` 覆盖 index.css 的 `25px`，因此 px 高度全部落在 14–33px 区间内时不会被容器裁剪。

源站相关样式约束（复核自 `index.css` 与页面内联 `<style>`）：

- `.index1 .wrap .content .picture { display:flex; max-width:83%; margin:47px auto 0 }`，页面内联再覆盖 `max-width:93%`。
- `.index1 .wrap .content .picture .img { max-width:150px; display:flex; align-items:center; justify-content:center }`，相邻槽 `margin:0 55px 0 0`。
- `.index1 .wrap .content .picture .img .swiper { height:40px }`（PC 槽高 40px），`.swiper-slide { display:flex; align-items:center; justify-content:center }`。
- `.index1 .wrap .content .picture img { object-fit:contain; min-height:25px }`，被页面内联的 `min-height:14px` 覆盖（同为后代选择器、页面内联样式在后 → 生效 14px）。
- `.index1 .wrap .content .picture img` 的 `object-fit:contain` 覆盖全局 `img{object-fit:cover}`。
- 移动：≤1024px 下 `.index1 .wrap .content .picture { display:none }`，`.picture.sj_picture { display:grid!important; grid-template-columns:repeat(4,1fr); gap:25px 15px }`；`.sj_picture` 容器自带 `style="display:none"`，由 JS 按断点切换显示。
- `alt`：源站 24 张全部 `alt=""`，品牌名需另行补（禁止与导航企业名单凭空对应，见 U4）；本次未补文案。

## 3. 加载失败兜底策略

通用约束：兜底只允许使用本仓库内素材与纯 CSS，不得回退到源站 URL 或第三方占位服务（FRONTEND §7「不整包加载源站第三方资源」）。

- 客户 Logo：`<img loading="lazy" decoding="async">`；`@error` 时把该槽标记为不可用并隐藏图片，但保留槽位尺寸，避免破图图标与布局跳动；不替换为文字、不拉伸。
- 过渡视频：`@error` 或 `canplay` 超时（建议 2s）→ 隐藏该视频层、保留结构，服务切换交互照常可用；不无限重试。
- 首屏 banner：`<video>` 必须同时给出 `poster`（`/assets/banner/video.webp`）；失败或超时 → 保留 poster 图层可见，不自动重试播放（源站同一张图另有独立的 `img.back` 就是同性质的兜底）。
- 节省流量 / `prefers-reduced-motion` / 触控设备：直接使用上述静态兜底，不依赖视频完成主要任务（FRONTEND §7）。
- 失败只在开发环境 console 提示，不向用户弹窗、不伪造成功状态。
- 视频统一 `muted` + `playsinline`（移动端内联播放必需），**不写 `autoplay` 原生属性**（见 §6）。

## 4. PC / 移动资源选取规则

| 素材组 | PC（>1024px） | 移动（≤1024px） | 依据 |
| --- | --- | --- | --- |
| 客户 Logo | 8 槽 × 每槽 3 张（同一批 24 张，垂直轮播） | 4 槽 × 每槽 6 张（同一批 24 张） | 首页 `.picture:not(.sj_picture)` 有 8 个 `.img`、每个 swiper 3 张；`.picture.sj_picture` 有 4 个 `.img`、每个 swiper 6 张；两端 DOM 顺序与内联高度相同 |
| 过渡视频（亮/暗） | 使用，随主题二选一 | 不加载、不下载 | ≤1024px `index.css` 内 `.index3 .wrap .content{display:none}` 与 `.index3 .wrap .content .picture{display:none}`；移动端 `.index3 .wrap .sj_content` 结构不含任何 video；首页 HTML 全部 video 只有 banner 1 条 + 过渡 12 条 |
| 首屏 banner | `banner.mp4`（静音、JS 编排播停） | 源站用 JSMpeg + `static/images/banner.ts`（未入库，G1） | `function.js` 第 4202–4217 行：`<1024px` 时 `$('.banner .swiper_banner video').remove()`，插入 `.sj_banner_video` 并以 JSMpeg 播放 `.ts` |

- 断点值只允许有一处来源（A 的公共组件/样式），页面不得各自写 `1024` 或各自判断（AGENTS.md「统一管理」）。
- 移动端 banner 建议：只用 poster（或复用同一 MP4 但**不**自动播放），避免移动网络自动拉取 37.4MB；这与源站的 JSMpeg 实现属于差异，需在样板验收登记。若用户要求与源站一致，需先按 G1 补抓 `.ts`（约 28.0MB）并评估 JSMpeg 依赖。
- 源站对 12 条过渡视频统一写了 `preload="auto"`（合计约 8.3MB）。建议实现时只在可见/即将切换时加载当前主题组内需要的那一条，不在首屏预加载全部；这是有意的性能偏差，验收时登记。

## 5. 亮暗主题与过渡资源选择

- 亮色组 `.pc`：`transitions/w<i>-<j>.mp4`；暗色组 `.hy`：`transitions/black/<i>-<j>.mp4`。两组 class 名一一对应（`1_2`、`2_1`、`1_3`、`3_1`、`3_2`、`2_3`），命名规则是「旧服务索引_新服务索引」，共 12 条对应 3 个服务之间的两个方向。
- 源站事实：两组都预置 `class="1_2 on"`；`.hy` 容器带内联 `style="display:none"`；JS 用 `.animate_video` 在两个容器间互斥切换，`pattern.css` 另有 `body#Pattern .index3 .wrap .content .picture .pc{display:none}` —— 即暗色主题显示 `.hy` 组。
- 源站主题判定用本地时间 8:00—19:00 为亮（`allTime1=8`、`allTime2=19`）。本项目已确认 19:00—07:00 为暗、手动选择保持到下一时间边界（FRONTEND §5），**不能照抄源站的 08:00 规则**；素材选择只跟随本产品的主题状态。
- 本产品服务数量与源站不同（主导航四类服务），过渡视频的索引命名来自源站，映射到本产品服务时必须在配置层显式声明（C 负责），不得用 class 字符串或标题猜测（FRONTEND §8）。

## 6. 首屏 banner 播放编排（源站事实）

- 原始标记：`<video src="/static/video/banner.mp4?v=1" muted="" class="back" preload="metadata" poster="/static/images/video.webp">`。**原生 `autoplay` 不存在、`loop` 不存在**；`muted`、`preload="metadata"`、`poster` 由标记给出。
- JS 编排（`function.js?v=10.91` 第 4065–4100 行）：`new Swiper('.banner .swiper', { speed:1000, effect:'fade', allowTouchMove:false, autoplay:{ delay:4000, disableOnInteraction:false } })`；
  - `init`：第一个 slide 有 video 则 `this.autoplay.stop()` 且 `video.play()`；给每个 video 绑 `ended` → `slideNext()`（即“播完切下一张”）。
  - `slideChange`：上一张 video `pause()`；500ms 后新旧 video `currentTime` 归零；新 slide 有 video 则停止 Swiper autoplay 并 `video.play()`，否则 `autoplay.start()`。
  - 结论：**由 JS 编排播停、播完即切张**；不得写成“自动循环播放”。
- 移动端差异：`<1024px` 时 JS 移除该 MP4 改用 JSMpeg 播放 `static/images/banner.ts`，配置 `{ loop:true, autoplay:true, audio:false, volume:0 }`。不要把移动端的 autoplay/loop 当作桌面端事实；该 `.ts` 未入库（G1）。
- 素材事实：`banner.mp4` 为 1920×1080 / 60fps / HEVC（hev1）/ 视频轨 56.217s / 3373 帧，另含 1 条 AAC 音轨（源站静音播放）；`video.webp` 为 2560×1440，但字节实为 JPEG（CDN 按扩展名返回 `image/webp`，见 G3）。
- 首屏文字必须是 HTML 叠加（FRONTEND §7）；`banner.mp4` 画面内含中文烘焙字样，英文版无法替换，需在素材清单备注中保留这一事实作为有意差异。

## 7. 缺口与未验证项

| 编号 | 类型 | 内容 | 现状 |
| --- | --- | --- | --- |
| G1 | 缺口 | `static/images/banner.ts`（移动端 banner，MPEG-TS / JSMpeg，28,006,924 B，HTTP 200 已核实） | 未抓取（不在本次授权清单），明细见 manifest 的「未抓取项与缺口」 |
| G2 | 兼容性 | `banner.mp4` 为 HEVC(hev1) + 37.4MB + 含音轨 | 已登记，处置未决定；本次按要求不转码、不压缩 |
| G3 | 格式不一致 | `banner/video.webp` 字节实为 JPEG，CDN 返回 `image/webp` | 保留原始字节与文件名，处置待 A/B 决策 |
| G4 | 产品行为 | 12 条过渡视频中 9 条含 AAC 音轨（`w2-1`/`w1-3`/`w3-2` 与暗色全部 6 条），源站标记未写 `muted` | 已登记；本产品应统一静音播放，差异记入样板验收 |
| U1 | 未验证 | `em` 高度在浏览器中的真实计算与渲染结果（本 session 无可用浏览器通道，只做 CSS 级联静态分析） | 待 T00R/B 实测 |
| U2 | 未验证 | 真机 Safari / 微信内的 HEVC 解码、静音内联播放与 JSMpeg 行为 | 待样板阶段真机验证 |
| U3 | 未验证 | PC 客户墙 8 槽在 1280/1440/1920 下的实际换行（`.img{max-width:150px}` + `margin-right:55px` + `.picture{max-width:93%}` 推断可能溢出换行） | 待实测 |
| U4 | 未做 | 24 张 Logo 的品牌名识别与双语 alt 文案 | 源站 `alt=""`；需人工识别，禁止与导航企业名单凭空对应 |

## 8. 复核与再抓取

- 一键下载 + 校验：`powershell -ExecutionPolicy Bypass -File docs/frontend-rebuild/evidence/reference-assets/fetch-and-verify.ps1 -OutDir <临时目录>`
- 单文件校验：`(Get-FileHash frontend/public/assets/customers/jun_1.svg -Algorithm SHA256).Hash`，与 `assets-manifest.json` 的 `SHA256` 比对。
- 提交后以 Git blob 为准：`git cat-file -p HEAD:frontend/public/assets/customers/jun_1.svg`。已核实 24 个 SVG 是**不含任何换行符的单行文件**（`git ls-files --eol` 为 `i/none w/none`）、其余 14 个素材（12 条过渡视频 + banner.mp4 + video.webp）被 Git 判为二进制（`i/-text w/-text`），因此本仓库 `core.autocrlf=true` 不会改变这些素材的字节，仓库 blob 与源站字节逐项一致。若以后加入多行文本类素材（多行 SVG、JSON 等），建议由 A 为 `frontend/public/assets/**` 增加 `-text`（见 handoff 的共享契约变更申请，面向未来，非当前缺口）。
