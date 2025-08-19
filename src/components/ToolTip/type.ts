import type { Placement } from '@popperjs/core';
export type ToolTipTriggerType = "hover" | "click";

export interface ToolTipProps {
  trigger?: ToolTipTriggerType,
  content?: string,
  placement?: Placement, /// popper 方位
  manual?: boolean,
  modelValue?: boolean

}

export interface ToolTipEmits {
  (e: 'visible-change', v: boolean) : void,
  (e: 'update:modelValue', v: boolean): void,
  (e: 'change:modelValue', v: boolean): void,


}

export interface ToolTipInstance {
  show : () => void,
  hide : () => void
}
