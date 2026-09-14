# 参考站共享服务模板页取证（solution/34.html）

目的：用户 2026-09-14 提出问题 6「服务页 `.service-hero` 排版不够高级，参考
<https://www.seniorweb.cn/solution/34.html>」。`REFERENCE.md:18` 此前标注该页「样板布局待取证」，
本目录补齐这一页的 hero 排版证据。

## 快照与哈希

| 文件 | 说明 | 长度 | sha256 |
| --- | --- | --- | --- |
| `solution34.html` | 原始 HTML（服务端渲染，直接 curl 可得） | 195,085 B | `D5DC8EA20DB0179E25D3D92AF2BB579365A1BABED73430D971F22713B1266C6E` |
| `solution.css` | 该页专属样式表 `/static/css/solution.css?v=4`（`www` 与 `cdn` 两个域取回内容一致） | 36,103 B | `9FD337DD4AB1A16DB3594931E8963F45A9E2262B10D3D71C5889D9211107E6F8` |

抓取时间：2026-09-14（本地时段 19:00—07:00，站点默认深色）。

## 亮色强制方式

参考站按本地时间 19:00—08:00 给 `<body id="Pattern">` 进深色（`sources/function.js:4985-5016`）。
取证时移除 `<body id="Pattern">`（等价站点自身太阳按钮的效果），实测：

- `body` 背景 = `rgb(242, 241, 228)` = **#F2F1E4**（与首页 `--home-bg` 同值）
- `.h1` 颜色 = `rgb(61, 61, 61)` = **#3D3D3D**（深色下为 `#fff`）

## hero DOM 结构（`solution34.html`，`</header>` 之后）

```html
<section class="solution">
  <div class="wrap">
    <div class="title">
      <div class="h1 P_color_0"><p>小程序/APP</p><p>移动应用定制开发</p></div>
      <div class="text P_color_0" aos="fade-top" aos-delay="300"><p>…导语…</p></div>
    </div>
    <div class="img"><img src="…"></div>
  </div>
</section>
```

要点：**没有** kicker / 序号 / 卡片 / 按钮；靠「左标题 + 右导语 + 通栏图 + 大留白」撑质感。
入场上只用 AOS `fade-top`（delay 300），无逐字动画。

## hero 数值阶梯（照抄用，行号见 `solution.css`）

| 属性 | >1666px | ≤1666px（1440 落此档） | ≤1410px | ≤1024px | 证据行 |
| --- | --- | --- | --- | --- | --- |
| 容器上边距 `.wrap` | `margin: 243px auto 0` | — | — | `margin: 80px auto 0` | `:2`、`:648` |
| 标题行 `.title` | `width: 1195px; max-width: 90%; margin: 0 auto 90px; display: flex; justify-content: space-between` | — | — | `flex-direction: column; margin: 0 auto 42px` | `:6-11`、`:643-652` |
| 主标题 `.h1` | `font-size: 67px; line-height: 79px; font-weight: 500; color: #3D3D3D` | `49px / 61px` | 同左 | `23px / 1.5; margin: 0 0 20px` | `:13-18`、`:560-563`、`:633-637` |
| 导语 `.text` | `width: 650px; left: 198px; font-size: 16px; line-height: 38px; font-weight: 500; color: #3D3D3D` | `left: 0` | `width: 53%` | `width: 100%; 14px / 35px` | `:20-28`、`:556-558`、`:591-593`、`:638-642` |
| 通栏图 `.img img` | `width: 100%` | — | — | `height: 250px` | `:30-36`、`:653-655` |

实测（浏览器 `getComputedStyle`，1440×900 亮色）：`.h1` = `49px/61px`、`font-weight 500`、`#3D3D3D`；
导语 = `650px` 宽、`16px/38px`；图片 = `1440×401`（原图 3840×1070，比例 **3.59:1**）。
390×844 实测：`.h1` `23px/34.5px`、导语 `14px/35px`、图高 `250px`、标题行 `flex-direction: column`。

截图：`ref-solution34-hero-1440.png`、`ref-solution34-hero-390.png`（亮色，视口截图）。

## 取用边界

- 本目录只作为**排版证据**：不引入参考站文案、图片、客服/表单/统计端点或联系方式。
- 图片素材不得热链 `seniorweb.cn` / `cdn.seniorweb.cn`（AGENTS.md 不变量）。
- 本页 hero 的落地实现见 `frontend/src/views/ServiceLanding.vue` 的 `.service-hero*`，
  与参考站的差异（字号档位、保留 kicker 与序号）在 `handoffs/C.md` 逐条登记。
