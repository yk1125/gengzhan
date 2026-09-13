# Session A · 路由可达性修复 + Git 收敛 + 动效依赖骨架（2026-09-14）
状态：完成（Step 3.11 已由用户裁定为「保持现状」，无未决项）
基准commit：`45ef250`（main，工作区 clean）
本任务commit：逐步记录在下方各 Step

范围：只做「修复 ＋ 建立机制」。不改写 Home/index.vue、ServiceLanding.vue 的页面实现。

## Step 0 开场只读核查（不改任何文件）

命令：

```powershell
git rev-parse --abbrev-ref HEAD; git log --oneline -12; git status --short; git worktree list; git branch --list
git reflog -20
```

真实输出摘要：

- `git rev-parse --abbrev-ref HEAD` → `main`；`git status --short` → 无输出（clean）。
- `git log --oneline -12`：

```text
45ef250 docs: record T02 pilot integration
9a17abc fix: clean home pilot markup
0997a1e docs: record foundation integration commits
512565e feat: freeze frontend foundation contracts
5021d76 feat: add bilingual service landing and mini program routes
4a343d6 feat(home): build bilingual homepage pilot
b484790 docs: establish frontend rebuild baseline
0ed5dcf Initial commit
```

- `git worktree list`：

```text
D:/桌面/gengzhan                                           45ef250 [main]
D:/桌面/gengzhan-worktrees/gengzhan-worktrees/session-b    67890da [codex/rebuild-brand]
D:/桌面/gengzhan-worktrees/gengzhan-worktrees/session-c    12054b5 [codex/rebuild-services]
D:/桌面/gengzhan-worktrees/session-a                       af63173 [codex/rebuild-foundation]
D:/桌面/gengzhan-worktrees/session-t00a                    45ef250 [codex/t00a-assets]
D:/桌面/gengzhan-worktrees/session-t00r                    45ef250 [codex/t00r-motion-spec]
```

- `git reflog -20` 证明 main 上那 4 个提交来自 `cherry-pick:`：

```text
45ef250 HEAD@{0}: commit: docs: record T02 pilot integration
9a17abc HEAD@{1}: commit: fix: clean home pilot markup
0997a1e HEAD@{2}: cherry-pick: docs: record foundation integration commits
512565e HEAD@{3}: cherry-pick: feat: freeze frontend foundation contracts
5021d76 HEAD@{4}: cherry-pick: feat: add bilingual service landing and mini program routes
4a343d6 HEAD@{5}: cherry-pick: feat(home): build bilingual homepage pilot
```

- patch-id 复核（`git show <c> | git patch-id --stable`），与用户现场一致：

| main 提交 | 分支提交 | patch-id（前 12 位） | 判定 |
| --- | --- | --- | --- |
| `4a343d6` | `85530e6` | `1606f1e05df3` | 同一改动 |
| `5021d76` | `ad21014` | `db1292ac8e3d` | 同一改动 |
| `512565e` | `4c18b6a` | `038283ba844e` | 同一改动 |
| `0997a1e` | `af63173` | `21f3134c94d0` | 同一改动 |

- merge-base 复核（`git merge-base main <branch>`）：

```text
codex/rebuild-foundation HEAD=af63173 merge-base=b484790
codex/rebuild-brand      HEAD=67890da merge-base=b484790
codex/rebuild-services   HEAD=12054b5 merge-base=b484790
codex/t00a-assets        HEAD=45ef250 merge-base=45ef250
codex/t00r-motion-spec   HEAD=45ef250 merge-base=45ef250
codex/frontend-rebuild   HEAD=b484790 merge-base=b484790
```

- `frontend/node_modules` 存在；`frontend/package-lock.json` 已入库。
- `Test-Path docs/frontend-rebuild/evidence` → `False`；`Test-Path frontend/public/assets` → `False`。
- `frontend/src/router/index.js`：无 `/en` 首页路由、无 catch-all；`frontend/src/views/NotFound.vue` 不存在。
- `rg -n "MouseFollower" -g "!node_modules" .` → 无匹配（含 `App.vue`、`main.js`、layout），确认死代码。
- `codex/t00a-assets`、`codex/t00r-motion-spec` 分支已存在，但 HEAD 即 `45ef250`，两个工作树 `git status --short` 均为空 → 尚无新提交、无 SPEC.md、无素材。
- brand 分支的 `frontend/src/views/Home/index.vue` 已出现 `https://cdn.seniorweb.cn/static/images/jun_*.svg` 热链；main 现版本是 24 个硬编码公司名。两者都必须在合入后处理（见 Step 2）。

