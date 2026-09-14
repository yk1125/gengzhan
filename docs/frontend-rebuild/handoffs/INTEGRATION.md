# 集成状态

维护人：Session A。

> **最新状态**：见文末「集成分支更正」与「T02-H 首页样板集成」（2026-09-14，`main` @ `84b7929`）。
> 下方「Git 收敛记录 / 用户确认记录 / T02 样板集成」是各时点的历史快照，保留不改。
> 下面这张表停在 planning 时点（`pilotCommit` 一栏已过期），暂未更新——首页样板已由 B 实现并合并，是否记为 `pilotCommit` 待 A 按用户验收流程落。

| 基准 | 实际提交 | 状态 |
| --- | --- | --- |
| 原源码 | `0ed5dcf` | 已核实 |
| docsCommit | `b484790` | 已提交 |
| foundationCommit | `4c18b6a`（分支）/ `512565e`（main 上的 cherry-pick，收敛时由 merge 取代） | 已冻结 |
| pilotCommit | 未生成 | 样板未验收 |

## Git 收敛记录（2026-09-14 · Session A）

### Step 3.9 零改动记录（记录时未改任何 git 状态）

记录时 `HEAD = 1e4f564`（其上是路由修复提交），`git status --short` 为空（clean，无未提交改动）。

各分支 HEAD 与相对 main 的 merge-base（`git rev-parse <branch>` / `git merge-base main <branch>`）：

| 分支 | HEAD | merge-base（收敛前） |
| --- | --- | --- |
| `main` | `1e4f564` | — |
| `codex/rebuild-foundation` | `af63173` | `b484790` |
| `codex/rebuild-brand` | `67890da` | `b484790` |
| `codex/rebuild-services` | `12054b5` | `b484790` |
| `codex/t00a-assets` | `45ef250` | `45ef250`（无自有提交） |
| `codex/t00r-motion-spec` | `45ef250` | `45ef250`（无自有提交） |
| `codex/frontend-rebuild` | `b484790` | `b484790` |

`git reflog` 显示 main 上 4 个提交是 `cherry-pick:`（不是 merge），因此与分支上的原始提交内容重复：

| main 提交（cherry-pick） | 分支原始提交 | `git patch-id --stable` | 判定 |
| --- | --- | --- | --- |
| `4a343d6` feat(home): build bilingual homepage pilot | `85530e6` | `1606f1e05df3...` | 同一改动 |
| `5021d76` feat: add bilingual service landing and mini program routes | `ad21014` | `db1292ac8e3d...` | 同一改动 |
| `512565e` feat: freeze frontend foundation contracts | `4c18b6a` | `038283ba844e...` | 同一改动 |
| `0997a1e` docs: record foundation integration commits | `af63173` | `21f3134c94d0...` | 同一改动 |

工作树与 dirty 状态（`git worktree list`，各工作树 `git status --short` 均为空）：

```text
D:/桌面/gengzhan                                           1e4f564 [main]
D:/桌面/gengzhan-worktrees/gengzhan-worktrees/session-b    67890da [codex/rebuild-brand]
D:/桌面/gengzhan-worktrees/gengzhan-worktrees/session-c    12054b5 [codex/rebuild-services]
D:/桌面/gengzhan-worktrees/session-a                       af63173 [codex/rebuild-foundation]
D:/桌面/gengzhan-worktrees/session-t00a                    45ef250 [codex/t00a-assets]
D:/桌面/gengzhan-worktrees/session-t00r                    45ef250 [codex/t00r-motion-spec]
```

`frontend/node_modules` 只在主仓存在；session-a、session-c 尚无（见工作树整理记录）。

## 用户确认记录

- Q1—Q27需求访谈已完成，详见REQUIREMENTS。
- 1.0完整方案整体确认：用户于2026-09-14明确回复“确认”；已完成，不再重复询问。
- 导航＋首页＋小程序服务样板：未提交用户验收。
- **D1（2026-09-14）**：外部素材的授权由用户自行处理/承担，本项目不代为获取授权，也不因此省略本地化要求——素材仍必须下载到仓库、登记来源与 hash（口径见 REFERENCE §3），并遵守「禁止运行时热链参考站域名」。
- **D2（2026-09-14）**：`/services/:slug` 形状确认为文档笔误，作废；英文路径统一 `/en/<slug>`，不实现 `/services/*` 别名。原「验收入口」里的 `/services/mini-program`、`/en/services/mini-program` 同步作废，已改为 `/miniprogram-development`、`/en/miniprogram-development`。

