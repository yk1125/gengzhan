# 前端规格

版本：1.0 已确认开发基线（2026-09-14）。业务边界见 [PRD](../PRD.md)，执行顺序见 [PLAN](../PLAN.md)。本文件未存在于源码的路径均为拟建结构，不代表已实现。

## 1. 技术路线

- 保留 Vue 3 Composition API、Vue Router、Pinia、Vite 和 JavaScript；复杂数据类型用 JSDoc，不做全量 TS 迁移。
- 保留现有 npm 锁文件；新增 `vue-i18n`、HTML 清洗库（建议 DOMPurify）、Vitest、Playwright 各有明确用途，T01 检查与当前 Vue/Vite/Node 兼容的版本后锁定。禁止顺带升级整个工具链。
- 样式以 CSS custom properties＋组件 scoped CSS 为主；Tailwind/Element Plus 可保留用于现有能力，但页面视觉必须由统一 token 与组件控制。
- 优先 CSS/现有 Swiper 完成可验证的交互；源站若有必要的复杂时间轴，T00 证据先明确，再在 T01 记录是否增加动画依赖。
- 不新增一套与 `src/style.css` 相互覆盖的长期样式层。逐段迁出旧覆盖，最终只有明确的全局基础入口。

## 2. 拟建目录与归属

```text
frontend/src/
  config/                 # site、navigation、routeManifest、dataSources；A
  styles/                 # tokens、base、motion；A
  stores/                 # locale、theme、consultation；A
  composables/            # useTheme、useLocaleRoute、useReveal；A
  locales/
    index.js              # 固定模块注册；A
    zh-CN/                # common/ai=A；home/company/legal=B；services=C；cases/news=D
    en/                   # 与中文同名、键结构一致
  repositories/           # 前端消费契约与 API/mock 选择；A
  adapters/               # legacy API 到统一模型；A
  mocks/                  # 公共入口/状态控制=A；案例/资讯 fixtures=D
  content/                # site/solutions=A；home/company/legal=B；services=C；案例/资讯译文=D
  components/site/        # 公共 UI 与反馈；A
  layout/                 # 导航、页脚、咨询面板、路由外壳；A
  views/                  # 沿用现有页面路径；见文件归属表
frontend/public/media/
  brand/                  # Logo/公司原始素材登记；A
  home/                   # 视频封面/客户Logo；B
  services/               # C
  content/                # D
frontend/tests/
  unit/                   # 按 domain 归属
  e2e/                    # 测试基础=A，各 feature 单独文件
```

禁止把业务页数据继续塞进全局 Header/Footer；页面不得各自解析 API envelope 或各自实现主题/语言状态。

## 3. 路由契约

语言与业务路由分离：每个页面有稳定 `routeKey`；中文名称 `${routeKey}.zh-CN`，英文 `${routeKey}.en`，由统一 routeManifest 生成。定义 `localizeRoute({routeKey, params={}, query={}, hash='', locale})`，返回 Vue Router location 对象 `{name,params,query,hash}`，不让页面拼接 `/en` 字符串。locale必填且为zh-CN/en；hash为空或以#开头。

| routeKey | 中文 | 英文 | 页面 |
| --- | --- | --- | --- |
| home | `/` | `/en` | Home/index.vue |
| service.ai | `/ai-development` | `/en/ai-development` | ServiceLanding.vue |
| service.mini | `/miniprogram-development` | `/en/miniprogram-development` | 同上 |
| service.app | `/app-development` | `/en/app-development` | 同上 |
| service.web | `/web-development` | `/en/web-development` | 同上 |
| service.iot | `/iot-development` | `/en/iot-development` | 同上 |
| service.creative | `/digital-creativity` | `/en/digital-creativity` | 同上 |
| service.custom | `/custom-development` | `/en/custom-development` | 同上 |
| cases | `/cases` | `/en/cases` | Cases/index.vue |
| case.detail | `/cases/:id` | `/en/cases/:id` | Cases/detail.vue |
| news | `/news` | `/en/news` | News/index.vue |
| news.detail | `/news/:id` | `/en/news/:id` | News/detail.vue |
| company | `/about` | `/en/about` | About/index.vue |
| contact | `/contact` | `/en/contact` | Contact/index.vue，新建 |
| ai | `/ai-consultation` | `/en/ai-consultation` | AiConsultation/index.vue |
| privacy | `/privacy-policy` | `/en/privacy-policy` | PrivacyPolicy.vue |
| legal | `/legal-statement` | `/en/legal-statement` | LegalStatement.vue |
| notFound | 中文 catch-all | `/en/...` catch-all | NotFound.vue，新建 |

