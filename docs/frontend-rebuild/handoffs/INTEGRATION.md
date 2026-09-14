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
| `/ai-development` 1440（内页回归抽查） | y=0 `header`；y=600 `header header-fixed`、bg `rgba(17,17,17,.98)`、h 76；footer `footer corporate-footer`（无 `footer-home`）、#111、68px、h3 #fff、legal `#5a6d82` → 与 §9.15 的表逐项吻合，**内页未被公共层改动带偏**。⚠️ **本行是 merge 时点（`84b7929`）的快照，已被下方「A 收编 B 的公共层」一节取代**：`header-fixed` 类已删除，同一场景现在是 `header`（y=0）/ `header on`（y=600）、`.on` 把底色压深一档。footer 六项值未变。 |
| 三条路由 console | `/`、`/en`、`/ai-development` 的 `error`/`warn` 均为 **0 条**；`[src]/[href]/[style]` 扫描 **external URLs: none**（无参考站热链） |
| 自定义光标层 | 首页 1440 `display:block`、`.hover_button` 磁吸目标 1 个；`/en` 光标文案 `Explore`（语言切换生效）；≤1024px 整层不注册 |

视觉复核（本次为逐项数值探针 + 目视确认，未新增 PNG；8 张组合静帧仍以 B 的 `handoffs/B/shots/09-*.png` 为准）：1440 首页首屏（透明页头 + 白色导航 + 磁吸蓝色 pill）、1440 `/en` 米色 footer（logo `multiply` 生效、五栏与 legal 行正常）、390 index4 照片带上文案可读。

### 本次发现、未修（不在本步授权范围，交接给 A）

1. **主题（亮/暗）目前没有 UI 入口，暗色在成品里不可达** —— `frontend/src/stores/theme.js` 有 `toggle()`，但**全仓无人 import 它**，`Header/Footer/layout` 里也没有主题按钮；`style.css` 里除本次新增的 `html:not([data-theme='dark'])` 外几乎没有 `[data-theme='dark']` 规则，也没有 `prefers-color-scheme` 分支。因此上面「暗色」一列是用 `document.documentElement.dataset.theme='dark'` 注入的（= `stores/theme.js` 里 `toggle()` 的同一句写法），**不是从界面点出来的**。AGENTS 要求「当地时间 19:00—07:00 暗，两态按钮」，这块属 A 的共享层范围，本次不擅自补。
2. **`/en` 的 `<html lang>` 仍是 `zh-CN`**（`/en` 实测 `document.documentElement.lang === 'zh-CN'`）。英文站的语言声明没跟着路由切，属共享外壳（A）。
3. `B` 的 §9.14 三项申请 + §9.20 A4（M-01 lenis）**仍未落地**，本次只合并、未代做。其中申请 1（把 `transform` 从 `style.css` 全局 `transition: all` 里摘掉）与本合并的 Header/磁吸强相关，建议紧接着做。
4. 存量（非本次引入，未处理）：`/cases` 直连 500（后端未起，有失败态）；`npm.cmd run lint` 带 `--fix` 不是只读检查；M-19 mask 展开速度与参考站不符（§9.23 D3）；`package.json` 无 `test:unit/test:e2e` 脚本（T01 未做，本次未声称可运行）。
5. 首页仍是大 chunk（1,139.35 kB / gzip 364.40 kB）+ 90MB 级占位动图，属已登记的素材/构建缺口，本次未动。

## A 收编 B 的公共层（2026-09-14 · Session A）

回应 `handoffs/B.md` §9.14 三项申请 + §9.20 A4，并落实上面「逐个判定」里承诺的收口。**本次改动未提交**（工作区修改，未 `git add` / `git commit`，可整体回滚）。

### 改动清单

| 文件 | 动作 |
| --- | --- |
| `frontend/src/router/index.js` | `Home` / `HomeEn` 加 `meta: { headerTransparent: true }` |
| `frontend/src/layout/components/Header.vue` | 透明顶改由 `route.meta.headerTransparent` 声明；删 `isHome` / `isFixed`；删自带的 `.header` 底色层（原 scoped 里那份 `rgba(10,14,39,.8)`）；scoped 只剩汉堡按钮、移动菜单皮肤、`.mobile-slogan` 与 M-03 入场 |
| `frontend/src/style.css` | 删掉原来四处互相 `!important` 压制的 header 声明层，新增**全站唯一**的「页头（Header）」段；全局可点击元素过渡 `transition: all …` → `--ui-transition`（显式属性，**不含 `transform`**） |
| `frontend/src/composables/useJsTransformGuard.js` | **新增**：§9.14 申请 2 的 JS transform 守卫（`const release = useJsTransformGuard(el, on)`，幂等、空值安全） |
| `frontend/src/composables/useMagnetic.js` | 改用 `useJsTransformGuard`（行为未变） |
| `frontend/src/composables/useSmoothScroll.js` | **新增**：§9.20 A4 / SPEC M-01 的滚动惯性（`lenis@1.3.26`） |
| `frontend/src/layout/index.vue` | `useSmoothScroll()`；回顶改走 `scrollToTop()`（M-32 1200ms） |
| `frontend/scripts/check-motion.mjs` | **新增**：§9.14 申请 3 的动效门禁（只读静态扫描，仿 `check-routes.mjs`） |
| `frontend/scripts/motion-baseline.json` | **新增**：存量 `transition: all` 清单（42 条，只允许减少） |
| `frontend/package.json` | 新增 `check:motion` / `check:motion:strict` |

