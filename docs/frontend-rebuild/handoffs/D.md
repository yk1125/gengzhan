# D / T04 行业资讯页面

日期：2026-09-19

## 完成内容

- `frontend/src/views/News/index.vue` 重做为 About 风格首屏 + 参考站资讯区：主题背景、全宽视差横幅、三列资讯卡片、5 页本地 mock 分页、响应式断点。
- 资讯卡片挂载 `data-cursor-cut`，复用公共 `CustomCursor` 的蓝色圆盘效果；桌面端图片放大、标题蓝色 hover。
- 清理了误追加的 `.news-story` 交替文章 rail 样式，保留下半部分正确的图片分页列表结构。
- 按用户确认移除 Banner 后的 `01 / JOURNAL` 中间区，后续编号顺延为 `01 / FEATURED` 与 `02 / ALL UPDATES`。
- 资讯列表 CTA 同步 About 页的箭头链接布局；列表路由白天模式使用 `headerInk: dark`，暗色模式仍由公共 Header 自动切换浅色字。
- 再次清理 Hero 底部残留的“记录技术变化……”文案；移动端恢复 IntersectionObserver 渐显/渐隐，不再用小屏 `opacity: 1` 覆盖动画，滚出视口时会移除 `is-visible`。
- 用户追加收口：移除 Hero 底部容器和浏览动态入口，Hero 底部间距归零；覆盖全局旧 `.news-card:hover` 发光/蓝边/抬升效果；CTA 箭头固定为 About 同款可见尺寸。
- 资讯条目使用显式本地演示数据，图片仅使用 `frontend/public/assets` 已有素材；标题区标注“演示内容，仅用于页面预览”。
- `frontend/src/views/News/detail.vue` 6 条旧 mock 图片改为本地素材，移除该页面的 Unsplash 热链。
- `/news`、`/en/news` 路由首屏字色元数据改为 `light`，与视频首屏和 About 页一致。

## 验证

- `frontend/npm.cmd run build`：通过；仅保留既有 chunk 体积、Browserslist 与 module type 警告。
- `frontend/npm.cmd run check:routes`：PASS 34 / FAIL 0 / PENDING 2（联系页存量待办）。
- 只读 ESLint：修改文件 0 errors；Vue 格式族 warnings 为既有项目规则口径，未运行带 `--fix` 的 lint。
- `git diff --check`：通过。
- 本地预览：`http://127.0.0.1:4193/news`，桌面端确认首屏、横幅、三列卡片、分页切换和详情跳转；卡片 mock 会映射到 `/news/1`—`/news/6` 既有详情。

## 备注

- 参考站结构取证为公开 `news.html` 与 `news.css`：三列网格、220px 图片、米白背景、全宽视差横幅、分页和图片 hover 放大。
- 未新增后端接口；下一步可在后端正式资讯接口具备后，将 `newsItems` 迁移到 repository/adapter，并保留明确 loading/empty/error 状态。

## 2026-09-19 · 案例页复刻补充

- 修改 `frontend/src/views/Cases/index.vue`：按 seniorweb `case.html`/`case.css` 已取证结构重做案例列表，加入首屏叙事、banner 视频占位、横线分类筛选、主案例＋三列作品墙、图片放大/渐变遮罩/箭头 hover、IntersectionObserver 渐显、滚动视差和蓝色圆形 CTA。
- 案例数据优先请求 `/cases`，接口无数据或失败时保留明确的本地演示数据；图片全部使用仓库已有本地资源，不热链参考站域名。英文路由 `/en/cases` 共用同一骨架并切换文案，主题继续消费全局变量。
- 验证：`frontend/npm.cmd run build` PASS（既有 chunk/Browserslist/module type 警告）；`frontend/.\\node_modules\\.bin\\eslint.cmd src/views/Cases/index.vue --ext .vue` 0 errors、110 warnings（格式规则存量口径）；`git diff --check` PASS；本地浏览器 `http://127.0.0.1:4195/cases` 桌面首屏、滚动作品墙、主题暗色继承和 CTA 已确认。
- 未完成：Safari / 微信真机行为尚未实测；当前验收仅覆盖 Chromium 桌面与 390px 模拟视口。

## 2026-09-19 · 案例页验收补充

- 使用本地浏览器 viewport 复验 390px 与 1280px：`documentElement.scrollWidth` 未超过视口，移动端视频裁切、筛选横向滚动、CTA 纵向布局正常；桌面端保持三列作品墙。
- 复验 `/en/cases`：英文标题、项目、CTA 与 `/en/ai-consultation` 链接均正确；分类筛选后作品数量与首个主案例同步更新。
- 复验主题：移动导航中的亮/暗切换可触发全局 `data-theme`，案例页使用共享 `--color-*` token；亮色/暗色无额外页面状态。
- 复验 mock 卡片：演示内容不跳转到不存在的详情，增加 `is-demo` 默认光标语义；API 数据仍可按真实 id 进入既有详情路由。
- 动效调整：移动端不再关闭案例页 reveal，仅将时长降至 `0.65s`；IntersectionObserver 对进入/离开视口都同步切换 `is-visible`，筛选重渲染后重新观察。
- 最新验证：`npm.cmd run build` PASS；`npm.cmd run check:routes` PASS 34 / FAIL 0 / PENDING 2（联系页存量待办）；`npm.cmd run check:motion` PASS 2 / FAIL 0；案例页 ESLint 0 errors、111 warnings（格式规则）；`git diff --check` PASS。

## 2026-09-19 · CTA / hover 微调

- 案例卡片移除 `data-cursor-cut`，图片 hover 不再触发全局蓝色自定义光标盘或蓝色高亮。
- CTA 改为跟随主题底色的无蓝色整块背景；圆盘保留蓝色按钮本体，主文案为白色，并增加沿 SVG 圆形路径持续旋转的白色环形文字，hover 时加速旋转。
- 验证：`npm.cmd run build` PASS；`git diff --check` PASS；本地 `/cases` DOM 确认 CTA orbit 存在、`case-cta` 不再使用蓝色背景、案例页无 `data-cursor-cut` 图片触发器。
- 用户补充后修正：案例卡片恢复 `data-cursor-cut`，保留图片 hover 时全局蓝色圆盘；仅覆盖旧全局卡片 hover 的边框、阴影、背景和位移高亮。最新 `check:motion` PASS 2 / FAIL 0，build PASS。
