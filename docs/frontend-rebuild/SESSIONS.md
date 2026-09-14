# 多 Session 协作与启动

本文件是项目的任务分工、Git基准、文件归属与交接契约，不代表已经创建任务、分支或worktree。方案已于2026-09-14确认。A/B/C/D分别为独立开发session，最多四个并行，全部遵循 [PLAN](PLAN.md) 的依赖与用户样板验收门。A可由全新任务接手，不依赖原规划对话持续存在。

## 1. 三个固定基准

- `docsCommit`：本次文档进入Git的提交。当前文档尚未提交，必须先纳入基准，否则新worktree拿不到规范。
- `foundationCommit`：T01共享基础和契约通过验证后的实际提交。
- `pilotCommit`：用户批准导航＋首页＋小程序样板后的实际提交。

由A在 `handoffs/INTEGRATION.md` 记录实际hash，禁止把这些占位名称直接当作Git ref。派发任务时提供基准，不让每个session自行从旧main猜起点。

## 2. 文件归属与冲突规则

| 范围 | 唯一负责人 |
| --- | --- |
| package.json/package-lock、Vite、测试配置、main.js/App.vue、router | A |
| 全局style.css与styles、layout/Header/Footer/咨询面板 | A |
| config、stores、composables、公共组件、api、utils、repositories、adapters、mock入口 | A |
| locales/index、common/ai词典、site/solutions内容、brand素材 | A |
| AiConsultation/index.vue、NotFound.vue、对应测试 | A |
| Home、About、新Contact、PrivacyPolicy、LegalStatement | B |
| home/company/legal词典与内容、home素材、联系页测试 | B |
| ServiceLanding、services配置/词典/素材、服务测试 | C |
| Cases/News页面、cases/news词典、对应mock fixtures/译文/content素材及测试 | D |
| PRD、spec、PLAN、REFERENCE、ACCEPTANCE、根AGENTS与集成日志 | A维护；其他人提交变更说明 |
| handoffs/A.md、B.md、C.md、D.md | 各自负责人 |

唯一阶段性移交：A在T01初始化最小双语案例/资讯demo fixtures用于首页样板；foundationCommit记录移交后，该内容目录归D维护。B只消费repository，不能为首页另造一份案例/资讯数据。

页面负责人可以新建自己的私有组件子目录，但不能向共享组件目录偷偷复制另一个全局按钮/主题管理器。需要共享接口变化时：在交接记录写“当前契约→所需变化→原因→影响”，由A更新spec、实现和通知，再同步基准。

禁止多个session同时编辑根plan、lockfile、全局CSS或同一个语言注册文件。每个locale模块单独文件，禁止所有文案合成一个大JSON导致合并冲突。

## 3. Git / worktree 方式

建议分支名（仅建议，创建前查现有名称，不能覆盖现有分支）：

| 用途 | 分支 |
| --- | --- |
| 集成 | `main`（实际集成分支；见下方「实际工作树位置」） |
| A 基础 | `codex/rebuild-foundation` |
| B 首页/公司联系 | `codex/rebuild-brand` |
| C 服务 | `codex/rebuild-services` |
| D 内容 | `codex/rebuild-content` |

> **2026-09-14 更正（Session A）**：上表是规划期的**建议名**。**实际集成在 `main` 上做**（主仓 `D:\桌面\gengzhan`）。`codex/frontend-rebuild` 从未承载任何集成提交——它停在 `b484790`（= docsCommit 基线本身，`git log` 只有 1 个提交），**已作废，不要再基于它同步前置或比对 merge-base**。取集成基准一律用 `main`。详见 [handoffs/INTEGRATION.md](handoffs/INTEGRATION.md) 的「集成分支更正」与「T02-H 首页样板集成」。

工作树放在项目旁的 `gengzhan-worktrees/` 下，不在同一个源码目录开四个修改session。根工作区由A做集成，A的实现也在独立工作树。不得删除用户未提交内容、用hard reset清冲突或重写他人历史。

上述旁目录是手动Git管理时的建议位置；若通过Codex应用创建Worktree，使用应用已经创建的隔离目录即可，核实实际基准并记录路径，不再嵌套创建第二层工作树。分支名可用应用生成的名称，以实际记录为准。一个分支/工作树同一时刻只由一个实施任务修改。

创建顺序：

