# WhisperUI

一个现代化的Vue 3组件库，支持TypeScript，提供丰富的UI组件和灵活的主题定制能力。

## ✨ 亮点特性

### 🎨 设计系统
- **动态CSS变量系统**：基于`:root`的完整设计变量，支持运行时主题切换
- **程序化色彩生成**：使用CSS `color-mix()`函数从基础色动态生成完整色调（50-900）
- **完整设计规范**：包含主色、辅助色、中性色、字体、边框、阴影、过渡动画等
- **支持明暗主题**：内置默认主题和暗色主题，支持自定义主题

### 📦 组件化设计
- **清晰的组件结构**：每个组件独立目录，包含Vue文件、样式文件、类型定义文件
- **统一的命名规范**：所有组件使用`Ws`前缀，遵循一致的API设计
- **灵活的组件配置**：支持多种类型、尺寸、样式变体
- **完整的交互支持**：支持hover、click等多种触发方式，以及自定义内容插槽

### 🛡️ TypeScript支持
- **完整的类型定义**：每个组件都有独立的类型文件，包括属性、事件、实例类型
- **严格的类型安全**：使用`defineProps`和`defineEmits`确保组件API的类型安全
- **清晰的类型导出**：组件类型可单独导入，便于用户扩展和使用

### 🔧 现代化开发环境
- **Vite构建工具**：快速的开发体验和高效的构建输出
- **ESLint+TypeScript检查**：确保代码质量和类型安全
- **Vue 3 Composition API**：采用最新的Vue 3特性，代码结构清晰
- **Font Awesome集成**：支持丰富的图标系统，可灵活扩展

### 📱 响应式设计
- **移动端友好**：组件设计考虑了移动端的使用体验
- **自适应布局**：支持多种屏幕尺寸，提供灵活的布局方案

## 📦 安装

### NPM
```bash
npm install whisper-ui --save
```

### Yarn
```bash
yarn add whisper-ui
```

### PNPM
```bash
pnpm add whisper-ui
```

## 🚀 快速开始

### 全局引入
```ts
import { createApp } from 'vue';
import WhisperUI from 'whisper-ui';
import 'whisper-ui/style';

const app = createApp(App);
app.use(WhisperUI);
app.mount('#app');
```

### 按需引入
```ts
import { createApp } from 'vue';
import { WsButton, WsIcon } from 'whisper-ui';
import 'whisper-ui/style';

const app = createApp(App);
app.component('WsButton', WsButton);
app.component('WsIcon', WsIcon);
app.mount('#app');
```

### 单个组件引入
```vue
<template>
  <WsButton type="primary">Hello WhisperUI</WsButton>
</template>

<script setup>
import { WsButton } from 'whisper-ui';
</script>
```

## 🎨 主题定制

### 使用内置主题
```ts
import { useTheme } from 'whisper-ui';

// 使用默认主题
useTheme('default');

// 使用暗色主题
useTheme('dark');
```

### 自定义主题颜色
```ts
import { setThemeColors } from 'whisper-ui';

// 自定义主题颜色
setThemeColors({
  primary: '#ff4500',
  success: '#00ff00',
  warning: '#ffff00',
  error: '#ff0000',
  info: '#0000ff'
});
```

### 注册新主题
```ts
import { registerTheme, useTheme } from 'whisper-ui';

// 注册新主题
registerTheme({
  name: 'custom',
  colors: {
    primary: '#ff4500',
    success: '#00ff00',
    warning: '#ffff00',
    error: '#ff0000',
    info: '#0000ff',
    loading: '#808080'
  }
});

// 使用自定义主题
useTheme('custom');
```

## 📖 组件文档

### Button 按钮

**基本用法**
```vue
<WsButton type="primary">Primary Button</WsButton>
<WsButton type="success">Success Button</WsButton>
<WsButton type="warning">Warning Button</WsButton>
<WsButton type="error">Error Button</WsButton>
<WsButton type="info">Info Button</WsButton>
```

**尺寸**
```vue
<WsButton size="small">Small Button</WsButton>
<WsButton>Default Button</WsButton>
<WsButton size="large">Large Button</WsButton>
```

**样式变体**
```vue
<WsButton plain>Plain Button</WsButton>
<WsButton round>Round Button</WsButton>
<WsButton circle>Circle Button</WsButton>
```

**带图标**
```vue
<WsButton icon="fa-solid fa-plus">Add</WsButton>
<WsButton icon="fa-solid fa-search" circle></WsButton>
```

### Icon 图标

**基本用法**
```vue
<WsIcon icon="fa-solid fa-home" />
<WsIcon icon="fa-lemon fa-regular" />
<WsIcon icon="fa-lemon fa-solid" size="2x" />
```

**颜色**
```vue
<WsIcon icon="fa-solid fa-home" type="primary" />
<WsIcon icon="fa-solid fa-home" color="#ff4500" />
```

### Collapse 折叠面板

**基本用法**
```vue
<WsCollapse v-model="activeNames">
  <WsCollapseItem name="1" title="Item 1">
    <div>Content of Item 1</div>
  </WsCollapseItem>
  <WsCollapseItem name="2" title="Item 2">
    <div>Content of Item 2</div>
  </WsCollapseItem>
</WsCollapse>
```

### Toast 消息提示

**基本用法**
```vue
<WsToast v-model="visible" message="This is a toast message" />
```

### ToolTip 提示框

**基本用法**
```vue
<WsToolTip content="This is a tooltip">
  <span>Hover me</span>
</WsToolTip>
```

**触发方式**
```vue
<WsToolTip content="Click tooltip" trigger="click">
  <button>Click me</button>
</WsToolTip>
```

### DropDown 下拉菜单

**基本用法**
```vue
<WsDropDown :DropDownMenuOptions="options" v-model:select="selected">
  <button>Select Option</button>
</WsDropDown>
```

### Message 消息

**函数式调用**
```ts
import { createMessage } from 'whisper-ui';

// 基本用法
createMessage({ message: 'This is a message' });

// 带类型
createMessage({ message: 'Success message', type: 'success', duration: 3000 });
createMessage({ message: 'Error message', type: 'error', showClose: true });
```

## 🛠️ 构建配置

### Vite 配置
```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  // 其他配置...
});
```

### Webpack 配置
```js
module.exports = {
  // ...
  resolve: {
    extensions: ['.vue', '.js', '.ts', '.jsx', '.tsx']
  },
  // ...
};
```

## 📋 浏览器支持

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

[MIT](LICENSE)

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- GitHub: [https://github.com/yourname/whisper-ui](https://github.com/yourname/whisper-ui)
- Email: your.email@example.com

---

WhisperUI - 让UI开发更简单、更高效！
