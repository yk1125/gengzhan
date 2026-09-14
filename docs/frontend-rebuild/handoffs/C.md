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