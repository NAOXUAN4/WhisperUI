import type { VNode } from "vue";
import type { ToolTipProps } from "../ToolTip/type";

type DropDownOptionsKey = string | number;

interface MenuOptions  {
  label: string | VNode,
  key: DropDownOptionsKey,
  disabled?: boolean,
  divided? : boolean
}

export interface DropDownProps extends ToolTipProps {
  DropDownMenuOptions : MenuOptions[]
}


export interface DropDownEmits {
  (e: 'visiable-change', value: boolean ): void,
  (e: 'select', value: DropDownOptionsKey) : void
}


export interface DropDownInstance {
  show: () => void;
  hide: () => void;
}