`Header.vue` 的 `!important`：**41 处 → 2 处**，且这 2 处都在注释文字里（`rg -n '!important'` 只命中 `:167` / `:222` 两句说明），**声明里 0 处**。四个新文件均为 LF、无 BOM。

### 命令实测（真实输出）

```text
$ npm.cmd run build            # frontend/
dist/assets/index-b59b95c2.js            1,139.39 kB │ gzip: 364.40 kB
(!) Some chunks are larger than 500 kBs after minification. …（既有告警）
✓ built in 15.91s
=== EXIT: 0 ===

$ npm.cmd run check:routes
尾斜杠规范化：match 31/31，router beforeEach 守卫 存在 → PASS
routeManifest：3 条记录，PASS
[WARN] routeManifest 尚未覆盖 §3 的 15 个 routeKey …（T01 未完成，不属于本次修复范围）
[PENDING] contact — Contact/index.vue 尚未创建（B / T05）
结果：PASS 34 / FAIL 0 / PENDING 2
=== EXIT: 0 ===
（--strict 下 FAIL 1 = 那 2 条 PENDING，与改动前逐项一致）

$ npm.cmd run check:motion
动效门禁（check:motion）—— 只读扫描 frontend/src 的 <style> 与 .css
[PASS] transition: all —— 基线 42 条，本次扫到 42 条，新增 0 条
[PASS] 可点击元素 hover 改 transform —— 无 transform 过渡的规则 0 条
结果：PASS 2 / FAIL 0 / BASELINE-STALE 0
=== EXIT: 0 ===
（--strict EXIT 0；--verbose 追加 [INFO] 可点击元素 hover+transform 规则共 8 条，其中 8 条已有 transform 过渡）

$ .\node_modules\.bin\eslint.cmd . --ext .vue,.js,.jsx,.cjs,.mjs --ignore-path .gitignore
✖ 930 problems (7 errors, 923 warnings)
=== EXIT: 1 ===
```

**门禁真的会拦（不是空跑）**：用一次性探针 `src/__gate_probe.css` 验过两次——(a) 加一条新的 `transition: all` → FAIL + EXIT 1；(b) 加一条 `a.pill:hover{transform:…}` 且无 transform 过渡 → FAIL + EXIT 1。探针已删除（`Test-Path` = False）。

eslint 与合并时点基线逐文件比对（同一条只读命令 + `-f json`）：

| 基准 | errors | warnings |
| --- | --- | --- |
| `84b7929`（合并时点，见上一节） | 7 | 924 |
| 本次改动后 | 7 | **923** |
| 增量 | **0** | **−1** |

- −1 全部来自 `src/layout/components/Header.vue`（25 → 24）：收编时删掉了 scoped 里那一整份重复的 `.header` 样式。`useMagnetic.js` / `layout/index.vue` / `router/index.js` 与两个新 JS 文件**零告警**。
- 7 个 error 仍是 `CompetitiveAdvantage.vue`（3）+ `Cases/detail.vue`（4），**未被本次触碰**，属存量。
- 注：`AGENTS.md` 记的基线 `7 errors / 846 warnings` 与实测（`84b7929` = 7 / 924）差 78 条。本次以实测为准，**未改任何规则、未降级规则**。

### Header 透明 / 收放实测（preview = 本次 `dist`，`http://localhost:3006/`）

探针为页面内 `evaluate`（真实 class 与 computed style，非静态推断）。`阈值 = clientHeight − headerHeight / 2`。

**首页 `/`（zh）· 1441×900 亮 —— 皮肤与过渡**

