# 参考站证据与差异记录

调查日期：2026-09-14；参考站：https://www.seniorweb.cn/。

当前证据为公开 DOM、CSS/JS、运行中部分交互与桌面截图观察。没有完成全站镜像、逐路由视觉对照、手机视口/真机实测或目标企业网站可达性验证。以下精确数值只针对已列来源；T00 必须保存可复用截图/录屏/源片段/资产清单后才能作为视觉样板基线。

## 1. 页面映射

| 本项目 | 参考 URL | 当前证据级别 |
| --- | --- | --- |
| 首页 | https://www.seniorweb.cn/ | DOM、桌面观察、运行参数与公开脚本 |
| 案例列表 | https://www.seniorweb.cn/case.html | 首页链接已核实，布局待取证 |
| 案例详情代表 | https://www.seniorweb.cn/caseInfo_haitian.html | 链接已核实，布局待取证 |
| 其他详情参考 | https://www.seniorweb.cn/caseInfo_gxgk.html 、 https://www.seniorweb.cn/caseInfo3.html | 同上 |
| 资讯列表 | https://www.seniorweb.cn/news.html | 链接已核实，布局待取证 |
| 资讯详情 | https://www.seniorweb.cn/newsInfo/69.html | 链接已核实，布局待取证 |
| 关于我们 | https://www.seniorweb.cn/about.html | 链接已核实，布局待取证 |
| 共享服务模板 | https://www.seniorweb.cn/solution/34.html | 应用开发链接已核实，样板布局待取证 |
| WEB 服务补充 | https://www.seniorweb.cn/solution/33.html | 企业官网链接已核实，布局待取证 |
| 联系页/需求表单 | https://www.seniorweb.cn/contact.html | DOM、CSS、提交脚本（未提交） |

## 2. 解决方案外链清单

依据：首页 `.header .level2 .jump_l .list`，分类 `.dis span`，企业 `.dis p a`。排除机器人和半导体后，六类 33 个企业条目，28 个真实 href、5 个 `javascript:;` 占位。分类标题是 span，没有独立落地页。所有企业链接原有 `target='_blank'`。

| 行业 | 企业 | 规范 URL / 行为 |
| --- | --- | --- |
| 生物医疗大健康 | 美康生物 | https://www.nbmksw.com |
| 生物医疗大健康 | 济煜医药 | https://www.jeyoupharma.com |
| 生物医疗大健康 | 和也大健康 | https://www.heaye.com |
| 生物医疗大健康 | 麦迪科技 | https://www.medicalsystem.com.cn |
| 生物医疗大健康 | 奥丞生物 | https://www.aucheer.net |
| 生物医疗大健康 | 中诺凯琳 | https://www.zhongnuocaring.com |
| 新能源 | 国轩高科 | 原 `javascript:;`，只显示文字 |
| 新能源 | 库能集团 | https://www.kusolar.cn |
| 新能源 | 氢途科技 | https://www.hydrot.cn |
| 新能源 | 欧凯新能源 | https://www.austasolar.net |
| 新能源 | 德业股份 | 原 `javascript:;`，只显示文字 |
| 新能源 | 青风环境 | https://www.qfzl.com |
| 新能源 | 中广欧特斯 | https://www.outes.com |
| 制造业/汽车零部件 | 海天光机 | https://www.haitianlaser.com |
| 制造业/汽车零部件 | 国望集团 | https://www.guowang.com |
| 制造业/汽车零部件 | 奇精机械 | https://www.qijing-m.com |
| 制造业/汽车零部件 | 瑞源精密 | https://www.ruiyuan.com |
| 制造业/汽车零部件 | 斯贝科技 | https://www.spey-group.com |
| 制造业/汽车零部件 | 合力科技 | 原 `javascript:;`，只显示文字 |
| 制造业/汽车零部件 | 班尼戈 | https://www.cbpipe.com |
| 制造业/汽车零部件 | 君禾股份 | https://www.junhepumps.cn |
| 集团上市公司 | 富邦集团 | 原 `javascript:;`，只显示文字 |
| 集团上市公司 | 中广集团 | https://www.zggroups.com |
| 集团上市公司 | 旭升集团 | https://www.nbxus.com |
| 集团上市公司 | 水艺集团 | https://www.shuiyigroup.com |
| 学校教育 | 华茂教育 | https://www.hmedu.com |
| 学校教育 | 九江理工学院 | https://www.jjlgedu.com |
| 学校教育 | 上海同济大学 | 原 `javascript:;`，只显示文字 |
| 外贸国际站出海 | 赛耐比光电 | https://www.snappy.cn |
| 外贸国际站出海 | 抱扑守一 | https://www.gonatriko.com |
| 外贸国际站出海 | 善力高科 | https://www.sunrisetech-china.com |
| 外贸国际站出海 | 东旭太阳能 | https://www.sunearth.cn |
| 外贸国际站出海 | 梦宸家居 | https://www.dreamhouse-group.com |

