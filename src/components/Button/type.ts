export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonSize = 'small' | 'large';

export interface ButtonProps{
    type?: ButtonType,
    size?: ButtonSize,
    plain?: boolean,
    disabled?: boolean,
    round?: boolean
}