## 执行顺序说明（与任务书顺序的唯一差异）

任务书把「Step 2 客户墙止血」放在「Step 3 合并」之前。但 Step 3 会合并 `codex/rebuild-brand`，该分支对 `frontend/src/views/Home/index.vue` 有更新版本（已改成 24 槽位结构）；先改再合并会在冲突解决时被覆盖。因此把 Home 止血（2.6）放在 brand 合并之后执行，AGENTS.md / FRONTEND.md 规则补充（2.7、2.8）不依赖合并顺序，仍在 Step 2 一起完成。其余按任务书顺序。

## Step 1 路由可达性修复

修改文件：

- `frontend/src/router/index.js`：新增 `/en` 首页路由（`HomeEn`，复用 `Home/index.vue`，未新建文件）；补齐既有页面的英文路由；新增中文/英文 catch-all；`beforeEach` 增加尾斜杠规范化。
- `frontend/src/views/NotFound.vue`：新建（A 归属，T01 就要求但一直没建）。
- `frontend/scripts/check-routes.mjs`：新建，`check:routes` 门禁实现。
- `frontend/package.json`：新增 `check:routes`、`check:routes:strict` 脚本（`dependencies`/`devDependencies` 未动，lock 未动）。
- `docs/frontend-rebuild/handoffs/INTEGRATION.md`：修正 3 条不存在的验收入口路径。

决策记录：

- 不实现 `/services/:slug` 形状。用户 2026-09-14 已确认那是文档笔误，英文统一 `/en/<slug>`；该笔误同时记入 `INTEGRATION.md` 用户确认记录 D2，并留了 C 的 handoff 与 router 现状之间的差异说明（C.md 里那条「需 A 补 `/services/mini-program` 别名」按此作废，C.md 由 C 自己更新）。
- 补注册 `/en/cases`、`/en/cases/:id`、`/en/news`、`/en/news/:id`、`/en/about`、`/en/privacy-policy`、`/en/legal-statement`：这些页面组件已存在（zh 路由已注册），只是英文路由缺失，属于路由可达性修复而不是页面实现。对应页面的英文文案仍未完成，由 B/D 后续任务负责。
- `check:routes` 的 `PENDING` 机制：`contact` 这一行按 PLAN 属 B/T05（`Contact/index.vue` 尚未创建），既不能算 PASS 也不能静默放过，所以单列为 PENDING 并在输出里带负责人和原因。默认 `check:routes` 只对 FAIL 返回非 0；`check:routes:strict` 连 PENDING 一起算不通过，供 T05 完成后收紧。

命令与真实输出：

```powershell
cd frontend
npm.cmd run check:routes           # EXIT=0
npm.cmd run check:routes:strict    # EXIT=1（PENDING 计入）
npm.cmd run build                  # BUILD_EXIT=0
```

`npm.cmd run check:routes` 摘要（完整逐行输出见终端，这里是关键行）：

```text
FRONTEND.md §3 路由契约检查（router routes ↔ routeManifest）
[PASS] home zh                `/`                  命中 / (Home)
[PASS] home en                `/en`                命中 /en (HomeEn)
[PASS] cases en               `/en/cases`          命中 /en/cases (CasesEn)
[PASS] news.detail en         `/en/news/:id`       命中 /en/news/:id (NewsDetailEn)
[PASS] company en             `/en/about`          命中 /en/about (AboutEn)
[PENDING] contact zh             `/contact`           未实现：Contact/index.vue 尚未创建，中文 /contact 与英文 /en/contact 均未注册（B / T05）
[PENDING] contact en             `/en/contact`        未实现：Contact/index.vue 尚未创建，中文 /contact 与英文 /en/contact 均未注册（B / T05）
[PASS] notFound zh            中文 catch-all         命中 catch-all /:pathMatch(.*)* (NotFound)
[PASS] notFound en            `/en/...` catch-all  命中 catch-all /en/:pathMatch(.*)* (NotFoundEn)

尾斜杠规范化：match 31/31，router beforeEach 守卫 存在 → PASS
routeManifest：3 条记录，PASS
[WARN] routeManifest 尚未覆盖 §3 的 15 个 routeKey：service.ai, ..., notFound（T01 未完成，不属于本次修复范围）
结果：PASS 34 / FAIL 0 / PENDING 2
```

`npm.cmd run check:routes:strict` 摘要：

```text
结果：PASS 34 / FAIL 1 / PENDING 2（--strict）
STRICT_EXIT=1
```

