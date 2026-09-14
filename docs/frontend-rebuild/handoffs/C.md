# Session C · 服务页样板：SPEC 动效 + 语义 token + 移动端降级（2026-09-14）

- 状态：Step 0—4 全部执行，Step 4 为**真实执行**（`npm ci` → `git merge main` → `npm run build` → `vite preview` → 真实浏览器截图 + 逐条数值实测）。
- 基准commit：`6312c90`（`git merge main` fast-forward 后的快照）
- 本任务commit：
  - `f4df8ad` style(services): ServiceLanding.vue 由压缩格式改为正常缩进（Step 2）
  - `857bae5` feat(services): SPEC.md 滚动驱动动效 + 语义 token + 移动端降级（Step 3 + 截图证据）
- 本轮实际改动文件：`frontend/src/views/ServiceLanding.vue`、`docs/frontend-rebuild/evidence/service-pages/*`、本文件。
  未动 router / 全局 style.css / 公共组件 / layout / package/lock（遵守共享文件归 A）。

## Step 0 开场只读核查

```powershell
git rev-parse --abbrev-ref HEAD   # -> codex/rebuild-services
git log --oneline -8
git status --short
```

真实输出：

```text
codex/rebuild-services
f4df8ad style(services): reformat ServiceLanding.vue from compressed to normal indentation
6312c90 docs: decide header entrance threshold (use >1024, not reference site's >1365)
9231087 merge: T00A 参考站客户 Logo 与过渡视频素材（含 SHA256 登记）
9e83917 merge: T00R 动效取证规格（SPEC + 复现 demo + 112 张截帧）
c1afb1a docs(t00r): 参考站首页动效取证与规格（SPEC + 复现 demo + 截帧）
005089b docs: record T00A commit hash and post-commit blob verification
3ca8cb9 feat(assets): add reference-site customer logos, transition videos and banner
11f8350 docs: disclose the unstage-only git reset used when splitting commits
```

开场时 `git status --short` 仅有一条未提交改动 `M frontend/src/views/ServiceLanding.vue`（上一轮遗留）。

### 上一轮已知问题的复核结果（逐条确认属实）

1. **压缩格式属实**：Step 2 前该文件为 60 行、约 28 KB 的单行压缩写法；现为 1980 行正常缩进。
2. **只有「进入视口就淡入」属实**：旧实现（`12054b5`）只有 `IntersectionObserver` 一次性显影，**没有**滚动进度驱动的逐帧效果。本轮已换成 SPEC 的自定义 AOS + 逐帧 clip-path + 视差。
3. **「vite 不可识别、没真正构建过」属实**（上一轮 `C.md` 自述）。本轮已真实安装依赖、构建、并在浏览器打开页面（证据见 Step 4）。
4. **额外发现（上一轮未记录）**：`.service-hero__index`（`04 / 07`）与 hero 副标题在 1440px 下**重叠 49px**，14 条路由**全部**命中。本轮已修（见 Step 3.7）。

## Step 1 前置门禁（5 项全部通过）

| # | 门禁 | 命令 | 结果 |
| --- | --- | --- | --- |
| 1 | 按 lockfile 安装 `frontend/node_modules` | 上一轮 `npm.cmd ci`（本轮复核结果） | 通过。本轮复核：`node_modules` 存在，`gsap`、`lenis` 均在位，目录下 237 个包 |
| 2 | `git merge main` 取得 SPEC.md 与素材 | `git merge main` | 通过。**fast-forward** `12054b5 → 6312c90`，未产生 merge commit，无冲突 |
| 3 | SPEC.md 存在且每条动效有具体数值 | `Test-Path` / 行数 | 通过。`docs/frontend-rebuild/evidence/reference-effects/SPEC.md` 存在，**793 行**，M-01…M-34 每条都给出起止值/时长/缓动/实测钉值/移动端降级 |
| 4 | `check:routes` 可跑通 | `npm.cmd run check:routes` | 通过。`结果：PASS 34 / FAIL 0 / PENDING 2`（2 条 PENDING 均为 B/T05 的 `/contact`，与本任务无关） |
| 5 | `npm.cmd run build` 并**在浏览器打开页面** | `npm.cmd run build` + `npm.cmd run preview` | 通过。构建成功，预览服务 `http://localhost:4180/` 实际打开并逐步测量（见 Step 4） |

## Step 2 格式整理（不写功能）

- commit `f4df8ad`，仅格式，无功能改动。
- 工具：Prettier 3.3.3，`--no-semi --single-quote --print-width 100 --end-of-line crlf`，把 60 行压缩文件整理为 1363 行（后续 Step 3 增至 1980 行）。
- 行为等价性复核（格式化前后对比）：
  - 模板编译产物一致、`<script>` AST（acorn）一致、scoped CSS 归一化后一致；
  - **渲染指纹完全一致**：`/web-development` rowsDigest `4247f994` / textDigest `66e92b44`，`/en/web-development` `d6c71714` / `63facc7d`，两页均 59 个元素。

## Step 3 按 SPEC.md 改造（数值逐字照抄）

全部改动集中在 `frontend/src/views/ServiceLanding.vue`。SPEC 条目与行号：M-10(215)、M-12(253)、M-13(273)、M-14(303)、M-15(323)、M-24(526)、M-25(544)、M-26(559)。

### 3.1 M-24 / M-25 自定义 AOS 引擎（替换旧 IntersectionObserver 显影）

- 判定式逐帧 `rect.top - clientHeight + all_num < 0` 就加 `.aos-animate`，**once**（`WeakSet` 记录，不重复触发）。
- `all_num`：桌面 **150**，≤1024px **0**。
- 过渡：`1.5s cubic-bezier(.175,.885,.32,1.275)`；`fade-top` = `translate(0, 50px)` → `translate(0,0)`；`fade-clip` = `inset(0 100% 0 0)` → `inset(0 0% 0 0)`，`2s`；`data-aos-delay` **100 / 200**。

### 3.2 M-10 主标题逐字入场

- 每字 `transition-delay: index*0.08 + 0.3s`，时长 `1s`，位移 `translateX(10px)`；空格字符 `min-width: 10px`；挂载后 `setTimeout(…, 10)` 播放。

### 3.3 M-12 双列视差

- 锚点 = 组顶 − `clientHeight/3`；两列系数 **`-0.02` / `+0.1`**；逐帧直写 `translate3d`。挂在 `.service-capabilities__head` 的两个子元素上，作为共享模板的通用双列视差。

### 3.4 M-13 `public_text` 逐行 clip-path 擦除

- DOM 照抄：`.public_text > .p + .p`，两个 `.p` 内容相同；第一个 `.p` 实心层 `position:relative; z-index:55`，第二个 `.p` 覆盖层 `position:absolute; top:0; left:0; color: rgba(0,0,0,0.2); z-index:5`。
- 公式：`dis = data-speed || 200`；`len = .p:first-child .line` 数量；`all_dis = dis*len`；`ban = all_dis/len`；`start = 元素 offsetTop - clientHeight/1.2`；`T_i = start + i*ban`；`end = start + all_dis`；区间内 `inset(0 (100 + (scrollTop-T_i)/ban*-100)% 0 0)`（**允许负值**），`scrollTop <= T_i` → `inset(0 100% 0 0)`，`scrollTop >= end` → `inset(0 0 0 0)`（同一次遍历内后执行，覆盖前两分支）。
- ≤1024px 降级：`.public_text { display:none }` + `.public_text.sj_text { display:block }`，改用不擦除的整段文案。

### 3.5 M-14 / M-15 服务切换

- 跟随框 `.move`：`translateY(index * item.clientHeight)`，`transition: all .4s`；左侧指示条 `:after` 宽 5px 高 61px，`transition: all .6s`。
- 文本上翻：`.attr { position:relative; overflow:hidden }`、`.attr__line { transition: all .6s }`、`.attr::after { content: attr(data-text); transform: translateY(100%); transition: all .6s }`，`.on` 时 line `translateY(-100%)`、`::after` `translateY(0)`。
- 点击流程：视频 `currentTime = 0` → 加 `.on` → `play()` → 播放结束回调用 `router.push` 跳转。

### 3.6 M-26 标题横线展开

- `.headline__line`：`scaleX(0)` → `.headline.aos-animate` 时 `scaleX(1)`，`transition: 2s`，`transform-origin: left`。

### 3.7 硬编码色值 → A 的语义 token

- 先读 A 的 token 定义：`frontend/src/style.css:363-367` 定义 `--yz-orange: #f06a21`、`--yz-black: #111111`、`--yz-offwhite: #f2f2f0`、`--yz-line: #d2d2ce`、`--yz-copy: #676767`（YunZhan 2026 shared studio system 段）。
- **仓库内不存在 `--color-accent` 之类的 token**；`style.css:227-239` 的 `--ink-950/--paper/--accent` 是另一套（首页 quiet precision）。因此按**实际命名**选用 `--yz-*`，未新造别名（并删除了页面内重复的本地别名）。
- 实测替换：`#f26b24 → var(--yz-orange)`、`#121212 → var(--yz-black)`、`#f2f2ef → var(--yz-offwhite)`。全文件已无这三个 hex（`rg` 退出码 1）。

### 3.8 过渡视频引用共享 public 路径

- 亮色 `/assets/transitions/w{from}-{to}.mp4`，暗色 `/assets/transitions/black/{from}-{to}.mp4`，共引用 6 个方向。
- 不复制副本、不热链参考站：素材本身来自 `frontend/public/assets/transitions/`（T00A 已登记来源与 SHA256）。

### 3.9 ≤1024px 移动端降级（SPEC 每条均已落实）

- `.public_text` 隐藏、`.sj_text` 显示（M-13 降级）；
- 隐藏 PC 过渡视频 `.service-switch__picture` 与桌面切换列表 `.service-switch__list`，改用 `.service-switch__mobile` 的 `<RouterLink>` 列表（`ServiceLanding` 自己渲染，未新建外壳）；
- 字号 / 网格 / 间距降级（`h1: clamp(40px,12vw,88px)`、capability 单列、`service-hero__copy` 转纵向等）。
- 另有 `@media (prefers-reduced-motion: reduce)` 全量可见降级（不做位移/擦除/缩放）。

### 3.10 附带修复：hero 序号与副标题重叠

- 现象（修前实测，1440×900）：`.service-hero__copy p` 右缘 1375，`.service-hero__index` 左缘 1326 → **重叠 49px**；zh/en × 7 服务共 14 条路由**全部**命中。
- 根因：`.service-hero__copy` 用 `justify-content: space-between` 把副标题推到右缘，而 `.service-hero__index` 绝对定位在同一右缘（`right:0`）。
- 修法（不新增状态、不改 DOM）：copy 行预留序号栏位 `padding-right: 76px`；并在 `@media (max-width:1024px)` 内 `padding-right: 0`（该断点下 copy 已转纵向，避免白占宽度）。
- 修后实测：7 档宽度（1440 / 1280 / 1025 / 1024 / 900 / 800 / 390）× 14 条路由，**0 处重叠**，最小间距 27px；≤1024px 计算值 `padding-right: 0px`。

