# neikong 项目分析文档

## 项目概述

**项目名称：** GemDesign（内孔预览工具）  
**所属应用：** 刘册（projectName = '刘册'，appuuid = '2028363166001397760'）  
**技术栈：** Vue 3（CDN 全局构建）+ Tailwind CSS + Font Awesome + Vditor  
**项目类型：** 纯前端静态页面，无需构建，直接在浏览器打开 `index.html` 运行

---

## 目录结构

```
neikong/
├── index.html                        # 主入口页面（Vue 模板 + 样式）
└── assets/
    ├── javascript/
    │   ├── vue.global.js             # Vue 3 CDN 版本
    │   ├── index.js                  # 主应用逻辑（Vue app + treeNode 组件）
    │   ├── initData.js               # 页面数据与分辨率配置
    │   ├── tool.js                   # 工具函数
    │   └── docModal.js               # 需求文档弹窗类
    ├── css/
    │   ├── index.css                 # 全局样式
    │   ├── tailwindcss.css           # Tailwind CSS
    │   └── docModal.css              # 文档弹窗样式
    ├── font-awesome/                 # 图标库
    ├── vditor/                       # Markdown 渲染器
    └── page/                         # 各页面的 HTML 文件（iframe 加载内容）
        ├── 2028387542683877376.html  # 页面1
        ├── 2030827721990340608.html  # 页面2
        ├── 2031286331811823616.html  # 页面3
        ├── 2031642984050589696.html  # 移动端页面1
        ├── 2032002790976389120.html  # 移动端页面2、3
        ├── 2032371334780026880.html  # 每日一题
        └── 2032373302747463680.html  # 问答助手
```

---

## 页面数据（initData.js）

### 页面列表

共 7 个页面，均为 `html_module` 类型（静态 HTML）：

| 页面名 | 类型 | pageUuid |
|--------|------|----------|
| 页面1 | web | 2028387542683877376 |
| 页面2 | web | 2030827721990340608 |
| 页面3 | web | 2031286331811823616 |
| 移动端页面1 | app | 2031642984050589696 |
| 移动端页面2、3 | app | 2032002790976389120 |
| 每日一题 | app | 2032371334780026880 |
| 问答助手 | app | 2032373302747463680 |

### 分辨率预设（resolutionInfo）

- **web 类型**：1920×1080、1440×1024、MacBook Pro 16"/14"、MacBook Air 13、iMac、华为 MateBook 等
- **app 类型**：iPhone 16 系列、iPhone 15 系列、iPhone 14/13/11/SE、华为 Mate 60/70/XT/X5、小米 15、Samsung Galaxy S23

---

## 核心功能

### 1. 页面树形导航

**组件：** `treeNode`（递归 Vue 组件）

- 左侧边栏展示页面列表，支持文件夹（`folderFlag: true`）和页面（`folderFlag: false`）两种节点类型
- 文件夹可展开/折叠，默认展开
- 页面节点根据 `pageScene` 显示不同图标：`web` 显示网页图标，`app` 显示手机图标
- 当前选中页面高亮显示（蓝色背景 `#E4EFFF`）
- 通过 `provide/inject` 传递当前选中 ID（`getSelectId`）

**数据过滤：** `filterByHasVersion()` 函数会过滤掉 `hasVersion === '1'` 的未生成页面；`collectItems()` 将树结构扁平化为顺序列表供翻页使用。

---

### 2. 页面预览（iframe 渲染）

支持两种页面类型，使用不同的 iframe：

#### Web 类型（PC 端）
- iframe id：`#iframe`（HTML）或 `#vueIframeWeb`（Vue）
- 容器样式：`.preview-web`，内容居中
- 支持自定义宽高，以缩放（`transform: scale`）方式适配容器

#### App 类型（移动端）
- iframe id：`#iframeApp`（HTML）或 `#vueIframeApp`（Vue）
- 外层容器：`.app-border`，带圆角（`border-radius: 30px`）和黑色边框（模拟手机外壳）
- 根据所选分辨率等比缩放适配屏幕

#### 父子页面（导航页）
- 若页面有 `parentUrl`，则先加载父页面，再将子页面内容注入父页面内的 `#navigation` 或 `#contentFrame` iframe
- 通过 `data-uuid` 属性激活父页面中对应菜单项的 `.active-menu` 样式

---

### 3. 分辨率控制

- 顶部工具栏的下拉选择器，选择预设分辨率或自定义（`auto`）
- 选中后设置 `previewSizeW` 和 `previewSizeH`，触发 `changeResolution()` 方法
- `changeResolution()` 计算容器与目标尺寸的比例，对 iframe 施加 `transform: scale(ratio)` 缩放
- Web 类型使用 `ResizeObserver` 监听容器大小变化，自动更新 `auto` 模式下的尺寸

---

### 4. 键盘导航

