<template>
  <div class='ws-tooltip'
    @mouseenter="props.trigger == 'hover' ? triggerHandler(false) : null"
    @mouseleave="props.trigger == 'hover' ? triggerHandler(true) : null"
    ref="tooltiprootNode"
  >
    <div class="ws-tooltip__trigger" ref="triggerNode"
      @click="props.trigger == 'click' ? triggerHandler() : null"

    >
      <div>
        <slot/>
      </div>
    </div>

    <!-- 动画包裹 -->
    <Transition :name="transition">
      <div class="ws-tooltip__popper" ref="poperNode" v-show="isActive">
        <div>
          <slot name="content">
            {{ content }}
          </slot>
        </div>
      </div>
    </Transition>

  </div>
</template>


<script lang ='ts' setup>
  import { onUnmounted, ref,watch, computed } from 'vue';
  import { type ToolTipProps, type ToolTipEmits, type ToolTipInstance } from './type';
  import { createPopper, placements, type Instance } from '@popperjs/core';
  import useClickOutside  from '@/hooks/useClickOutside';


  const props = withDefaults(
    defineProps<ToolTipProps>(),
    {
      placement: 'bottom',
      trigger: 'hover',
      transition: 'fade',
      changeDelay: 0
    }
  );

  defineOptions({
    name:"WsTooltip"
  });

  const popperOptions = computed(()=>{   /// 组合 options
    return {
      placements: placements,
      ...props.popperOptions
    };
  });

  const emits = defineEmits<ToolTipEmits>();
  const isActive = ref(props.modelValue ?? false);
  let poperInstance: Instance | null = null;

  const tooltiprootNode = ref<HTMLElement>();
  const poperNode = ref<HTMLElement>();
  const triggerNode = ref<HTMLElement>();


  /**
   * 点击trigger 外部关闭逻辑
   */
  useClickOutside(tooltiprootNode, ()=>{
    if(props.trigger == 'click'){
      onActiveChange(false);
    }
  });

  /**
   * 显示隐藏统一接口， 操作 内部 isActive 变量值 以及 emit v-model的值
   * 集成延时功能
   * @param e
   */
  const onActiveChange = (e: boolean) =>{
    setTimeout(()=>{
      isActive.value = e;
      emits('update:modelValue', isActive.value);
      emits('change:modelValue', isActive.value);
    }, props.changeDelay);
  };

  /**
   * 触发操作的统一Api 接口，适配多种触发方式
   * @param isLeave
   */
  const triggerHandler = (isLeave?: boolean) => {
    if(props.trigger == 'click'){
      onActiveChange(!isActive.value);
      console.log(props);
    }else if(props.trigger == 'hover') {
      onActiveChange(isLeave ? false : true);
    }
    // emits('visible-change', isActive.value);

  };

  // v - model， 对上级变化的监听，监听props改变，同步本地变量
  watch(()=>props.modelValue, (newValue)=>{
    isActive.value = newValue;
  });

  watch(isActive,(newValue)=>{
    if (triggerNode.value && poperNode.value && newValue) {
      poperInstance = createPopper(triggerNode.value, poperNode.value, popperOptions.value);
    }else{
      poperInstance?.destroy();
    }
  },{ flush: 'post'});


  /**
   * 显示函数接口，暴露v-model 的Api
   */
  function showhandler() {
    if(props.trigger == 'manaul') {
        onActiveChange(true);
    }
  }

  /**
   * 隐藏函数接口，暴露v-model 的Api
   */
  function hidehandler() {
    if(props.trigger == 'manaul') {
        onActiveChange(false);
    }
  }

  defineExpose<ToolTipInstance>({
    'show': showhandler,
    'hide': hidehandler
  });

  onUnmounted(()=>{
    if(poperInstance){
      poperInstance?.destroy();
    }
  });

</script>

<style scoped>
@import './style.scss';

</style>