## 当前首个动作

方案已经确认。新的A任务接手后，检查工作区并先建立包含全部已确认规范的文档提交，再执行T00/T01；当前规范尚未提交，直接从旧Git提交创建工作树会缺少这些文件。不得凭空填入foundationCommit或pilotCommit派发下游实现。

## 集成记录

- 2026-09-14（Session A 收敛）：`codex/rebuild-brand` → 合并提交 `1d9d632`；`codex/rebuild-services` → `cefb3ad`；`codex/rebuild-foundation` → `Already up to date.`（其提交已随 brand 的祖先链在 main 中）；`codex/t00a-assets`、`codex/t00r-motion-spec` → 当时无自有提交，合并为空操作。合并后 merge-base 已等于各分支 HEAD：brand `67890da`、services `12054b5`、foundation `af63173`、t00a/t00r `45ef250`。
- 收敛验证（真实执行）：`npm.cmd run build` 通过（✓ 24.73s）；`npm.cmd run check:routes` → PASS 34 / FAIL 0 / PENDING 2（2 条 PENDING 都指向 `contact`，属 B·T05 未创建页面）；只读 eslint → 7 errors（与基线同一批）+ 843 warnings。
- 收敛过程中发现的存量问题（记录，未代改他人文件）：`frontend/src/views/ServiceLanding.vue` 第 59 行行首字面量 `\n` 使 `.reveal{...}` 规则失效（C 修）；`handoffs/C.md` 里 `/services/mini-program` 别名的说法按 D2 作废（C 改）。
- **已决（2026-09-14 用户裁定，选项 1）**：main 上 4 个 cherry-pick 重复提交（`4a343d6`、`5021d76`、`512565e`、`0997a1e`，与分支原始提交同 patch-id）**保持现状，不做任何历史改写**。收敛结论记为：分支已正式合并（merge-base 等于各分支 HEAD）、历史中保留这 4 个重复提交、不执行 rebase/filter-repo/强推。该冗余不影响功能、门禁与构建；后续如需清理须重新取得用户授权。
- **下游前置状态：B/C 未就绪**。main 上没有动效 SPEC.md（T00R 只有未提交的取证素材，见其工作树 `docs/frontend-rebuild/evidence/reference-effects/`），也没有素材（T00A 已下载 24 个客户 Logo 与 banner/transition 视频并生成带 SHA256 的 `assets-manifest.json`，但都还在未提交状态）。B 的 T02-H 定稿、C 的 T03 动效在有 SPEC.md 与素材合入前无法收口。

## T02 样板集成（2026-09-14）
- foundationCommit: `0997a1e`（合入 `4c18b6a`、`af63173`）
- T02-H: `85530e6` → 集成提交 `4a343d6`
- T02-S: `ad21014` → 集成提交 `5021d76`
- 修复：`9a17abc` 清理首页提交残留 diff 标记
- 验证：`frontend/npm.cmd run build` 通过；仅有 baseline-browser-mapping、Browserslist、chunk 体积及 module type 警告。
- 预览：Vite 已启动，端口 3000 被占用，集成预览运行于 http://localhost:3001/。
- 验收入口（2026-09-14 修正）：首页 `/`、英文首页 `/en`（`/en/` 规范到 `/en`）；小程序 `/miniprogram-development`、`/en/miniprogram-development`。主题切换使用公共主题按钮。
  - 原记录里的 `/services/mini-program`、`/en/services/mini-program` 是笔误，router 中不存在，已作废（见「用户确认记录」D2）。
- 有意差异/待验：视频素材与参考站动效未逐项比对；Logo 当前为文字占位；真实咨询/API未接入；尚未完成真实手机/Safari/微信验收；首页仍有大 chunk 警告。
- 状态：待用户验收样板，未生成 pilotCommit。

## 集成分支更正（2026-09-14 · 避免下一个 session 找错分支）

- **集成在 `main` 上做，不是 `codex/frontend-rebuild`。** `SESSIONS.md` §3「建议分支名（仅建议）」表把集成写成 `codex/frontend-rebuild`，是规划期占位：该分支实际停在 `b484790`（= docsCommit 基线本身，`git log` 只有 1 个提交），**没有任何集成提交，已作废、不要再使用**。
- 实际口径（与 `SESSIONS.md` §3「实际工作树位置」表一致）：**集成主仓 = `D:\桌面\gengzhan`，分支 = `main`**。各 session 取集成基准、同步前置、比对 merge-base 一律用 `main`。
- 已同步修正 `SESSIONS.md` §3 那一行并加注说明。