1. 方案获确认后，A检查所有未提交修改，单独提交本次规范（只stage明确文件，禁止 `git add .` 吸收无关资料）。得到docsCommit。
2. 从docsCommit建立集成分支和A工作树，执行T00/T01；A合并完成后记录foundationCommit。
3. 从同一foundationCommit创建B/C工作树，执行两个样板任务；D可只读准备内容。
4. A顺序合并样板，提供预览让用户验收。得到pilotCommit后，B/C同步该基准，D从该基准启动。
5. B/C/D分别完成，A顺序集成与验证；不要四个session各自合并到主分支。

示意命令（由负责人用已核实ref替换占位后执行，当前未运行）：

```powershell
git status --short
git worktree list
git worktree add ../gengzhan-worktrees/session-b -b codex/rebuild-brand <foundationCommit>
git worktree add ../gengzhan-worktrees/session-c -b codex/rebuild-services <foundationCommit>
git worktree add ../gengzhan-worktrees/session-d -b codex/rebuild-content <pilotCommit>
```

每个工作树使用本身node_modules与环境配置；安装使用锁文件，避免共享可变依赖目录。建议端口 A=3000、B=3001、C=3002、D=3003，dev脚本显式传端口。不能只因端口存在就关闭用户已有服务。

### 实际工作树位置（2026-09-14 由 Session A 整理）

| 用途 | 实际路径 | 分支 |
| --- | --- | --- |
| 集成主仓（A） | `D:\桌面\gengzhan` | `main` |
| A 基础 | `D:\桌面\gengzhan-worktrees\session-a` | `codex/rebuild-foundation` |
| B 品牌 | `D:\桌面\gengzhan-worktrees\session-b` | `codex/rebuild-brand` |
| C 服务 | `D:\桌面\gengzhan-worktrees\session-c` | `codex/rebuild-services` |
| T00A 素材 | `D:\桌面\gengzhan-worktrees\session-t00a` | `codex/t00a-assets` |
| T00R 动效规格 | `D:\桌面\gengzhan-worktrees\session-t00r` | `codex/t00r-motion-spec` |

