// 组件库入口文件
// 支持tree-shaking，用户可以按需导入组件

// 导入样式
import './style/index.scss';

// 导入组件
import WsButton from './components/Button/Button.vue';
import WsCollapse from './components/Collapse/Collapse.vue';
import WsCollapseItem from './components/Collapse/CollapseItem.vue';
import WsIcon from './components/Icon/Icon.vue';
import WsToast from './components/Toast/Toast.vue';
import WsToolTip from './components/ToolTip/ToolTip.vue';
import WsDropDown from './components/DropDown/DropDown.vue';
import WsMessage from './components/Message/Message.vue';

// 导入函数式API
import { createMessage } from './components/Message/method';

// 导入主题管理API
import {
  useTheme,
  registerTheme,
  getCurrentTheme,
  getAllThemes,
  setThemeColors,
  type Theme,
  type ThemeColors
} from './style/theme';

// 导入图标预加载API
import { preloadCommonIcons } from './components/Icon/iconLoader';

// 导出组件
export {
  WsButton,
  WsCollapse,
  WsCollapseItem,
  WsIcon,
  WsToast,
  WsToolTip,
  WsDropDown,
  WsMessage,
  createMessage
};

// 导出主题管理API
export {
  useTheme,
  registerTheme,
  getCurrentTheme,
  getAllThemes,
  setThemeColors,
  preloadCommonIcons,
  type Theme,
  type ThemeColors
};

// 导出类型
export * from './components/Button/type';
export * from './components/Collapse/type';
export * from './components/Icon/type';
export * from './components/Toast/type';
export * from './components/ToolTip/type';
export * from './components/DropDown/type';
export * from './components/Message/type';

// 导出默认导出
const WhisperUI = {
  install(app: any) {
    // 注册所有组件
    app.component('WsButton', WsButton);
    app.component('WsCollapse', WsCollapse);
    app.component('WsCollapseItem', WsCollapseItem);
    app.component('WsIcon', WsIcon);
    app.component('WsToast', WsToast);
    app.component('WsToolTip', WsToolTip);
    app.component('WsDropDown', WsDropDown);
    app.component('WsMessage', WsMessage);
    
    // 全局注册函数式API
    app.config.globalProperties.$message = createMessage;
    
    // 全局注册主题管理API
    app.config.globalProperties.$useTheme = useTheme;
    app.config.globalProperties.$setThemeColors = setThemeColors;
    
    // 预加载常用图标
    preloadCommonIcons();
  }
};

export default WhisperUI;