| 场景 | class | bg | 其它实测 |
| --- | --- | --- | --- |
| y=0 | `header header-transparent` | `rgba(0,0,0,0)` | `bbc rgba(0,0,0,0)`、`box-shadow none`、`transform none`、h **76**、`position fixed`、`z-index 3000`、`transition-property: background-color, border-color, box-shadow, backdrop-filter, transform` / `0.6s` / `ease`、nav `rgb(255,255,255)`、brand `rgb(255,255,255)`、`.header-container` maxW **1240px**、列 `272.229 / 639.542 / 272.229` |
| y=861（阈下 1px） | `header header-transparent` | `rgba(0,0,0,0)` | `.on` 未加（阈值 **862** = 900 − 38） |
| y=863（阈上） | `header header-transparent on` | **`rgb(242,241,228)` = #F2F1E4** | nav / brand → `rgb(0,0,0)`、微信按钮 border → `rgba(0,0,0,0.4)` |
| y=400（回退） | `header header-transparent` | `rgba(0,0,0,0)` | `.on` 移除 |
| 跨阈值过渡中途两次采样 | — | `rgba(242,241,228,0.643)` → `rgba(242,241,228,0.94)` → `rgb(242,241,228)` | 证明 0.6s 过渡真的在跑 `background-color`（不是瞬切） |
| wheel ↓ +300（沉降后） | `header header-transparent hide` | `rgba(0,0,0,0)` | `transform: matrix(1, 0, 0, 1, 0, -76)` |
| wheel ↑ −300 | `header header-transparent` | `rgba(0,0,0,0)` | `.hide` 移除、`transform: none` |

**首页 `/en` · 1441×900**

| 场景 | class | bg | 其它 |
| --- | --- | --- | --- |
| 亮 y=0 / y=861 | `header header-transparent` | `rgba(0,0,0,0)` | nav `rgba(255,255,255,0.88)`、brand `rgb(255,255,255)`、微信 border `rgba(255,255,255,0.45)`、maxW 1240 |
| 亮 y=863 / y=900 | `header header-transparent on` | `rgb(242,241,228)` | nav / brand `rgb(0,0,0)`、微信 border `rgba(0,0,0,0.4)` |
| 亮 wheel↓ / wheel↑ | `… hide` / `…` | `rgba(0,0,0,0)` | `matrix(1,0,0,1,0,-76)` → `none` |
| 暗 y=0 / y=900 | 与亮逐项一致 | 同上 | 暗色 `.on` 仍 #F2F1E4（= B.md §9.20 B2 已裁决「保持参考站字面值」） |
| footer | `footer corporate-footer footer-home` | `rgb(242,241,228)` | `padding-top 146px` |

**首页 `/` 与 `/en` · 390×844**

| 场景 | class | bg | 其它 |
| --- | --- | --- | --- |
| `/` 亮 y=0 | `header header-transparent` | `rgba(0,0,0,0)` | h **64**、栅格 `auto 1fr auto`、子项宽 `logo:76` + `mobile-menu-btn:44`，`nav-menu` / `.mobile-slogan` / `.desktop-actions` 均 `display:none` 且宽 0、`scrollWidth 390 = innerWidth 390`、`html` 无 `lenis`、brand `animation-name: none`（≤1024 不播 M-03） |
| `/` 亮 y=845 / 暗 y=845 | `header header-transparent on` | `rgb(242,241,228)` | nav → `rgb(0,0,0)`；阈值 **812** = 844 − 32 |
| `/en` 亮 y=812 / y=814 | `header header-transparent` / `… on` | `rgba(0,0,0,0)` / `rgb(242,241,228)` | 逐像素卡在阈值两侧 |
| `/en` 390 footer | `footer corporate-footer footer-home` | `rgb(242,241,228)` | `padding-top 34px` |
| 汉堡菜单（开） | `.mobile-menu-overlay` `display:block`、`top 64px`、`z 999`、bg `rgba(15,32,62,0.26)`；`.mobile-nav` `28px 20px`、bg `rgb(17,17,17)`、`min-height 780px`、宽 390；条目 `16px 8px` / 18px / `border-bottom 0.666667px solid rgb(51,51,51)` / `radius 0`；active（首页）`rgb(240,106,33)`；`.mobile-contact` bg `rgb(23,61,134)`；`body overflow: hidden` | | 8 条；关闭后 `body overflow: visible` |

**服务页 `/miniprogram-development`（zh）· 1441×900**

| 场景 | class | bg | 其它实测 |
| --- | --- | --- | --- |
| y=0 | `header`（**无** `header-transparent`） | `rgba(17,17,17,0.98)` | `border-bottom 0.666667px rgba(255,255,255,0.14)`、`box-shadow rgba(0,0,0,0.16) 0 4px 18px`、h 76、nav `rgba(255,255,255,0.78)`、maxW **1240px**、navW **639.542** |
| y=861（阈下） | `header` | `rgba(17,17,17,0.98)` | — |
| y=863 / y=900（阈上） | `header on` | **`rgba(10,10,10,0.99)`** | `box-shadow → rgba(0,0,0,0.28) 0 10px 28px`（收编前内页是 `header-fixed`，`.on` 这条压深不生效） |
| wheel ↓ / ↑ | `header hide` → `header` | `.98` → `.98` | `matrix(1,0,0,1,0,-76)` → `none` |
| 暗 y=0 / y=900 | 与亮逐项一致 | 同上 | 实底皮肤不随主题变（与改动前一致） |
| `.nav-item.active` | `href="/miniprogram-development"` | — | `::after` = **4×4 `rgb(240,106,33)`、`border-radius 50%`**；首页项虽带 vue-router 自动加的 `router-link-active`，其 `::after` 仍是 `scaleX(0)`（不误亮） |
| footer | `footer corporate-footer` | `rgb(17,17,17)` | `padding-top 68px` |

