<!-- Button @wisperUI - Nanyian2025 -->
<template>
    <button class='wr-button'
        :class = "{
            [`wr-button--${type}`]: type,
            [`wr-button--${size}`]: size,
            'is-plain': plain,
            'is-round': round,
            'disable': disabled,
        }"
        :disabled="disabled"
    >
        <span><slot/></span>
    </button>
</template>


<script lang ='ts' setup>
    // import { ref } from 'vue'
    import type { ButtonProps } from './type';

    defineProps<ButtonProps>();    /// 属性接口
    
</script>

<style scoped>
</style>