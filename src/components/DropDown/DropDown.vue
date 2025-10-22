<template>
  <div class="ws-dropdown">
    <div v-for="item in props.DropDownMenuOptions" :key="item.key"
    class="ws-dropdown-item"
    :class="{
      'is-disabled': item.disabled,
      'is-divided' : item.divided
    }"
    >
      {{ item.label }}
    </div>
  </div>
</template>


<script lang ='ts' setup>
import type { DropDownEmits, DropDownInstance, DropDownProps  } from './type';

const props = withDefaults(
  defineProps<DropDownProps>(),
  {}
);





</script>

<style scoped>
    @import './style.scss';
</style>
