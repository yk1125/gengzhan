# Session A · 路由可达性修复 + Git 收敛 + 动效依赖骨架（2026-09-14）
状态：进行中
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
