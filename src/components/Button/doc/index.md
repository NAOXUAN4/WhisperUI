# part.1 Button
----

> 基于原生button添加样式

#### 组件架构部分
1. 支持Button 原生属性: `type`, `autofocus`, `disabled`
2. 支持导出`dom`, 可以将其暴露给父组件。使用`defineExpose`方法。
#### 样式部分
1. 规范配色表: 主题色、辅助色、基础色
2. 重置自带样式
3. `&` 级联`class`名称, 添加`:hover`等属性,使用`var()`来引用css变量

#### types
```ts
/// 定义Button组件属性用于在调用时传值例如 <ws-button type="primary"></ws-button>
// 导出类型规范 (接口)
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonSize = 'small' | 'large';

///支持原生button属性
export type ButtonNativeType = 'button' | 'submit' | 'reset';

export interface ButtonProps{
    type?: ButtonType,
    size?: ButtonSize,
    plain?: boolean,
    disabled?: boolean,
    round?: boolean,
    cirle?: boolean
    
    ///保持原生支持
    nativetype?: ButtonNativeType,
    autofocus?: boolean
}

/// 组件的ref声明类型
export interface ButtonInstance{
    ref: HTMLButtonElement
}
```