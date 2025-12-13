import { library } from '@fortawesome/fontawesome-svg-core';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faLemon } from '@fortawesome/free-regular-svg-icons';

// 已加载的图标缓存
const loadedIcons = new Set<string>();

// 内置常用图标映射
const builtInIcons = {
  // solid图标
  'fa-solid fa-xmark': faXmark,
  // regular图标
  'fa-lemon fa-regular': faLemon
};

/**
 * 按需加载图标
 * @param icon 图标名称或对象，如 'fa-solid fa-xmark' 或 { prefix: 'fas', iconName: 'home' }
 */
export const loadIcon = (icon: any) => {
  // 如果图标是字符串类型
  if (typeof icon === 'string') {
    // 如果图标已加载，直接返回
    if (loadedIcons.has(icon)) {
      return;
    }

    // 检查是否是内置图标
    const iconObj = builtInIcons[icon as keyof typeof builtInIcons];
    if (iconObj) {
      // 添加到库中
      library.add(iconObj);
      // 标记为已加载
      loadedIcons.add(icon);
    } else {
      // 对于未知图标，尝试解析图标名称并动态导入
      console.warn(`Icon ${icon} not found in built-in icons. Please import it manually.`);
    }
  }
  // 对于其他类型（对象、数组等），不做处理
};

/**
 * 预加载常用图标
 */
export const preloadCommonIcons = () => {
  Object.keys(builtInIcons).forEach(iconName => {
    loadIcon(iconName);
  });
};
