<template>
  <div class='ws-message'
  role="alert"
  :class="{
    [`ws-message--${type}`]: type,
    'is-close': showClose
  }"
  v-show="visible"
  >
  <div class="ws-message__content">
    <slot>
      <RenderVnode :v-node="message"/>
    </slot>
  </div>


  <div class="ws-message__close" v-if="showClose">
    <WsIcon icon="fa-solid fa-xmark" />
  </div>

  </div>
</template>


<script lang ='ts' setup>
import type { MessageProps } from "./type";
import WsIcon  from '@/components/Icon/Icon.vue';
import { onMounted, ref } from "vue";

const visible = ref(false);

function startTimer() {
  setTimeout(()=>{
    visible.value = false;
  }, props.duration);
}

defineOptions({
  name: 'WsMessage'
});

const props = withDefaults(defineProps<MessageProps>(), {
  duration: 1000,
  type: 'info'
});


onMounted(() => {
  visible.value = true;
  startTimer();
});

</script>

<style scoped>
  @import './style.scss';
</style>