**服务页 `/en/miniprogram-development`（en）** —— 上表六项**逐项一致**（class 变化、bg、shadow、transform、阈值 862、footer）。390 端同样一致：y=0 `header` / h 64 / `scrollWidth 390`；y=814 起 `header on` `rgba(10,10,10,0.99)`；暗色两态一致；汉堡菜单开（8 条、`body overflow hidden`）关（`visible`）正常。中文服务页 390 菜单的 active 项是「小程序开发」`rgb(240,106,33)`。

**M-03 页头入场（1441 端实测）**：`animation-name: headerFadeInDown-<hash>`（scoped 哈希，不撞 animate.css）、`1s`；延迟 logo `0s`、8 个导航项 `0.2s / 0.4s / 0.6s / 0.8s / 1s / 1.2s / 1.4s / 1.6s`、`.desktop-actions` `1.3s`。≤1024 端 `animation-name: none`（口径见 `specs/FRONTEND.md` §7 的 1025px 门槛决策）。

**视觉复核（本次新增 PNG，`handoffs/A/shots/`）**

| 文件 | 对应实测值 |
| --- | --- |
| `10-hdr-home-1441-light-y0.png` | `/` 1441 亮 y=0：透明页头 + 白色字标/导航（bg `rgba(0,0,0,0)`） |
| `11-hdr-home-1441-light-y900-on.png` | `/` 1441 亮 y=900：`.on` 米底 **#F2F1E4** + 黑字/黑导航 |
| `12-hdr-home-1441-wheel-down-hide.png` | `/` wheel↓：`.hide`，页头整体 `translateY(-76px)` 离屏 |
| `13-hdr-home-390-light-menu-open.png` | `/` 390：汉堡菜单（深底 8 条、首页橙 `rgb(240,106,33)`、微信按钮蓝） |
| `14-hdr-service-1441-light-y0.png` | 服务页 1441 亮 y=0：实底 `rgba(17,17,17,.98)`（无 `header-transparent`） |
| `15-hdr-service-1441-light-y900-on.png` | 服务页 `.on`：`rgba(10,10,10,.99)` + 阴影加深 |
| `16-hdr-service-390-dark-y900-on.png` | 服务页 390 暗 y=900：`.on` / h 64 / `scrollWidth 380 ≤ 390` |

### M-01 滚动惯性实测（同一 preview）

```text
html class = "lenis"（仅 clientWidth ≥ 1025）；lenis 样式已随构建注入（/assets/index-1e78e00f.css）

从 y=0 起 wheel deltaY=900（1441 宽），scrollY 逐帧采样（t 自派发起算）：
  124ms → 412.00      854ms → 885.33
  246ms → 627.33     1100ms → 895.33
  367ms → 748.00     1343ms → 898.67
  489ms → 815.33     1587ms → 900.00（到位）
  → 总行程 Σ = 900 = 初始 momentum；指数衰减、无回弹、无过冲
wheel deltaY=9000 → finalY 8999.33（同样是 Σ = 初始 momentum）

逐帧滚动管线未被改挂（`.index4 .bg` 在惯性进行中仍随 window.scroll 更新）：
  t≈1200ms 时 y = 8972.67、transform matrix(1, 0, 0, 1, 0, -63.4637)
  连续采样 0 → -11.76 → -37.98 → -48.99 → -56.49 → -59.38 → -61.44 → -62.52

降级（≤1024）：emulate 1024 宽后 documentElement.clientWidth = 1014（含滚动条）
  → html class = ""（无 lenis），不再创建实例；程序化滚动回原生
  （`style.css:243` 的 `scroll-behavior: smooth` 是既有全局值，非本次引入）
```

### M-31：判定 **N/A（未做）**，附证据

- 目标元素 `footer .position_circle .circle`（SPEC M-31，参考站 `sources/style.css:819-903`）在本项目**不存在**：`rg -n 'position_circle' frontend/src` 无命中；`rg -n '\.circle\b'` 只剩 legacy 的 `AiDevelopment/index.vue:763 .circle-ring`（该 view 已不挂路由）。
- 参考站那个圆按钮在首页 index5 的 `<footer>` 里（`sources/home.html:3246`）。本项目同一位置是 B 的 `views/Home/index.vue` 的 `.cta` 区块，主按钮渲染成 `<a class="pill hover_button">`（`:218`）——**磁吸 M-30 已在跑**（`.hover_button` 全仓 1 个实例，在首页），只是形态是 pill 不是圆环。
- 因此要做 M-31，只有两条路：改 B 已验收的首页样板（B 的文件、已验收几何），或在共享 `Footer.vue` 里新造一个全站圆按钮（会和首页 CTA 重复，且是**新增 UI** 而不是收口）。**两条都超出本次「收编公共层」的授权范围，故未做**，等用户指定方向。

