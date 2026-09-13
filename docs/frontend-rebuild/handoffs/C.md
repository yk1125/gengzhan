# Session C — T02-S 验收修复

- 修改：`frontend/src/views/ServiceLanding.vue`。共享模板增加 IntersectionObserver 显影、文字 clip-path mask、hover 位移/按钮反馈；减少动态效果时仍保留内容。交互能力依赖（导航随滚动显隐、全局光标/磁吸、统一咨询面板）已留给 A，未在页面复制。
- 服务媒体登记：`frontend/src/content/services.js`。参考应用页素材抓取失败，登记来源、文件名、hash 状态与 CSS 占位策略；未伪造远程资源。
- `/services/mini-program` 及英文直达仍受当前 router 未注册限制；当前 C 边界禁止修改 router，已记录给 A 集成时补 routeManifest/router 映射，ServiceLanding 已能按该 path 解析 mini 内容。
- 验证：`npm.cmd run build` 未执行成功（工作树无 node_modules，vite 不可识别）；静态检查确认模板单例、七服务配置与英文 path 解析。桌面/手机/主题/真实浏览器截图未执行，待依赖及 A 公共契约合入后补验。
- 下一步：A 集成 router 兼容 `/services/mini-program` 别名及统一咨询入口后，运行 build、eslint，并执行 1440/390 中英亮暗 smoke。
