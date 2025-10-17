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
      <slot></slot>
      </div>
    </div>

    <!-- 动画包裹 -->
    
      <div class="ws-tooltip__popper" ref="poperNode" v-show="isActive">
        <Transition :name="transition">
          <div>
            
            <div>
              <slot name="content">
                {{ content }}
              </slot>
            </div>

            <div id="arrow"></div>
          </div>
        </Transition>
      </div>
    

  </div>
</template>


<script lang ='ts' setup>
  import { onUnmounted, ref,watch, computed } from 'vue';
  import { type ToolTipProps, type ToolTipEmits, type ToolTipInstance } from './type';
  import { createPopper, offset, placements, type Instance } from '@popperjs/core';
  import useClickOutside  from '@/hooks/useClickOutside';
  import { debounce } from 'lodash-es'


  const props = withDefaults(
    defineProps<ToolTipProps>(),
    {
      placement: 'bottom',
      trigger: 'hover',
      transition: 'fade',
      changeDelay: 0,
      minWidth: undefined,    // 最小宽度
      maxWidth: 200,         // 最大宽度
      autoWidth: false       // 是否自动适应 trigger 宽度
    }
  );

  defineOptions({
    name:"WsTooltip"
  });

  const popperOptions = computed(() => {
  return {
    placements: placements,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9]
        }
      },
      {
        name: 'computeStyles',
        options: {
          adaptive: true,
        },
      },
      {
        name: 'preventOverflow',
        options: {
          padding: 8,
        },
      },
      {
        name: 'flip',
        options: {
          padding: 8,
        },
      }
    ],
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
      onActiveChangeDebounce(false);
    }
  });

  /**
   * 显示隐藏统一接口， 操作 内部 isActive 变量值 以及 emit v-model的值
   * 
   * @param e
   */
  const onActiveChange = (e: boolean) =>{
      isActive.value = e;
      emits('update:modelValue', isActive.value);
      emits('change:modelValue', isActive.value);
  };


  /**
   * debounce 封装延时
   * 
   */
  const onActiveChangeDebounce = debounce((e: boolean) => onActiveChange(e), props.changeDelay);

  /**
   * 触发操作的统一Api 接口，适配多种触发方式
   * @param isLeave
   */
  const triggerHandler = (isLeave?: boolean) => {
    if(props.trigger == 'click'){
      onActiveChangeDebounce(!isActive.value);
      console.log(props);
    }else if(props.trigger == 'hover') {
      onActiveChangeDebounce(isLeave ? false : true);
    }
    // emits('visible-change', isActive.value);

  };

  // v - model， 对上级变化的监听，监听props改变，同步本地变量
  watch(()=>props.modelValue, (newValue)=>{
    isActive.value = newValue;
  });

  watch(isActive, (newValue) => {
  if (triggerNode.value && poperNode.value && newValue) {
    // 更新 popper 配置以支持宽度控制
    const updatedOptions = {
      ...popperOptions.value,
      modifiers: [
        ...(popperOptions.value.modifiers || []),
        {
          name: 'minWidth',
          enabled: true,
          phase: 'beforeWrite',
          requires: ['computeStyles'],
          fn: ({ state }) => {
            if (props.minWidth) {
              state.styles.popper.minWidth = `${props.minWidth}px`;
            }
            if (props.maxWidth) {
              state.styles.popper.maxWidth = `${props.maxWidth}px`;
            }
            if (props.autoWidth && triggerNode.value) {
              state.styles.popper.width = `${triggerNode.value.offsetWidth}px`;
            }
          }
        }
      ]
    };
    
    poperInstance = createPopper(triggerNode.value, poperNode.value, updatedOptions);
    } else {
      poperInstance?.destroy();
    }
  }, { flush: 'post' });


  /**
   * 显示函数接口，暴露v-model 的Api
   */
  function showhandler() {
    if(props.trigger == 'manaul') {
        onActiveChangeDebounce(true);
    }
  }

  /**
   * 隐藏函数接口，暴露v-model 的Api
   */
  function hidehandler() {
    if(props.trigger == 'manaul') {
        onActiveChangeDebounce(false);
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