### 发现、未修（本次范围外，记录备查）

1. **共享外壳没有英文**（pre-existing，非本次引入）：`/en` 与 `/en/miniprogram-development` 实测 `documentElement.lang === 'zh-CN'`，桌面导航 8 项仍是中文（`Header.vue` 的 `menuList` 是硬编码中文，`git show 84b7929:frontend/src/layout/components/Header.vue` 逐字相同），链接目标也是中文路由。属 i18n 契约（语言注册 + 词典），需要专门任务。
2. **`style.css` 仍写着 Unsplash 热链**（pre-existing）：`.page-header` 的 9 条 `https://images.unsplash.com/...`。实测**运行时零外部请求**（`performance.getEntriesByType('resource')` 过滤非本站 = `[]`；`/` 与 `/ai-development` 的 Network 也只有本站 8 条请求），因为规则目标 `.page-header` 现在不渲染（路由已改走 `ServiceLanding`）——属死规则。但写法仍违反 AGENTS「外部素材必须落到仓库并登记」，建议随素材任务一起清。
3. **footer 的两层 `!important` 还没合并**（上一节判定里承诺给 A 的收口项，不在本次四条指令内，未动）：`style.css:1608` 一套 + `body .corporate-footer.footer`（`:2034`/`:2035`）一套，后者生效。在合并之前，`Footer.vue` 里 `var(--footer-*, 原值)` 的字面回退值仍**不能**当成有效值。
4. **主题（亮/暗）没有 UI 入口**（pre-existing）：`stores/theme.js` 的 `toggle()` 全仓无人 import，本次上表的「暗」列一律是 `document.documentElement.dataset.theme='dark'` 注入，不是从界面点出来的。AGENTS 要求「19:00—07:00 暗 + 两态按钮」，属共享层，需要专门任务。
5. `frontend/src/views/AiDevelopment/index.vue:968` 仍是 `transition: all 0.3s`，同文件 `:hover { transform: translateY(-3px) }` 因此只是「恰好」有过渡。该 view 当前不挂路由（`/ai-development` 走 `ServiceLanding`），且是 C/D 的文件，未动。
6. 存量：`/cases` 直连 500（后端未起，有失败态）；`npm.cmd run lint` 带 `--fix` 不是只读；`package.json` 无 `test:unit/test:e2e`（T01 未做）。
7. **移动端菜单在 768px 两侧不一致**（pre-existing，收编时按「不改行为」原样保留）：`.mobile-contact` / `.mobile-menu-overlay` / `.header-container` 在 ≤768px 被 `style.css` 的一组 legacy `!important` 盖住（`:320`、`:1372`、`:1373`、`:1374`，都在 `@media (max-width: 768px)`）。实测：

   | 值 | 390（≤768，已验收） | 800（769–992，从未验收） |
   | --- | --- | --- |
   | `.mobile-contact` bg | `rgb(23,61,134)` = #173d86 | `rgba(7,193,96,0.1)`（Header.vue scoped 的绿色） |
   | `.mobile-contact` radius | `0px` | `15px` |
   | `.mobile-menu-overlay` bg | `rgba(15,32,62,0.26)` | `rgba(0,0,0,0.8)` |
   | `.header-container` display / width | `flex` / `358px` | `grid` / `752px` |

   要收口就得把这组 legacy 规则一次性并进页头段，并重跑 ≤768 / 769–992 两段矩阵（会影响 390 已验收几何），**本次未做**。已在 `Header.vue` 的 scoped 注释里标注例外，避免下一个 session 误读。

### 给 C 的通知（§9.14 申请 1 的第 8 处）

- `frontend/src/views/ServiceLanding.vue:59` **本次未改**。实测该规则本来就是显式属性（`transition: transform .25s ease, border-color .25s ease`），不含 `all`，`check:motion` 判定它已带 `transform` 过渡 → 无需改动。
- 服务页的透明/收放**不需要 C 做任何事**：`/miniprogram-development` 与 `/en/miniprogram-development` 已实测拿到 `header` / `header on` / `header hide`（见上表）。C 只要**不**在页面里再写页头样式、不给逐帧写 `transform` 的元素加 `transition: all`。

### 下次第一步

1. 用户验收本次收编（预览 `http://localhost:3006/`）；工作区改动尚未提交，待指示。
2. 待定：M-31 的方向（改首页样板变成圆按钮 / 不做）。
3. 待做（各有独立授权）：共享外壳 i18n、主题 UI 入口 + 19:00–07:00 暗、footer 两层 `!important` 合并、Unsplash 死规则清理。

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

