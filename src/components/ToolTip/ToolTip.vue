<template>
  <div class='ws-tooltip'
    @mouseenter="props.trigger == 'hover' ? triggerHandler(false) : null"
    @mouseleave="props.trigger == 'hover' ? triggerHandler(true) : null"
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
  import { ref,watch } from 'vue';
  import { type ToolTipProps, type ToolTipEmits } from './type';
  import { createPopper, type Instance } from '@popperjs/core';


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

  const emits = defineEmits<ToolTipEmits>();
  const isActive = ref(props.modelValue ?? false);
  let poperInstance: Instance | null = null;

  const poperNode = ref<HTMLElement>();
  const triggerNode = ref<HTMLElement>();

  const triggerHandler = (isLeave?: boolean) => {
    if(props.trigger == 'click'){
      isActive.value = !isActive.value;
      console.log(props);

    }else if(props.trigger == 'hover') {
      isActive.value = isLeave ? false : true;

    }
    // emits('visible-change', isActive.value);
    emits('update:modelValue', isActive.value);
    emits('change:modelValue', isActive.value);


  };

  // v - model
  watch(()=>props.modelValue, (newValue)=>{
    isActive.value = newValue;
  });

  watch(isActive,(newValue)=>{
    if (triggerNode.value && poperNode.value && newValue) {
      poperInstance = createPopper(triggerNode.value, poperNode.value,{
        placement: props.placement
      });

    }else{
      poperInstance?.destroy();
    }

  },{ flush: 'post'});
</script>

<style scoped>
</style>