门禁负数测试（证明不是永远绿的假门禁）：把 `path: '/en'` 的 `HomeEn` 路由块临时从 `router/index.js` 摘掉后重跑，得到：

```text
[FAIL] home en                `/en`                只命中 catch-all /:pathMatch(.*)*，没有独立路由
结果：PASS 33 / FAIL 2 / PENDING 2
EXIT=1
```

随后从内存原文还原，SHA256 前后一致：

```text
hash_before=17D2BEB9A2734EB47C90A6F35F0B645C066F5637393E11D156D0295AEC0C5F88
hash_after =17D2BEB9A2734EB47C90A6F35F0B645C066F5637393E11D156D0295AEC0C5F88
RESTORED=OK
```

`npm.cmd run build` 摘要：

```text
dist/assets/index-6698bee7.js            1,139.47 kB │ gzip: 364.41 kB
(!) Some chunks are larger than 500 kBs after minification.
✓ built in 16.36s
BUILD_EXIT=0
```

已知未做：新增英文路由指向的 Cases/News/About/Privacy/Legal 页面内容仍是中文（i18n 由 B/D 负责）；英文页 title 仍拼中文后缀「 - 北京耘栈科技」（沿用现有 beforeEach，未在本任务扩大改动）。

## Step 2 客户墙造假内容清除 + 规则补洞

说明：这一步在 brand 合并之后执行（顺序理由见上文）。合并前后 `Home/index.vue` 的客户墙事实：

| 阶段 | 客户墙内容 | 问题 |
| --- | --- | --- |
| 合并前 main | `const logos=['字节跳动','中信集团',...]` 24 个真实公司名 | 未经确认的客户名单，属造假内容 |
| `codex/rebuild-brand`（合并带入） | `01`—`24` 数字槽位，但 `<img :src="`https://cdn.seniorweb.cn/static/images/jun_*.svg`">` | 运行时热链参考站 CDN，违反不变量 |
| 本任务处理后（main） | 24 个空槽位 `<span class="logo-slot" :data-slot="slot" />` ＋ 注释 | 不写公司名、不引用参考站，等 T00A 素材 |

实际改动（只动客户墙相关三处，没有重写页面）：

- 模板：`<img :src="https://cdn.seniorweb.cn/...">` 换成 `<span v-for="slot in logoSlots" :key="slot" class="logo-slot" :data-slot="slot" />`。
- 脚本：`const logos=[...]` 换成 `const logoSlots=['01'...'24']`，前面加注释「素材未入库，等 T00A 下载 + 本地副本 + hash 登记后再替换。禁止写公司名、禁止运行时引用参考站 URL」。
- 样式：`.logos img{width:100%;height:42px;object-fit:contain}` 换成 `.logo-slot{display:block;width:100%;min-height:42px}`，保持栅格高度不发散。

规则补洞：

- `AGENTS.md` 第 21 行新增不变量：「外部素材（客户Logo、图标、图片、字体、视频）必须下载到仓库并登记来源与hash；禁止运行时热链参考站域名（seniorweb.cn / cdn.seniorweb.cn），页面、样式、配置里都不得出现参考站URL。」
- `specs/FRONTEND.md` 第 161 行（§7）新增：「素材必须有本地副本与来源登记：入库时记录 source URL、获取日期、文件 hash、尺寸或 viewBox、本地路径（登记口径见 REFERENCE §3）；禁止运行时引用参考站 URL，禁止热链 seniorweb.cn / cdn.seniorweb.cn。素材未到位时使用显式占位，不得用公司名或参考站图片填充。」

验证命令与真实输出：

```powershell
Select-String -Path frontend/src/views/Home/index.vue -Pattern 'seniorweb'
# 无匹配
$c = [IO.File]::ReadAllText('frontend/src/views/Home/index.vue')
([regex]::Matches($c,'seniorweb')).Count        # 0
([regex]::Matches($c,'字节跳动|中信集团|北京大学|网易')).Count   # 0
([regex]::Matches($c,'logoSlots')).Count        # 2（模板 + 脚本各一次）
```

```text
seniorweb 出现次数=0
公司名残留=0
logoSlots 出现次数=2
```

## Step 3 Git 收敛

### Step 3.9 零改动记录

完成。内容写在 `handoffs/INTEGRATION.md`「Git 收敛记录 → Step 3.9 零改动记录」，提交为 `822e14e`，提交前后没有改任何分支 ref。

### Step 3.10 正式合并（merge，非 cherry-pick、非重放）

