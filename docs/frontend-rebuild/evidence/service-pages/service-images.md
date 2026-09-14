# 服务页图片清单（占位素材 + 替换说明）

服务页 = 7 条路由（zh + en 共 14 条）共用同一个模板 `frontend/src/views/ServiceLanding.vue`。
所有图片都已**下载入库**（`frontend/public/assets/`），页面只引用本地路径，不热链任何外站。
下面 A / B / C / D 四组现在**全部是 Pexels 占位素材**，用户后续按第 5 节两步换成正式图。

> 2026-09-15 用户裁决：服务页所有图片**没有**蓝色圆盘、**没有**点击跳转、**没有** hover 效果，
> 只跟随所在分区的滚动显影（SPEC M-24 / M-25）。旧的 `.service-media` 大图与 `.service-switch`
> 切换器已按用户要求整块删除。

## 1. 四个图片位

| 组 | 位置 | 页面区块 | CSS 选择器 | 数据字段 | 建议尺寸范围（替换时照这个找） |
| --- | --- | --- | --- | --- | --- |
| A | hero 通栏图（每条路由 1 张） | 首屏标题下方 | `.service-hero__media img` | `page.heroImage` | 宽 2400–3840 × 高 670–1070，比例保持 3.59:1 |
| B | 能力卡配图（每条路由 4 张） | `02 / WHAT WE DELIVER` 四张卡 | `.capability-list .service-card-media img` | `page.capabilityImages[0..3]` | 宽 800–1600 × 高 600–1200，比例 4:3 |
| C | 分区卡配图（只有 3 条路由有） | AI「01」四步卡 / 定制「01」四步卡 / 数字创意「01」三块面板 | `.service-card-media img` | `page.flowImages` / `page.stepImages` / `page.panelImages` | 同 B（4:3） |
| D | 设备外壳里的界面图（3 条路由） | 小程序 / App / 网站 的「01」分区 | `.mini-phone__screen img`、`.app-device__screen img`、`.web-browser__screen img` | `page.mediaImage` | 宽 1600–2000 × 高 1000–1250，比例 16:10（外壳会裁切，留出安全边距） |

尺寸说明：B / C 组在浏览器里的实际显示宽度只有 273px（1440 视口，四栏），所以 800×600 已经足够；
想更清晰就用 1200×900 或 1600×1200，保持 4:3 即可。格式 JPG / WebP，单张建议 ≤ 400 KB。

## 2. B / C 组：39 张卡片配图

目录：`frontend/public/assets/services/cards/`；下载参数固定
`?auto=compress&cs=tinysrgb&fit=crop&w=800&h=600`，本机实测**全部 800×600**。
来源列 = Pexels 图片 id，链接形如 `https://www.pexels.com/photo/<id>/`。

### B 组 · 能力卡（每条路由 4 张，与 `capabilities` 顺序一一对应）

