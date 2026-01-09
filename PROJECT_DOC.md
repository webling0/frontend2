# 前端项目文档

## 1. 项目概览
该项目是一个基于 **Next.js 15** 构建的现代电商前端应用。采用了 App Router 架构，具备响应式设计、高性能渲染以及丰富的 UI 交互。

## 2. 技术栈
项目采用了以下核心技术与库：

- **核心框架**: [Next.js 15.1.6](https://nextjs.org/) (React 19)
- **样式方案**: 
  - [Sass](https://sass-lang.com/) (SCSS)
  - [Bootstrap 5](https://getbootstrap.com/) & [React Bootstrap](https://react-bootstrap.github.io/)
- **UI 组件库**: [Radix UI](https://www.radix-ui.com/) (Dialog 等)
- **状态管理**: React Context API + `useReducer`
- **网络请求**: [Axios](https://axios-http.com/)
- **交互与动画**:
  - [Swiper](https://swiperjs.com/) (轮播图)
  - [PhotoSwipe](https://photoswipe.com/) (图片预览)
  - [Drift-zoom](https://github.com/imgix/drift) (商品放大镜)
  - [WOW.js](https://wowjs.uk/) (滚动动画)
- **其他工具**:
  - `clsx`: 类名合并
  - `@emailjs/browser`: 邮件发送服务

## 3. 详细目录结构

### 3.1 核心根目录
- **`app/`**: Next.js App Router 路由系统。
  - `(other-pages)/`: 包含通用页面如 `about-us`, `contact-us`, `faq`, `login`, `register`, `terms` 等。
  - `account/`: 用户中心逻辑，包含订单预览等。
  - `blogs/`: 博客文章列表及其详情路由。
  - `shop/`: 商品列表/搜索结果展示页面。
  - `product-detail/[id]/`: 动态路由，处理单个商品的详细信息展示。
  - `checkout/` & `shopping-cart/`: 购物车管理与结账流程页面。
  - `layout.js`: 全局布局，挂载了 `Context`、`ScrollController` 及全局样式。

- **`components/`**: 业务组件库。
  - `headers/`: 包含多种样式的 Header 组件（如 `Header1.jsx`, `Header2.jsx`），支持响应式导航和 Sticky 效果。
  - `footers/`: 多样式页脚组件。
  - `homes/`: 按照模板分类的首页组件（如 `pet-store/`, `camping/`, `fashion-minimal/`），包含各自的 `Hero`, `Products`, `Banner` 等。
  - `productCards/`: 多种风格的商品展示卡片（如 `ProductCard1.jsx`, `ProductCardListing.jsx`）。
  - `productDetails/`: 商品详情页专用的子组件，如 `Details1.jsx` (主展示), `Thumbnails.jsx` (缩略图), `StickyDetail.jsx` 等。
  - `modals/`: 全局弹窗，如 `SearchModal.jsx`, `QuickView.jsx`, `CartModal.jsx`。
  - `common/`: 高频复用的 UI 基础件，如 `Breadcrumbs.jsx`, `Pagination.jsx`, `RangeSlider.jsx`。

- **`context/` & `reducer/`**: 全局状态管理。
  - `Context.jsx`: 定义了 `ProjectContext`，管理购物车 (Cart)、愿望清单 (Wishlist)、比较列表 (Compare) 和快速预览 (QuickView) 的核心状态。
  - `filterReducer.js`: 处理复杂的商品过滤逻辑（价格区间、分类、品牌等状态）。

- **`data/`**: 项目静态数据层。
  - `products.js`: 核心商品主数据集。
  - `menu.js`: 导航菜单的结构定义。
  - `heroSlides.js`: 各种 Hero 轮播图的数据配置。
  - `collections.js`: 分类集合与促销 Banner 的配置。

- **`hooks/`**: 自定义逻辑封装。
  - `useProducts.js`: 商品检索与过滤的逻辑钩子。
  - `useMutations.js`: 处理数据变更操作（如加入购物车等）。

- **`utlis/`**: (注：Utilities 拼写错位)
  - `wow.js`: 初始化滚动动画。
  - `cn.js`: 基于 `clsx` 的类名规范化工具。

- **`public/`**: 静态资源存放处。
  - `images/`: 包含 `products/`, `models/`, `icons/`, `backgrounds/` 等分类图片。

### 3.2 配置文件
- `next.config.mjs`: Next.js 运行配置（如图片域名白名单、环境变量等）。
- `jsconfig.json`: JS 路径别名与智能感知配置。
- `package.json`: 记录了 `scripts` (dev, build, start) 以及详细的依赖包版本。

## 4. 开发指南

### 安装依赖
```bash
yarn install
# 或
npm install
```

### 运行开发服务器
```bash
npm run dev
# 默认运行在 http://localhost:3001
```

### 构建生产环境
```bash
npm run build
npm run start
```

## 5. 项目说明 (Notes)
- **端口配置**: 项目默认在 `3001` 端口运行。
- **状态管理**: 购物车、愿望清单等全局状态主要通过 `context/Context.jsx` 管理。
- **工具函数**: 注意 `utlis` 文件夹名称为项目既有命名（拼写为 utlis 而非 utils）。