```powershell
git merge --no-edit codex/rebuild-brand        # 冲突 3 个文件，见下
git merge --no-edit codex/rebuild-services     # 冲突 3 个文件，见下
git merge --no-edit codex/rebuild-foundation   # Already up to date.
```

实际结果：

| 分支 | 合并提交 | 合并后 merge-base | 是否等于分支 HEAD |
| --- | --- | --- | --- |
| `codex/rebuild-brand` | `1d9d632` | `67890dae96be...` | 是 |
| `codex/rebuild-services` | `cefb3ad` | `12054b50ec5f...` | 是 |
| `codex/rebuild-foundation` | 无新提交（`Already up to date.`，`af63173` 已随 brand 的祖先链进入 main） | `af631735ddb3...` | 是 |
| `codex/t00r-motion-spec` | 无新提交（`Already up to date.`） | `45ef25052932...` | 是 |
| `codex/t00a-assets` | 无新提交（`Already up to date.`） | `45ef25052932...` | 是 |

冲突与解决方式（每个都是人工判断，没有用 `-X ours/theirs` 一把梭，也没有 hard reset）：

| 文件 | 冲突类型 | 解决 |
| --- | --- | --- |
| `docs/frontend-rebuild/handoffs/A.md` | add/add | 取 main 版本。brand 侧就是本文件被重写前的原文，而 main 版本已把它整段保留在「附录 · 上一任务记录」里；逐行核对 brand 侧 10 行中只有 1 行不同（`# ` 改成 `### ` 的标题层级），无内容丢失。 |
| `docs/frontend-rebuild/handoffs/INTEGRATION.md` | content | 取 main 版本（brand 侧没有 T02 段落）。顺带把「基准」表从文档中段提到头部并更新过时状态，把 `Step 3.9` 记录插在基准表之后。 |
| `frontend/src/views/Home/index.vue` | content | 取 brand 版本（B 的更新版：`is-scrolled`、reveal、工作卡视频）。随后按 Step 2 处理客户墙。 |
| `docs/frontend-rebuild/handoffs/C.md` | add/add | 取 services 版本（C 自己更新的「T02-S 验收修复」，比 main 上 cherry-pick 的旧版新）。 |
| `frontend/src/router/index.js` | content | 取 main 版本（本任务 Step 1 新增的英文路由块；services 侧的 router 改动与 main 上 `5021d76` 是同一 patch-id，已包含在内）。 |
| `frontend/src/views/ServiceLanding.vue` | content | 取 services 版本（`12054b5` 的显影交互是在 main 版本之上的增量）。 |

`frontend/src/content/services.js` 由 services 分支新增，无冲突直接带入。

合并后验证：

```text
npm.cmd run check:routes  → 结果：PASS 34 / FAIL 0 / PENDING 2   GATE_EXIT=0
npm.cmd run build         → ✓ built in 15.79s   BUILD_EXIT=0（仅存量 chunk 体积等警告）
```

### Step 3.10b 两个并行任务分支

`git branch --list "codex/t00*"` 命中 `codex/t00a-assets`、`codex/t00r-motion-spec`，两者都存在，于是按指令一并 merge；

```text
merge codex/t00r-motion-spec → Already up to date.
merge codex/t00a-assets      → Already up to date.
git log --oneline main..codex/t00r-motion-spec   # 无输出
git log --oneline main..codex/t00a-assets        # 无输出
```

两个分支的 HEAD 都还是 `45ef250`（即没有产生任何新提交），所以合并是空操作。**待办：等 T00R 产出 `SPEC.md`、T00A 产出素材并提交后，A 需要再 merge 一次；届时 `check:routes`/`npm run build` 要重跑。**

### B/C 前置是否就绪

**未就绪。** 事实依据：

- `Get-ChildItem -Recurse -Filter SPEC.md`（docs、frontend/src、frontend/public）→ 无输出，`git log --all -- "**/SPEC.md"` → 无输出：**任何分支都没有动效 SPEC.md**，T00R 尚未产出。
- `Test-Path frontend/public/assets` → `False`，`Test-Path docs/frontend-rebuild/evidence` → `False`：**素材目录与证据目录都不存在**，T00A 尚未产出。
- 客户墙现在是 24 个空槽位，`frontend/src/content/services.js` 里服务素材仍是 `sha256: 'UNAVAILABLE'` 的占位登记。