## T02-H 首页样板集成（2026-09-14 · Session A）

### 合并

| 项 | 值 |
| --- | --- |
| 源分支 | `codex/rebuild-brand` @ `9224b4f` |
| 合并前 main | `6312c90` |
| 合并提交 | `84b7929`（`git merge --no-ff`，单个可整体回滚的提交） |
| 提交数 | 18（`git rev-list --left-right --count main...codex/rebuild-brand` = `0 18`） |
| 冲突 | 无（`ort` 策略；`6312c90` 是分支的祖先，`git merge-base --is-ancestor main codex/rebuild-brand` = 0） |
| 回滚 | `git revert -m 1 84b7929` |

本提交只做集成，**不含任何行为修改**；六个公共文件的判定与后续收口事项见下。

### 合并前门禁（B 工作树 `D:\桌面\gengzhan-worktrees\session-b`）

- `git status --short` 为空（无未提交改动）。
- `npm.cmd run build`（在 `frontend/`）→ `✓ built in 19.00s`，仅既有 chunk>500kB 告警。

### 合并后验证（主仓 `D:\桌面\gengzhan`，HEAD = `84b7929`）

```text
$ npm.cmd run build            # frontend/
dist/assets/index-fd80a9c1.js            1,139.35 kB │ gzip: 364.40 kB
(!) Some chunks are larger than 500 kBs after minification. …（既有告警）
✓ built in 23.01s
=== EXIT: 0 ===

$ npm.cmd run check:routes     # frontend/
尾斜杠规范化：match 31/31，router beforeEach 守卫 存在 → PASS
routeManifest：3 条记录，PASS
[PENDING] contact — Contact/index.vue 尚未创建（B / T05）
结果：PASS 34 / FAIL 0 / PENDING 2
=== EXIT: 0 ===

$ .\node_modules\.bin\eslint.cmd . --ext .vue,.js,.jsx,.cjs,.mjs --ignore-path .gitignore
✖ 931 problems (7 errors, 924 warnings)
=== EXIT: 1 ===
```

eslint 与基线逐 commit 对比（同一条只读命令，`-f json` 逐文件比对）：

| 基准 | errors | warnings |
| --- | --- | --- |
| 合并前 `6312c90` | 7 | 843 |
| 合并后 `84b7929` | 7 | 924 |
| 增量 | **0** | **+81** |

- +81 条**全部是格式族**（`vue/max-attributes-per-line` / `attributes-order` / `html-self-closing` 等），只来自两个文件：`src/views/Home/index.vue` 50→127（+77）、`src/components/CustomCursor.vue` 0→4（+4）。
- **六个公共层文件（Header / Footer / layout-index / style.css / useMagnetic）零增量。**
- 7 个 error 全在 `src/components/CompetitiveAdvantage.vue`（3）与 `src/views/Cases/detail.vue`（4），**都未被本次合并触碰**，属存量。
- 注：AGENTS 记的基线是 `7 errors / 846 warnings`，本次实测 `6312c90` 是 `7 / 843`（差 3 条，应是统计点/口径不同）。**以实测为准，未改任何规则，也未降级规则掩盖告警。**

### 逐个判定 B 临时接管的公共文件（照收 / 收口 / 退回）