原始麦迪科技 href 为 `https://\twww.medicalsystem.com.cn`，库能集团为 `https://\twww.kusolar.cn`，其中 `\t` 表示实际制表符。只去掉这类明确误插空白，不猜测占位企业的新地址。28 条地址尚未逐站访问验证。

## 3. 客户 Logo 素材清单

正确客户墙选择器 `.index1 .content .picture`，不是头部 Logo 或案例封面。

- PC：`.picture:not(.sj_picture) .img .swiper`，8 个槽，每槽 3 张原始 Logo。
- 手机：`.picture.sj_picture .img .swiper`，4 个槽，每槽 6 张，同一批 24 张。
- 移除 `.swiper-slide-duplicate` 后两端各 24 条。初始化后的 72 个 img 节点不是 72 个客户。
- 24 张均无可辨识 alt/title，不能把导航企业名单与这些图形凭空一一对应。T00 下载后视觉确认名字并补双语 alt；品牌名本身可保持不译。
- 页面 baseURI 为 CDN，完整 URL 前缀 `https://cdn.seniorweb.cn/static/images/`。

| sourceId | 原文件（保留查询参数） |
| --- | --- |
| 01 | jun_1.svg |
| 02 | jun_2.svg |
| 03 | jun_3.svg?v=3 |
| 04 | jun_4.svg |
| 05 | jun_5.svg |
| 06 | jun_6.svg |
| 07 | jun_7.svg |
| 08 | jun_8.svg |
| 09 | jun_9.svg |
| 10 | jun_10.svg |
| 11 | jun_11.svg |
| 12 | jun_12.svg |
| 13 | jun_13.svg |
| 14 | jun_14.svg |
| 15 | jun_15.svg?=1 |
| 16 | jun_16.svg |
| 17 | jun_17.svg |
| 18 | jun_18.svg |
| 19 | jun_19.svg |
| 20 | jun_20.svg |
| 21 | jun_21.svg |
| 22 | jun_22.svg?v=1 |
| 23 | jun_23.svg |
| 24 | jun_24.svg |

拟定一次性重排：`07,19,02,14,23,05,11,01,17,09,24,04,16,08,21,12,03,20,06,22,10,15,18,13`。这是 24 张各一次的实现建议，已满足用户换序要求；PC 每 3 张一槽、手机每 6 张一槽。运行时不再随机。

取证确认轮播：垂直、loop、切换 800ms、自动间隔 3500ms、禁止触摸拖拽。T00 还需记录是否各槽错峰、暂停/恢复和不可见状态行为。

素材入库需记录 source URL、获取日期、文件 hash、尺寸/viewBox、sourceId、识别名、本地路径。客户合作关系由用户确认；本次只规划，没有下载这批 Logo，也没有把“已确认客户”写成已完成逐素材权利核验。

## 4. 首页结构与运动

主要有效脚本：https://www.seniorweb.cn/static/js/function.js?v=10.91 。`https://cdn.seniorweb.cn/static/js/view/index.js?v=0.0.5` 中存在大段注释旧逻辑，不可当作运行证据。

| 选择器 | 区块/现行证据 | 本项目映射 |
| --- | --- | --- |
| `.banner` / `.swiper_banner` | fade，speed 1000ms，autoplay 4000ms；原视频 banner.mp4?v=1，观测原生 muted=true、autoplay=false、loop=false | 现有双端视频＋耘栈首屏文案；视频播放编排需还原现行 JS，不把原站误写成原生无限循环 |
| `.index1` | 公司介绍＋客户墙；文字轮播垂直、800ms、1000ms间隔 | 公司介绍与用户照片/客户墙 |
| `.index2` | 14 个精选作品；双列滚动位移系数 −0.02/+0.1；首屏 parallax 乘0.9 | 自有案例数据；数量不足时保持结构节奏，不能虚构14个真实项目 |
| `.index3` | 服务切换 `.item.on`、`.move` 高度×索引；停止旧视频并播放对应过渡；独立手机结构 | 四项耘栈主服务，共用切换结构，服务数量差异登记 |
| `.index4` | 品牌宣言、桌面高度 clientHeight+7000、滚动驱动mask/bg及文本渐显缩放 | 用已确认交付理念重写文案；T00 实测后确定等效滚动编排 |
| `.index5` | 品牌价值 CTA/白皮书/3篇资讯，有独立双端结构 | 咨询 CTA＋自有资讯；没有自有白皮书，不造假下载入口，以提交需求入口替代并登记 |
| `.fixed_cursor` / `.text_effect` | GSAP光标跟随、卡片hover切cut、文字翻动 | 桌面按证据实现；手机/减少动态效果隐藏或降级 |

