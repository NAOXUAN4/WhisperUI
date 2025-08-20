export type ToastType = 'primary' | 'warning' | 'error' | 'success' | 'info'

export interface ToastProps {
  context?: string,
  closable?: boolean,
  icon?:string,
  type?: ToastType,
  disapper?: number
  modelValue: boolean,   /// v-model 是否显示属性
}


export interface ToastEmits {
  (e: 'update:modelValue', v: boolean) : void,
  (e: 'change:modelValue', v: boolean) : void,
}