## A 收口 B / C 的共享层申请（2026-09-15 · Session A · 工作区改动，未提交）

回应 `handoffs/B.md` §6.6、§9.14 登记 1 / 登记 2，与 `handoffs/C.md` §6.1—§6.3、§13.1—§13.4、§20.1—§20.5、§29.1。
与上一批「收编公共层」一样 **尚未 `git add` / `git commit`**，两批一起待指示。

### 1. 改动清单

| 文件 | 动作 | 关闭的申请 |
| --- | --- | --- |
| `frontend/src/style.css` | 裸 `button:hover:not(:disabled)` 的 `transform: translateY(-2px) !important` 改写成 `:where(button:hover:not(:disabled))`（特异度 0）；下面发光块里的裸 `button:hover` 选择器删除，只留 Element Plus 按钮族 | B §9.14 登记 1、C §6.1 / §13.2 / §20.3 |
| `frontend/src/style.css` | footer 米色从 `html:not([data-theme='dark']) .corporate-footer.footer-home` 移到 `… .corporate-footer`（间距 `--footer-pad-top: 146px` 仍只挂首页） | C §13.1 / §20.2 / §29.3 |
| `frontend/src/style.css` | footer 两层 `!important` 合并：删掉 `body .corporate-footer.footer` 两条，把实际生效值（`border: 0`）并进 `.corporate-footer.footer` | B §9.14 登记 2、本文件「发现、未修」第 3 条 |
| `frontend/src/style.css` | `:root` 新增语义色 `--color-bg / -ink / -ink-soft / -line / -accent / -on-accent`（取值 = C 页内 `--svc-*` 的字面值，替换后逐像素等价） | C §13.4 / §20.5 |
| `frontend/src/style.css` | 新增 `html[data-theme='dark']` 层（`--color-*` 覆盖 + body 底色），取值与 `views/Home/index.vue` 的暗色 token 对齐 | G1 / B §6.2 / C §6.2 / §13.3 |
| `frontend/src/style.css` | 删除 30 条 `.page-header` 的 `images.unsplash.com` 热链（3 组各 10 条） | 不变量「外部素材必须落仓库并登记」 |
| `frontend/src/style.css` | `.home, .about, .cases, .news, [class$="-development"] { background: transparent !important }` 收窄成只留 `.home` | B §6.6 第 2 条（**部分**，理由见 §5） |
| `frontend/src/styles/responsive.css` | `img, video, iframe` 的 `height: auto !important` → 去掉 `height` 上的 `!important`（`max-width: 100% !important` 保留） | B §6.6 第 3 条、C §20.4 |
| `frontend/src/layout/index.vue` | 换页过渡 0.3s → 0.18s（`mode="out-in"` 保留，避免新旧两页同时占位） | C §29.1 |
| `frontend/src/router/index.js` | `meta.title` 笔误：`数字文创`→`数字创意`、`WEB网站开发`→`WEB 网站开发`、`App开发`→`App 开发` | C「需 A 决策」第 1 条 |
| `frontend/src/content/services.js` | 删掉 `https://www.seniorweb.cn/solution/34.html`（改成文字说明；`seniorweb` 全仓 0 命中） | G7 / 本文件 §6 |
| `frontend/src/stores/theme.js` | 重写：`themeFromClock()` / `nextBoundary()` / `init()` / `toggle()` / `syncFromClock()` / `armBoundaryRefresh()` | G1 / B §6.2 |
| `frontend/src/main.js` | 挂载前 `themeStore.init()` + `armBoundaryRefresh()`（避免首屏先闪一下错的颜色） | G1 |
| `frontend/src/layout/components/Header.vue` | 新增两态按钮：桌面在 `.desktop-actions` 内、手机在汉堡菜单底部，`@click="themeStore.toggle()"` | G1 / B §6.2 |
| `frontend/src/views/ServiceLanding.vue` | `[data-aos^='fade'] { transition-property: all }` → `opacity, transform`。**这是门禁修复**：合并 C 之后 main 上 `check:motion` 原本 `FAIL 1`（新增 1 条 transition-all） | C §6.3（按「收窄属性」而不是「加白名单」处理） |

### 2. 命令实测

```text
$ npm.cmd run build
dist/assets/index-1ea7242a.js   1,144.18 kB │ gzip: 366.19 kB
dist/assets/index-6c1211d0.css    522.02 kB │ gzip:  68.14 kB   ← 收窄/删死规则后比基线 69.44 小
✓ built in 14.63s                                              === EXIT: 0 ===

$ npm.cmd run check:motion
[PASS] transition: all —— 基线 42 条，本次扫到 42 条，新增 0 条
[PASS] 可点击元素 hover 改 transform —— 无 transform 过渡的规则 0 条
结果：PASS 2 / FAIL 0 / BASELINE-STALE 0                        === EXIT: 0 ===

$ npm.cmd run check:routes
结果：PASS 34 / FAIL 0 / PENDING 2（与改动前逐项一致）           === EXIT: 0 ===

$ .\node_modules\.bin\eslint.cmd . --ext .vue,.js,.jsx,.cjs,.mjs --ignore-path .gitignore
✖ 801 problems (7 errors, 794 warnings)   ← 7 个 error 与基线同一批；warning 846 → 794
```

