// 主题管理工具
// 支持动态切换主题，基于CSS变量实现

// 主题类型定义
export interface ThemeColors {
  primary: string;
  warning: string;
  error: string;
  info: string;
  success: string;
  loading: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
}

// 默认主题配置
export const defaultTheme: Theme = {
  name: 'default',
  colors: {
    primary: '#47867b',
    warning: '#ccc15e',
    error: '#c15c5c',
    info: '#7290c9',
    success: '#68ae80',
    loading: '#a1adb3'
  }
};

// 暗色主题配置
export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: '#5ba094',
    warning: '#d4ca6f',
    error: '#d36c6c',
    info: '#83a0d9',
    success: '#79bd8d',
    loading: '#b2bbc2'
  }
};

// 主题管理器类
class ThemeManager {
  private currentTheme: Theme;
  private themes: Map<string, Theme>;

  constructor() {
    this.currentTheme = defaultTheme;
    this.themes = new Map();
    // 注册默认主题
    this.registerTheme(defaultTheme);
    this.registerTheme(darkTheme);
  }

  /**
   * 注册主题
   * @param theme 主题配置
   */
  registerTheme(theme: Theme): void {
    this.themes.set(theme.name, theme);
  }

  /**
   * 切换主题
   * @param themeName 主题名称
   */
  useTheme(themeName: string): void {
    const theme = this.themes.get(themeName);
    if (!theme) {
      console.warn(`Theme ${themeName} not found. Using default theme.`);
      return;
    }

    this.currentTheme = theme;
    this.applyTheme(theme);
  }

  /**
   * 应用主题到DOM
   * @param theme 主题配置
   */
  private applyTheme(theme: Theme): void {
    const root = document.documentElement;

    // 更新主色调
    this.updateColorPalette(root, 'primary', theme.colors.primary);
    this.updateColorPalette(root, 'warning', theme.colors.warning);
    this.updateColorPalette(root, 'error', theme.colors.error);
    this.updateColorPalette(root, 'info', theme.colors.info);
    this.updateColorPalette(root, 'success', theme.colors.success);
    this.updateColorPalette(root, 'loading', theme.colors.loading);
  }

  /**
   * 更新颜色调色板
   * @param root 根元素
   * @param colorName 颜色名称
   * @param baseColor 基础颜色
   */
  private updateColorPalette(root: HTMLElement, colorName: string, baseColor: string): void {
    // 设置基础色
    root.style.setProperty(`--ws-${colorName}-500`, baseColor);

    // 生成并设置其他色调
    // 使用CSS color-mix函数动态生成不同亮度的颜色
    root.style.setProperty(`--ws-${colorName}-50`, `color-mix(in srgb, ${baseColor}, white 90%)`);
    root.style.setProperty(`--ws-${colorName}-100`, `color-mix(in srgb, ${baseColor}, white 75%)`);
    root.style.setProperty(`--ws-${colorName}-200`, `color-mix(in srgb, ${baseColor}, white 60%)`);
    root.style.setProperty(`--ws-${colorName}-300`, `color-mix(in srgb, ${baseColor}, white 45%)`);
    root.style.setProperty(`--ws-${colorName}-400`, `color-mix(in srgb, ${baseColor}, white 25%)`);
    root.style.setProperty(`--ws-${colorName}-600`, `color-mix(in srgb, ${baseColor}, black 15%)`);
    root.style.setProperty(`--ws-${colorName}-700`, `color-mix(in srgb, ${baseColor}, black 30%)`);
    root.style.setProperty(`--ws-${colorName}-800`, `color-mix(in srgb, ${baseColor}, black 45%)`);
    root.style.setProperty(`--ws-${colorName}-900`, `color-mix(in srgb, ${baseColor}, black 60%)`);
  }

  /**
   * 获取当前主题
   */
  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  /**
   * 获取所有注册的主题
   */
  getAllThemes(): Theme[] {
    return Array.from(this.themes.values());
  }

  /**
   * 自定义主题颜色
   * @param colors 颜色配置
   */
  setThemeColors(colors: Partial<ThemeColors>): void {
    const newTheme: Theme = {
      ...this.currentTheme,
      colors: {
        ...this.currentTheme.colors,
        ...colors
      }
    };

    // 更新当前主题并应用
    this.currentTheme = newTheme;
    this.applyTheme(newTheme);
  }
}

// 创建主题管理器实例
export const themeManager = new ThemeManager();

// 导出主题切换API
export const useTheme = (themeName: string) => themeManager.useTheme(themeName);
export const registerTheme = (theme: Theme) => themeManager.registerTheme(theme);
export const getCurrentTheme = () => themeManager.getCurrentTheme();
export const getAllThemes = () => themeManager.getAllThemes();
export const setThemeColors = (colors: Partial<ThemeColors>) => themeManager.setThemeColors(colors);