| 文件 | 判定 | 依据与收口事项 |
| --- | --- | --- |
| `frontend/src/layout/index.vue` | **照收** | 纯 +3 行（模板挂 `<CustomCursor />` + 一行 import），无行为分支。SPEC M-27 的光标层在参考站就是全站单层，挂外壳是唯一正确位置，不是"B 顺手扩到内页"。实测内页也出现该层（`display:block`，>1024px），与参考站口径一致。 |
| `frontend/src/components/CustomCursor.vue` | **照收** | 新增文件、自包含；`<style>` 非 scoped 但选择器全部带 `.fixed_cursor` / `.cursor` / `.whole` / `.bor` / `.content_pro` / `.cut` 前缀，不裸奔到 `a`/`button`。≤1024px 不注册监听、不启动 ticker（实测 390 端 `display:none`）。原生光标未被隐藏，**与参考站一致**（`sources/style.css` 里没有 `cursor:none`，两处已核对），不存在"双光标"缺陷。 |
| `frontend/src/composables/useMagnetic.js` | **照收（带回执）** | 新增文件、自包含。**回执**：它内部那段「绑定期把 inline `transition-property` 置 `none`、解绑还原」正是 §9.14 申请 2 要抽的 JS transform guard；A 抽出 `useJsTransformGuard(el, on)` 后，这里改成 import 即可，届时再由 A 统一。 |
| `frontend/src/layout/components/Header.vue` | **收口** | 功能（M-04 `.on` / M-05 wheel 收放 / `/en` 首页也生效）已按 §9.15 实测通过，收下。**收口**：为压过 `style.css` 里既有 `.header { … !important }`，本文件改用 `.header.header-home` 双类前缀 + 41 处 `!important`（37 条 `.header.header-home`）——这正是 AGENTS「不得继续叠加全局 `!important` 覆盖来掩盖结构错误」的成因。B 的接管到此结束，**A 需把 `.header-home` 这套规则收编进基础 `.header` 规则并削减 `!important`**（改动仅限本文件 + `style.css` 的 header 段）。另：模板 `<header` 缩进掉到第 0 列，纯格式，收编时顺手修掉。 |
| `frontend/src/layout/components/Footer.vue` | **收口** | 首页米色排版（`.footer-home`）已实测通过；`var(--footer-icon / --footer-link-hover / --footer-line, 原值)` 的字面回退值 = 改前值，内页零变化，收下。**收口**：调色板默认值取自「`style.css` 1707 段 + 2130 段两条 `!important` 叠加后的**有效**值」（不是 1707 段的字面值），因此**在 A 把两处合并成一处之前，任何人改 `style.css` 的 footer 段都会静默改变内页颜色**，且 diff 上看不出来（B 第一版就踩过：只改 615 段等于改死代码，实测毫无效果）。A 合并成一处后，这里才可回归字面默认值。 |
| `frontend/src/style.css` | **收口** | 已实测内页零变化，改法也干净：调色板收敛成一张表（621-650）、两处消费点改 `var()`、删掉 618 段 5 条**已实测为死规则**的声明。**收口**：同上的两层叠加 `!important` 结构仍在（1707 + 2130），A 需要合并；`--footer-*` 目前挂在 `.corporate-footer` 上，未来若 `style.css` 再出现 `.corporate-footer` 的覆盖规则要一起看。 |

**退回项：无。** 六个文件都随样板已获用户验收（9.15/9.18/9.21 的三轮反馈都已改到位），退回任何一个都会打断首页样板；但不加 `--no-ff` 就会退化成 18 个提交、无法整体回滚，所以用合并提交承载。

### 浏览器验证（preview = 本次合并后的 `dist`，`http://localhost:3005/`）

探针为页面内 `evaluate`（真实 DOM/computed 值，非静态推断）。

| 场景 | 关键实测 |
| --- | --- |
| `/` 1440 y=0 亮 | `header header-home`、`position: fixed`、`bg rgba(0,0,0,0)`、`transition 0.6s`、headerH **76**、nav `rgb(255,255,255)`、临界值 789（= clientHeight 827 − 38） |
| `/` 1440 y=900 亮 | `header header-home on`、bg 过渡到 **rgb(242,241,228) = #F2F1E4**、nav `rgb(0,0,0)` |
| `/` 1440 y=300 亮 | `.on` 移除、bg 回透明 |
| `/` 1440 wheel↓ / wheel↑ | `header header-home on hide` + `transform: matrix(1,0,0,1,0,-76)` → `.hide` 移除 + `transform: none` |
| `/` 1440 亮 footer | `footer corporate-footer footer-home`、bg **#F2F1E4**、容器 `padding-top 146px`、h3 `#1e2f48`、栏目链接 `#40546a` |
| `/` 1440 暗 footer | `--footer-bg: #111`、bg **rgb(17,17,17)**、容器 `padding-top 68px`、h3 `#fff`（米色正确回落）；移除属性后恢复 #F2F1E4/146px |
| `/en` 1440（y=0 / y=900 / wheel↓ / wheel↑） | 与 `/` 逐项一致 —— **§9.15.1 那个 `/en` 拿不到 `.header-home` 的缺陷确认已修** |
| `/en` 1440 亮 / 暗 footer | #F2F1E4 / 146px → #111 / 68px，与 `/` 一致 |
| `/` 与 `/en` 390（亮/暗） | header **64px**；footer `footer-home`，亮 #F2F1E4 + `padding-top 34px`、暗 #111 + 34px（移动断点未被污染）；`documentElement.scrollWidth <= innerWidth`（无横向溢出）；`.fixed_cursor` `display:none` |
| `/` 390 `#statement`（index4） | 文案 `opacity:1`、`color: rgb(255,255,255)`，命中测试落点在文案自身的 `.sj_jump` 包裹层（不是遮挡物）→ §9.21.7 的手机端可见性修复成立 |
| `/ai-development` 1440（内页回归抽查） | y=0 `header`；y=600 `header header-fixed`、bg `rgba(17,17,17,.98)`、h 76；footer `footer corporate-footer`（无 `footer-home`）、#111、68px、h3 #fff、legal `#5a6d82` → 与 §9.15 的表逐项吻合，**内页未被公共层改动带偏** |
| 三条路由 console | `/`、`/en`、`/ai-development` 的 `error`/`warn` 均为 **0 条**；`[src]/[href]/[style]` 扫描 **external URLs: none**（无参考站热链） |
| 自定义光标层 | 首页 1440 `display:block`、`.hover_button` 磁吸目标 1 个；`/en` 光标文案 `Explore`（语言切换生效）；≤1024px 整层不注册 |