（`npm run lint` 带 `--fix`，不是只读检查，按 AGENTS 未使用。）

### 3. 浏览器实测（`npm.cmd run preview` @ `localhost:4188`，headless Chromium 1217）

**主题机制**（当地 01:09，落在 19:00—07:00 区间内）：

| 场景 | 实测 |
| --- | --- |
| 首次进入（无存档） | `html.dataset.theme = "dark"` —— 由当地时间算出，不是注入 |
| 点页头两态按钮 | `theme = "light"`，`localStorage.yz-theme = {"theme":"light","expiresAt":1789426800000}`；换算后正是 **今天 07:00** |
| 刷新 | 仍是 `light`（手动选择存在存档里） |
| 把存档 `expiresAt` 改成过期再刷新 | 回到 `dark` 且存档被清空 —— 即「手动选择到下一个边界到期」 |
| 390 端汉堡菜单里的按钮 | 文案 `切换到暗色`，点击后 `theme = "dark"`、`scrollWidth 390 = innerWidth` |

**全站矩阵**（17 条路由 × 1440/390 × 亮/暗 = **68 格**；含 `/`、`/en`、7 条服务路由、`/en/miniprogram-development`、`/ai-consultation`、`/about`、`/cases`、`/news`、`/privacy-policy`、`/legal-statement`、404）：

- `documentElement.dataset.theme` 68/68 与预期一致（亮/暗真的分开了）。
- 横向溢出 **0**；真实破图 **0**（首屏 `brokenImages` 计数来自 `loading="lazy"` 未进视口，手工复核 `complete && naturalWidth === 0` = 0 条）。
- 外部请求 **0**（`seniorweb` 0 命中、unsplash 0 命中）。
- console error 只有 `/cases` / `/news` 各 3 条，全部是后端未起的 500（存量 G8），非本次引入。

**逐项复核（1440 与 390 实测值）**：

| 项 | 改前 | 改后 |
| --- | --- | --- |
| 服务页 footer 底色（亮） | `rgb(17,17,17)` | `rgb(242,241,228)`，文字 `rgb(51,65,85)` |
| `.service-hero__media img` 高（390） | 106px（被全局 `height:auto !important` 打回图片自身比例） | **250px**（SPEC 断点值） |
| `.service-cta button:hover` transform | `matrix(1,0,0,1,0,-2)`（被全局 `!important` 压过） | `matrix(1,0,0,1,8,0)` = C 声明的 `translateX(8px)` |
| 页头 `.desktop-actions` 几何（1440） | — | 右边界 1340 = 容器右边界；`scrollWidth 1440 = innerWidth`，未溢出 |

证据图：`handoffs/A/shots/theme/`（13 张：`{1440|390}-{light|dark}-{home-top|service-top|service-footer}.png` + `390-dark-menu-open.png`）。

### 4. 交给 C / B 的下一步（用户 2026-09-15 授权 A 直接完成）

- **已代 C 完成**：`ServiceLanding.vue` 的页内 `--svc-*` 已改为引用 `:root` 的 `--color-*`，暗色自动跟随；§6.3 的 `transition: all` 已在上一批收窄，门禁 PASS；「服务页透明页头」按用户最新裁定全站透明，与 SPEC 的冲突已同步改写。
- **已代 B 完成**：`views/Home/index.vue` 不再给 `.home` 声明 `background`；全局 `.home` 的 `!important` 已摘除。

### 5. 未做 / 待用户决策（本批范围外）

1. ~~服务页仍不是暗色~~：**已解决**（`ServiceLanding.vue` 现在引用 `--color-*`，暗色跟随）。
2. ~~C §20.1 / §29.2（服务页透明页头）~~：**已解决**（用户裁定全站透明，SPEC 与实现同步）。
3. ~~C §20.1 留白（≤1024 的 80px → ~104px）~~：**已解决**（用户允许，已改 `104px`）。
4. **M-31（footer 圆形按钮发光）**：仍判定 N/A（目标元素在本项目不存在），等用户定方向。
5. **G5（IoT / 数字创意全站零入口）**：主导航只能列四类服务是硬不变量，入口方案（footer 服务列 / 服务概览页）需要用户裁定。
6. **`src/styles/motion.js` 三组 token 仍是 `MOTION_TODO`**（B §6.1）：SPEC 有明确条目的档位可以填，但 `ease.exit` / `ease.inOut` 这类字段在 SPEC 里没有对应条目，直接编数值违反「拿到 SPEC 前不要编造数值」，需要先定映射表。
7. **M-16 / M-17**：是否纳入 1.0 待用户裁定。
8. **G2—G4（i18n）**：按用户「按建议来」独立排任务。
9. **存量**：`views/News/detail.vue` 的 mock 数组里还有 6 条 `images.unsplash.com`（`/news/:id` 是活路由，归 D / T04）；移动菜单 768px 两侧不一致；`/cases` 需后端；`lint` 带 `--fix`；无 `test:unit/test:e2e`。

