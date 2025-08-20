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

    <div class="ws-tooltip__popper" ref="poperNode" v-if="isActive">
      <div>
        <slot name="content">
          {{ content }}
        </slot>
      </div>
    </div>
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
      trigger: 'hover'
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

  useClickOutside(tooltiprootNode, ()=>{
    if(props.trigger == 'click'){
      isActive.value=false;
    }
  });

  const onActiveChange = (e: boolean) =>{
    isActive.value = e;
    emits('update:modelValue', isActive.value);
    emits('change:modelValue', isActive.value);
  };

  const triggerHandler = (isLeave?: boolean) => {
    if(props.trigger == 'click'){
      onActiveChange(!isActive.value);
      console.log(props);
    }else if(props.trigger == 'hover') {
      onActiveChange(isLeave ? false : true);
    }
    // emits('visible-change', isActive.value);

  };

  // v - model
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

  function showhandler() {
    if(props.trigger == 'manaul') {
      onActiveChange(true); }
  }

  function hidehandler() {
    if(props.trigger == 'manaul') { onActiveChange(false); }

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
</style>
