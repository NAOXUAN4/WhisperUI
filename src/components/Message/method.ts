import { render, h, type Ref, ref } from "vue";
import type { createMessageProps, MessageProps, MessageInstanceType } from "./type";
import MessageConstructor from "./message.vue"; //// setup 默认自动导出


const messageNodeInstanceList: Ref<MessageInstanceType[]> = ref([]);


export const messageNodeInstanceId = (() => {
  let id = 0; // 私有变量
  return {
    get value(){ return id;}, // 获取当前 id
    set value(v: number) {id = v;}, // 增加 id
  };
})();


export const createMessage: (props: createMessageProps) => void = (props: createMessageProps) => {
  messageNodeInstanceId.value +=1;

  const idx = `messageNode_${messageNodeInstanceId.value}`;
  const container = document.createElement('div');
  const destory = () => {
    render(null, container);
    // 在列表中删除
    const idndl = messageNodeInstanceList.value.findIndex((el) => {
      // console.log('des = ',el);
      return el.id == idx;
    });

    if(idndl == -1) return;

    // console.log(idndl);
    // console.log(messageNodeInstanceList.value[idndl]);


    messageNodeInstanceList.value.splice(idndl, 1);




  };

  const propsWithDestory: MessageProps = {
    ...props,
    onDestory: destory,
    messageId: idx
  };

  const vnode = h(MessageConstructor, propsWithDestory);  /// 以往使用 简单的结构 'div' ，遇到复杂的可以直接使用组建的 Constructor

  const instance: MessageInstanceType = {
    id: idx,
    vnode: vnode,
    props: propsWithDestory,
  };

  messageNodeInstanceList.value.push(instance);   /// 响应式数据的调动会通知所有被收集的副作用函数， 比如说TopOffset，于是分发订阅Topoffset更新


  render(vnode, container);   /// render api， (render func， 位置) => void

  document.body.appendChild(container.firstElementChild!);

  return instance;

};

export const getLastMessageNodeInstance = () => {
  // console.log(messageNodeInstanceList);
  return messageNodeInstanceList.value.at(-1);
};

export const getLastMessageNodeBottomOffsetById = (id: string) => {

  const InstanceIndex = messageNodeInstanceList.value.findIndex(el => {
    return el.id === id;
  });

  if(InstanceIndex <= 0){
    // console.log(InstanceIndex);

    return 0;
  }else{
    const lastInstance = messageNodeInstanceList.value[InstanceIndex - 1];
    // console.log(lastInstance, id, messageNodeInstanceList);

    return lastInstance?.vnode.component?.exposed?.bottomOffset.value;
  }
};
