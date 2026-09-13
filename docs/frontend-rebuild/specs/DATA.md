# 数据、接口与 mock 契约

版本：1.0 已确认开发基线（2026-09-14）。**现有事实与拟建前端契约分开描述；不宣称后台已支持新字段。**

## 1. 现有接口事实

依据：`frontend/src/api/index.js`、`utils/request.js` 及 Cases/News/AiConsultation 页面。

| 接口 | 当前前端用法 | 已知限制 |
| --- | --- | --- |
| `GET /api/cases` | `{page:1,size:100}`；读 `data.records` | 未证实后台分页/total/分类过滤语义；当前按 type 本地筛选、按 category 展示 |
| `GET /api/cases/:id` | 读 `data` | 图片字段多种形式；技术字段目前存在 v-html |
| `GET /api/news` | `{page:1,size:100}`；`data.records` 或 `data` 数组 | 当前客户端分类、无分页 UI |
| `GET /api/news/:id` | 已定义包装 | 原详情未调用，用本地 ID 1—6 数据库，未知 ID 显示第一篇 |
| `POST /api/contact` | 只透传 data | 没有已证实请求 schema 或接收回执 |
| `POST /api/ai/chat` | `{message,history}`；60 秒、silent | 非流式；`data.message` 和 `data.fallback`；没有已证实 locale 能力 |
| `GET /api/config`、`/about`、`/services`、`/banners` | 已有包装 | 不等于本次一定改为后台驱动，首发固定品牌信息允许本地配置 |
| `POST /api/stats/view` | 旧案例详情发浏览统计 | 新首发不展示浏览量，可移除新版调用，保留包装不扩张统计范围 |

Axios 基址 `/api`，默认 10 秒，成功判定为业务 `code === 200`，返回完整 `{code,message,data}`；业务失败抛错。开发代理 `localhost:8888` 只是一项配置，不是后端已可用证据。

## 2. 分层与公共返回值

```text
页面 → repository（稳定前端模型）
                ├─ API gateway → 现有 Axios envelope → legacy adapter
                └─ 显式 mock provider → 同一前端模型
```

页面禁止直接解析 `res.data.records`、自行猜图片字段或自动在 catch 中塞入 mock。

repository 公共函数（A 在 T01 提供可运行 stub 与契约测试，D/B 只消费）：

```js
listCases({ locale, page = 1, pageSize = 9, category = 'all', signal })
getCase({ locale, id, signal })
listNews({ locale, page = 1, pageSize = 10, category = 'all', signal })
getNews({ locale, id, signal })
submitInquiry(input, { signal })
sendAiMessage({ message, history, locale }, { signal })
```

列表：`{items, page, pageSize, total: number|null, hasNext: boolean|null, categories, capabilities, source:'api'|'mock'}`。

详情：`{item, source, translationStatus:'complete'|'source-only'}`；缺失抛统一 `not-found`，不返回另一 ID。错误类型：`network | timeout | business | not-found | invalid-data | unavailable | aborted`，UI 文案在词典映射，不直接展示堆栈或原始技术错误。

`capabilities` 明确 `pagination:'server-total'|'server-next'|'complete-local'|'unavailable'` 与 `categoryFilter:'server'|'complete-local'|'unavailable'`。这些是前端 adapter 的能力声明，不是从“请求带了 page”推断来的。

### 分页与分类

- mock 完整集合可以真实本地分类分页；案例每页 9、资讯每页 10 为可调整的首版实现值。
- 后台确认支持 total 时使用页码；确认支持下一页信号时用上一页/下一页，不捏造末页。
- 只有被确认是完整集合的数据才允许 complete-local；不能把旧请求的前 100 条默认为全集。
- API 不具备可确认的分页/分类语义时显示当前可用内容，不渲染假页码或声称全量；开发预览 mock 演示完整交互，并登记 B02。
- 切分类回第一页；请求参数改变取消旧请求或用请求序号抑制过期响应。
- 分类复用现有分类。Cases 将 `type/category` 归一化，未知类别归 other；News 保留稳定 categoryId 和显示名。无分类时只有“全部”。

## 3. 内容模型与兼容

### Case

`id:string, title:string, summary:string, categoryId:string, categoryLabel:string, cover:Media|null, gallery:Media[], description:string, bodyHtml?:string, technologies:string[], duration?:string, publishedAt?:ISODate, projectLink:ProjectLink|null`。

