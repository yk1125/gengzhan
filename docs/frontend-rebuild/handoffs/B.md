# Session B handoff

- 任务：T02-H 首页样板修复
- 提交：017216f
- 修改范围：`frontend/src/views/Home/index.vue`
- 修复：改用 `useRoute()`，英文 `/en/` 直达与客户端导航均响应；首屏滚动显影 mask；hover 位移反馈；响应式 PC/移动同一模板；24 客户墙改为参考站 CDN 图标 `jun_01.svg`—`jun_24.svg`，固定顺序。
- 素材登记：来源 `https://cdn.seniorweb.cn/static/images/`；文件名 jun_01.svg…jun_24.svg（参考站 REFERENCE §3）；本地未下载，hash/尺寸无法登记；运行时 CDN 失败会隐藏图标，需 A/T00 补抓取、SHA256、版权/授权核验。当前缺口：CDN 可达性与资源版权未验证。
- 动态素材：`/yunzhan-hero.mp4`，用途首页首屏背景；失败退路为 video 元素底色与文本 CTA；版权/来源为项目现有素材，未做媒体 hash 登记。
- 验证：未能运行 build/lint（worktree 缺 node_modules，vite 不可用）；需集成环境执行桌面/手机、中英、亮暗主题检查。
- 公共缺口给 A：导航随滚动显隐、GSAP 光标/磁吸按钮应在公共 Header/交互能力统一实现；Home 仅提供 hover 与显影降级。