- `/en/` 规范到 `/en`；其他旧有效路径继续可访问，不重命名服务旧 URL。
- 无效详情 ID 展示该语言缺失状态，不重定向第一篇；SPA 内显示不等于服务器已发送 HTTP 404，部署说明需标明。
- 语言切换保留稳定 ID、白名单查询 `page/category`、有效锚点；AI 的 `q` 不跨语言自动重发。
- 返回列表优先使用页面保存的合法分类/分页 URL，直达详情则返回默认列表。
- 滚动行为：新页面到顶部、浏览器返回恢复位置；联系锚点留出导航高度；关闭菜单后解除滚动锁。
- 联系表单入口统一 `localizeRoute({routeKey:'contact', hash:'#project-form', locale})`；contact是routeKey，#project-form是hash，禁止散落不同咨询行为。

## 4. 导航与公共组件契约

### 导航数据

`navigation.js` 唯一维护顺序与类型，字段：`id, labelKey, kind('route'|'menu'), routeKey?, children?`。

- 公司案例 → cases。
- 解决方案 → 纯展开按钮；六组 `industryId/titleKey/links[]`，链接见 REFERENCE；不进入本站详情。
- 耘栈服务 → 纯展开按钮；AI、mini、app、web 四项内部路由。
- 关于我们 → company；行业资讯 → news；联系我们 → contact。
- 不增加源站“酷站赏析”“旧版官网”等未要求的栏目。
- 企业原始空链接不转换为未知 URL：文字展示，不可点击，不能用 `href='#'` 制造跳转。
- 有效外链使用 HTTPS 原地址规范化（仅去除明确的误插空白）并 `target='_blank' rel='noopener noreferrer'`。

### 公共组件（T01 冻结）

| 组件/函数 | 输入与行为 | 负责人 |
| --- | --- | --- |
| SiteContainer | `as`，default slot；统一内容宽度与留白 | A |
| SectionHeading | `eyebrow/title/description/tone`；可选 action slot | A |
| SiteButton | `variant/to/href/loading/disabled`；内部/外链/按钮语义分明 | A |
| ConsultationTrigger | `source`；打开统一面板，不直接启动 AI | A |
| ConsultationPanel | Pinia `isOpen/source`；微信复制、邮件、表单入口、辅助 AI；无自动弹出 | A |
| ThemeToggle | 仅两态；实际 label、aria-pressed 与目标动作同步 | A |
| LocaleSwitcher | zh-CN/en；保留业务路由 | A |
| AsyncState | `status`取loading/empty/error/ready；`message`、retry事件 | A |
| Pagination | `page/pageSize/total/hasNext`，change 事件；未知 total 不制造末页 | A |
| SafeRichText | `html`，统一清洗允许元素和链接；不直接执行内容脚本 | A |
| useReveal | 组件生命周期注册/销毁；减少动态效果直接可见 | A |

二维码只在有真实可添加好友的资产时展示。当前没有该资产时使用已确认的微信号与复制按钮，不把微信文本编码成一个假“添加好友二维码”。没有电话则不展示电话按钮。

### 手机与可访问性

- 参考站主导航断点 `1024px`；该尺寸及以下使用手机菜单，精确排版仍以取证截图校验。
- 已证实手机导航高 60px、左右 5% 内边距、Logo 宽 97px（源站 Logo 比例不同，本项目按视觉占位适配并登记差异）。
- 全屏菜单、独立内容滚动、错峰淡入、同级子菜单互斥展开；打开锁背景滚动，Esc/关闭/选中内链后释放锁并管理焦点。
- 键盘可展开 PC 菜单，不依赖鼠标悬停；点击外部或 Esc 关闭，焦点返回触发器。
- 手机使用原生滚动，隐藏仅桌面有意义的自定义鼠标与侧边浮动控件。任何隐藏的咨询入口在菜单/页面 CTA 仍可到达。
- 点击区域建议至少 44px；焦点清晰、正文对比度按 WCAG AA 目标；表单错误关联字段。
- 外壳与页面只保留一个主要 `main` 地标，避免当前 Layout＋Home 重复 main。

## 5. 主题状态机

文件：`stores/theme.js`、`composables/useTheme.js`；根状态使用 `html[data-theme='light'|'dark']`，不照搬 `body#Pattern` 与源站存储键。

```text
resolveScheduledTheme(now): 07:00 <= 当地时刻 < 19:00 ? light : dark
手动点击：theme = opposite(theme)
sessionStorage['yz.theme.override'] = { value, expiresAt: 下一当地07:00/19:00的时间戳 }
导航/刷新：未到 expiresAt 且仍属于同一时段 → 使用 override
到期/时区发生变化：清除 override，应用当前 scheduled theme
新会话无 override：应用 scheduled theme
```

