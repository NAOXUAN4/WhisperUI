<template>
  <Transition name="fade-up"
    @after-leave="destoryComponent"
    @enter="updateHeight"
  >
    <div class='ws-message'
    ref = "messageRef"
    role="alert"
    :style="messageStyle"
    :class="{
      [`ws-message--${type}`]: type,
      'is-close': showClose
    }"
    v-show="visible"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
    >
    <!-- {{ offset }} -- {{ topOffset }} -- {{ bottomOffset }}-- {{ messageId }} -->
    <div class="ws-message__content">
      <slot>
        <RenderVnode :v-node="message"/>
      </slot>
    </div>


    <div class="ws-message__close" v-if="showClose" @click.stop="showCloseHandler">
      <WsIcon icon="fa-solid fa-xmark" />
    </div>

    </div>
  </Transition>
</template>


<script lang ='ts' setup>
import type { MessageProps } from "./type";
import WsIcon  from '@/components/Icon/Icon.vue';
import { computed, onMounted, ref } from "vue";
import RenderVnode from '@/components/Common/RenderVnode';
// import { watch } from "vue";
import  { getLastMessageNodeBottomOffsetById } from './method';
import  useEventListener  from '@/hooks/useEventListener';


const visible = ref(false);
const messageRef = ref<HTMLDivElement>();
const elementHeight = ref(0);

/**
 * 顶部高度
 */
const topOffset = computed(()=> {
  return getLastMessageNodeBottomOffsetById(props.messageId) + props.offset;
});

const messageStyle = computed(()=>{
  return `top: ${topOffset.value ?? 0}px`;
});

/**
 * 底部高度
 */
const bottomOffset = computed(()=> topOffset.value + elementHeight.value);

/**
 * 导出bottomOffset
 */
defineExpose({
  bottomOffset
});


let timer: ReturnType<typeof setTimeout>;
/**
 * 延时关闭函数， props.duration 控制
 */
function startTimer() {
  if(props.duration == 0) {visible.value = true; return;}
  timer = setTimeout(()=>{
    visible.value = false;
  }, props.duration);
}

/**
 * hover message常亮特性函数
 */
function clearTimer(){
  clearTimeout(timer);
}

/**
 * 手动关闭函数， 服务于 show-close 按钮
 */
function showCloseHandler() {
  visible.value = false;
}


defineOptions({
  name: 'WsMessage'
});


const props = withDefaults(defineProps<MessageProps>(), {
  duration: 1000,
  type: 'info',
  offset: 3
});


/**
 * Esc关闭Message特性函数
 */
function keydownHandler(e: Event){
  const event = e as KeyboardEvent;
  if(event.code == 'Escape'){
    visible.value = false;
  }
}
useEventListener(document, 'keydown', keydownHandler);



onMounted(() => {
  visible.value = true;
  startTimer();

  // nextTick(()=> {
  //   elementHeight.value = messageRef.value?.offsetHeight ?? 0;
  // });
});

/**
 * 通过Transition 生命周期钩子控制更新组件本体高度数据
 */
const updateHeight = () =>{
    elementHeight.value = messageRef.value?.offsetHeight ?? 0;
};


/**
 * 自动清理函数挂载的 dom
 */
// watch(visible, (val, oldVal) => {
//   if (oldVal === true && val === false && typeof props.onDestory === 'function') {
//   props.onDestory();
//   }
// });

/**
 * 通过Transition 生命周期钩子控制销毁
 */
const destoryComponent = () => {
  props.onDestory!();
};

</script>

<style scoped>
  @import './style.scss';
</style>
