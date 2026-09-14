# 服务页图片清单（占位素材 + 替换说明）

用途：服务页（7 条路由共用一个模板 `frontend/src/views/ServiceLanding.vue`）的 2 处图片位。
当前 14 张全部是**占位素材**（Pexels 免费许可，可商用、免署名），等用户提供正式图后按第 4 节替换。

## 1. 两个图片位

| 位置 | 页面区块 | CSS 选择器 | 数据字段 | 当前尺寸 | 形态 |
| --- | --- | --- | --- | --- | --- |
| hero 通栏图 | 首屏标题下方 | `.service-hero__media img` | `page.heroImage` | 2400×670（比例 3840:1070 ≈ 3.59:1） | 通屏满宽，`object-fit: cover`；鼠标移入出现蓝色圆盘（`item_hover`），点击进 `/ai-consultation` |
| 分区配图 | 各服务「01 / …」分区内 | `.service-media img` | `page.mediaImage` | 1600×1000（比例 16:10） | 容器内满宽，`object-fit: cover`；同样有蓝色圆盘 + 跳转。小程序 / App / Web 三条路由把这张图放进各自的设备外壳（`.mini-phone__screen` / `.app-device__screen` / `.web-browser__screen`） |

尺寸范围建议（替换时照此找图，超出会被裁切居中）：

- hero：**宽 2400–3840，高 670–1070，比例保持 3.59:1**（例：3840×1070、2880×802、2400×670）。低于 2400 宽在大屏会糊。
- 分区配图：**宽 1600–2000，高 1000–1250，比例 16:10**（例：1600×1000、1920×1200）。低于 1600 宽在 1320 容器里会糊。
- 文件格式 JPG/WebP，单张建议 ≤ 400 KB（当前最大 310 KB）。

## 2. 当前占位文件与来源（全部 Pexels，Pexels License）

文件目录：`frontend/public/assets/services/`；下载参数固定为
`?auto=compress&cs=tinysrgb&fit=crop&w=<宽>&h=<高>`。

| 服务路由 | hero 文件 | hero 来源 | media 文件 | media 来源 |
| --- | --- | --- | --- | --- |
| `/ai-development` | `ai-hero.jpg` | [pexels 6248959](https://www.pexels.com/photo/6248959/) | `ai-media.jpg` | [pexels 6248987](https://www.pexels.com/photo/6248987/) |
| `/miniprogram-development` | `mini-hero.jpg` | [pexels 6205512](https://www.pexels.com/photo/6205512/) | `mini-media.jpg` | [pexels 278430](https://www.pexels.com/photo/278430/) |
| `/app-development` | `app-hero.jpg` | [pexels 196644](https://www.pexels.com/photo/196644/) | `app-media.jpg` | [pexels 4910129](https://www.pexels.com/photo/4910129/) |
| `/web-development` | `web-hero.jpg` | [pexels 285814](https://www.pexels.com/photo/285814/) | `web-media.jpg` | [pexels 14553720](https://www.pexels.com/photo/14553720/) |
| `/iot-development` | `iot-hero.jpg` | [pexels 12982187](https://www.pexels.com/photo/12982187/) | `iot-media.jpg` | [pexels 38427501](https://www.pexels.com/photo/38427501/) |
| `/custom-development` | `custom-hero.jpg` | [pexels 8117476](https://www.pexels.com/photo/8117476/) | `custom-media.jpg` | [pexels 5256819](https://www.pexels.com/photo/5256819/) |
| `/digital-creativity` | `creative-hero.jpg` | [pexels 3037096](https://www.pexels.com/photo/3037096/) | `creative-media.jpg` | [pexels 33966530](https://www.pexels.com/photo/33966530/) |

每张图的像素与 sha256（下载后本机实测；前 12 位）：

| 文件 | 尺寸 | 字节 | sha256 |
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

许可：Pexels License（https://www.pexels.com/license/）——免费商用、无需署名、可修改；
禁止转售原图、禁止暗示 Pexels 为作品背书。**上线前如用户换成自有素材，删掉本文第 2 节对应行即可。**

## 3. 内容建议（找图时对着这一列找）

| 服务 | hero 图建议内容 | 分区配图建议内容 |
| --- | --- | --- |
| AI 开发 | 数据 / 算法 / 屏幕上的分析界面（冷静、偏蓝） | 企业资料整理→知识库→助手对话的实际画面 |
| 小程序开发 | 手机在手、线下场景（门店、扫码） | 小程序界面 / 服务入口特写 |
| App 开发 | 多设备并排（手机 + 平板） | App 界面 / 数据总览 |
| 网站建设 | 多屏桌面工作台（本例即此） | 网站界面 / 品牌页面 |
| 物联网开发 | 传感器 / 机房 / 设备 | 设备看板 / 运维现场 |
| 定制开发 | 团队在屏幕前讨论流程 | 系统界面 / 流程图 |
| 数字创意 | 沉浸式展陈 / 互动装置 | 互动装置 / 活动现场 |

## 4. 替换方法（两步）

1. 把新图按上表命名放进 `frontend/public/assets/services/`（覆盖同名文件即可，无需改代码）。
2. 若新增/改名，改 `frontend/src/views/ServiceLanding.vue` 里对应服务的两个字段：
   `heroImage`（首屏通栏图）与 `mediaImage`（分区配图）；同时把 `mediaAlt` 改成这张图的中文说明（无障碍与 SEO 用）。

## 5. 未做 / 不做

- 不复制参考站（seniorweb.cn）的图，也不热链任何外部域名：图片都已下载入库，页面只引用 `/assets/services/...`。
- 过渡视频是另一套素材（`frontend/public/assets/transitions/`，只覆盖服务 1–3 的六个方向），不在本文范围。