## Step 4 验证（真实执行，命令与输出如下）

### 4.1 构建

```powershell
cd frontend
npm.cmd run build
```

真实输出（末段）：

```text
dist/assets/ServiceLanding-f858c858.css     22.96 kB │ gzip:   4.44 kB
dist/assets/ServiceLanding-75d782e0.js      19.22 kB │ gzip:   9.25 kB
✓ built in 13.39s
```

仅有既有的 chunk >500 kB 提示（来自 `index-*.js` 主包），与本任务无关。

### 4.2 eslint（只读，未用 `--fix`）

注意：`npm run lint` 含 `--fix`，**不是只读检查**，因此使用：

```powershell
npx.cmd eslint src/views/ServiceLanding.vue --ext .vue,.js,.jsx,.cjs,.mjs --ignore-path .gitignore
```

真实输出：`✖ 131 problems (0 errors, 131 warnings)`，退出码 0。

全仓只读基线复核：

```powershell
npx.cmd eslint . --ext .vue,.js,.jsx,.cjs,.mjs --ignore-path .gitignore
# ✖ 852 problems (7 errors, 845 warnings)
```

- 与 AGENTS 记录的基线 `7 errors / 846 warnings` 对比：**错误数不变（7）**，警告数少 1（845）。7 个存量错误均不在本文件，未降级任何规则来掩盖。
- 本文件 131 条警告全部是 `vue/max-attributes-per-line`、`vue/singleline-html-element-content-newline`、`vue/html-indent` 等**格式类**警告（Prettier 输出与 eslint 风格规则不一致所致），与 `npm run lint --fix` 的既有基线同源。
- 过程中我曾引入 1 条 `no-extra-semi` 错误（`;[...children]` 的 ASI 保护写法），已改为具名变量，现为 0 error。

### 4.3 路由隔离（7 服务 × zh/en = 14 路由，1440×900）

断言方式：逐个路由读取 `.capability-list article h3` 文本集合，与「该服务自己的 4 条」比对，并检查是否出现**其它服务**的招牌文案；同时读 hero `h1` / kicker / 序号。

真实结果：

```text
routesChecked: 14, failures: 0
每条路由：h1 === 自身服务标题、kicker === "YUNZHAN / <自身 EN>"、序号 === "0<自身 order> / 07"
          capabilityList 恰好 4 条且 === 自身集合、foreignCapTitles: []
          document 中 h1 数量 = 1（没有重复 hero 外壳）
```

- **无 A 服务显示 B 服务内容**：14 条路由的 `foreignCapTitles` 与「其它服务招牌文案」检出均为空集。
- 补充确认：`.public_text` 内确有 2 个内容相同的层（实心 `z-index:55` + 幽灵 `absolute z-index:5` `rgba(0,0,0,0.2)`），`.sj_text` 在 1440 为 `display:none` —— 与 SPEC M-13 的 DOM 结构一致。
- 页面 body 中确实会出现其它服务的**中文名**，但唯一来源是「切换服务」列表（`.service-switch__list` 渲染全部 7 项、`.service-switch__mobile` 渲染 7 条 RouterLink），属设计预期，不是内容串号。

### 4.4 动效实测数值（`/web-development`，1440×900，clientHeight 900）

| 条目 | 实测 | 与 SPEC 对照 |
| --- | --- | --- |
| M-24 触发进度 | `[data-aos]` 共 16 个；y=0→0、600→3、1200→8、1800→10、2400→14、3600→16 | 单调递增、once，无回退 |
| M-12 视差系数 | y=1200：`-2.28 / 11.4`；y=3686：`-52 / 260`；各点比值恒为 **−5.0** | 精确等于 `0.1 / -0.02` |
| M-13 擦除 | 语句元素 offsetTop 2131 → `T = 2131 - 900/1.2 = 1381`；y=1381→`99.99%`、1431→`74.99%`、1481→`49.99%`、1531→`24.99%`、1581→`inset(0px)` | 每 50px 恰好 25%（`ban=200`），公式吻合 |
| M-26 横线 | `matrix(0…)` → `0.0803 → 0.3062 → 0.5347 → 0.6992 → 0.8262` | 2s 内单调展开 |
| M-14 跟随框 | item 高 **95px**；web（index 3）→ `translateY(285px)`；点第 3 项 → `translateY(190px)` | 等于 `index * item.clientHeight` |
| M-15 文本上翻 | 点击后 60ms `line -2.32 / ghost +21.68`；300ms `-19.63 / +4.37`；900ms 稳定 `-24 / 0`；`::after content` = 目标项 `data-text` | `.6s` 上翻成立 |
| 过渡视频播放 | `/ai-development` 点「小程序开发」：`1_2.on`、`opacity 1`、`readyState 4`、`paused false`、`duration 1.8s`、`currentTime 0.011→0.23→0.433→0.637`，播完后跳 `/miniprogram-development` | 真正播放，不是仅换 class |
| 视频方向覆盖 | `/miniprogram-development` → App：`2_3` / `w2-3.mp4`，跳 `/app-development` | 与素材登记一致 |
| 无素材组合 | `/ai-development` → 网站建设：无 `.on` 视频，约 795ms 直接 `router.push` | orders 1–3 之外无素材，直接跳转 |

### 4.5 移动端 / 断点 / 暗色 / 减动

- 断点精确定位：`window.innerWidth=1024` → `matchesMobile=true`（`.public_text: none`、`.sj_text: block`、`.service-switch__list: none`、`.service-switch__picture: none`、`.service-switch__mobile: block`）；`innerWidth=1025` → 全部回到桌面态（`.public_text: block`、clip 生效）。
- 390×844 三条路由（`zh/web-development`、`zh/ai-development`、`en/miniprogram-development`）：降级生效，移动列表 7 条链接正确（zh 无前缀、en 带 `/en`）；语句层 `clip-path` 未被写入（`(unset)`）。
- 暗色：置 `document.documentElement.dataset.theme='dark'` 后 6 个视频源全部切到 `black/` 组（`/assets/transitions/black/2-3.mp4` 等）；清除后回到 `w2-3.mp4` 组。
- `prefers-reduced-motion: reduce`：16 个 `[data-aos]` 全部 `opacity: 1`、无一带位移、`.headline__line` 为 `matrix(1,0,0,1,0,0)`、语句 `clip-path` 已清除。

### 4.6 截图证据

目录：`docs/frontend-rebuild/evidence/service-pages/`（已随 `857bae5` 入库，共 23 张）

- 桌面 hero（1440×900）：`zh|en-<slug>-1440-hero.jpg`，**7 服务 × zh/en = 14 张**。
- 移动端（390×844）：`zh-web-development`、`zh-ai-development`、`en-miniprogram-development` 各 `-390-hero.jpg` 与 `-390-full.jpg`。
- 主题对照：`zh-web-development-1440-dark-switch.jpg`、`zh-web-development-1440-light-switch.jpg`。
- 减动对照：`zh-web-development-1440-reduced-motion.jpg`（fullPage）。

## 接口缺口 / BACKEND-TODO

- **本页无后端接口依赖**，内容全部来自页面内配置，没有 mock 数据、没有 adapter，**不产生 BACKEND-TODO**。
- CTA 按钮 `router.push` 到**共享咨询入口** `/ai-consultation` / `/en/ai-consultation`（A 的页面），未在本页另建咨询外壳或表单 —— 符合「咨询入口统一管理」。
- 过渡视频素材缺口（素材侧，非接口）：仅 order 1–3（ai/mini/app）之间的 6 个方向有素材，见 `docs/frontend-rebuild/evidence/reference-assets/INDEX.md:54-71`。

## 未完成事项 / 明确「未运行」

1. **未在真实手机 / Safari / 微信内置浏览器实测**（按 AGENTS 口径标「未验证」）。本轮只有 Chromium（Playwright）390×844 视口模拟。
2. **未运行 `test:unit` / `test:e2e`** —— 这两个脚本当前**不存在**（T01 未加），本报告不声称其可运行或通过。
3. **未做视频过渡的逐帧录像**，只采样了 `currentTime / paused / opacity / readyState`。
4. **未验证真实 19:00—07:00 时间边界**：只用「手动置 `data-theme=dark`」验证了本页对主题的响应与视频分组切换，时间边界逻辑属 A 的全局主题管理，不在本页。
5. **未引入 GSAP / Lenis**：本页滚动驱动为自研 rAF（SPEC 本身就是逐帧直写模型），故未使用这两个依赖。
6. **en 路由文案缺译（既有缺口，非本轮引入）**：`/en/*` 下 `capabilityTitle`、`statement`、`description` 仍是中文；各 kind 的固有 section 文案（ai-architecture / mini-journey / app-devices / web-brand / iot-dashboard / custom-system / creative-space 的 kicker、h2、p）在 en 页也仍是中文。目前只有 mini 服务有 `enTitle/enSubtitle/enCapabilityTitle/enStatement/enDescription`。
7. **模板内联三元文案**：`.service-cta` 的 kicker（`START A PROJECT`）与 h2 用模板内三元切换中英，未进双语模块；与 AGENTS「UI 文案在双语模块」不符，属既有写法。
8. **`services` 配置仍是页面内硬编码**（`pages` + `translations`），未按 FRONTEND §8「稳定 serviceId」外拆；本轮以 `kind` 作为稳定 serviceId 做匹配（不靠翻译后标题或 URL 包含关系）。上一轮 `C.md` 提到的 `frontend/src/content/services.js` 本轮实际未使用。

## 需要 A 决策 / 处理的事项（不在 C 边界内）

1. `frontend/src/router/index.js` 的 `meta.title` 有笔误：`/web-development` → `WEB网站开发`、`/digital-creativity` → `数字文创`、`/app-development` → `App开发`（缺空格）。属 A 拥有的 router 文件。
2. 次要灰 `#8b8b86`（`.service-switch__en`、`.service-switch__caption`）在 A 的 token 集中没有对应项；建议增补一个 muted 语义 token 后由 C 替换。页面其余 ~59 处 hex 是设备/浏览器 mock 插画的一次性配色。
3. en 文案缺译的归属（谁负责英文译文：A 的 locales 或 D 的内容目录），决定后 C 再接入双语文案模块。
4. 过渡视频是否补齐 order 4–7 的方向素材。

## 下次第一步

1. 先读本文件 + `handoffs/INTEGRATION.md`，确认 `857bae5` 是否已被 A 收敛进 main。
2. 复现验证（约 3 分钟）：
   ```powershell
   cd frontend
   npm.cmd run build
   npm.cmd run preview -- --port 4180 --strictPort
   # 浏览器开 http://localhost:4180/web-development，滚到底看视差/擦除/横线/切换
   ```
3. 待 A 反馈第 1—4 项决策后，按结论做：替换 muted token、接入 en 文案模块、把 `pages/translations` 外拆到 `content/services.js`。
4. 若用户要看样板：按 `.service-cta` 的共享咨询入口 + 「导航＋首页＋服务样板」一起提交验收。

---

# 追加记录（2026-09-14 · 合并公共层后的回归与遗留收口）