结论：B 的 T05（Home 定稿、About/Contact/Privacy/Legal）在素材与动效规格到位前只能做结构/交互，视觉无法定稿；C 的 T03（其余六服务）同样缺 SPEC.md 的动效数值。A 侧的接口（`/en` 首页、catch-all、`check:routes` 门禁）已可用。

### Step 3.11 main 上 4 个重复提交

**已结案：按选项 1 处理（2026-09-14 用户裁定）——保持现状，不做任何历史改写。** 当时先按指令停下询问用户，判断依据：

- 4 个重复提交（`4a343d6`、`5021d76`、`512565e`、`0997a1e`）已经是 main 的线性历史的一部分，并且 `1d9d632`/`cefb3ad` 两个合并提交的祖先里也有它们。
- 要真正「清掉」这些重复提交，只能改写 main 已发布的历史（interactive rebase / filter-repo / 重建分支指向），属于任务红线里明确禁止的动作，也可能影响已经从这个 main 建出去的工作树与下游分支。
- 现状不影响功能：`git merge-base` 已经指向各分支 HEAD，重复提交只是历史冗余，`check:routes` 与 build 都通过。

需要用户明确授权才能做的选项（A 不自行决定）：

1. 保持现状，只在文档里记为「已收敛、历史含 4 个重复提交」；
2. 授权改写 main 历史（例如 `git rebase --onto` 去掉 4 个 cherry-pick 提交，或重建 main 指向一个干净历史），并接受所有 main 派生工作树/分支需要重新同步；
3. 其他指定做法。

**用户裁定结果：选项 1。** 处理方式：只在 `INTEGRATION.md` 记为「已收敛、历史含 4 个重复提交」，不执行 rebase / filter-repo / 强推，不改任何 ref。详见文末「补充记录」。

### 合并过程中发现的存量缺陷（记录，未代改）

- `frontend/src/views/ServiceLanding.vue` 第 59 行（来自 `codex/rebuild-services` 的 `12054b5`）行首有一个字面量 `\n`：`\n.reveal{opacity:0;...}`。CSS 解析时 `\n` 会变成一个标识符 `n`，使 `.reveal{...}` 规则失效（后续 `.reveal.is-visible{...}`、`.text-reveal{...}` 等规则仍单独生效），即 C 的显影动画初始隐藏态实际没生效。这是 C 所属文件的存量缺陷，A 没有代改；请 C 在下次动这个文件时删掉该字符并重新验收。
- `codex/rebuild-services` 的 `handoffs/C.md` 里仍写着「A 集成 router 兼容 `/services/mini-program` 别名」和对应下一步；按用户 2026-09-14 的确认（D2）该别名作废，A 未代改 C.md，C 需自行更新。

## Step 4 工作树整理

```powershell
git worktree move "D:/桌面/gengzhan-worktrees/gengzhan-worktrees/session-b" "D:/桌面/gengzhan-worktrees/session-b"   # exit 0
git worktree move "D:/桌面/gengzhan-worktrees/gengzhan-worktrees/session-c" "D:/桌面/gengzhan-worktrees/session-c"   # exit 128
```

`session-b` 搬移成功；`session-c` 失败：

```text
fatal: failed to move 'D:/桌面/gengzhan-worktrees/gengzhan-worktrees/session-c' to 'D:/桌面/gengzhan-worktrees/session-c': Permission denied
```

重试一次仍然 `Permission denied`。判断是 Windows 不允许重命名作为某个进程当前目录（或被句柄占用）的目录——该 worktree 很可能正被另一个终端/编辑器占用。**没有强改、没有删目录**，当时 `session-c` 留在旧路径；占用解除后重试成功，见文末「补充记录」。最终布局见 `SESSIONS.md`「实际工作树位置」。

安装与验证：

```powershell
cd "D:\桌面\gengzhan-worktrees\session-a\frontend"; npm.cmd ci        # added 274 packages in 30s，CI_A_EXIT=0
cd "D:\桌面\gengzhan-worktrees\session-a\frontend"; npm.cmd run build # ✓ built in 25.10s，BUILD_A_EXIT=0
cd "D:\桌面\gengzhan-worktrees\gengzhan-worktrees\session-c\frontend"; npm.cmd ci        # added 274 packages in 32s，CI_C_EXIT=0
cd "D:\桌面\gengzhan-worktrees\gengzhan-worktrees\session-c\frontend"; npm.cmd run build # 第一次崩溃，重跑通过：✓ built in 20.90s，BUILD_C_EXIT=0
```