- id 统一转字符串，保留原标识，不因翻译改变。
- 现有 title/description/category/type 映射到统一字段；category 与 type 冲突时保留原值供诊断，稳定分类 key 由显式映射表解决。
- cover 候选 `coverImage → image → images[0]`；gallery 统一数组。兼容原数组、JSON 字符串、明确分隔符字符串；失败不抛整页崩溃。
- 日期优先 publishTime/createTime/date；非法日期不显示 `Invalid Date`。
- technologies 转文本数组，不执行 HTML。
- 兼容旧详情的项目链接与小程序口令。`ProjectLink = {kind:'url'|'mini-program-code'|'text', value:string}`；合法http(s)链接可打开，`#小程序://`口令仅展示/复制并提供双语使用引导，其他文本不作为href。禁止因为不是HTTP地址就丢弃原有口令内容。
- 不因为缺少封面而整条丢弃；用统一占位比例和有意义的标题说明。

### Article

`id:string, title:string, summary:string, categoryId:string, categoryLabel:string, cover:Media|null, publishedAt?:ISODate, author?:string, bodyHtml:string, sourceLabel?:string, sourceUrl?:string`。

- 列表兼容 `records` 或数组；详情统一使用 repository，不保留未知 ID 回退第一篇逻辑。
- 现有 `content` 映射为 bodyHtml，首页/列表/详情同 ID 的标题和摘要一致。
- 初版已存在的本地 1—6 文章只可作为有来源的迁移/mock 内容，不能遮盖真实 API 不同 ID。

### Media 与外链

`Media = {id, src, alt, width?, height?, poster?}`；id优先原媒体ID，否则adapter以内容ID＋媒体角色/索引生成，并在原始图片顺序变化时重新核对alt翻译。正式渲染限制允许协议/资源来源。可点击外链拒绝 `javascript:`/`data:` 等非业务协议；小程序口令仅作文本复制。客户 SVG 以 img 方式引用，入库前检查脚本/外部资源引用，不直接执行未检查的 SVG markup。

富文本只有统一 SafeRichText 清洗边界，允许必要段落/标题/列表/链接/图片；去掉 script、内联事件、不可信 iframe 和危险 URL。Markdown/文本不强行转换成任意 HTML。

## 4. 翻译覆盖

- 页面 UI 使用 locales；服务/品牌内容使用对应双语内容模块。
- 后台没有已证实的 locale 参数，初版不得直接修改现有请求协议。按稳定内容ID维护 `content/translations/en/cases.js`、`news.js`，每条为明确patch；不替换内容ID、日期、projectLink或企业外链。
- Case patch允许 `title/summary/categoryLabel/description/bodyHtml/technologies/duration`；Article patch允许 `title/summary/categoryLabel/bodyHtml/author/sourceLabel`。两者都可有 `mediaAlt:{[mediaId]:string}`，adapter据Media.id替换cover/gallery的alt，禁止含糊使用未定义的body或顶层alt字段。
- 若真实后台后续有多语字段，A 在 adapter 映射，页面 contract 不变。
- 首发清单每条记录要检查正文、摘要、SEO、alt 双语齐全；缺译清单交付时必须可查。
- 后续新内容无英文时返回 source-only，显示英文提示“English translation is not available yet”及中文原文入口；不能把中文内容当 complete。
- 翻译表缺失不隐藏整条真实内容。mock 的演示翻译也不能计入真实首发内容齐全率。

## 5. 需求表单

前端输入模型（非后台已批准 schema）：

```js
{
  name: '',
  contact: '',                // 手机或邮箱，trim 后校验
  services: [],               // ai | mini | app | web | other，至少一个
  company: '',               // 可空，公司名或网址，不强制为 URL
  requirements: '',          // 可空
  privacyConsent: false,
  locale: 'zh-CN',
  sourcePage: '/contact'
}
```