## 1. 合并公共层

- 合并前：`codex/rebuild-services` HEAD = `5e2651c`，与 main 的 merge-base = `6312c90`（落后 20 个提交）。
- 命令：`git merge main --no-edit`。结果：**无冲突**，生成合并提交 `aea702a`（Merge branch 'main' into codex/rebuild-services）。
- 为什么无冲突：main 侧**没有**改过 `frontend/src/views/ServiceLanding.vue` 与本文件 —— `git diff 6312c90 main -- frontend/src/views/ServiceLanding.vue` 与 `-- docs/frontend-rebuild/handoffs/C.md` 均为**空输出**，所以这两个文件只保留 C 的版本。
- 本次并入、**未改写也未从 B 分支复制**的公共层（页面只按语义使用）：
  - `frontend/src/components/CustomCursor.vue`、`frontend/src/composables/useMagnetic.js`
  - `frontend/src/layout/components/Header.vue`（透明 + M-04/M-05 收放）、`Footer.vue`、`layout/index.vue`
  - `frontend/src/style.css`、`frontend/src/views/Home/*`、`frontend/src/content/home.js`
  - 素材：`frontend/public/assets/home/statement-bg.jpg`、`frontend/public/assets/cases/*.webp`
- 依赖：main 上 `frontend/package.json` / `package-lock.json` **无变化** → 合并后不需要重新 `npm ci`。
- 公共层在本页生效的实测：`.fixed_cursor`（`position:fixed; mix-blend-mode:exclusion; z-index:99999`）已挂载；`.header` 1440 高 76px、390 高 64px；footer 在每个服务路由都存在。

## 2. 合并后门禁（真实输出）

```powershell
cd frontend
npm.cmd run build          # ✓ built in 17.86s（首轮）/ 14.15s（修 hover 后）
                           # dist/assets/ServiceLanding-43ff216a.css 22.98 kB │ gzip 4.44 kB
                           # dist/assets/ServiceLanding-2867a606.js  19.23 kB │ gzip 9.25 kB
npm.cmd run check:routes   # 结果：PASS 34 / FAIL 0 / PENDING 2（两条 PENDING 仍是 B/T05 的 /contact）
npx.cmd eslint src/views/ServiceLanding.vue --ext .vue,.js,.jsx,.cjs,.mjs --ignore-path .gitignore
                           # ✖ 131 problems (0 errors, 131 warnings)
npx.cmd eslint . --ext .vue,.js,.jsx,.cjs,.mjs --ignore-path .gitignore
                           # ✖ 933 problems (7 errors, 926 warnings)
```

- 基线口径对比：AGENTS 记录的基线是 `7 errors / 846 warnings`。合并后**错误仍是 7（未增）**；警告升到 **926**，增量 80 来自本次并入的公共层文件（`Home/*.js`、`CustomCursor.vue`、`useMagnetic.js`、`content/home.js`），**不是**服务页引入。本文件自身仍是 **0 errors / 131 warnings**，与合并前逐字相同。

## 3. 双端 × 双语 × 双主题截图回归

- 目录：`docs/frontend-rebuild/evidence/service-pages/regression/`，共 **8** 张：`1440|390-zh|en-light|dark.jpg`，路由 `/web-development` 与 `/en/web-development`。
- 8 个组合的实测（每个组合都检查）：`h1` 正确、`04 / 07` 正确、`.header` 存在、footer 存在、`.capability-list` 4 条、hero 序号与副标题**无重叠**、header 与副标题**无重叠**、`[data-aos]` 16 个且按滚动进度显影（1440 视口首屏 0/16；390 首屏 4/16）。
- 14 路由数据隔离复测（1440，zh/en）：**14/14 全部通过，0 失败**。逐条断言 `h1`、`0X / 07`、4 条 capability 与该服务自身集合完全相等、无外来 kicker、`h1` 数量 = 1、header/footer 存在、切换列表 7 项。
- 结论：**服务页没有被公共层改坏**。

### 主题说明（重要，非本页缺陷）

实测亮/暗两种 `data-theme` 下服务页渲染**完全一致**。原因：合并后的 main 里**没有暗色 token 层** —— `frontend/src/style.css` 全文件只有 **1** 处 `[data-theme='dark']`，且是 `html:not([data-theme='dark']) .corporate-footer.footer-home`（只影响首页 footer 变体）；`--yz-*` / `--ink-*` token 都是静态值，没有暗色覆盖。并且 `useThemeStore.toggle()`（`frontend/src/stores/theme.js`）**当前没有任何调用方**，即：**主题两态按钮与 19:00—07:00 边界逻辑尚未实现**（属 A 的全局主题管理）。
本页的暗色就绪度：品牌三色已全部走 `var(--yz-*)`，只要 A 定义 `[data-theme='dark']` 下的 token 覆盖，本页会自动跟随；尚未 token 化的是 `#fff` 页面/分区底色与约 59 处设备 mock 插画配色。

## 4. 遗留项逐条收口

### 4.1 「`ServiceLanding.vue` 第 59 行行首字面量 `\n` 使 `.reveal{...}` 失效」——已在 C 的 Step 2/3 中消除

