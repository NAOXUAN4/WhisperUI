<!-- Button @wisperUI - Nanyian2025 -->
<template>
    <button class='ws-button'
        :class = "{
            [`ws-button--${type}`]: type,
            [`ws-button--${size}`]: size,
            'is-plain': plain,
            'is-round': round,
            'is-cirle': cirle,
            'is-disabled': disabled,
        }"
        :disabled="disabled"
        :autofocus="autofocus"
        :type="nativetype"
    >
        <span><slot/></span>
    </button>
</template>

<script lang ='ts' setup>
    
    import type { ButtonProps } from './type';

    withDefaults(  //// 设置默认属性
        defineProps<ButtonProps>(),    /// 属性接口
        {
            nativetype: 'button',
        }
    )

    // @vue 3.3
    defineOptions({
        name: "WsButton",

    })
</script>

<style scoped>
</style>