| 按键 | 功能 |
|------|------|
| `←` 左箭头 | 切换到上一个页面 |
| `→` 右箭头 | 切换到下一个页面 |
| `Esc` | 退出预览模式，返回编辑视图 |

键盘事件绑定在 `window`、iframe 内部文档（web 类型）上，确保聚焦在 iframe 时也能响应翻页。

---

### 5. 预览模式（Preview Mode）

- 点击顶部工具栏的预览图标（`show.png`）进入全屏预览模式
- 预览模式下隐藏顶部工具栏和左侧导航栏，iframe 占满整个视口
- 进入后显示提示条（`tip`）5 秒后自动消失，提示用户使用 Esc 和方向键操作
- 按 `Esc` 退出预览模式

---

### 6. 需求文档弹窗（DraggableResizableModal）

**文件：** `assets/javascript/docModal.js`

功能完整的浮动弹窗，支持：
- **显示/隐藏**：点击"需求文档"按钮打开，关闭按钮或切换页面时关闭
- **拖拽移动**：按住弹窗标题栏拖动，带边界限制（不超出视口）
- **四边缩放**：弹窗四条边均可拖动调整大小，最小尺寸 320×320px
- **Markdown 渲染**：使用 Vditor 以 `wysiwyg` 模式渲染文档内容
- **空状态处理**：当前页面无文档时显示空状态占位图
- **定位**：百分比定位，默认出现在右侧，响应窗口大小

文档数据来自 `initData.js` 中的 `appDoc` 对象（以 `pageUuid` 为 key），当前版本数据为空对象。

---

### 7. 跨 iframe 通信

- 通过 `window.addEventListener('message', ...)` 监听子 iframe 发出的消息
- 子 iframe 通过 `postMessage` 发送 `pageUuid` 字符串，主页面据此切换到对应页面
- 使用 `useEventListener` 工具函数封装事件监听，返回清理函数，防止内存泄漏

---

## 工具函数（tool.js）

### `handleCode(code, isWeb)`
为 App 类型页面注入隐藏滚动条的 CSS 样式（`scrollbar width: 0px`），web 类型直接返回原始 HTML。

### `useEventListener(element, eventType, callback, useCapture)`
封装 `addEventListener`，返回一个调用即可移除该监听器的清理函数，统一管理事件生命周期。

---

## 状态管理（Vue data）

| 字段 | 类型 | 说明 |
|------|------|------|
| `treeData` | Array | 树形页面列表数据 |
| `pageList` | Array | 扁平化的页面列表（用于翻页） |
| `pageUuid` | String | 当前选中页面的 UUID |
| `pageName` | String | 当前页面名称 |
| `pageType` | String | 当前页面类型（`web` / `app`） |
| `isHtml` | Boolean | 是否为 HTML 类型（vs Vue 类型） |
| `previewSize` | String | 当前分辨率选项 value |
| `previewSizeW/H` | Number | 当前预览宽高（px） |
| `previewSizeOptions` | Array | 分辨率下拉选项列表 |
| `currentIndex` | Number | 当前页面在 pageList 中的索引 |
| `isPreview` | Boolean | 是否处于全屏预览模式 |
| `isShowTip` | Boolean | 是否显示底部操作提示条 |
| `appName` | String | 应用名称（来自 initData.js） |
| `resizeObserver` | Object | web 容器大小监听器实例 |
| `drag` | Object | DraggableResizableModal 实例 |
| `iframeMessage` | Function | 跨框架消息监听清理函数 |
| `childIframe` | Function | 子 iframe 键盘监听清理函数 |

---

## 生命周期

| 阶段 | 操作 |
|------|------|
| `mounted` | 初始化拖拽弹窗、加载页面列表、建立跨 iframe 消息监听 |
| `beforeDestroy` | 清理键盘监听、销毁拖拽弹窗、断开 ResizeObserver、移除所有事件监听 |

---

## 外部依赖

| 依赖 | 说明 |
|------|------|
| Vue 3 | CDN 全局构建，`vue.global.js` |
| Tailwind CSS | 作为 JS 脚本引入（`tailwindcss.css`，实为 JS） |
| Font Awesome | 本地托管图标库 |
| Vditor | Markdown 编辑/预览器，用于需求文档展示 |

---

## 数据流向

```
initData.js (treeArr, resolutionInfo, projectName)
    ↓
index.js: getPageList()
    ↓ filterByHasVersion() → treeData（左侧树形导航）
    ↓ collectItems()        → pageList（翻页用扁平数组）
    ↓ findFirstPage()       → 默认显示第一个可用页面
    ↓
getAppPageVersion(page)
    ↓ 设置 iframe.src = page.url
    ↓（有 parentUrl 时：先加载父页面，再嵌入子页面）
    ↓
changeResolution()  ← 监听 previewSize/W/H 变化、容器 resize
    ↓ transform: scale(ratio) 作用于 iframe
```
