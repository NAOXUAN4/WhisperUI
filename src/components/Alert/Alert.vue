<template>
  <div class='ws-alert'
  :class="{
    [`ws-alert--${type}`] : type,
  }">
  is: {{  isActive }}
  <span v-if="icon"><WsIcon :icon="icon"/></span>
  <span v-if="context">
    {{ context }}
  </span>
  <span v-else>
    <slot/>
  </span>
  <!-- closeIcon -->
  <span v-if="closable" @click="closeHandler"><WsIcon icon="fa-regular fa-circle-xmark"/></span>
  </div>
</template>


<script lang ='ts' setup>
  import {ref, watch} from 'vue';
  import { type AlertProps, type AlertEmits  } from './type.ts';
  import WsIcon from '@/components/Icon/Icon.vue';

  const props = withDefaults(
    defineProps<AlertProps>(),
    {
      closable:false
    }
  );
  const isActive = ref(props.modelValue);


  defineOptions({
    name: 'WsAlert'
  });

  const emit = defineEmits<AlertEmits>();

  const closeHandler = function(){
    isActive.value = false;
    emit('update:modelValue', isActive.value);
    emit('change:modelValue', isActive.value);
    console.log(isActive.value);
  };


  watch(()=>props.modelValue, ()=>{
    return isActive.value  = props.modelValue;
  });

</script>

<style scoped>
    .container {
      text-align: center;
      background: linear-gradient(135deg, #06f5b5, rgb(247, 9, 255));
      color: antiquewhite;
    }
</style>
