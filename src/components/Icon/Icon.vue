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
    import { computed, watch, onMounted } from 'vue';
    import { loadIcon } from './iconLoader';

    defineOptions({
      name:"WsIcon",
      inheritAttrs: false  /// 阻止透传到root组件（i）
    });
    const props = defineProps<IconProps>();

    // 当icon属性变化时，按需加载图标
    watch(() => props.icon, (newIcon) => {
      if (newIcon) {
        loadIcon(newIcon);
      }
    }, { immediate: true });

    // 组件挂载时加载图标
    onMounted(() => {
      if (props.icon) {
        loadIcon(props.icon);
      }
    });

    const styleShell4ChageColor = computed(()=>{
      return props.color ? {color: props.color} : {};
    });

</script>

<style scoped>
</style>
