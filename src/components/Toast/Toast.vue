<template>
  <Teleport to="body">
    <div class='ws-toast'
    :class="{
      [`ws-toast--${type}`] : type,
      'is-active': isActive
    }">
    <div class="ws-toast__icon" v-if="icon"><WsIcon :icon="icon" :type="type"/></div>
    <span v-if="context">
      {{ context }}
    </span>
    <span v-else>
      <slot/>
    </span>
    <!-- closeIcon -->
    <span class="ws-toast__close" v-if="closable" @click="closeHandler"><WsIcon icon="fa-regular fa-circle-xmark" :type="type"/></span>
    </div>
  </Teleport>
</template>


<script lang ='ts' setup>
  import {ref, watch} from 'vue';
  import { type ToastProps, type ToastEmits  } from './type.ts';
  import WsIcon from '@/components/Icon/Icon.vue';

  const props = withDefaults(
    defineProps<ToastProps>(),
    {
      closable:false,
      disapper: 2500
    }
  );
  const isActive = ref(props.modelValue);


  defineOptions({
    name: 'WsToast'
  });

  const emit = defineEmits<ToastEmits>();

  const closeHandler = function(){
    isActive.value = false;
    emit('update:modelValue', isActive.value);
    emit('change:modelValue', isActive.value);
    console.log(isActive.value);
  };


  watch(()=>props.modelValue, ()=>{
    return isActive.value  = props.modelValue;
  });

  watch(()=>isActive.value, ()=>{
    if(isActive.value){
      setTimeout(()=>{
        closeHandler();
      },props.disapper);
    }
  });

</script>

<style scoped>
    .container {
      text-align: center;
      background: linear-gradient(135deg, #06f5b5, rgb(247, 9, 255));
      color: antiquewhite;
    }
</style>