| 文件 | 用在哪 | 来源 | 字节 | sha256（前 12 位） |
| --- | --- | --- | --- | --- |
| `ai-1.jpg` | `/ai-development` 能力卡 01 | [30375847](https://www.pexels.com/photo/30375847/) | 71134 | `F8D841CF1493` |
| `ai-2.jpg` | `/ai-development` 能力卡 02 | [30479283](https://www.pexels.com/photo/30479283/) | 59772 | `866472C2B1FC` |
| `ai-3.jpg` | `/ai-development` 能力卡 03 | [4008359](https://www.pexels.com/photo/4008359/) | 33786 | `14E989E1C7CC` |
| `ai-4.jpg` | `/ai-development` 能力卡 04 | [37730212](https://www.pexels.com/photo/37730212/) | 40050 | `9090ACB0989D` |
| `mini-1.jpg` | `/miniprogram-development` 能力卡 01 | [7534791](https://www.pexels.com/photo/7534791/) | 34259 | `601A45381126` |
| `mini-2.jpg` | `/miniprogram-development` 能力卡 02 | [6214472](https://www.pexels.com/photo/6214472/) | 44635 | `41A264CD1C33` |
| `mini-3.jpg` | `/miniprogram-development` 能力卡 03 | [31112251](https://www.pexels.com/photo/31112251/) | 116708 | `8B45181D3E60` |
| `mini-4.jpg` | `/miniprogram-development` 能力卡 04 | [4047875](https://www.pexels.com/photo/4047875/) | 99067 | `916845E9FD23` |
| `app-1.jpg` | `/app-development` 能力卡 01 | [3850263](https://www.pexels.com/photo/3850263/) | 74823 | `AB86C7999D4A` |
| `app-2.jpg` | `/app-development` 能力卡 02 | [14713024](https://www.pexels.com/photo/14713024/) | 26420 | `B5A367E1C1E5` |
| `app-3.jpg` | `/app-development` 能力卡 03 | [36747234](https://www.pexels.com/photo/36747234/) | 61038 | `9F399261732F` |
| `app-4.jpg` | `/app-development` 能力卡 04 | [139387](https://www.pexels.com/photo/139387/) | 38067 | `AABC5663B7AF` |
| `web-1.jpg` | `/web-development` 能力卡 01 | [256502](https://www.pexels.com/photo/256502/) | 25387 | `296B66C750C0` |
| `web-2.jpg` | `/web-development` 能力卡 02 | [4884110](https://www.pexels.com/photo/4884110/) | 20492 | `C017EA68C328` |
| `web-3.jpg` | `/web-development` 能力卡 03 | [8542360](https://www.pexels.com/photo/8542360/) | 66021 | `63A423C0F5C6` |
| `web-4.jpg` | `/web-development` 能力卡 04 | [30535631](https://www.pexels.com/photo/30535631/) | 51150 | `28BF45A10379` |
| `iot-1.jpg` | `/iot-development` 能力卡 01 | [1009926](https://www.pexels.com/photo/1009926/) | 95064 | `EA937C5A1362` |
| `iot-2.jpg` | `/iot-development` 能力卡 02 | [13401910](https://www.pexels.com/photo/13401910/) | 40010 | `1CC79214C777` |
| `iot-3.jpg` | `/iot-development` 能力卡 03 | [9433330](https://www.pexels.com/photo/9433330/) | 122833 | `D3717E2D02B4` |
| `iot-4.jpg` | `/iot-development` 能力卡 04 | [17489163](https://www.pexels.com/photo/17489163/) | 55999 | `DA2315C4B3D6` |
| `custom-1.jpg` | `/custom-development` 能力卡 01 | [97080](https://www.pexels.com/photo/97080/) | 20877 | `E2AB3081AB06` |
| `custom-2.jpg` | `/custom-development` 能力卡 02 | [7947744](https://www.pexels.com/photo/7947744/) | 41080 | `72B398927413` |
| `custom-3.jpg` | `/custom-development` 能力卡 03 | [6804068](https://www.pexels.com/photo/6804068/) | 61955 | `9A8D7B02444C` |
| `custom-4.jpg` | `/custom-development` 能力卡 04 | [4705603](https://www.pexels.com/photo/4705603/) | 61578 | `3BB1FBB16BD2` |
| `creative-1.jpg` | `/digital-creativity` 能力卡 01 | [39007190](https://www.pexels.com/photo/39007190/) | 34795 | `4F8C84A250A7` |
| `creative-2.jpg` | `/digital-creativity` 能力卡 02 | [12550554](https://www.pexels.com/photo/12550554/) | 115184 | `FAE3B771599C` |
| `creative-3.jpg` | `/digital-creativity` 能力卡 03 | [9849319](https://www.pexels.com/photo/9849319/) | 47515 | `D98920DAF343` |
| `creative-4.jpg` | `/digital-creativity` 能力卡 04 | [17279851](https://www.pexels.com/photo/17279851/) | 37908 | `7EB5EE5A3F0A` |

### C 组 · 分区卡

| 文件 | 用在哪 | 来源 | 字节 | sha256（前 12 位） |
| --- | --- | --- | --- | --- |
| `ai-flow-1.jpg` | `/ai-development` 第一步「整理企业资料」 | [3927131](https://www.pexels.com/photo/3927131/) | 59580 | `0979D327B165` |
| `ai-flow-2.jpg` | `/ai-development` 第二步「建立专属知识库」 | [31376643](https://www.pexels.com/photo/31376643/) | 120786 | `17EF05B9433E` |
| `ai-flow-3.jpg` | `/ai-development` 第三步「接入 AI 助手」 | [6282022](https://www.pexels.com/photo/6282022/) | 46435 | `48F8E56CE8C0` |
| `ai-flow-4.jpg` | `/ai-development` 实际使用「服务真实岗位」 | [7964146](https://www.pexels.com/photo/7964146/) | 52261 | `659DAD7D8235` |
| `custom-step-1.jpg` | `/custom-development` 01 业务梳理 | [8004028](https://www.pexels.com/photo/8004028/) | 15834 | `CF692CD851B7` |
| `custom-step-2.jpg` | `/custom-development` 02 产品蓝图 | [11337254](https://www.pexels.com/photo/11337254/) | 21021 | `9A40A4923951` |
| `custom-step-3.jpg` | `/custom-development` 03 研发交付 | [1181676](https://www.pexels.com/photo/1181676/) | 64652 | `C524CA8C563D` |
| `custom-step-4.jpg` | `/custom-development` 04 持续迭代 | [12902862](https://www.pexels.com/photo/12902862/) | 55893 | `7BB88B3BB3BA` |
| `creative-panel-1.jpg` | `/digital-creativity` 互动品牌体验 | [6476257](https://www.pexels.com/photo/6476257/) | 98852 | `1EFE4E96E5BA` |
| `creative-panel-2.jpg` | `/digital-creativity` 数字展陈 | [36058209](https://www.pexels.com/photo/36058209/) | 116484 | `219F0ECE099E` |
| `creative-panel-3.jpg` | `/digital-creativity` 创意 H5 | [196644](https://www.pexels.com/photo/196644/) | 55690 | `B5585AEC9BF7` |

注：数字创意「01」分区只有 **3 块** `<article>`（互动品牌体验 / 数字展陈 / 创意 H5），不是 4 块，
所以 C 组给它的图是 3 张。

## 3. A / D 组：hero 与设备外壳图（14 张，目录 `frontend/public/assets/services/`）

| 服务路由 | hero 文件（A 组） | hero 来源 | media 文件（D 组） | media 来源 |
| --- | --- | --- | --- | --- |
| `/ai-development` | `ai-hero.jpg` | [6248959](https://www.pexels.com/photo/6248959/) | `ai-media.jpg` | [6248987](https://www.pexels.com/photo/6248987/) |
| `/miniprogram-development` | `mini-hero.jpg` | [6205512](https://www.pexels.com/photo/6205512/) | `mini-media.jpg` | [278430](https://www.pexels.com/photo/278430/) |
| `/app-development` | `app-hero.jpg` | [196644](https://www.pexels.com/photo/196644/) | `app-media.jpg` | [4910129](https://www.pexels.com/photo/4910129/) |
| `/web-development` | `web-hero.jpg` | [285814](https://www.pexels.com/photo/285814/) | `web-media.jpg` | [14553720](https://www.pexels.com/photo/14553720/) |
| `/iot-development` | `iot-hero.jpg` | [12982187](https://www.pexels.com/photo/12982187/) | `iot-media.jpg` | [38427501](https://www.pexels.com/photo/38427501/) |
| `/custom-development` | `custom-hero.jpg` | [8117476](https://www.pexels.com/photo/8117476/) | `custom-media.jpg` | [5256819](https://www.pexels.com/photo/5256819/) |
| `/digital-creativity` | `creative-hero.jpg` | [3037096](https://www.pexels.com/photo/3037096/) | `creative-media.jpg` | [33966530](https://www.pexels.com/photo/33966530/) |

| 文件 | 尺寸 | 字节 | sha256（前 12 位） |
| --- | --- | --- | --- |
| `ai-hero.jpg` | 2400×670 | 155365 | `1153BA842340` |
| `ai-media.jpg` | 1600×1000 | 152168 | `F4391D67359F` |
| `app-hero.jpg` | 2400×670 | 155451 | `757F982DFBB7` |
| `app-media.jpg` | 1600×1000 | 53095 | `0118127EE652` |
| `creative-hero.jpg` | 2400×670 | 264611 | `F1E10FA37008` |
| `creative-media.jpg` | 1600×1000 | 158208 | `B148B48B1115` |
| `custom-hero.jpg` | 2400×670 | 186557 | `0DE3A4626C9D` |
| `custom-media.jpg` | 1600×1000 | 223151 | `D54C8D5199CB` |
| `iot-hero.jpg` | 2400×670 | 218303 | `C9016A2C0662` |
| `iot-media.jpg` | 1600×1000 | 310096 | `5801E36A7FBB` |
| `mini-hero.jpg` | 2400×670 | 155058 | `9FD2A45599F8` |
| `mini-media.jpg` | 1600×1000 | 148199 | `431B282159D6` |
| `web-hero.jpg` | 2400×670 | 106784 | `5D59D00BF066` |
| `web-media.jpg` | 1600×1000 | 153305 | `F42CC330FC0F` |

**当前闲置的 4 张**：`ai-media.jpg`、`iot-media.jpg`、`custom-media.jpg`、`creative-media.jpg`。
2026-09-15 用户要求删掉这三条路由「01」分区下面的大图，所以它们暂时没有渲染位置
（数据字段 `mediaImage` 仍在，文件也留在仓库里，方便以后复用）。小程序 / App / 网站 的
`*-media.jpg` 仍在设备外壳里正常显示。

## 4. 内容建议（换图时对着这一列找）

| 服务 | hero 图（A 组）建议内容 | 卡片图（B / C 组）建议内容 |
| --- | --- | --- |
| AI 开发 | 数据 / 算法 / 屏幕上的分析界面（冷静、偏蓝） | 资料整理、知识库、助手对话、岗位使用场景 |
| 小程序开发 | 手机在手、线下场景（门店、扫码） | 预约、交易、会员、企微 / 公众号界面 |
| App 开发 | 多设备并排（手机 + 平板） | App 界面、数据总览、多端协同 |
| 网站建设 | 多屏桌面工作台 | 品牌官网界面、内容结构、多语言页面 |
| 物联网开发 | 传感器 / 机房 / 设备 | 设备接入、监控看板、告警、边缘网关 |
| 定制开发 | 团队在屏幕前讨论流程 | 业务梳理、产品蓝图、研发交付、持续迭代 |
| 数字创意 | 沉浸式展陈 / 互动装置 | 互动体验、展陈空间、创意 H5、数据可视化 |

## 5. 替换方法（两步）

1. 新图按上表同名放进对应目录覆盖即可，**不用改代码**：
   - A / D 组 → `frontend/public/assets/services/`
   - B / C 组 → `frontend/public/assets/services/cards/`
2. 只有新增 / 改名时才动 `frontend/src/views/ServiceLanding.vue` 的 `pages` 常量：
   `heroImage`（A）、`capabilityImages`（B，4 个，与 `capabilities` 同序）、
   `flowImages` / `stepImages` / `panelImages`（C）、`mediaImage`（D）；
   同时把 `mediaAlt` / 卡片图的 `alt` 改成新图的中文说明（无障碍与 SEO 用）。

## 6. 未做 / 不做

- 不复制参考站（seniorweb.cn）的图，也不热链任何外部域名：图片全部下载入库，页面只引用 `/assets/services/...`。
- 过渡视频是另一套素材（`frontend/public/assets/transitions/`）。原来只服务 `.service-switch` 切换器，
  该切换器已按用户要求删除，所以这批视频目前**没有页面引用**。
- 物联网页「01」分区的 `.iot-dashboard__side` 三张是**数据看板示意卡**（实时告警 / 运维工单 / 数据趋势），
  不是内容卡，没有加图；能力卡与其它分区卡都已配图。
