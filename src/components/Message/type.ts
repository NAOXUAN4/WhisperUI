import type { VNode } from "vue";


export interface MessageProps {
  message?: string | VNode,
  duration?: number,
  showClose?: boolean,
  type?: 'success' | 'info' | 'warning' | 'error';
  offset?: number,
  messageId: string,
  onDestory?: () => void
}

export type createMessageProps = Omit<MessageProps, 'onDestory' | 'messageId'>

/**
 * 实例列表，用于储存已激活的message
 */
export interface MessageInstanceType {
  id: string,
  vnode: VNode,
  props: MessageProps
}
