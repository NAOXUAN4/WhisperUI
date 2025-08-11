export type IconType = 'primary' | 'success' | 'warning' | 'error' | 'info';
import { type FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';

/// 额外添加的图标属性
export interface IconProps extends FontAwesomeIconProps{
  color?: string,
  type?: IconType
}