- 姓名 trim 非空；允许单字符及非拉丁姓名；建议上限 80 字符。
- 邮箱用合理基础格式检查；号码允许国际区号、空格、括号和短横，规范化后 7—15 位数字；不把前端正则当作有效手机号证明。
- company 建议上限 200 字符；requirements 建议 5000；前后端最终上限在 B03 联调确认。
- services 限定枚举、防重复；隐私必须主动勾选；所有校验和反馈中英一致。
- 仅提交到本项目同源 `/api/contact` 或明确配置的自有后台；绝不使用参考站 `/message`。
- `submitInquiry` 返回 `{status:'received', receiptId?:string}` 或 `{status:'demo'}`；未接通抛 unavailable。received 只有 gateway 已与后台核实真正接收语义后才能产生，不以 HTTP 200 或任意 JSON 为成功。
- 无需为了显示成功而强制 backend 新增 receiptId；但必须记录真实返回样例及接收判定。后台 schema 未知时 gateway 默认 unavailable，预览使用 mock。
- 成功后清空表单并取消隐私勾选；失败保留内容和同意状态，解除 submitting。demo 的提示必须明确未发送。
- 未接通/网络失败提供复制需求摘要、复制微信和邮箱联系；邮箱正文不自动包含未由用户确认的额外资料。
- 表单草稿仅组件/页面内存维持，不写 localStorage、不打印个人信息；前端不加入新统计事件收集输入。

## 6. AI

- 兼容现有 `{message,history}`，history 最近 12 条 user/assistant 消息；非流式、60 秒超时，重复发送阻止。
- `sendAiMessage` 前端有 locale，但默认 gateway 不擅自增加后台未知字段；英文能力确认在 B05 登记。英文能力未就绪时用已翻译的人工作业退路，不伪装为模型答复。
- 返回 `{message, fallback:boolean, source}`；API 失败显示本地双语联系信息。真实 fallback 保留，但清洗/按纯文本渲染模型输出。
- 现有 `?q=` 可在首次进入且内容非空时触发一次；刷新/语言切换不得悄悄重复提交历史问题；实现时用明确的每次导航消费规则并测试。
- mock 聊天只在明确预览模式，界面标明演示；不接入源站客服。

## 7. mock 配置与接入标记

T01 新建无密钥 `.env.example`（不改用户 `.env`）：

```dotenv
VITE_ENABLE_MOCK=false
VITE_MOCK_RESOURCES=
VITE_SITE_URL=
```

- 预览可明确启用，并通过 `VITE_MOCK_RESOURCES=cases,news,contact,ai` 选择缺口资源；未列资源走 API。A 负责解析和校验，无人各自添加 catch fallback。
- mock 只在开发或明确 `mock-preview` 模式启用；正式 production 构建误开 mock 要失败，而不是悄悄发布。具体实现由 Vite 模式与构建脚本共同校验，不能只隐藏 banner。
- mock 使用固定数据和固定排序，覆盖 loading/empty/error/timeout/not-found/missing-translation/success；场景控制不进入正式用户菜单。
- 预览统一显示一次演示标识；生产不显示调试开关、原始接口名、BACKEND-TODO 等实现细节。
- 每个接入缺口在代码使用 `// BACKEND-TODO(Bxx): ...`，关联下表，另有验证步骤。注释不能代替实际失败态。

| 编号 | 缺口 | 前端暂行方案 | 何时算接通 |
| --- | --- | --- | --- |
| B01 | 真实服务可用性、内容清单 | 显式 preview mock；API 失败可重试 | 验证真实响应及首发 ID 清单 |
| B02 | 分页/分类/total | mock 演示；API 按已证实 capability 渲染 | 用多页/空分类实测语义与记录总量 |
| B03 | contact schema/接收语义 | preview demo；production unavailable＋联系退路 | 真实字段映射与接收证据，未授权测试不可擅自发送 |
| B04 | 动态英文内容 | 按 ID 维护前端译文；缺译提示 | 首发真实清单逐条英文核对 |
| B05 | 英文 AI 能力 | 英文人工联系退路、preview mock | 验证后台正确英文回复及失败行为 |
| B06 | 正式域名/深链接/API部署 | 保留配置与部署检查项 | 生产样式、API及 `/en/...` 刷新实测 |
| B07 | 微信好友二维码 | 仅显示已有微信号/复制/邮箱 | 用户提供可用二维码并验证目标 |

B03/B05/B06/B07 不要求本次建设后台或编造素材。前端可带已批准退路完成交付；“真实表单收件”“英文 AI”“上线已验证”只有证据齐全时才能单独打勾。
