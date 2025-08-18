export type ToolTipTriggerType = "hover" | "click";

export interface ToolTypeProps {
  trigger?: ToolTipTriggerType,
  content?: string,
  manual?: boolean
}

export interface ToolTipEmits {
  (e: 'visible-change', v: boolean) : void
}

export interface ToolTipInstance {
  show : () => void,
  hide : () => void
}