视觉复核（本次为逐项数值探针 + 目视确认，未新增 PNG；8 张组合静帧仍以 B 的 `handoffs/B/shots/09-*.png` 为准）：1440 首页首屏（透明页头 + 白色导航 + 磁吸蓝色 pill）、1440 `/en` 米色 footer（logo `multiply` 生效、五栏与 legal 行正常）、390 index4 照片带上文案可读。

### 本次发现、未修（不在本步授权范围，交接给 A）

1. **主题（亮/暗）目前没有 UI 入口，暗色在成品里不可达** —— `frontend/src/stores/theme.js` 有 `toggle()`，但**全仓无人 import 它**，`Header/Footer/layout` 里也没有主题按钮；`style.css` 里除本次新增的 `html:not([data-theme='dark'])` 外几乎没有 `[data-theme='dark']` 规则，也没有 `prefers-color-scheme` 分支。因此上面「暗色」一列是用 `document.documentElement.dataset.theme='dark'` 注入的（= `stores/theme.js` 里 `toggle()` 的同一句写法），**不是从界面点出来的**。AGENTS 要求「当地时间 19:00—07:00 暗，两态按钮」，这块属 A 的共享层范围，本次不擅自补。
2. **`/en` 的 `<html lang>` 仍是 `zh-CN`**（`/en` 实测 `document.documentElement.lang === 'zh-CN'`）。英文站的语言声明没跟着路由切，属共享外壳（A）。
3. `B` 的 §9.14 三项申请 + §9.20 A4（M-01 lenis）**仍未落地**，本次只合并、未代做。其中申请 1（把 `transform` 从 `style.css` 全局 `transition: all` 里摘掉）与本合并的 Header/磁吸强相关，建议紧接着做。
4. 存量（非本次引入，未处理）：`/cases` 直连 500（后端未起，有失败态）；`npm.cmd run lint` 带 `--fix` 不是只读检查；M-19 mask 展开速度与参考站不符（§9.23 D3）；`package.json` 无 `test:unit/test:e2e` 脚本（T01 未做，本次未声称可运行）。
5. 首页仍是大 chunk（1,139.35 kB / gzip 364.40 kB）+ 90MB 级占位动图，属已登记的素材/构建缺口，本次未动。
## T02-S 服务页样板集成与样板验收矩阵（2026-09-15 · Session A）

### 1. 合并

| 项 | 值 |
| --- | --- |
| 命令 | `git merge --no-ff codex/rebuild-services`（ort 策略，无冲突） |
| 结果 | `1a9aa2a`；父 `b6a2c72`（合并前 main）+ `822af9a`（源分支 HEAD，main 之上 9 个提交） |
| 源码改动面 | 只有 `frontend/src/views/ServiceLanding.vue`（55 → 2092 行）；另新增 `frontend/public/assets/services/**`（53 张）、`docs/frontend-rebuild/evidence/service-pages/**`，更新 `handoffs/C.md` |
| 公共层判定 | `Header.vue` / `style.css` / `router/index.js` / `layout/index.vue` / `package.json` / `useMagnetic.js` 在 main 与源分支上**逐字节相同**（`git show <ref>:<path>` 取内容再 `git hash-object --stdin`，六对哈希一致）→ C 未改公共层，本合并不含公共层变更 |
| 未纳入 | 工作区里 A 的「收编 B 公共层」未提交改动（Header / style.css / router / layout / package.json / useMagnetic + 新增 composables、scripts）**没有**被这次合并或本记录提交吸收，仍原样留在工作区 |