统一约定：所有工作树放在 `gengzhan-worktrees\` 的一级子目录，不再嵌套第二层。2026-09-14 已全部搬平（`session-b`、`session-c` 由 `gengzhan-worktrees\gengzhan-worktrees\*` 移到一级目录；`session-c` 第一次搬移时报过 `Permission denied`，解除占用后重试成功）。搬移只改路径，不改分支与提交，搬移后各工作树 `git status --short` 均为空。

`session-a`、`session-c` 已按各自锁文件执行 `npm ci`（各 274 个包），`frontend` 里 `npm run build` 均可通过；前置到新基准前请先同步 main 再安装。

## 4. 可复制启动提示

### Session A · 第一个启动

```text
执行耘栈科技官网前端改版的 T00，然后 T01。先读取 AGENTS.md 与 docs/frontend-rebuild/README.md、PRD.md、REFERENCE.md、specs/FRONTEND.md、specs/DATA.md、PLAN.md、ACCEPTANCE.md、SESSIONS.md。
以用户最新明确指令为准。先检查当前分支、git status 和文档是否已经提交，建立可供工作树继承的docsCommit，不吸收无关修改。按SESSIONS约定使用隔离工作树。
先补参考站双端证据、24Logo素材清单和页面映射，再实现共享基础、双语、两态时间主题、导航、公共组件、repository/adapter与显式mock、关键测试。不要扩张到后台或直接移植源站客服统计。更新证据和接口缺口。
完成T01后验证并记录foundationCommit、稳定导出和共享文件归属，写docs/frontend-rebuild/handoffs/A.md和docs/frontend-rebuild/handoffs/INTEGRATION.md，给B/C可运行的双语样本基准。不要自动创建其他用户任务，也不要提前将样板标为用户批准。
```

### Session B · T01完成后启动

```text
执行T02-H首页样板。读取根AGENTS.md，以及docs/frontend-rebuild/目录下的README.md、PRD.md、specs/FRONTEND.md、specs/DATA.md、REFERENCE.md、PLAN.md、ACCEPTANCE.md、SESSIONS.md、handoffs/INTEGRATION.md，确认foundationCommit已完成。
在B的独立worktree从该基准工作。只修改Home、home内容/词典/素材/测试及handoffs/B.md。使用现有双端视频，客户墙使用同24资产的固定换序，完整处理中英文和亮暗主题。
严格消费A的公共组件/路由/repository，不修改全局CSS、导航、lockfile或共享契约。公共缺口写明交给A。完成代表宽度与状态验证，提供截图和commit供样板验收。用户批准pilot后才继续T05公司/联系/法律任务。
```

### Session C · T01完成后启动

```text
执行T02-S小程序服务样板。读取根AGENTS.md，以及docs/frontend-rebuild/目录下的README.md、PRD.md、specs/FRONTEND.md、specs/DATA.md、REFERENCE.md、PLAN.md、ACCEPTANCE.md、SESSIONS.md、handoffs/INTEGRATION.md，确认foundationCommit。
在C独立worktree实现ServiceLanding共享模板与小程序双语内容，保持其余六服务路由可访问、映射不串页。只改C所属文件，使用公共组件和咨询入口，不重写Header/Footer或主题。
完成双端双语双主题验证，记录截图、commit和handoffs/C.md，等待已约定的用户样板验收。pilotCommit确认后再完成T03其余服务配置，避免七份独立页面。
```

### Session D · 样板批准后启动

```text
执行T04案例与资讯。读取根AGENTS.md，以及docs/frontend-rebuild/目录下的README.md、PRD.md、specs/FRONTEND.md、specs/DATA.md、REFERENCE.md、PLAN.md、ACCEPTANCE.md、SESSIONS.md、handoffs/INTEGRATION.md，确认pilotCommit有用户批准记录。
从pilotCommit启动D独立worktree。实现Cases/News列表、基础分类/分页、详情、返回及咨询；不做搜索、相关推荐或浏览量。只消费既定repository；修复详情未知ID回首篇和数据不一致，不在页面自行猜API。
维护D所属的mock fixtures与中英译文，明确演示和真实来源，后端缺口记录BACKEND-TODO。完整验证加载/空/失败/缺失/缺译/分页能力不足/富文本清洗，提交证据与handoffs/D.md，不修改共享文件。
```

### B的第二阶段提示

```text
已确认pilotCommit后继续T05。沿用已批准的公共外壳和首页视觉，实现About、Contact、Privacy、Legal及对应中英文。联系表单字段按DATA.md，国际手机/邮箱、服务多选、隐私勾选、真实received/demo/unavailable严格区分。后台未接通使用已批准联系退路；不得伪造电话、二维码或提交成功。只改B所属文件，完成测试和交接记录。
```

### A的集成提示

```text
执行T06—T08，按PLAN依赖顺序集成B/C/D已完成提交。先审查每项文件归属、共享契约差异与验证证据；每次合并后跑build及受影响核心旅程。最终对照ACCEPTANCE执行全站双端/双语/主题矩阵，记录真实设备与API未完成项，不能把mock当联调。输出前端交付、外部能力和上线三个独立状态，以及配置、回滚和后续接入说明。未经当前任务中的上线指令不自动公开部署。
```

## 5. 每个session的完成记录

写到自己 `handoffs/<A|B|C|D>.md`，不要四人同时改集成状态表。

```markdown
# Session X / Task Txx
状态：未开始 / 进行中 / 待集成 / 待样板验收 / 完成 / 外部项待接
基准commit：
本任务commit：
目标与完成范围：
修改文件（说明归属）：
已实现的用户行为：
验证命令、实际结果与证据路径：
参考截图/本地截图与有意差异：
BACKEND-TODO / 缺译 / 素材缺口：
共享契约变更申请（没有则写无）：
未完成事项与原因：
下次恢复的第一步：
```

记录真实结果，失败与未执行分开；不要把“预计可通过”“工具安装了”写成通过。长任务按完成的可验证小块更新记录，避免跨session依赖聊天记忆。

## 6. 合并检查与长期维护

每个提交包含对应代码和必要文档更新。A合并前检查：是否改了他人共享文件、是否引入新依赖/lock变化、有没有hardcode中文/独立主题逻辑/页面API解析、是否增加无证据的风格覆盖、是否把mock成功带入正式环境。

后续新增服务优先改配置；新增语言维护模块词典与内容；新增接口只在repository/adapter扩展并附兼容测试；改变公共行为先更新spec和相关验收。已批准视觉样板保留版本化证据，不随着源站改版自动漂移。
