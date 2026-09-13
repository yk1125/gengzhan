# 集成状态

维护人：Session A。当前只完成规划，未开始产品实现。

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

| 基准 | 实际提交 | 状态 |
| --- | --- | --- |
| 原源码 | `0ed5dcf` | 已核实 |
| docsCommit | `b484790` | 本次文档尚未提交 |
| foundationCommit | `4c18b6a` | T01未开始 |
| pilotCommit | 未生成 | 样板未实现/未验收 |

## 用户确认记录

- Q1—Q27需求访谈已完成，详见REQUIREMENTS。
- 1.0完整方案整体确认：用户于2026-09-14明确回复“确认”；已完成，不再重复询问。
- 导航＋首页＋小程序服务样板：未提交用户验收。

## 当前首个动作

方案已经确认。新的A任务接手后，检查工作区并先建立包含全部已确认规范的文档提交，再执行T00/T01；当前规范尚未提交，直接从旧Git提交创建工作树会缺少这些文件。不得凭空填入foundationCommit或pilotCommit派发下游实现。

## 集成记录

尚无合并。后续逐项记录：任务、基准、合入提交、验证结果、证据位置、剩余外部项。


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
