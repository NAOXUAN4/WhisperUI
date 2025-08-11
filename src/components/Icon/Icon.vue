<template>
  <i class="ws-icon"
  :class="{
    [`ws-icon--${type}`] : type,
  }" :style="styleShell4ChageColor">
    <font-awesome-icon v-bind="$props"/>
  </i>
</template>


<script lang ='ts' setup>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import type { IconProps } from './type';
    import { computed } from 'vue';

    defineOptions({
      name:"WsIcon",
      inheritAttrs: false  /// 阻止透传到root组件（i）
    });
    const props = defineProps<IconProps>();


    const styleShell4ChageColor = computed(()=>{
      return props.color ? {color: props.color} : {};
    });

</script>

<style scoped>
</style>