### 6. 本轮 i18n（G2—G4）与 motion token 完成记录（2026-09-15 续）

提交：

- `57f0604` `feat(motion): fill SPEC-backed shared motion tokens`
- `2c7cfba` `feat(i18n): complete English shell and service landing content`

完成范围：

- **G2 共享外壳**：`router/index.js` 在 `beforeEach` 设置 `documentElement.lang`，英文路由 `lang="en"`，标题后缀改为 `Beijing Yunzhan Technology`；`Header.vue` 英文态品牌名、首页跳转、菜单 aria-label、导航 / 主题 / 微信文案全部切换；`Footer.vue` 全站英文 footer 文案与英文路径。
- **G3 en 服务页**：新增 `frontend/src/content/service-landing-i18n.js`，集中维护七条服务页的英文 title/subtitle/capabilities/process 与 01 分区文案；`ServiceLanding.vue` 的 `resolveService` 与模板全部接线。
- **G4 h1 断词**：`.service-hero h1.is-en { overflow-wrap: anywhere }`，英文长标题不再在 1440 断成 `Developme / nt`。
- **motion token**：只填 SPEC 有明确对应条目的 `duration.fast/base/slow/scroll`、`ease.standard/enter/scroll`、`distance.reveal/hero/maskOverflow`；`instant/exit/inOut/micro/scaleIn` 保持 `MOTION_TODO`，不编数。

验证（在 `frontend/` 下）：

```text
npm.cmd run build        → PASS（主入口 CSS gzip 68.45 kB）
npm.cmd run check:motion → PASS 2 / FAIL 0 / BASELINE-STALE 0
npm.cmd run check:routes → PASS 34 / FAIL 0 / PENDING 2
npx eslint（只读，touched files）→ 0 errors / 83 warnings（warning 为既有格式规则，无新增 error）
```

浏览器抽查（dev server @ `127.0.0.1:4173`）：

- `/en`、`/en/ai-development`、`/en/iot-development`、`/en/custom-development`、`/en/digital-creativity`：`html lang=en`，页头/footer 英文，服务页 `main` 内 0 个中文字符。
- `/en/ai-development` 页头品牌为 `Yunzhan Technology`，导航 8 项英文，标题为 `AI development - Beijing Yunzhan Technology`。
- `/en/about` 的内容仍为中文，按 A.md 既有边界归 B/T05（本批只负责共享外壳与服务页 i18n，不越权改 About 内容）。

仍待用户/下游：

- G5（IoT / 数字创意入口）、M-31、M-16/M-17 已按用户 2026-09-15 裁定：数字创意页面不管；M-16/M-17 不纳入；`/services` 不建；M-31 不需要。G5 中「数字创意」按用户裁决不再处理，IoT 入口仍未解决。
- B/T05：About / Contact / Privacy / Legal 的英文页面内容。
- D/T04：Cases / News 英文内容与 `News/detail.vue` 的 6 条 unsplash 存量。

### 7. 暗色导航字色 + 语言切换按钮（2026-09-15 再补）

用户反馈两点，已在共享外壳统一收口：

1. **暗色服务页导航黑字**：`Header.vue` 的 `headerInkClass` 从「只看 route meta」改为「暗色主题强制白字档」。实测 `/ai-development` 暗色 `nav-item color = rgba(255,255,255,.88)`；切到亮色后回到 `rgba(17,17,17,.78)`。
2. **多语言切换按钮**：桌面右侧操作区新增 `EN / 中文` pill 按钮，移动端汉堡菜单底部同样新增；切换时保留当前路由（`/` ↔ `/en`、`/<slug>` ↔ `/en/<slug>`），并同步更新 `html lang`、标题与外壳文案。

验证：

- `npm.cmd run build` PASS；`check:motion` PASS；`check:routes` PASS 34 / FAIL 0 / PENDING 2。
- 只读 eslint `Header.vue`：0 errors / 28 warnings（既有格式规则）。
- 浏览器实测：中文服务页暗色导航白字、亮色导航黑字；语言按钮从 `/ai-development` 跳 `/en/ai-development`，`lang=en`，页头品牌 `Yunzhan Technology`；390 汉堡菜单里语言与主题按钮并排可点。
