# reference-implementation/ —— 参考站动效的最小可运行复刻

**用途**：证明 `../SPEC.md` 里的数值确实能复现出参考站的效果，供 B/C 抄数值时有一个可对照的活样本。
**不是产品代码**：占位内容、占位配色、无构建、无依赖、无网络请求。直接双击 `index.html` 即可在浏览器打开（`file://` 即可，无需起服务）。

```
index.html          结构，每条注释标了对应 SPEC 编号与参考站出处
css/style.css       样式，数值直接抄自参考站 index.css / style.css / home.html 内联样式
js/motion.js        行为，每个函数头部标了 SPEC 编号与公式出处（含行号）
assets/mask.svg     M-19 遮罩占位（几何按参考站截帧反推，见 ../GAPS.md G-06）
```

## 已复刻的 SPEC 条目

| 条目 | 内容 | 对照证据 |
| --- | --- | --- |
| M-01 | 惯性滚动 `momentum *= (1-damping)`，damping 0.08 / 0.25，`abs(momentum) ≤ 0.1` 归零 | `demo-verify.json` `wheel` |
| M-02 | `scroll_content` 同步段 + `setTimeout(100)` 的 AOS / `scrollTop_start` | 代码结构 |
| M-03 | 页头入场，`clientWidth > 1365` 才播，nav `index*200+200` ms | `demo-header-visible.png` |
| M-04 | `.header.on` 阈值 `clientHeight - headerHeight/2`，`.6s`，底色 `#F2F1E4` | `demo-030.png` |
| M-05 | `.hide` 由滚轮方向驱动 | `demo-verify.json` `hide` |
| M-06 | `.undertone` 悬停底衬 | 代码 |
| M-08 | banner `scrollTop * 0.9`，满一屏 `display:none` | `demo-banner-450.png` |
| M-10 | `.each_animate` 逐字 `delay = i*0.08+0.3`，`opacity 0/translateX(10px)` → `1/0` | `demo-verify.json` `eachAnimate` |
| M-12 | index2 双列视差，系数 −0.02 / +0.1，两段起点 | `demo-050.png` |
| M-13 | `.public_text` `clip-path inset(0 X% 0 0)`，`data-speed` 缺省 200 | `demo-000/030.png` |
| M-14 / M-15 | `.move` `translateY(index * item.clientHeight)`，视频槽 `.<old+1>_<index+1>` | `demo-index3-click3.png` |
| M-17 | `.canvas_alert` 三段时序（`t+0` / `t+1200ms` / 关闭） | `demo-verify.json` `alert` |
| M-18 ~ M-22 | index4 高度 `clientHeight+7000`、mask 负 delay 驱动、`.bg` 位移、`.fix[data-view=auto]` 钳位、两组文案 | `demo-050/070/100.png` |
| M-23 | `data-view` 插值引擎（无 `data-ease` → 线性） | 代码 |
| M-24 | AOS：`offset = rect.top - clientHeight + 150`，`1.5s cubic-bezier(.175,.885,.32,1.275)` | `demo-100.png` `aos 8/8` |
| M-26 | `.headline .line` `scaleX(0)` → `scaleX(1)`，`2s`，`transform-origin: left` | `demo-000.png` `lineTf` |
| M-27 | 光标 `speed = data-speed/10`，`e = 1 - speed^deltaRatio`，`mix-blend-mode: exclusion` | `demo-verify.json` `cursor` |
| M-28 | 点击波纹 `.bor` `scale(0.2)` → `scale(1)`，+10ms / +250ms / +300ms | 代码 + 鼠标点击 |
| M-29 | `.cut` 变形态（`.whole` 缩 0、`.content_pro` 展开）+ `ants 10s` / `arrowRun 5s` | `demo-cut-on.png` |
| M-30 | 磁吸 `((clientX-left)/offsetWidth - 0.5) * strength`，缺省 strength 50，`Power4.easeOut` | `demo-verify.json` `magnetic` |
| M-31 | footer 圆按钮 `:hover::before { filter: blur(10px); transform: scale(1.1) }`，`.4s` | `demo-circle-hover.png` |
| M-32 | `.fixed_side` `scrollTop >= 300` 加 `.on`；`.ClickTop` `scrollTo(0,0,1200)` | 代码 + 点击 |
| ≤1024px 降级 | `damping 0.25` + 原生滚动 + 光标/侧栏/`.public_text`/`.index3`/mask 隐藏 | `demo-mobile-*.png`、`demo-mobile.json` |

## 故意没有复刻的条目

| 条目 | 原因 |
| --- | --- |
| M-07 banner Swiper / M-11 客户墙 Swiper / M-34 index5 Swiper | 需要 Swiper 7.0.8 才有意义；本 demo 不引入任何第三方依赖。数值与触发规则见 SPEC，B/C 按 SPEC 接 Swiper 即可 |
| M-09 手机 JSMpeg 视频 | 涉及视频解码器与素材；T00R 不下载任何素材（T00A 负责）。只记录触发规则 |
| M-16 Three.js 相机转场 | 涉及 3D 场景与素材；SPEC 已给出 8 组相机常量与 `1.5s power2.inOut` |
| M-25 `[aos=fade-clip]` | 参考站首页实例数 **0**，无现场可对照 |
| M-33 主题时段 | 本项目已确认差异（**07:00 / 19:00**），参考站是 08:00 / 19:00；按本项目实现，不在此复刻参考站规则 |
| 全部 `D-01` ~ `D-11` 死代码 | 含 `.orb-canvas`（PIXI，CORS 阻断从未绘制）、`.index3 .wrap`（`home.html:1847-1852` 已 `display:none`）等。**刻意不实现**，详见 SPEC「死代码」一节 |

## 与参考站的已知差异（不是 bug）

- **内容全部是占位文本**，所以 `#content` 高度 14504 < 参考站；`Limit.y` 13604 与参考站 17365 不可比。
- `.index3 .move` 参考站 `800×189`，本 demo 列宽只有 420，按自身的 `.item` 高度 152 派生（`translateY = index × 152`）。**SPEC 中的 189 仍以参考站为准**，不要照抄 demo 的 152。
- `footer .position_circle .circle .cir` 参考站是 `<img>` 承载 `ants` 旋转；本 demo 不下载素材，改用纯 CSS 圆环并把同一条 `animation` 挂在 `.cir` 上（数值不变）。
- `assets/mask.svg` 是按 M-19 的截帧测量反推的**占位遮罩**（黑底 + 3 条 8px 透明开槽），不是参考站原素材；因此 demo 里 mask 放大后的开槽形态与参考站不完全一致，但 `scale(1.05) → scale(300)` 与负 `animation-delay` 驱动机制一致。

## 自测

见 `../frames/INDEX.md` 的 `demo/` 小节；脚本 `../tools/demoverify.js`（1440×900）与 `../tools/demomobile.js`（390 / 1024 / 1025 / 1440）。
两个脚本都会断言「真实滚轮确实产生了位移」，避免出现「页面看着正常但其实没滚动」的假阳性。
