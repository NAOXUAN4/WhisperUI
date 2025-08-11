/// 定义Button组件属性用于在调用时传值例如 <ws-button type="primary"></ws-button>
// 导出类型规范 (接口)
export type ButtonType = 'primary' | 'success' | 'warning' | 'error' | 'info';
export type ButtonSize = 'small' | 'large';

///支持原生button属性
export type ButtonNativeType = 'button' | 'submit' | 'reset';

export interface ButtonProps{
    type?: ButtonType,
    size?: ButtonSize,
    plain?: boolean,
    disabled?: boolean,
    round?: boolean,
    circle?: boolean,
    icon?: string  /// 支持添加icon组件

    ///保持原生支持
    nativetype?: ButtonNativeType,
    autofocus?: boolean
}

/// 组件的ref声明类型
export interface ButtonInstance{
    ref: HTMLButtonElement
}