### 2. 验证环境（可归因性）

本轮全部数字都在 `1a9aa2a` 的**干净检出**上取得：`git archive 1a9aa2a | tar -x -C %TEMP%\yz-pilot-1a9aa2a-v1`，`frontend/node_modules` 用 junction 指向主仓（不复制、不安装、不动工作区）。工作区那批未提交公共层改动没有参与任何一格；因此下面结果只归因于样板本身。

### 3. 命令与结果

| 检查 | 命令 | 结果 |
| --- | --- | --- |
| 构建 | `npm.cmd run build` | PASS，`✓ built in 23.63s` |
| 主入口 chunk | — | `index-814da520.js` 1,139.35 kB / gzip **364.39 kB**（原基线 363.95；`84b7929` 时已 364.40） |
| 服务页 chunk | — | `ServiceLanding-4d5308ef.js` 23.10 kB / gzip 11.29 kB（懒加载，未进主入口） |
| 主入口 CSS | — | `index-dc32aa68.css` 530.78 kB / gzip **69.44 kB**（原基线 69.14） |
| 只读 eslint | `eslint . --ext .vue,.js,.jsx,.cjs,.mjs --ignore-path .gitignore` | exit 1，**7 errors / 795 warnings**（baseline 7/846）；7 个 error 与本文档 §1 列出的 7 项存量逐条相同，**无新增** |
| 路由契约 | `npm.cmd run check:routes` | PASS 34 / FAIL 0 / PENDING 2（两条都是 `contact`，B·T05）；尾斜杠 31/31 |

性能口径：主入口 gzip 与主入口 CSS 都**略超** ACCEPTANCE §6「不高于原基线」的字面值（+0.44 kB、+0.30 kB）。量级来自 T02-H 首页（`84b7929` 时已是 364.40 kB）；C 的服务页走独立懒加载 chunk，没有加重主入口。属已登记缺口，本轮未动。

### 4. 全站矩阵（64 格）

口径：16 条路由（8 条 × 中文 / 英文）× 2 视口（1440×900、390×844）× 2 主题（light / dark）。

| 观测项 | 结果 |
| --- | --- |
| console error / pageerror | **0 / 0**（64 格全量） |
| 外部网络请求 | **0**（只出现 `127.0.0.1:3021` 与 `data:` / `blob:`） |
| 水平溢出 | 全部 0（390 亦无横向滚动） |
| 破图 | 0 |
| `html lang` | 全部 `zh-CN`，**含全部 `/en` 路由** |
| 桌面导航 | 所有路由同一组 8 项 |

14 条服务路由的「序号 + 标题」逐条对照（无串页）：

| 路由 | 序号 | h1 | 路由 | 序号 | h1 |
| --- | --- | --- | --- | --- | --- |
| `/ai-development` | 01 / 07 | AI 开发 | `/en/ai-development` | 01 / 07 | AI DEVELOPMENT |
| `/miniprogram-development` | 02 / 07 | 小程序开发 | `/en/miniprogram-development` | 02 / 07 | Mini Program Development |
| `/app-development` | 03 / 07 | App 开发 | `/en/app-development` | 03 / 07 | APP DEVELOPMENT |
| `/web-development` | 04 / 07 | 网站建设 | `/en/web-development` | 04 / 07 | WEB DESIGN |
| `/iot-development` | 05 / 07 | 物联网开发 | `/en/iot-development` | 05 / 07 | IOT SOLUTIONS |
| `/custom-development` | 06 / 07 | 定制开发 | `/en/custom-development` | 06 / 07 | CUSTOM SOFTWARE |
| `/digital-creativity` | 07 / 07 | 数字创意 | `/en/digital-creativity` | 07 / 07 | DIGITAL CREATIVE |

主题实测（1440，注入 `html[data-theme]`）：`/` 与 `/en` 的 footer `#F2F1E4 → #111`、文字 `#334155 → #999`；其余（body `#071014`、header 透明、h1 `#fff`、服务页 `.service-hero` 透明）**两态完全相同**。即现在只有首页 footer 真正响应主题。