如实记录：`session-c` 的首次 build 以 `BUILD_C_EXIT=-1073740791`（0xC0000409）崩溃且没有输出，第二次同样命令通过（20.90s，产物正常）。判断是本机资源/瞬时问题，不是代码问题；主仓随后多次 build 也通过。三个工作树在安装/构建后 `git status --short` 仍为空（`dist`、`node_modules` 均被忽略）。

`session-b` 也有 `frontend/node_modules`（存在，未由本任务安装）；`session-t00a`、`session-t00r` 仍未安装依赖。

## Step 5 动效依赖与 token 骨架

```powershell
npm.cmd view gsap version   # 3.15.0
npm.cmd view lenis version  # 1.3.26
cd frontend; npm.cmd install --save-exact gsap@3.15.0 lenis@1.3.26   # added 2 packages in 7s，exit 0
```

`package.json` 里是精确版本：`"gsap": "3.15.0"`、`"lenis": "1.3.26"`；`package-lock.json` 有对应 `node_modules/gsap`、`node_modules/lenis` 与 integrity。注意：`npm install` 顺便把 `dependencies`/`devDependencies` 按字母序重排了（diff 显示 18 行变动，**没有任何版本被改动**），这是 npm 的默认行为。

新增 `frontend/src/styles/motion.js`：`duration`（instant/fast/base/slow/scroll）、`ease`（standard/enter/exit/inOut/scroll）、`distance`（reveal/hero/micro/scaleIn/maskOverflow）三组字段全部建好，值一律为 `MOTION_TODO`，并导出 `isMotionTokenReady()` 供后续检查；文件头写明数值等 T00R 的 SPEC.md，禁止页面散写裸数值。**没有编造任何数值。**

删除死代码：`git rm frontend/src/components/MouseFollower.vue`（`rg -n "MouseFollower|mouse-follower" -g "!node_modules" .` 除本 handoff 的引用外无匹配）。

`specs/FRONTEND.md` 第 10 行改成已决状态：确定引入 `gsap@3.15.0` + `lenis@1.3.26`，写明原因（参考站核心是滚动驱动时间轴，纯 CSS/Swiper 无法在合理成本内还原，且难以统一清理与降级）、影响范围（动效 token 与滚动/显影基础能力在 `src/styles/motion.js` 与 A 的 composables，页面只按语义名引用）与版本锁定方式；原「优先 CSS/现有 Swiper」表述作废。

## Step 6 验收标准与决定登记

- `ACCEPTANCE.md`：新增 `AC07b`（动效还原，占位）行 + 「AC07b 字段」表，字段已建好（规格来源 / 覆盖项 / 数值口径 / 证据要求 / 降级要求 / 责任与状态），判定值等 T00R，并明确「T00R 未产出前不得声称还原通过」。
- `INTEGRATION.md` 用户确认记录：新增 D1（素材授权由用户自行处理，但本地化与 hash 登记不能省）、D2（`/services/:slug` 笔误作废，英文统一 `/en/<slug>`）。

## 最终验证（全部真实执行）

```text
npm.cmd run build        → BUILD_EXIT=0，✓ built in 24.73s（仅存量 chunk 体积 >500kB 等警告）
npm.cmd run check:routes → GATE_EXIT=0，结果：PASS 34 / FAIL 0 / PENDING 2（PENDING = contact / B·T05）
eslint（只读，不带 --fix）→ ESLINT_EXIT=1，✖ 850 problems (7 errors, 843 warnings)
```

7 个 error 与 ACCEPTANCE 记录的基线完全一致（`CompetitiveAdvantage.vue` 111:31 / 111:42 / 114:7；`Cases/detail.vue` 280:7 / 285:7 / 302:35 / 332:18），**没有新增 error**。warning 总数 843，低于基线 846（删掉 `MouseFollower.vue` 的告警，同时并入分支代码带来一些新告警）；本任务新增/重写的 `NotFound.vue`、`motion.js`、`scripts/check-routes.mjs`、`router/index.js` 单独跑 eslint 为 0 问题（`ESLINT_TARGETED_EXIT=0`）。

只读 lint 的外层命令 exitCode 为 1 是基线状态，不等于本任务引入失败。

## T00A / T00R 现场（只读观察，未改动他们的工作树）

工作树整理时发现这两个分支虽然没有提交，但**工作树里已经有大量未提交成果**：