## 5. 手机菜单

来源：上述 function.js、首页/联系页内联样式、https://www.seniorweb.cn/static/css/style.css?v=0.61 。本节为源码证据，尚无手机截图实测。

- 主断点 ≤1024px；PC nav 隐藏，导航60px高、左右5%内边距、Logo97px、主题图标22px。
- 点击 `.header .menu` 切换 `.active`、`.header.sj_on`、`.menu_background.on`，锁背景滚动。
- `.menu_background` 全屏，`.joke` 100vh可滚动内容、顶部75px；菜单项 translateY(50px) 淡入并逐项延迟。
- `.headline` 点击相邻 `.hidden`，300ms展开，同时收起其他同级并旋转箭头。
- 亮背景 `#F2F1E4`，暗背景 `#111`。
- 手机隐藏自定义光标、侧边浮动工具、桌面转场；桌面自定义滚动销毁后回到原生滚动。

## 6. 联系表单与主题

- 联系表单 `.contact1 .wrap .content .r form` 内嵌，`.fixed_alert` 是合作须知弹层而非表单。
- 字段：姓名*、联系方式*、公司/网址*、项目需求、六项咨询多选*、隐私勾选；源站多选虽标星但所读脚本未校验至少一项。
- PC 表单宽550px、字段48%双列、咨询3列；≤1024px字段单列、咨询2列，在联系资料下方。
- 提交按钮蓝 `#184DC4`、253×45px、圆角5px。成功/失败 `.alert_text.correct/.error` 右上角浮层约2秒；仅源码确认，从未提交。
- 源站 `/message?form_id=1` 不用于本项目。我们使用自有接口、国际联系方式验证、公司选填和四项服务＋其他，均为明确业务适配。
- 主题 `.header .r .sun` 含太阳/月亮图标，`body#Pattern` 为深色；pattern.css 控制切换。源站以浏览器当地时间 08:00/19:00 初始化，sessionStorage.Pattern/ifTime 手动覆盖，未发现跨整点定时器。
- 本项目 07:00/19:00＋边界过期覆盖为用户确认的差异，不能照抄源站08:00或永久会话覆盖。

## 7. 有意差异账本

| ID | 参考站 | 本项目 | 理由 |
| --- | --- | --- | --- |
| V01 | 山久品牌与内容 | 耘栈品牌、自有视频/公司事实 | 用户要求 |
| V02 | 8类行业 | 6类，去掉机器人/半导体 | 用户要求 |
| V03 | 源站服务/酷站/旧版入口 | 四主服务＋保留三旧服务次级入口，无酷站/旧版 | 用户导航范围 |
| V04 | 08:00/19:00、session手动覆盖 | 07:00/19:00、边界到期 | 用户主题要求 |
| V05 | 中文主站 | 中英独立 URL 与翻译 | 用户要求 |
| V06 | 原客户素材顺序 | 相同24资产固定换序 | 用户要求 |
| V07 | 源站提交/客服/联系方式 | 自有咨询面板、表单与 AI 退路 | 自有业务与前端范围 |
| V08 | 公司/网址必填、11位号码偏置 | 公司选填、国际手机或邮箱、咨询至少一项 | 已确认表单建议 |
| V09 | 不存在于自有内容的白皮书/案例描述 | 需求 CTA / 自有或明确mock案例 | 内容范围 |
| V10 | 源站 Logo 长宽比/图片标记 | YZ 导航图形、补alt与尺寸 | 自有品牌和可访问性 |

## 8. T00 必补产物

建议存 `docs/frontend-rebuild/evidence/reference/`，按 `route/viewport/theme/state` 命名，并维护索引、时间、浏览器版本、缩放比例。

1. 首页、服务、案例/资讯列表与代表详情、关于、联系的代表双端截图。
2. 导航展开/收起、两类下拉、手机子菜单、主题切换、客户墙和首屏/滚动动画关键帧或录像。
3. CSS/JS有效源片段附本地文件hash、行号/选择器，避免源站变化导致证据失效。
4. 24个客户Logo、已有视频/公司照片元信息与英文可用性检查。
5. 源站到本项目的模块映射、缺失数据与有意差异；批准的样板截图另存 evidence/approved。

未得到的证据标缺口，不宣称已完成 1:1 或已经通过手机实测。无需为本项目先移植整个源站服务端或生成不可维护的镜像应用。
