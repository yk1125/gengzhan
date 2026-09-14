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