界面入口实测：桌面无主题按钮、无语言切换链接（`Header.vue` 里的 `menuList` 是硬编码中文，全站 `a[href]` 无一条 `/en`）；因此主题用 `data-theme` 注入、语言用 `/en` 直达验证。390 汉堡菜单：可开（`.mobile-menu-btn.active`）、`body.overflow=hidden` 锁滚动、8 项菜单、可关。

截图证据（20 张；1440 / 390 × light / dark × 首页 / 小程序 / 数字创意 / 英文小程序 / 英文 AI）在 `docs/frontend-rebuild/handoffs/A/shots/pilot/`。

### 5. 三项确认

1. **七类服务共享同一模板 ✓**：`src/views/ServiceLanding.vue` 是唯一服务页组件，中文 7 条 + 英文 7 条共 14 条路由全部指向它；旧的 `views/AiDevelopment|AppDevelopment|WebDevelopment|IotDevelopment|CustomDevelopment|DigitalCreativity|MiniprogramDevelopment` 目录已**无人 import**。运行时 14 条路由收敛为 7 组 DOM 骨架，每组中英骨架相同，只有「01」分区按 `kind` 不同，`service-capabilities` / `service-approach` / `service-cta` 三段完全一致。
2. **主导航只列四类服务 ✓**：8 项 = 首页、AI开发、小程序开发、App开发、WEB网站开发、公司案例、行业资讯、关于我们；服务项恰好 4 个。移动菜单同一组 8 项。
3. **路由映射不串页 ✓**：14 条服务路由的序号与标题逐条对上（上表），中英同一服务同序号；能力卡 4 张且标题与服务一一对应（`capTitles` 逐条比对无跨页残留）。

### 6. 素材检查

| 项 | 结果 |
| --- | --- |
| 本地化 | 53 张服务图全部落在 `frontend/public/assets/services/`，页面只引用 `/assets/services/...` 本地路径 ✓ |
| 登记 hash | `evidence/service-pages/service-images.md` 逐条登记来源与 sha256；本轮独立复算 **53/53** 命中登记表 ✓ |
| 引用完整性 | `ServiceLanding.vue` 引用 53 条 ↔ 磁盘 53 个文件，**双向无缺口**（无死链、无孤儿）✓ |
| 运行时 | 64 格外部请求 0；构建产物内 `seniorweb` 命中 **0** ✓ |
| ✗ 配置内残留参考站 URL | `frontend/src/content/services.js:3` 仍写着 `https://www.seniorweb.cn/solution/34.html`。实测该文件**无人 import**（dead code，不进 bundle、不影响运行时），但按 AGENTS「页面、样式、配置里都不得出现参考站 URL」仍应删或改；文件属 C，建议随 T03 处理 |

### 7. 结论

**通过**：合并本身；`export`/构建；只读 eslint 无新增 error；路由契约（含尾斜杠）；14 条服务路由的模板 / 导航 / 映射；53 张资产本地化与 hash 登记；390 无横向溢出；64 格零 console error、零外部请求；移动菜单开合与锁滚动。

**未通过 / 缺口**（除注明外均非本次合并引入）：

| # | 缺口 | 影响 | 归属 |
| --- | --- | --- | --- |
| G1 | 主题只有首页 footer 有反应；无 UI 入口；无 19:00—07:00 时间边界逻辑（`stores/theme.js` 的 `toggle()` 全仓无人 import，`main.js` 不初始化主题） | AC05 / AC06 不成立；服务页与首页主体亮暗无差异 | A（T01 遗留 / T06） |
| G2 | `/en/**` 的 `documentElement.lang` 仍是 `zh-CN`，桌面导航 8 项仍是中文 | AC04 / AC16 不成立 | A（共享 i18n） |
| G3 | `/en` 服务页是「英文标题 + 中文卡片 / 标签 / 流程」 | 用户 2026-09-15 裁决 ⑤：该事项归 A | A |
| G4 | `/en/miniprogram-development` 的 h1 在 1440 断词换行（`Developme` / `nt`） | 英文排版缺陷 | A（随 G3 一起） |
| G5 | IoT（`/iot-development`）与数字创意（`/digital-creativity`）**全站没有任何入口**（导航、首页、footer 的 `a[href]` 里都没有），只能直达 URL | AC01 / AC09 的「三次级入口可用」只兑现了定制开发（首页「合作咨询」CTA） | A（导航 / routeManifest） |
| G6 | 主入口 gzip 364.39 kB（基线 363.95）、主入口 CSS 69.44 kB（基线 69.14） | ACCEPTANCE §6 字面未达标，量级来自 T02-H | B / T07 |
| G7 | `content/services.js` 含参考站 URL（见 §6） | 不变量字面违规（dead code） | C（T03） |
| G8 | `/cases` 直连需后端（否则失败态）；`lint` 带 `--fix`；`test:unit` / `test:e2e` 不存在 | 存量，未声称可运行 | A / T07 |