- `session-t00a`（`git status --short`）：`?? .scratch-home.html`、`?? .scratch-t00a/`、`?? docs/frontend-rebuild/evidence/`、`?? frontend/public/assets/`。
  - `frontend/public/assets/customers/` 已有 `jun_1.svg`—`jun_24.svg`（24 个客户 Logo），另有 `banner/banner.mp4`（37,447,782B）、`banner/video.webp`、`transitions/*.mp4` 与 `transitions/black/*.mp4` 共 12 个视频。
  - `docs/frontend-rebuild/evidence/reference-assets/assets-manifest.json`（37,694B）：38 个条目，字段含 `sourceId / 用途 / 源 URL / 本地路径 / 字节数 / SHA256 / 尺寸或时长 / 对应选择器 / 抓取时间`，并记录 robots、抓取方式、`base href=//cdn.seniorweb.cn` 等事实。素材是**本地副本 + hash 登记**，符合本任务新增的素材规则。
- `session-t00r`：`?? docs/frontend-rebuild/evidence/`，内含 `reference-effects/sources/`（home.html、style.css、model.js、cdn-index、function…）、`frames/`、`reference-implementation/`。**尚未产出动效 SPEC.md**（`git log --all -- "**/SPEC.md"` 无输出，全仓无 SPEC.md 文件）。

因此「B/C 前置是否就绪」的准确答案是**没有就绪**：素材只在 T00A 的未提交工作树里，动效 SPEC.md 还不存在。但 T00A 已接近可交付（素材已下载登记），T00R 仍在取证阶段。

## 本任务提交清单

| 提交 | 内容 |
| --- | --- |
| `1e4f564` | fix(routes): 注册 `/en` 首页、补英文路由与 NotFound catch-all、修正 INTEGRATION 验收入口、新增 `check:routes` 门禁 |
| `822e14e` | docs: 合并前 git 现场（零改动记录）写入 INTEGRATION |
| `1d9d632` | Merge branch 'codex/rebuild-brand' |
| `cefb3ad` | Merge branch 'codex/rebuild-services' |
| `1a47c40` | fix(home): 客户墙去掉假公司名与参考站热链，改 24 槽位占位 |
| `50160d1` | docs: 补素材本地化/禁热链规则；记录 Step 2—3 |
| `4f5cd76` | style(notfound): 让新建的 NotFound 页满足仓库 lint 规则（消除 12 条新文件告警） |
| `f918efa` | chore(deps): 锁定 gsap 3.15.0 + lenis 1.3.26、新增 motion token 骨架、删除死代码 MouseFollower.vue |
| `118432d` | docs: AC07b 占位、D1/D2 决定、SESSIONS 工作树位置、Step 4—6 记录、INTEGRATION 合并记录 |
| `f1cd935` | docs: 补齐本 handoff 的实际提交 hash |
| `35fc135` | docs: Step 3.11 按用户裁定结案（保持现状）、session-c 搬移记录、Step 6 复核证据 |

工作树：本任务开始到结束，主仓 `git status --short` 在每次提交后都为空；没有执行 `git reset --hard`、强推、改写他人分支历史或删除未提交内容。
唯一一次 `git reset` 是拆分提交前用的**无目标 mixed reset**（`git reset`，仅取消暂存，reflog 记为 `50160d1 HEAD@{6}: reset: moving to HEAD`），没有 `--hard`，没有改动工作区内容——随后所有文件都重新暂存并按主题拆成三次提交，最终 `git status --short` 为空，可对照 `git log` 验证内容都在提交里。

「最终验证」里的 build / check:routes / eslint 三次运行都发生在 `4f5cd76` 之后，即针对 `118432d` 的内容；此后没有改动任何被验证的文件。

## 未完成事项与下次第一步