- **属实（复核）**：`git show 6312c90:frontend/src/views/ServiceLanding.vue` 第 59 行确实以两个字面字符 `\` `n` 开头，后面紧跟 `.reveal{opacity:0;transform:translateY(35px);...}`。CSS 会把 `\n` 当转义读成标识符，选择器变成 `n.reveal`，匹配不到任何元素 → `.reveal` 初始隐藏态失效（同行的 `.text-reveal` / `.mask-reveal` 等后续规则不受影响）。
- **现状**：该机制在 C 的 Step 3 已被 SPEC 的 AOS 引擎整体替换。`rg -n 'text-reveal|mask-reveal|\.reveal\b|is-visible' frontend/src/views/ServiceLanding.vue` → **无匹配**；`rg -n '\\n'` 只剩 4 处 **JS 字符串**里的换行转义（CTA 与切换标题的文案），CSS 中**没有**字面量 `\n`。
- 判定：**遗留已消除**，无需再改。

### 4.2 「`/services/mini-program`」——按 D2 作废（此处正式更正）

- 按 `handoffs/INTEGRATION.md` 的 **D2（2026-09-14 用户裁定）**：`/services/:slug` 形状是文档笔误，**作废**；英文统一 `/en/<slug>`，**不实现** `/services/*` 别名。原「验收入口」里的 `/services/mini-program`、`/en/services/mini-program` 一并作废。
- 服务路由的**唯一正解**（`frontend/src/router/index.js` 实测）：`/ai-development`、`/miniprogram-development`、`/app-development`、`/web-development`、`/iot-development`、`/custom-development`、`/digital-creativity`，英文加 `/en` 前缀。
- 说明：C 在本轮之前重写的 `C.md` 里已**没有** `/services/mini-program` 字样（`rg -n '/services/' docs/frontend-rebuild/handoffs/C.md` → 无匹配）。此处按 INTEGRATION 的要求补上明确更正记录，避免后续再被引用。

### 4.3 「`style.css` 8 处 hover transform 中的 `views/ServiceLanding.vue:59` 那处」——已定位、已测得具体行为，需 A 收口

- 该处即 `.service-cta button:hover`（见 `handoffs/B.md` 影响面表第 8 条）。
- **B.md 的判定在合并后仍成立的一半**：该规则**自身曾没有** `transition`。C 侧现状（`ServiceLanding.vue`）：`.service-cta button` 已显式声明 `transition: transform 0.25s ease, border-color 0.25s ease`，`.service-cta button:hover { transform: translateX(8px) }` —— C 侧**已补齐**。
- **但实测仍然失效**（1440，hover 后读 computed）：
  - `.service-cta button:hover` → `transform: matrix(1, 0, 0, 1, 0, -2)`，即 **`translateY(-2px)`**，不是 C 声明的 `translateX(8px)`；
  - 同时 `box-shadow` 变成青色霓虹 `rgba(0, 212, 255, 0.7) 0 0 30px, rgba(0, 212, 255, 0.4) 0 0 60px, rgba(0,0,0,0.3) 0 8px 30px`。
  - 根因：`frontend/src/style.css:282-286` 的 `button:hover:not(:disabled){ transform: translateY(-2px) !important; box-shadow: ... !important }`（霓虹来自 `style.css:966-971`）。`!important` 压过任何非 `!important` 声明，**与选择器特异性无关**，因此 C 在自己的 scoped 样式里无论怎么写都赢不了。
- **同一全局规则还命中本页 7 个 `.service-switch__item`**（它们是 `<button>`）：hover 时被抬 `-2px` 并套上青色霓虹光晕（实测 `transition-property: all`、`0.3s`，来自全局 `style.css:938-944` 的 `a, button, .el-button, [role="button"], .clickable { cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1) }` —— 注意裸 `button` 就在该选择器列表里）。另外 `style.css:1038-1045` 的 `@media (max-width:768px) or (hover:none)` 还给 `a:hover, button:hover` 套同一族青色 `box-shadow`，因此移动端下本页的 CTA、7 个切换按钮与 7 条移动列表链接都会被加上青色光晕。。在浅色 studio 风格的服务页上，青色霓虹与 `--yz-*` 体系不一致。
- C 未自行加 `!important` 去对抗（AGENTS 明确「不得继续叠加全局 `!important` 覆盖来掩盖结构错误」，且全局 CSS 归 A）。**申请见第 6 节**。

### 4.4 C 自己修掉的 hover 缺陷（`.capability-list article:hover`）

- 现象：`.capability-list article` 只声明 `transition: background .28s, color .28s`，而:hover 规则写 `transform: translateY(-5px)` → **transform 没有过渡，hover 时位移是瞬跳**（实测 `transition-property: background, color`，无 transform）。
- 修法（本文件内）：在 `.capability-list article` 的 `transition` 列表补 `transform 0.28s ease`。
- 说明：该选择器主体不是 `a/button`，所以 B 的机械扫描不覆盖它；属 B.md §9.10 同一类问题的漏网项。

### 4.5 M-10 / M-12 / M-13 / M-14 / M-15 / M-24 / M-25 / M-26 逐条对照 SPEC —— 合并后**全部仍然成立**

合并后重新实测（1440×900，`/web-development`；M-10 用 `/en/ai-development` 以覆盖空格字符）：

| 条目 | 合并后实测 | SPEC 要求 | 判定 |
| --- | --- | --- | --- |
| M-10 | 14 字符；`transitionDelay` = `0.3s / 0.38s / 0.46s / 0.54s`（= `index*0.08+0.3`），末位 `1.34s`；空格 `min-width: 10px`；挂载后 `.on` 已加 | `index*0.08+0.3s`、空格 `min-width:10px`、`setTimeout(...,10)` | 成立 |
| M-12 | y=1200 → `-2.28 / 11.4`；y=2400 → `-26.28 / 131.4`；y=3600 → `-50.28 / 251.4`；比值恒为 **-5.0** | 系数 `-0.02 / +0.1` | 成立 |
| M-13 | `T = offsetTop - clientHeight/1.2 = 2131 - 750 = 1381`；y=1281→`100%`、1381→`99.9896%`、1481→`49.9896%`、1581(=end)→`inset(0px)` | `data-speed=200`、`ban=all_dis/len=200`、每 100px 走 50% | 成立 |
| M-14 | item 高 **95px**；web(index 3) → `translateY(285px)`；点 index 5 → `translateY(475px)` = 5×95；`.move` transition `0.4s`；指示条 `::after` `0.6s` | `translateY(index*item.clientHeight)`、`.4s`、指示条 `.6s` | 成立 |
| M-15 | `.attr__line` `0.6s`、`.attr::after` `0.6s`；`.on` 时 line `-100%`、after `0`（上一轮实测 0→-24px 收敛） | `all .6s` + `content:attr(data-text)` 上翻 | 成立 |
| M-24 / M-25 | `fade-top` 未触发时 `matrix(1,0,0,1,0,50)`（=`translate(0,50px)`）、`1.5s`、`cubic-bezier(0.175, 0.885, 0.32, 1.275)`；`fade-clip` `inset(0px 100% 0px 0px)`、`2s`；阈值校验 6 个滚动位置（y=0/700/1400/2100/2800/3500）**违规数全为 0**（凡 `rect.top - clientHeight + 150 < 0` 的元素都已加 `.aos-animate`）；显影数 0→4→8→12→14→16；**滚回顶部后仍为 16（once 不回退）** | `all_num` 桌面 150、`once`、上列时长与缓动 | 成立 |
| M-26 | `.headline__line` `transition-duration: 2s`、`transform-origin: 0px 0.5px`（= left）；`scaleX(0)→scaleX(1)` | `2s`、`transform-origin: left` | 成立 |

## 5. 本轮改动文件

- `frontend/src/views/ServiceLanding.vue`：仅 4.4 的 `transition` 补 `transform 0.28s ease`（+1 行）。其余为合并带入，未改他人文件。
- `docs/frontend-rebuild/evidence/service-pages/regression/`：8 张回归截图（新增）。
- `docs/frontend-rebuild/handoffs/C.md`：本节。

## 6. 申请 A 处理的共享层事项（C 未自行改动）

1. **`style.css:282-286` 的 `button:hover:not(:disabled){ transform: ... !important }`（及其霓虹 `box-shadow`）需要收窄作用域。**
   - 影响：服务页 `.service-cta button:hover` 被强制成 `translateY(-2px)`（C 声明的 `translateX(8px)` 失效）；7 个 `.service-switch__item` 也被抬 `-2px` + 套青色霓虹。
   - 建议方向（择一，由 A 定）：把该规则改成显式类（如 `.yz-btn` / `.el-button` 族）而不要用裸 `button:hover`；或加本页排除，例如 `button:hover:not(:disabled):not(.service-page button)`；或用 `:where()` 降权后再由页面覆盖。
   - C 侧已就绪（`.service-cta button` 自带 `transition: transform .25s, border-color .25s`），A 一旦收窄作用域，`translateX(8px)` 立即生效，无需 C 再改。
2. **主题层缺失**：目前无暗色 token 覆盖、无两态按钮、无 19:00—07:00 边界逻辑（见第 3 节实测）。请 A 明确 1.0 是否要做暗色；若要，建议在 `[data-theme='dark']` 下覆盖 `--yz-*`，本页会自动跟随。
3. **`check:motion` 只读门禁（B.md 申请 3）若落地，请给 SPEC 豁免**：本页有 4 处 `transition: all`（`.service-switch__move` 的 `all 0.4s`、`.attr` 家族 3 处 `all .6s`），均为 **SPEC M-14/M-15 逐字照抄**，不是新引入的坏味道；如门禁一刀切禁止 `transition: all`，需要按 SPEC 条目加白名单。

## 7. 未完成 / 未运行（本次追加后仍成立）

- 未在真实手机 / Safari / 微信内置浏览器实测（仍为「未验证」）；本次只有 Chromium 1440×900 与 390×844 视口。
- `test:unit` / `test:e2e` 仍不存在，未运行、也未声称通过。
- 未做暗色设计的视觉评估（因为暗色层尚不存在，见第 6 节第 2 条）。
- en 路由文案缺译（`capabilityTitle` / `statement` / `description` 及各 kind 固有 section 文案仍为中文）**仍然存在**，等待第 6 节的归属决策。

## 8. 下次第一步

1. 读本节 + `handoffs/INTEGRATION.md`，确认 `aea702a`（以及后续 C 的提交）是否已被 A 收敛进 main。
2. 复现（约 3 分钟）：`cd frontend && npm.cmd run build && npm.cmd run preview -- --port 4181 --strictPort`，浏览器开 `http://localhost:4181/web-development`，滚到底看视差/擦除/横线/切换。
3. 等 A 对第 6 节三条给出结论后：收窄全局按钮规则 → 复核 `.service-cta button:hover` 是否变成 `translateX(8px)`；主题层若落地 → 重跑本节的 8 组合截图回归；en 文案归属确定 → 接入双语模块。

---

# 第 3 轮：用户 6 条反馈的裁决与落地（2026-09-14 晚）

## 9. 六条反馈 → 我的提问 → 用户裁决 → 本轮结果

| # | 用户原话（问题） | 我的提问 | 用户裁决 | 本轮结果 |
| --- | --- | --- | --- | --- |
| 1 | 「文字/卡片渐显只在第一次滑动出现，第二次滑动是纯静态」 | 是否允许偏离 SPEC M-24 的 `once: true`，改成交互每次重放？ | **不允许** | **未改**：保持 SPEC `once: true`（一次滚动内 0→3→8→11→14→16，滚回顶部仍 16 不回退；换路由时按 M-24 语义重来）。第 11 节有实测 |
| 2 | 「两块 `.service-section` 内容不稳定：刷新才出现，点导航栏跳转就不出现」 | （无需提问，直接定位） | — | **已修并双向复测**：14 条路由走 SPA 导航后滚到底，`hidden aos = 0`、未动画 = 0（修前实测 9/16，`.web-brand__grid`/`.web-browser` 停在 `opacity:0`）。见 10.1 |
| 3 | 「缺图片/动图；品牌故事应放图；每张图像首页那样有蓝色圆盘且可跳转；可用现有资源占位，不够从网上找；最后要一份完整图片清单」 | 是否授权联网找图 + 下载入库 + 登记来源/hash？ | **授权** | **已做**：14 张入库 `frontend/public/assets/services/`（hero + 分区配图各 7），全部 `router-link` + `item_hover`（A 的蓝色圆盘），点击进 `/ai-consultation`；清单 `evidence/service-pages/service-images.md` |
| 3b | 同上 | 清单写多细？ | **简单一点、AI 看得懂即可，可加尺寸范围** | 清单按「位置 / 用途 / 建议尺寸范围 / 当前文件 / 来源 URL + 许可 / 替换两步法」成文，第 2 节给了每张的实测像素与 sha256 |
| 4 | 「不同服务页不要不同主题色（小程序绿、App 灰），统一成首页米色」 | 统一范围＝只统一 hero，还是整页？ | **整页，文字转深色，但要高级一些** | **已做**：删除 7 组 per-kind hero 配色；全页统一米色 `#F2F1E4` + 深色文字；所有硬编码 hex 收敛为页内 10 个 token。见 10.2 |
| 5 | 「亮色态各服务页 footer 背景仍是黑的，footer（包括 cta）参考首页 footer 改颜色和背景」 | footer 本体在 A 的文件里，是我直接改还是写申请？ | **写申请 + 本轮先把 CTA 改完** | CTA **已改**（米色底 + 深色字 + 蓝箭头，实测 `bg rgb(242,241,228)` / `color rgb(17,17,17)`）；footer 本体未动，申请见第 13 节 |
| 6 | 「`.service-hero` 排版不够高级，参考 seniorweb.cn/solution/34.html」 | 是否允许抓取参考站页面取证？ | **允许** | **已抓取入库**（`evidence/service-pages/reference-solution/`：html + css + NOTES.md + 2 张对照图），hero 逐值移植。见 10.3 |

## 10. 逐条实施记录

### 10.1 反馈 2：SPA 导航后分区空白（根因 + 修法 + 双向实测）

- 根因（上一轮已定位，本轮复测确认）：7 条服务路由共用同一个 `ServiceLanding` 实例；`watch(() => route.path)` 默认在 DOM 更新前触发，`collectAosTargets()` 收集到的是**旧 DOM**，新节点进不了待办表；而 SPA 跳转不产生滚动事件 → 首屏以下的节点永久 `opacity: 0`。刷新能出现，是因为重新挂载。
- 修法（本文件 script）：`watch(..., { flush: 'post' })` + `await nextTick()` + `resetReveal()`（清 `.aos-animate`、重建 `WeakSet`/待办表）+ 重新 `collectAosTargets()`，随后 `syncMoveFrame` / `playTitleEntrance` / `scheduleFrame`。
- 实测（1440×900，真实鼠标滚轮逐屏扫到底）：修前 `/ai-development` → 点导航 `/web-development` 滚到 3521/3686 → `animated 9/16`，`.web-brand__grid`、`.web-browser` 停在 `opacity:0`；修后 = `animated 16/16`、`wrongOp: []`、`hiddenStill: 0`。本轮 14 条路由批量复测见第 11 节。
- 判定口径必须用 SPEC 阈值 `rect.top - clientHeight + 150 < 0`，不能用「是否进入视口」；`window.scrollTo` 之后要等 rAF 再读，否则 `scrollY` 读到 0。

### 10.2 反馈 4：整页统一米色 + 深色文字（"高级一些"）

- 页内调色板（`.service-page`，值取自首页 `Home/index.vue:522-528` 实测）：`--svc-bg:#f2f1e4`、`--svc-surface:#ffffff`、`--svc-surface-soft:#e7e5da`、`--svc-ink:#111111`、`--svc-ink-soft:#6d6c60`、`--svc-ink-body:#3d3d3d`（参考站导语色）、`--svc-line:#adadad`、`--svc-line-soft:#d6d3c6`、`--svc-accent:#184dc4`、`--svc-on-accent:#ffffff`。
  - `#184DC4` 不是自选：SPEC M-15（`docs/frontend-rebuild/evidence/reference-effects/SPEC.md:329`）实测参考站的服务项高亮就是 `#184DC4`，与首页 accent 同值。
  - 仍然只做**页内副本**，没有改全局 token（A 的 `:root` 里目前只有 `--yz-orange:#f06a21 / --yz-black / --yz-offwhite:#f2f2f0 / --yz-line:#d2d2ce / --yz-copy`，没有语义色阶；申请见第 13 节）。
- 删除的 per-kind 主题（反馈原话里的"绿/灰"就是这七组）：`.service-page--mini/--app/--web/--iot/--custom/--creative .service-hero` 的背景与文字色共 9 条规则，全部移除。
- 分区底色：`.service-capabilities`（原 `#fff`）、`.service-approach`（原 `var(--yz-offwhite)`）、`.service-switch`（原同）、`.service-cta`（原 `#151515`）统一为 `var(--svc-bg)`；`.creative-space`（原 `#c3d6e9`）同样归一。
- 深色块全部改浅：`.ai-flow article:nth-of-type(2)`（原 `#1a1a1a`）→ `--svc-surface-soft`；`:nth-of-type(4)`（原橙）→ accent 底 + 白字；`.iot-dashboard__main`（`#e8e8e1`）→ soft；`.iot-dashboard__side article`（`#202224`）→ 白卡、`:last-child`（`#607974`）→ accent 底；`.creative-panels article`（`#17263a`）→ 白卡、`:nth-child(3)`（`#d86e45`）→ accent 底。
- hover「高级感」：`.capability-list article:hover` 由 `#1a1a1a` 黑底改成 **accent 底 + 白字 + 上浮 5px**（实测 `bg rgb(24,77,196)`、`color rgb(255,255,255)`、`transform matrix(1,0,0,1,0,-5)`、`0.28s`）。
- 死标记 CSS 清理（占位遗留，不属于用户反馈，但影响配色扫描）：`.ai-map*`（模板已无 ai-map）、`.iot-network__map`、`.iot-device--0..3`、`.creative-space__strip`、`.creative-space__blocks*`、`@keyframes creative-scroll`、`.service-hero__inner/__copy`（模板已换成 `__title/__lead`），共 12 组。
- 硬编码 hex 收敛结果：`rg -n "#[0-9a-fA-F]{3,8}" frontend/src/views/ServiceLanding.vue` **只剩调色板定义那 10 行**（+1 行注释里的来源说明）；`--yz-orange/--yz-line/--yz-offwhite` 在本文件的 17 处引用全部改为页内 token（本文件现已 0 处 `--yz-`）。

### 10.3 反馈 6：hero 排版按参考站逐值移植

取证（`evidence/service-pages/reference-solution/`，已入库）：`solution34.html`（195,085 B，sha256 `D5DC8EA20DB0179E25D3D92AF2BB579365A1BABED73430D971F22713B1266C6E`）、`solution.css`（36,103 B，sha256 `9FD337DD4AB1A16DB3594931E8963F45A9E2262B10D3D71C5889D9211107E6F8`，www 与 cdn 取回一致）、`NOTES.md`（逐值 + 行号）、`ref-solution34-hero-1440.png`、`ref-solution34-hero-390.png`。

参考站 hero 结构 = **左标题 + 右导语 + 通栏图 + 大留白**（无 kicker / 无序号 / 无按钮）。移植值与本页实测：

| 值 | 参考站 | 本页实现 | 本页 1440 实测 |
| --- | --- | --- | --- |
| h1 字号 | >1666px `67px/79px`；≤1666px `49px/61px`；≤1024px `23px/1.5` | 同值三档（新增 `@media (max-width:1666px)`） | `49px / 61px` |
| 导语 | `width:650px; 16px/38px; font-weight:500`；≤1024 `100% / 14px/35px` | 同值（容器更宽，加 `max-width:49%` 上限） | `646.8px`、`16px/38px` |
| 标题行布局 | `display:flex; justify-content:space-between; margin:0 auto 90px` | 同值（`margin:26px auto 90px`，间距用 `5vw`） | h1 在左、导语右对齐 |
| 通栏图 | `1440×401`，原图 `3840×1070`（3.59:1） | `aspect-ratio: 3840/1070`，满宽 | `1430×398`，y=402 |
| 上留白 | `.wrap { margin: 243px auto 0 }` | `padding: 208px 0 0`（**偏差**：差值给固定 Header 让位） | `208px` |
| ≤1024 | `.wrap 80px`、`.title` 竖排 `margin: 0 auto 42px`、图高 `250px` | 同值 | 390 截图见第 12 节 |

差异登记（不擅自"对齐"用户没要求的东西）：容器宽度本页用全站 `.service-shell`（`min(100% - 96px, 1320px)`），参考站是 `1195px` —— 若改成 1195，hero 的左右边距会与本页其他分区不一致，故保留 1320 并在导语上加 49% 上限。

### 10.4 反馈 3：图片（14 张已入库 + 清单）

- 目录 `frontend/public/assets/services/`：`{ai,mini,app,web,iot,custom,creative}-hero.jpg`（2400×670，通栏）+ `…-media.jpg`（1600×1000，分区）。
- 全部 Pexels License（可商用免署名）；逐张像素 / 字节 / sha256 / 来源 URL 见 `evidence/service-pages/service-images.md`。**没有**任何运行时热链，页面只引用 `/assets/services/...`。
- 交互：hero 图与每个分区配图都是 `<router-link class="… item_hover" :to="consultPath">` → A 的 `CustomCursor`（`item_hover` 在 `CUT_SELECTOR` 里）负责蓝色圆盘，页面只加类名、不改公共层；跳转目标 `/ai-consultation`（en 为 `/en/ai-consultation`，新增 `consultPath` computed）。
- 小程序 / App / Web 三条路由的假屏（原先画出来的手机/设备/浏览器）改为"真图 + 外壳"：`.mini-phone__screen` / `.app-device__screen` / `.web-browser__screen` 里放 `mediaImage`，外壳本身改白底 + `--svc-line` 描边（原来是深色假屏）。

### 10.5 反馈 5：CTA 已改米色（footer 见第 13 节申请）

- `.service-cta { background: var(--svc-bg); color: var(--svc-ink) }`；`.service-cta button` 深色字 + `1px solid var(--svc-line)` 下划线 + accent 箭头（`rgb(24,77,196)`）。
- 实测 hover：`transform: matrix(1, 0, 0, 1, 0, -2)`（**A 的全局 `!important` 仍然压过本页声明的 `translateX(8px)`**，见 13.2）、`border-bottom-color: rgb(24,77,196)`（本页声明生效）。

### 10.6 反馈 1：reveal 只播一次 —— 按裁决保持 SPEC 原样

- 用户裁决「不允许」偏离 SPEC M-24 的 `once: true`，因此**没有**改成"每次进入视口重放"。本轮只保证另一件事不退化：**换路由后重新计算**（10.1），所以点导航跳到另一条服务路由时，新页面的显影会重新播一遍。

### 10.7 SPEC M-10 / M-12 / M-13 / M-14 / M-15 / M-24 / M-25 / M-26 逐条复测（本轮改色后）

全部仍与 SPEC 数值一致（1440×900；M-10 用 `/en/ai-development` 覆盖空格字符）：

| 条目 | 本轮实测 | SPEC 要求 | 判定 |
| --- | --- | --- | --- |
| M-10 | 14 字符；`transitionDelay` = `0.3s / 0.38s / 0.46s / 0.54s`，末位 `1.34s`；空格 `min-width:10px`；`transition-duration: 1s`；`.on` 已挂 | `index*0.08+0.3s`、空格 `min-width:10px` | 成立 |
| M-12 | y=2400 → 列0 `translate3d(0,-21.85px,0)`、列1 `translate3d(0,109.25px,0)`；y=3600 → `-45.85 / 229.25`；Δ1200 → `-24 / +120`，系数 `-0.02 / +0.1`，比值恒 **-5.0** | 系数 `-0.02 / +0.1` | 成立 |
| M-13 | `lines=1`、`data-speed=200`；`T = offsetTop - clientHeight/1.2 = 1603`；y=1503 → `100%`、1603 → `99.72%`、1703 → `49.72%`、1803(=end) → `inset(0px)` | 每 100px 走 50% | 成立（`T` 随 hero 高度变化，属预期） |
| M-14 | item 高 **95px**；web(activeIndex 3) → `translateY(285px)` = 3×95；点 index 1 → 新页 `/miniprogram-development` 读回 `translateY(95px)`；`.move` `0.4s`；指示条 `::after` `0.6s` | `translateY(index*item.clientHeight)`、`.4s`、指示条 `.6s` | 成立 |
| M-15 | `.attr__line` `0.6s / all`、`.attr::after` `0.6s`、`content: attr(data-text)`；`.on` 时 line `translateY(-24px)`（= -100%）、after `translateY(0)` | `all .6s` + 上翻 | 成立 |
| M-24 / M-25 | 6 个滚动位置（0/700/1400/2100/2800/3500）阈值违规数 **全 0**；动画数 0→3→8→11→14→16；`fade-top` `1.5s` + `cubic-bezier(0.175, 0.885, 0.32, 1.275)`；`fade-clip` `2s`；滚回顶部仍 16（once 不回退） | `all_num` 桌面 150、`once`、上列时长/缓动 | 成立 |
| M-26 | 未显影 `matrix(0,0,0,1,0,0)`（= `scaleX(0)`）、`transform-origin: 0px 0.5px`（left）、`2s`；显影后 `scaleX(1)` | `2s`、`origin: left` | 成立 |

## 11. 真实验证输出（本轮真跑，命令原文）

1. `cd frontend && npm.cmd run build` → `✓ built in 14.30s`（0 error；仅 Vite 既有的 `chunk > 500 kB` 提示）。产物含 `dist/assets/ServiceLanding-*.js | .css`。
2. `npm.cmd run check:routes` → `结果：PASS 34 / FAIL 0 / PENDING 2`（PENDING 仍是 B 的 contact 与 routeManifest，未变）。
3. 只读 eslint（**不带 `--fix`**，`npx.cmd eslint …`）：
   - 本文件：`0 errors / 0 warnings`。为达此数，本轮对 `ServiceLanding.vue` **单独**跑过一次 `eslint --fix`（仓库 `npm run lint` 本身就带 `--fix`；本次只对这一个文件跑），`173 → 0` 全部是 `vue/*` 格式类告警。
   - 全仓：`802 problems (7 errors, 795 warnings)`；同命令修前为 `975 problems (7 errors, 968 warnings)`，上一轮基线 `7 errors / 926 warnings`。**错误数仍为 7，未增未减；告警比基线少 131。**
4. 路由数据隔离 + 显影（Chromium；真实 SPA 点击 `.service-switch__mobile a` 切路由，逐屏滚到底）：

| 语言 | 路由命中 | 读回 h1 | 该路由首分区 | hero 图 | 扫到底后 hidden aos |
| --- | --- | --- | --- | --- | --- |
| zh | 7/7 | AI开发 / 小程序开发 / App开发 / 网站建设 / 物联网开发 / 定制开发 / 数字创意 | ai-architecture / mini-journey / app-product / web-brand / iot-network / custom-system / creative-space | 各自 `*-hero.jpg` | 0（共 16–17 个节点） |
| en | 7/7 | AIDEVELOPMENT / MiniProgramDevelopment / APPDEVELOPMENT / WEBDESIGN / IOTSOLUTIONS / CUSTOMSOFTWARE / DIGITALCREATIVE | 同上（同 kind） | 各自 `*-hero.jpg` | 0 |

`switchOn`（切换列表高亮）与 `capTitle`（能力标题）在 14 条路由上逐条不同，**没有出现 A 服务显示 B 服务内容**。

5. 过渡视频：DOM 实测 6 个 `<video>`，`src` = `/assets/transitions/w1-2.mp4 / w1-3 / w2-1 / w2-3 / w3-1 / w3-2`（共享 `frontend/public/assets/transitions/`，未复制副本、未热链）；`preload=none`、`opacity:0`，切换时才加 `.on` 并 `play()`（SPEC M-15）。

## 12. 截图证据（`docs/frontend-rebuild/evidence/service-pages/round3/`，26 张）

- `1440-{zh,en}-{ai,miniprogram,app,web,iot,custom,digital-creativity}-hero.jpg`（14 张）：7 条路由 × zh/en 首屏，逐张可见"左标题 + 右导语 + 通栏图"，且各路由标题与图不同 —— 这是"数据不串"的视觉证据。
- `1440-zh-{web,ai,miniprogram}-full.jpg`、`1440-en-web-full.jpg`、`390-{zh,en}-web-full.jpg`、`390-zh-{ai,miniprogram}-full.jpg`（8 张）：整页（`prefers-reduced-motion: reduce` 下拍摄，全部内容可见，用来看排版与配色）。
  注意：**减少动效模式下 M-13 的实心层不擦除**，所以这些整页图里「03 / HOW WE WORK」的大字呈现的是 20% 幽灵层（`rgba(0,0,0,0.2)`）。正常动效下实测 `clip-path: inset(0px)`（实心层完整显示），截图见 `1440-zh-approach.jpg`。
- `1440-zh-approach.jpg`（真实滚轮滚到 03 段，实心层已擦出）、`1440-zh-switch.jpg`（04 段切换列表 + 跟随框套在"网站建设"）、`1440-zh-capability-hover.jpg`（能力卡 hover = accent 蓝底白字）、`1440-zh-cta.jpg`（CTA 米色态 + 下方仍是黑 footer，即反馈 5 的现状）。

## 13. 申请 A 处理的共享层事项（本轮新增 1 条，C 未自行改动）

### 13.1 【新增·阻断反馈 5 的一半】服务页 footer 仍是黑色：请把米色 footer 从"仅首页"放开

- 现象：亮色态下 7 条服务路由的 footer 仍是黑底（见 `1440-zh-cta.jpg` 下半部）。
- 根因（A 的文件）：`frontend/src/style.css:628` `.corporate-footer { --footer-bg:#111 … }`；米色系统只挂在 `:642` 的 `html:not([data-theme='dark']) .corporate-footer.footer-home { --footer-bg:#F2F1E4; --footer-heading:#1e2f48; --footer-copy:#334155; … }`；而 `frontend/src/layout/components/Footer.vue:81` 里 `isHome = route.path === '/' || route.path === '/en'` —— 除首页外都不带 `footer-home` 类，故一律黑底。
- 用户裁决：**写申请，本轮 C 只改 CTA**。
- 申请内容（择一，由 A 定）：① 让米色变量对所有路由生效（例如把"是否首页"的判断改成"非暗色即米色"，或把米色定义从 `.footer-home` 移到 `.corporate-footer`）；② 或提供等价 hook（例如在 `:root` 加 `--footer-*` 语义 token，布局/页面按 token 取值）。
- 影响面：只影响 footer 的**颜色/背景**，布局与排版不动（用户明确"布局排版不需要改"）；A 改完后 C 无需再动 `ServiceLanding.vue`，可直接重跑第 12 节的整页截图复核。

### 13.2 【沿用第 6 节，仍成立】`style.css:282-286` 的 `button:hover:not(:disabled){ transform: translateY(-2px) !important }`

- 本轮复测：`.service-cta button:hover` → `transform: matrix(1, 0, 0, 1, 0, -2)`（C 声明的 `translateX(8px)` 仍被压过），同时套上青色霓虹 `box-shadow`；同一规则命中 7 个 `.service-switch__item`。C 侧 transition 已就绪，A 收窄作用域后立即生效。

### 13.3 【沿用第 6 节，仍成立】无暗色 token 层

- 本轮仍实测：无主题两态按钮、无 19:00–07:00 逻辑、`data-theme='dark'` 全站只在首页 footer 规则里出现一次；因此服务页亮/暗渲染完全一致，暗色态截图无意义（第 12 节只给亮色）。

### 13.4 【新增·待 A 决策】语义色 token 缺失

- 本页按用户裁决统一到米色后，用的是**页内副本** `--svc-*`（值 = 首页 `--home-*` 实测值）。若 A 把米色系提到 `:root`（例如 `--color-bg / --color-ink / --color-ink-soft / --color-line / --color-accent / --color-on-accent`），C 可把 `--svc-*` 改成引用全局，页面无需其他改动。请求 A 确认命名（用户第 3 步要求"换成 A 定的语义 token（`--color-accent` 等）"，但目前 `:root` 里并没有这组 token）。

## 14. 未完成 / 未运行（本轮结束后仍成立）

- **未在真实手机 / Safari / 微信内置浏览器运行**（只有 Chromium 1440×900 与 390×844 视口）。
- `test:unit` / `test:e2e` 脚本**不存在**，未运行、未声称通过。
- 服务页 **footer 仍是黑的**（等 13.1）；**暗色态**不存在（13.3），未做暗色视觉评估。
- en 文案缺译仍在：`capabilityTitle` / `statement` / `description` 以及各 kind 固有分区文案（如"把企业已有资料…"）仍是中文，归属待定。
- 新发现（**待用户/A 裁决，本轮未动**）：`04 / EXPLORE SERVICES` 右侧的 `.service-switch__picture` **在用户没有切换过服务前没有画面**（6 个 `<video>` 都 `preload=none`、`opacity:0`，只有点击切换时才加 `.on`）。SPEC M-15 只定义了"点击后换片"，参考站初始态未取证，C 未擅自加初始静帧。见 `1440-zh-switch.jpg` 右侧空白。
- 反馈 1（reveal 只播一次）按用户裁决**保持不改**，不是遗漏。

## 15. 下次第一步

1. 读本节 + `handoffs/INTEGRATION.md`，确认 `codex/rebuild-services` 上本轮提交是否已被 A 收敛进 main。
2. **看 A 对 13.1 的结论**：footer 米色一放开，立刻在 1440/390 × zh/en 重拍整页截图，确认亮色态 footer 由黑转米色，并复核 13.2 的按钮 hover（收窄后 `translateX(8px)` 应生效）。
3. 就"切换区初始帧"（第 14 节最后一条）向用户取一次裁决：给初始静帧 or 保持空白。
4. 用户若提供正式图片，按 `evidence/service-pages/service-images.md` 第 4 节两步替换（覆盖同名文件即可，不需改代码）。

---

# 第 4 轮：用户 4 条新反馈（2026-09-15）

基准：本轮开工时 `codex/rebuild-services` HEAD = `dabd0f6`，`main`（`b6a2c72`）已是 HEAD 的祖先
（`git rev-list --count HEAD..main` = 0，无需再 merge）。
**本轮提交**：`codex/rebuild-services` 上 `dabd0f6` 之后的那个提交（`git log -1`），
提交信息 `feat(services): 第 4 轮反馈落地（删服务切换器 / 删分区大图 / 卡片配图 / 去蓝盘跳转）`，65 个文件。
本轮改动文件：`frontend/src/views/ServiceLanding.vue`、`frontend/public/assets/services/cards/**`（39 张新图）、
`docs/frontend-rebuild/evidence/service-pages/round4/**`（23 张截图）、
`docs/frontend-rebuild/evidence/service-pages/service-images.md`、`docs/frontend-rebuild/handoffs/C.md`。
**未改**：`Header.vue` / `Footer.vue` / `style.css` / `CustomCursor.vue` / router / package.json / lockfile（全归 A）。

## 16. 四条反馈 → 逐条结果

| # | 用户原话（要点） | 归属 | 结果 |
| --- | --- | --- | --- |
| 1 | 服务页导航栏要和首页一样：背景透明 + 上下丝滑滚动 | **A 的共享层** | **本轮未落地**：只写申请（第 20.1 节），C 未改 `Header.vue` / `style.css`。已把根因与实测值取证齐全 |
| 2 | 删掉每个服务页的 `<div class='service-switch service-section'>` 整块 | C | ✅ 已删：模板区块 + 相关 JS（`switching` / `pendingIndex` / `moveOffset` / `TRANSITION_SLOTS` / `transitionClips` / `clipFor` / `syncMoveFrame` / `playTransition` / `switchService` / `activeIndex` / `switchListEl` / `pictureEl` / `switchCopy` / `isDarkTheme` / `themeObserver`）+ 全部 `.service-switch*` / `.attr*` CSS + 两处断点规则 + 注释；`router` 已不再被切服务使用（仅 CTA 用） |
| 3 | 删掉「`service-shell` 大图」；每个 article 配图；article 不要 hover | C | ✅ 删了 4 处 `.service-media` 大图（ai / iot / custom / creative）；B/C 组共 39 张卡片图入库并接线；`.capability-list article:hover`（蓝底白字 + 上浮 5px）、`:hover p`、`transition` 全部移除 |
| 4 | 去掉鼠标移上去的蓝色圆盘与对应跳转 | C | ✅ 已归零：14 条路由实测 `.item_hover` = 0、`<router-link>` 图片包裹 = 0；hero 图、设备外壳图改回 `<div>` |

## 17. 逐条实施记录

### 17.1 反馈 2：删除 `.service-switch` 整块

- 模板：删掉 `<section class="service-switch service-section">…</section>`（含 `04 / EXPLORE SERVICES`、切换按钮列表、跟随框、6 个过渡 `<video>`、移动端 `<ul>`）。
- JS：删掉 13 个只服务该区块的变量/函数（清单见 16 节第 2 行）；`services` 计算属性保留（`page` 依赖它）。
  连带清理：`consultPath` 由「hero 图的跳转目标」改为底部 CTA 复用（`@click="router.push(consultPath)"`），避免出现未使用变量。
- CSS：`.service-switch` / `__head` / `__body` / `__list` / `__item` / `__en` / `__move` / `__picture` / `__caption` / `__mobile`、`.attr` / `.attr__line` / `.attr::after`，以及 `@media ≤1024` 里的两处 `.service-switch` 规则全部删除。
- 影响：页面分区从 6 段变 5 段（hero → 01 → 02 → 03 → CTA），`04 / EXPLORE SERVICES` 不再出现；
  `frontend/public/assets/transitions/` 的过渡视频**目前没有任何页面引用**（未删文件，见第 21 节截图与 `service-images.md` 第 6 节）。
- 验证：14 条路由 `document.querySelectorAll('.service-switch').length === 0`；控制台 0 error / 0 warning / 0 pageerror（删代码后无 Vue 警告）。

### 17.2 反馈 3：删大图 → article 配图 → 去 hover

- 删掉的 4 处大图（原 `.service-media` + `item_hover` + 跳转）：`/ai-development`（`.ai-flow` 之后）、`/iot-development`（`.iot-dashboard` 之后）、`/custom-development`（`.custom-system__steps` 之后）、`/digital-creativity`（`.creative-panels` 之后）；`.service-media` CSS 一并删除。
- 保留：小程序 / App / 网站 三条路由设备外壳里的界面图（`.mini-phone__screen` / `.app-device__screen` / `.web-browser__screen`），用户只点名了 `.service-shell` 大图。
- 新增配图（`page.capabilityImages[i]` 等，数据在 `pages` 常量里，命名规则写在 `const pages` 上方的注释）：
  - 能力卡（B 组）：**7 条路由 × 4 张**，与 `capabilities` 同序 → `/assets/services/cards/{kind}-{1..4}.jpg`
  - AI「01」四步卡（C 组）：`ai-flow-1..4.jpg`
  - 定制「01」四步卡（C 组）：`custom-step-1..4.jpg`
  - 数字创意「01」三块面板（C 组）：`creative-panel-1..3.jpg`
- 样式：新增 `.service-card-media`（`margin: 0 0 22px`，`img { width:100%; aspect-ratio: 4/3; object-fit: cover }`），≤1024 时 `margin-bottom: 18px`；
  卡片 `h3` 上外边距相应从 114px / 88px / 72px 收到 26px / 26px / 24px（图片已占掉视觉重量，避免卡片过高）。
- 去 hover：删除 `.capability-list article:hover { background: var(--svc-accent); color: var(--svc-on-accent) }`、`.capability-list article:hover p {…}`、`.capability-list article { transition: … }`、后置的 `.capability-list article:hover { transform: translateY(-5px) }`。
  卡片现在**完全没有 hover 效果**，只有 `data-aos="fade-top"` 的滚动显影（M-24 / M-25，数值未动）。
- 顺带（**需用户确认，可回退**）：能力卡右下角那个没有点击目标的 `↗`（`.capability-list b`）已移除 —— 它原来的语义是配合 hover 的「可点」暗示，hover 与跳转都去掉后就成了假按钮；如要保留请说，一行即可加回。
- 未加图并说明：`/iot-development` 的 `.iot-dashboard__side` 三张是**数据看板示意卡**（实时告警 / 运维工单 / 数据趋势，卡里是大字号数字），不是内容卡，加照片会破坏看板隐喻；
  另外「数字创意」的 `.creative-panels` 实际只有 **3 块** `<article>`（不是 4 块），已按 3 块配图。

### 17.3 反馈 4：去掉蓝色圆盘与跳转

- `<router-link class="… item_hover" :to="consultPath">` 全部改为 `<div>`：hero 通栏图、小程序手机屏、App 设备屏、网站浏览器屏（4 处大图随 17.2 一起删除）。
- `item_hover` 是 A 的 `CustomCursor.vue:53` `CUT_SELECTOR` 里的类名 —— 去掉类名即无蓝色圆盘；同时不再有 `<a>`，也就没有跳转与手型光标。
- 实测：14 条路由 `.item_hover` = 0；底部 CTA 按钮仍按用户之前的裁决工作（`/custom-development` 点击 → `/ai-consultation`，`/en/digital-creativity` → `/en/ai-consultation`）。

### 17.4 反馈 1：透明导航栏 —— 属 A 的共享层，本轮只写申请

详见第 20.1 节（有实测值、根因文件行号与建议改法）。**C 本轮没有改 `Header.vue` / `style.css` / 全局样式**，因此预览里服务页导航栏仍是深色固定条。

## 18. SPEC 条目对照（本轮后重新逐条核对）

| 条目 | 位置 | 本轮实测（`/web-development`，1440×900） | 结论 |
| --- | --- | --- | --- |
| M-10 主标题逐字入场 | SPEC:215 | h1 内 3 个 span 的 `transitionDelay` = `0.3s / 0.38s / 0.46s`（= index×0.08+0.3）；en（`/en/web-development`，h1 = `WEB DESIGN`）空格字符 `min-width: 10px` | 仍然成立 |
| M-12 双列视差 | SPEC:253 | 触发后两列 `translate3d(0,-30.5442px,0)` / `translate3d(0,152.721px,0)`，比值 = 5.000 = 0.1/0.02 | 仍然成立 |
| M-13 逐行 clip-path 擦除 | SPEC:273 | 起始 `inset(0px 100% 0px 0px)` → 滚过 `.line` 结束点 `inset(0px)`；`transition-duration: 2s` | 仍然成立 |
| M-24 / M-25 AOS 显影 | SPEC:526 / 544 | `transition-duration: 1.5s`、`cubic-bezier(0.175, 0.885, 0.32, 1.275)`、未触发 `transform: matrix(1,0,0,1,0,50)` + `opacity: 0`、触发后 `matrix(1,0,0,1,0,0)` + `opacity: 1`；`data-aos-delay=100/200` 的 `transition-delay` 由 `0s` 变 `0.1s / 0.2s` | 仍然成立 |
| M-26 标题横线展开 | SPEC:559 | `.headline__line` 起始 `matrix(0,0,0,1,0,0)`（scaleX 0）→ 滚过后 `matrix(0.995781,…)`（2s 进行中），`transition-duration: 2s` | 仍然成立 |
| M-14 服务切换跟随框 | SPEC:303 | 切换器整块按用户指令删除 | **随指令作废，对本页不再适用** |
| M-15 切换文本上翻 / 过渡视频 | SPEC:323 | 同上（`.attr*`、`.service-switch__picture`、6 个 `<video>` 全部移除） | **随指令作废，对本页不再适用** |
| ≤1024 断点表（hero 上留白 80px / h1 23px / 导语 14px / 图高 250px） | SPEC 断点速查 | 1024 / 900 / 800 / 769 逐档实测 = 80px / 23px / 14px / 250px，全部命中 | 仍然成立（但 ≤768 被 A 的全局规则压过，见 20.4） |

## 19. 真实验证输出（本轮全部真跑，命令与结果原文）

### 19.1 构建（`frontend/`）

```
PS> npm.cmd run build
dist/assets/ServiceLanding-09685ef2.css     17.10 kB │ gzip:   3.22 kB
dist/assets/ServiceLanding-2890cfee.js      20.16 kB │ gzip:   9.04 kB
(!) Some chunks are larger than 500 kBs after minification. …
✓ built in 19.91s
```

（上面是**最后一处改动之后**重跑的结果；>500 kB 的告警来自 `index-2521603b.js 1,139.35 kB`，是仓库存量，不是本页。）

### 19.2 路由检查

```
PS> npm.cmd run check:routes
结果：PASS 34 / FAIL 0 / PENDING 2
```

`PENDING 2` = B / T05 的 `/contact` `/en/contact` 未实现，与上轮一致。

### 19.3 eslint（只读，未加 `--fix`）

```
PS> npx.cmd eslint . --ext .vue,.js,.jsx,.cjs,.mjs --ignore-path .gitignore
✖ 802 problems (7 errors, 795 warnings)

PS> npx.cmd eslint src/views/ServiceLanding.vue          # 退出码 0，无任何输出
```

全仓 7 errors / 795 warnings = **与上轮基线完全一致**（未新增、未减少），7 个 error 都是存量；
本文件 0 error / 0 warning。
**注意**：`npx eslint .` 若不加 `--ignore-path .gitignore`，会把 `dist/` 一起 lint（本次实测 1501 errors），
必须照 `package.json` 的 `lint` 脚本带该参数才可比。

### 19.4 14 条路由 × 滚动显影 × 数据不串（Chromium 1440×900，`reducedMotion: no-preference`）

每页都「逐档滚到页底 → 等 1.7s → 读取」：

| 路由 | h1 | 首张能力卡图 | 能力卡图 | 01 分区卡图 | 未显影 `[data-aos]` | `.service-switch` | `.item_hover` | `.service-media` | 破图 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/ai-development` | AI 开发 | `cards/ai-1.jpg` | 4 | 4（flow） | 0 | 0 | 0 | 0 | 0 |
| `/miniprogram-development` | 小程序开发 | `cards/mini-1.jpg` | 4 | — | 0 | 0 | 0 | 0 | 0 |
| `/app-development` | App 开发 | `cards/app-1.jpg` | 4 | — | 0 | 0 | 0 | 0 | 0 |
| `/web-development` | 网站建设 | `cards/web-1.jpg` | 4 | — | 0 | 0 | 0 | 0 | 0 |
| `/iot-development` | 物联网开发 | `cards/iot-1.jpg` | 4 | — | 0 | 0 | 0 | 0 | 0 |
| `/custom-development` | 定制开发 | `cards/custom-1.jpg` | 4 | 4（step） | 0 | 0 | 0 | 0 | 0 |
| `/digital-creativity` | 数字创意 | `cards/creative-1.jpg` | 4 | 3（panel） | 0 | 0 | 0 | 0 | 0 |
| `/en/ai-development` | AIDEVELOPMENT | `cards/ai-1.jpg` | 4 | 4（flow） | 0 | 0 | 0 | 0 | 0 |
| `/en/miniprogram-development` | MiniProgramDevelopment | `cards/mini-1.jpg` | 4 | — | 0 | 0 | 0 | 0 | 0 |
| `/en/app-development` | APPDEVELOPMENT | `cards/app-1.jpg` | 4 | — | 0 | 0 | 0 | 0 | 0 |
| `/en/web-development` | WEBDESIGN | `cards/web-1.jpg` | 4 | — | 0 | 0 | 0 | 0 | 0 |
| `/en/iot-development` | IOTSOLUTIONS | `cards/iot-1.jpg` | 4 | — | 0 | 0 | 0 | 0 | 0 |
| `/en/custom-development` | CUSTOMSOFTWARE | `cards/custom-1.jpg` | 4 | 4（step） | 0 | 0 | 0 | 0 | 0 |
| `/en/digital-creativity` | DIGITALCREATIVE | `cards/creative-1.jpg` | 4 | 3（panel） | 0 | 0 | 0 | 0 | 0 |

结论：**14 条路由零串页**（首张能力卡的 `/cards/<kind>-` 前缀 14/14 与路由一致，hero 图也逐条不同）、
**零破图**、**滚到页底后没有任何残留未显影节点**。
h1 列是按模板里逐字 `<span>` 拼接后 `textContent` 得到的（en 的字符 span 之间不带空格，故显示为 `WEBDESIGN`）。

### 19.5 SPA 点导航跳转（上一轮修好的那条，本轮回归）

在 `/ai-development` 起，用 A 的页头导航连点 4 跳（小程序开发 → App开发 → WEB网站开发 → AI开发）：

| 跳转 | 落地路由 | h1 | hero 图 | 首张能力卡图 | 未显影 | 有内容的 section |
| --- | --- | --- | --- | --- | --- | --- |
| 小程序开发 | `/miniprogram-development` | 小程序开发 | `mini-hero.jpg` | `cards/mini-1.jpg` | 0 | 5 |
| App开发 | `/app-development` | App 开发 | `app-hero.jpg` | `cards/app-1.jpg` | 0 | 5 |
| WEB网站开发 | `/web-development` | 网站建设 | `web-hero.jpg` | `cards/web-1.jpg` | 0 | 5 |
| AI开发 | `/ai-development` | AI 开发 | `ai-hero.jpg` | `cards/ai-1.jpg` | 0 | 5 |

**SPA 切换后内容正常出现、且没有出现 A 服务显示 B 服务内容**（上一轮的空白缺陷没有回归）。

### 19.6 移动端与减动效

390×844 抽测 4 条路由（滚到页底后读取）：

| 路由 | `scrollWidth` / `clientWidth` | 卡片图 | 卡片图显示尺寸 | hero 图高 | h1 | 导语 | 未显影 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/ai-development` | 380 / 380（无横向溢出） | 8 | 279×209 | 106 | 23px | 14px | 0 |
| `/custom-development` | 380 / 380 | 8 | 276×207 | 106 | 23px | 14px | 0 |
| `/digital-creativity` | 380 / 380 | 7 | 272×204 | 106 | 23px | 14px | 0 |
| `/web-development` | 380 / 380 | 4 | 332×249 | 106 | 23px | 14px | 0 |

（hero 图高 106px 的原因见 20.4，不是本页笔误。）

`prefers-reduced-motion: reduce`（`/custom-development`，1440×900，不滚动直接读）：
12 个 `[data-aos]` **全部** `opacity: 1` + `transform: none` + `clip-path: none`（不满足的 = 0），
`.headline__line` = `matrix(1,0,0,1,0,0)` 且 `transition-duration: 0s` —— 减动效降级仍然成立。

### 19.7 控制台 / 运行时报错

`/custom-development` + `/en/digital-creativity` + `/ai-development`（滚到页底）：
`console` 里 error = 0、warning = 0；`pageerror` = 0。删掉 `.service-switch` 相关代码后没有留下悬空引用。

## 20. 申请 A 处理的共享层事项（本轮新增 2 条，C 均未自行改动）

### 20.1 【新增·就是反馈 1】服务页页头仍是固定深色条，且 `.hide` 在服务页没有任何样式

实测（1440×900，同类对比）：

| 场景 | `header` 的 class | `background` | `position` | `transition` | 滚轮向下 |
| --- | --- | --- | --- | --- | --- |
| 首页 `/` 顶部 | `header header-home` | `rgba(0,0,0,0)`（透明） | fixed | `0.6s` | —— |
| 首页滚过 hero | `header header-home on` | `rgb(242,241,228)` 米色，文字转黑 | fixed | `0.6s` | 加 `.hide` → `transform: matrix(1,0,0,1,0,-76)`（丝滑收起，向上恢复） |
| 服务页 `/web-development` 顶部 | `header`（**无 `header-home`**） | `rgba(17,17,17,0.98)` + `backdrop-filter: blur(14px)` | fixed | `0.3s` | —— |
| 服务页滚动后 | `header header-fixed on` | 仍是 `rgba(17,17,17,0.98)` | fixed | `0.3s` | **`.hide` 已经加上了，但 `transform: none`** —— 没有任何 CSS 响应 |

根因（全部在 A 的文件里）：

1. `frontend/src/layout/components/Header.vue:88` —— `const isHome = computed(() => route.path === '/' || route.path === '/en')`；
   模板 `:5` 用 `'header-home': isHome` 决定是否走透明那套样式，服务页因此拿不到。
2. `frontend/src/style.css:2154-2167` —— `body .header, body .header.header-fixed, body .header:not(.header-home) { position: fixed !important; height: 76px !important; background: rgba(17,17,17,.98) !important; border-bottom: 1px solid rgba(255,255,255,.14) !important; box-shadow: … !important; backdrop-filter: blur(14px) !important; }`
   —— 用 `!important` 把非首页页头钉成深色固定条；服务页的**页内 scoped 样式无论如何都压不过它**，所以这件事只能由 A 收口。
3. `Header.vue:693` —— `.header.header-home.hide { transform: translateY(-100%) !important }` 是唯一一条 `.hide` 规则，服务页没有对应规则，于是 `isHidden` 加了类但没有视觉效果。

申请内容（三个点，可由 A 一次做完）：

- **放开透明态**：让服务页（`/ai-development` … `/digital-creativity` 及其 `/en` 版本）在「未滚过首屏」时也走透明底 + `transition: .6s ease`，并保留 M-04（`.on` 换米色底）与 M-05（`.hide` 收起）两态。实现方式 A 自选（`route.meta` / 页面根类名 / 扩展 `isHome`），C 只需「页面按语义名引用」。
- **配色必须反过来**：服务页整页底色就是米色 `#F2F1E4`（亮），所以透明态的 logo / 导航文字要用**深色**（`#111111`，`--svc-ink`）+ accent `#184DC4` 圆点，**不能照抄首页的白色字**（那是在首页深色 hero 上才成立的）。
- **留白联动**：透明态下页头会压在首屏上。服务页 hero 的上留白是桌面 `208px`（> 页头 76px，安全）、≤1024 只有 `80px`（页头 76px → 只剩 4px 间隙，桌面/平板窄档会贴住）。
  把这处补到 ~`104px` 属于对 SPEC 断点表（80px）的偏离，**C 等用户允许后再改**（见第 22 节），请 A 也一并确认。

### 20.2 【沿用 13.1，仍成立】服务页 footer 仍是黑色

本轮未变：亮色态下 7 条服务路由 footer（含底部链接区）仍是黑底，因为米色只挂在 `style.css:642` 的 `.corporate-footer.footer-home`，而 `Footer.vue:81` 的 `isHome` 只认 `/` 与 `/en`。整页截图见 `round4/*-zh-1440.png` 底部。

### 20.3 【沿用 13.2，命中面已缩小】`style.css` 的 `button:hover:not(:disabled){ transform: translateY(-2px) !important }`

本轮删掉 `.service-switch` 后，这条全局规则在本页的命中目标从「CTA 按钮 + 7 个切换按钮」变成**只剩 1 个**：`.service-cta button:hover`（C 声明的 `translateX(8px)` 仍被 `translateY(-2px)` 压过，并套上青色霓虹 `box-shadow`）。收窄作用域后立即生效，C 侧无需再改。

### 20.4 【新增·本轮测得】`style.css` 的 `@media (max-width:768px){ img,video,iframe{ height:auto !important } }` 压过服务页 ≤1024 的 hero 图高

实测 hero 通栏图高度（`/web-development`，逐档改视口）：

| 视口宽 | 1440 | 1100 | 1024 | 900 | 800 | 769 | 768 | 500 | 390 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| hero 图高 | 398 | 304 | **250** | **250** | **250** | **250** | 212 | 137 | 106 |

- 1024–769 命中 SPEC 断点值 `250px`（`.service-hero__media img { height: 250px }`）。
- ≤768 起被 A 的全局 `height: auto !important` 接管，图片按自身比例（2400×670）落回 212 / 137 / 106px。
  结果是「窄屏首屏图偏矮」，不是破图（`object-fit: cover` + 同比例 ⇒ 不裁切、不拉伸），但**与 SPEC 断点表不一致**。
- 处理建议：A 把该全局规则排除图像容器（或允许 C 用一个具体的选择器覆盖），否则 ≤768 的三档永远拿不到 250px。
- C 本轮**没有**动这条，也没用 `!important` 去硬压（AGENTS.md 明确不许再叠 `!important` 掩盖结构问题）。

### 20.5 【沿用 13.4，仍成立】语义色 token 缺失

本轮配图新增的 `.service-card-media` 用的仍是页内 `--svc-surface-soft`。若 A 把米色系提到 `:root`
（`--color-bg / --color-ink / --color-ink-soft / --color-line / --color-accent / --color-on-accent`），
C 把 `--svc-*` 改成引用全局即可，页面无需其他改动；请求 A 确认命名。

## 21. 截图证据（`docs/frontend-rebuild/evidence/service-pages/round4/`，23 张）

- `{slug}-{zh,en}-1440.png`（14 张）：7 条路由 × zh/en，1440×900 **整页**（先逐档滚到页底触发全部显影再拍）。
  注意两点拍摄特性：① 整页拼接时**固定页头会按当前滚动位置被画在图中部**（不是页面里多了个条）；
   ② 整页图是 1440px 缩到 ~712px，别用它量间距 —— 间距以 DOM 实测为准（第 19 节）。
- `{slug}-zh-390.png`（4 张）：`ai-development` / `custom-development` / `digital-creativity` / `web-development` 的小屏整页。
- `_viewport-creative-caps.png`、`_viewport-iot-caps.png`（2 张）：1440×900 **视口**截图，专门用来证明
  「02 / WHAT WE DELIVER」大标题与下面四张能力卡**没有重叠**（DOM 实测：标题盒底到卡片列表顶 = `66px`，7 条路由一致，无任何分段重叠）。
- `_smoke-web-top.png`、`_smoke-web-caps.png`、`_smoke-ai-flow.png`（3 张）：开头的冒烟图（首屏、能力卡、AI 四步卡）。

## 22. 未完成 / 未运行（本轮结束后仍成立）

- **反馈 1（透明导航栏）本轮没有落地** —— 属 A 的共享层，申请见 20.1；预览里服务页页头仍是深色固定条。
- **未在真实手机 / Safari / 微信内置浏览器运行**：只有 Chromium 1440×900 与 390×844 视口，触摸、iOS 视口单位、微信 webview 一律**未运行**。
- `test:unit` / `test:e2e` 脚本**不存在**，未运行、未声称通过。
- **暗色态**不存在（无 token 层），服务页暗色视觉**未评估**；`/web-development` 的暗色截图无意义，故本轮未拍。
- en 文案缺译仍在：`capabilityTitle` / `statement` / `description` 与各 kind 固有分区文案（如「把企业已有资料…」）仍是中文；本轮新增的卡片图 `alt` 也是中文（有意的占位说明）。
- **未做**：`.iot-dashboard__side` 三张看板卡未配图（见 17.2 末）；能力卡的 `↗` 已移除（待用户确认是否保留）。
- **待用户裁决**：≤1024 的 hero 上留白是否允许从 `80px` 提到 ~`104px`（配合透明页头；现状见 20.1 第 3 点）。
- **待用户裁决**：过渡视频（`frontend/public/assets/transitions/`，6 个方向 + black/ 变体）随 `.service-switch` 删除后已无引用，是否删除文件或另找用途。

## 23. 下次第一步

1. 读本节 + `handoffs/INTEGRATION.md`，确认 `codex/rebuild-services` 本轮提交是否已被 A 收敛进 main。
2. **等 A 对 20.1 的结论**：透明页头一旦落地，立刻做三件事 —— ① 在 1440 / 1024 / 390 三档重拍首屏，确认页头透明、文字为深色且在米色底上可读；
   ② 量 `hero` 上留白与页头高度的间隙（≤1024 现在只剩 4px）；③ 复核 M-04（`.on`）与 M-05（`.hide`）在服务页也生效（滚轮向下应收起 76px）。
3. 把 20.4（`≤768` 的 `img{height:auto!important}`）与 20.2（footer 米色）一起向用户汇报进展。
4. 用户若提供正式图片，按 `evidence/service-pages/service-images.md` 第 5 节两步替换：A / D 组覆盖 `frontend/public/assets/services/`，B / C 组覆盖 `frontend/public/assets/services/cards/`，多数情况不用改代码。
