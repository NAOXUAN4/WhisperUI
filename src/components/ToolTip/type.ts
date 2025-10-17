import type { Placement, Options } from '@popperjs/core';
export type ToolTipTriggerType = "hover" | "click" | "manaul";

export interface ToolTipProps {
  trigger?: ToolTipTriggerType,
  content?: string,
  placement?: Placement, /// popper 方位
  modelValue?: boolean,
  popperOptions?: Partial<Options>,
  transition?: string,
  changeDelay?: number /// 变化延时

  minWidth?: number;
  maxWidth?: number;
  autoWidth?: boolean;

}

export interface ToolTipEmits {
  (e: 'update:modelValue', v: boolean): void,
  (e: 'change:modelValue', v: boolean): void,


}

export interface ToolTipInstance {
  show : () => void,
  hide : () => void
}