1. ~~待用户决定：Step 3.11~~ → 已裁定为选项 1（保持现状、不改写历史），已记入 `INTEGRATION.md`。
2. **待 T00A/T00R 提交**：他们提交后 A 需要再 merge 一次，并把 `SPEC.md`/素材接进 token 与客户墙；届时重跑 `check:routes` + `build`。
3. **待 C 修**：`ServiceLanding.vue` 第 59 行字面量 `\n`；`handoffs/C.md` 里作废的 `/services/mini-program` 说法。
4. **待 B/C 开工前置**：main 上仍无 SPEC.md 与素材；客户墙是 24 空槽，服务素材为占位登记。
5. **T01 存量债**：`routeManifest` 仍只覆盖 `home/contact/ai` 三个键，`check:routes` 会把其余 15 个 routeKey 列为 WARN（已在脚本里标注，不属于本任务修复范围）。
6. **待补**：`session-t00a`/`session-t00r` 的前置同步与依赖安装（`session-a`/`session-b`/`session-c` 的 node_modules 均已就位）；旧嵌套空目录 `gengzhan-worktrees\gengzhan-worktrees\` 已空，可随时删除。

## 补充记录（用户裁定后 · 2026-09-14）

### 1. Step 3.11 按选项 1 结案

用户裁定：保持现状，只在 `INTEGRATION.md` 里记为「已收敛、历史含 4 个重复提交」，不做任何历史改写。

执行动作（只有文档，没有 git 结构改动）：

- `INTEGRATION.md` 的「集成记录」里，原「未决项」条目改为「已决（2026-09-14 用户裁定，选项 1）」：明确保留 `4a343d6`、`5021d76`、`512565e`、`0997a1e` 这 4 个 cherry-pick 重复提交，不执行 rebase/filter-repo/强推；并说明该冗余不影响功能、门禁与构建。
- 未执行任何 `git rebase`、`git filter-repo`、`git push --force`、`git reset --hard`；`git log` 仍能看到那 4 个提交。

### 2. Step 4 收尾：session-c 搬移成功

占用解除后重跑同一条命令即成功：

```powershell
git worktree move "D:/桌面/gengzhan-worktrees/gengzhan-worktrees/session-c" "D:/桌面/gengzhan-worktrees/session-c"   # exit 0
```

复核输出：

```text
=== worktree list ===
D:/桌面/gengzhan                           f1cd935 [main]
D:/桌面/gengzhan-worktrees/session-a       af63173 [codex/rebuild-foundation]
D:/桌面/gengzhan-worktrees/session-b       67890da [codex/rebuild-brand]
D:/桌面/gengzhan-worktrees/session-c       12054b5 [codex/rebuild-services]
D:/桌面/gengzhan-worktrees/session-t00a    45ef250 [codex/t00a-assets]
D:/桌面/gengzhan-worktrees/session-t00r    45ef250 [codex/t00r-motion-spec]

=== session-c 现场 ===
git status --short   →（空，clean）
node_modules=True
branch=codex/rebuild-services head=12054b5
```

六个工作树现在全部位于 `gengzhan-worktrees\` 的一级子目录，不再嵌套。搬移只改路径，没改分支、提交或工作区内容；`session-c` 的 `frontend/node_modules`（本任务安装的 274 包）随目录一起搬过去了，无需重装。旧目录 `gengzhan-worktrees\gengzhan-worktrees\` 搬空后仍存在但**已为空**（`Get-ChildItem -Force` 无输出），删除该空目录的命令被本机策略拦截，未强删，留作可随时手工清理的空壳。

### 3. Step 6 复核证据（本就已完成，此处给出可点验位置）

```text
ACCEPTANCE.md:71   | AC07b | 动效还原（占位，待 T00R） | 判定值待 T00R 的动效 SPEC.md 定稿后填入。字段已建好，见下方「AC07b 字段」 |
ACCEPTANCE.md:84   ### AC07b 字段（占位，判定值等 T00R）
INTEGRATION.md:57  - **D1（2026-09-14）**：外部素材的授权由用户自行处理/承担……素材仍必须下载到仓库、登记来源与 hash……
INTEGRATION.md:58  - **D2（2026-09-14）**：`/services/:slug` 形状确认为文档笔误，作废；英文路径统一 `/en/<slug>`……
```

### 4. 明确不做的事

- 不代改 `ServiceLanding.vue`（第 59 行字面量 `\n`）和 `handoffs/C.md`（作废的 `/services/mini-program` 说法）——用户 2026-09-14 明确要求留给 C，A 只保留记录。
- 不改写 main 历史、不删未提交内容、不触碰他人工作树里的成果（T00A/T00R 的素材与取证保持原样）。

---

## 附录 · 上一任务记录

### Session A / Task T00-T01
状态：完成（基础待样板验收）
基准commit：b484790
本任务commit：
目标与完成范围：建立路由/导航契约、主题store、公共容器与异步状态、双语demo fixtures；T00证据沿用REFERENCE与ACCEPTANCE中的已记录基线。
修改文件：frontend/src/config、stores、components/site、mocks/content.js
验证命令、实际结果与证据路径：npm.cmd run build；只读eslint按ACCEPTANCE记录，待执行。
BACKEND-TODO / 缺译 / 素材缺口：真实API/表单未接入；T00移动真机与完整截图未执行。
未完成事项与原因：完整组件与双语注册将在后续基础迭代补齐。
下次恢复的第一步：补齐Layout主题初始化和英文路由注册。
