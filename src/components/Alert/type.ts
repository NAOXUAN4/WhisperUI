type AlertTypes = 'primary' | 'warning' | 'error' | 'success' | 'info'

export interface AlertProps {
  context?: string,
  closable?: boolean,
  icon?:string,
  type?: AlertTypes,
  modelValue: boolean   /// v-model 是否显示属性
}


export interface AlertEmits {
  (e: 'update:modelValue', v: boolean) : void,
  (e: 'change:modelValue', v: boolean) : void,
}