### 8. 有意差异表（相对参考站）

| 项 | 有意差异 | 依据 |
| --- | --- | --- |
| 内容 | 参考站 seniorweb 的文案 / 案例 / 客服换成耘栈内容，不做逐像素对照 | ACCEPTANCE §5 |
| 图片 | 53 张 Pexels 占位图（非参考站素材、非正式图），替换方法见 `service-images.md` §5 | 用户 D1 |
| 主题 | 参考站是两态按钮 + 08:00 / 19:00；本项目应为 07:00 / 19:00，**当前两者都未实现**（G1） | AGENTS 不变量 |
| 数字创意 | 保留该服务名（旧官网「数字文创」不作为改名依据） | 用户裁决 ① |
| IoT 看板数字 | 保留 `98.6% / 03 / 12 / 稳定`，不加「界面示意」字样 | 用户裁决 ③ |
| 公司数字 | 服务页不展示 10年+ / 200+ / 98% / CMMI3 / 24-7 | 用户裁决 ④ |
| en 服务页 | 维持「英文标题 + 中文卡片 / 标签 / 流程」 | 用户裁决 ⑤（归 A） |
| 数字藏品 / NFT | 不作为卡片加入 | 用户裁决 ② |

### 9. pilotCommit

- **pilotCommit = `1a9aa2a`**（即上面的合并提交；本记录提交在其之上，只含文档与截图证据）。
- 语义提醒：按 SESSIONS §1，`pilotCommit` 指「用户批准导航 ＋ 首页 ＋ 小程序样板后的实际提交」。**当前用户尚未确认**，因此这个 hash 现在只是候选基准，不得对外称「样板已批准」。
- 不包含：工作区里 A 未提交的公共层收编。
- 预览：主仓工作区 `npm.cmd run dev`（会带上 A 未提交的公共层，与 pilotCommit 不完全一致）；要与 pilotCommit 完全一致，用 §2 那个干净检出。

### 10. 下一步（用户验收通过前不启动）

样板验收门见 PLAN「样板验收门」：需要用户确认，之后才发下面两条通知。

- **B → T05**：从 `pilotCommit` 起实现 About / Contact / Privacy / Legal 与中英文本（表单字段 / 状态按 DATA）。
- **D → T04**：从 `pilotCommit` 起实现 Cases / News 列表、分类 / 分页、详情与返回。
- **C → T03**：其余六服务内容与双语（含 G7）；与 A 的 i18n 管线（G2 / G3）排期。
- **A**：G1（主题 UI + 时间边界）、G2 / G3 / G4（i18n 与 en 文案）、G5（导航入口）、以及工作区那批公共层收编的处置。

通知文本（**验收通过后**再发，此处只备稿）：

```text
[给 B] 样板已由用户验收通过，pilotCommit = 1a9aa2a。从该提交启动 T05：About / Contact / Privacy / Legal + 中英文；表单字段、国际号码 / 邮箱、必填选填、隐私勾选、received / demo / unavailable 按 DATA.md；后台未接通走已批准退路，不伪造电话 / 二维码 / 提交成功。只改 B 所属文件。
[给 D] 样板已由用户验收通过，pilotCommit = 1a9aa2a。从该提交启动 T04：Cases / News 列表、基础分类 / 分页、详情、返回与咨询；只消费既定 repository，修未知 ID 与数据不一致；不做搜索 / 相关推荐 / 浏览量。
```

### 11. 下次第一步

1. 把本轮结论交给用户确认（预览命令见 §9；截图见 §4 路径）。
2. 用户确认后：记录批准日期，向 B 发 T05、向 D 发 T04、向 C 发 T03。
3. 未确认前不启动下游页面定稿；A 可先做 G1 / G2 / G3 / G4 / G5 与工作区公共层收编的处置。