- `nextBoundary` 用本地日历日期构造，禁止固定加 12 小时以免夏令时问题。
- 初始化尽早设置根属性，避免白屏闪深色；读取存储异常时退回时间规则。
- 定时器到边界更新；`visibilitychange/pageshow` 重新判断，处理后台标签页定时器延迟。
- 导航重渲染不重复启动监听；卸载清理；系统 `prefers-color-scheme` 不参与选色。
- 记录 override 时可存 `timeZone` 或 offset 用于环境变化失效；sessionStorage 新标签复制行为需实测，不能宣传跨浏览器绝对隔离。
- 自动/手动切换均更新 Element Plus 相关 token、菜单、表单、提示、页脚和滚动条。视频/Logo 不通过整体反色滤镜染色。

## 6. 双语与 SEO

- 使用 `vue-i18n` 模块化词典。中文英文键完全对应；无随机英文占位、无把中文塞进英文成功/错误提示。
- 模块：common、home、services、cases、news、company、legal、ai；模块注册由 A 一次冻结，叶子文件各负责人维护。
- URL 是当前渲染语言的事实来源；偏好存在 `localStorage['yz.locale']`，用于下一次用户选择入口等非明确路由场景，不擅自把中文深链接改成英文。
- 数字和日期按 locale 格式化；联系方式、品牌 Logo、企业固有名和稳定 ID 不翻译。
- 切换语言保持主题；切换主题保持语言；刷新和直达英文页的语言/主题均正确。
- 每页更新 `document.documentElement.lang`、title、description、canonical、zh-CN/en/x-default hreflang；源自统一 routeMeta＋内容详情标题。
- 生产域名来自配置，缺失时预览不生成虚假正式域名。静态已知路由 sitemap 可生成，动态路由只能来自真实可发布内容清单，不把 mock ID 写进正式 sitemap。
- canonical/query 规范与重定向规则由 A 统一。前端路由元信息不等于 SSR，真实搜索收录能力在部署说明中如实描述。
- 动态内容英文通过稳定 ID 的翻译表补充（见 DATA）；初版真实内容发布前完成译文清单；缺译状态仅作为后续新内容退路，不替代首发完整覆盖。
- 英文 AI UI 与兜底信息完整翻译；后台英文能力未经验证时英文入口给人工联系退路，不用 mock 冒充真实英文 AI。

## 7. 样式与动效基准

- tokens 按语义：page/surface/raised/text/muted/border/accent/header/menu；字体、字号阶梯、容器、间距、层级、圆角、动效曲线集中定义。
- 源站精确颜色/字体/时序依据记录到 REFERENCE 的取证资产；没有证据的值标“实现建议”，不声称量化还原。
- 源站视觉包含局部橙色、表单蓝色、暖浅底等；不要把“黑白灰＋橙色”误做成只有四个颜色。
- 使用现有视频，PC 与手机按断点分别选择资源；不在 PC 继续无条件加载手机视频，也不双份同时下载。视频 muted/playsinline，播放、停止与轮播衔接按T00核实的源站JS编排；源站当前原生autoplay/loop均为false，禁止误写成无条件原生循环。播放失败回退封面，因替换视频时长导致的必要差异登记后在样板验收。
- 首屏文字为 HTML 叠加，避免中文烘焙进视频导致英文版无法替换；素材内固有字样按素材清单注明。
- 客户 Logo 墙使用保存的一次性重排清单；每次刷新/切语言不重新随机，避免对照漂移与版面跳动。用统一占位比例、contain 与尺寸元数据；不拉伸、不强制滤镜破坏标识。
- 动画在 route unload 清理；视频/滚动观察者只在可见时运行；`prefers-reduced-motion`、节省流量及触控设备不依赖重动画完成主要任务。
- 不整包加载源站第三方跟踪、客服或企业提交接口；取证与产品资产分开存放。
- 素材必须有本地副本与来源登记：入库时记录 source URL、获取日期、文件 hash、尺寸或 viewBox、本地路径（登记口径见 REFERENCE §3）；禁止运行时引用参考站 URL，禁止热链 `seniorweb.cn` / `cdn.seniorweb.cn`。素材未到位时使用显式占位，不得用公司名或参考站图片填充。

## 8. 页面实现约束

- 服务模板数据以稳定 `serviceId` 选择，禁止依据翻译后标题或简单 URL 包含字符串判断；七类内容均有双语。
- 案例/资讯页只消费 repository 输出；现有 `type/category` 与日期/图片字段在 adapter 处理。
- 保留已有基础分类，新增最小分页并按DATA的能力声明显示；不新增搜索/推荐。切换分类回第一页；URL 保存查询；加载期间避免旧结果混入新分类。
- 详情使用真实 ID；正文不存在显示清晰缺失态；不回退任意样本，不把空列表当网络失败。
- About 与 Contact 使用同一个 site 联系数据源；微信大小写统一为 `yunzhankk`。
- 法律页面与表单真实用途一致；无 backend 配置不能写“已安全存入后台”等未实现声明。
