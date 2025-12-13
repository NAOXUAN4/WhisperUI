<!-- Button @wisperUI - Nanyian2025 -->
<template>
    <button class='ws-button'
        ref="_ref"
        :class = "{
            [`ws-button--${type}`]: type,
            [`ws-button--${size}`]: size,
            'is-plain': plain,
            'is-round': round,
            'is-circle': circle,
            'is-disabled': disabled,
            'icon': icon
        }"
        :disabled="disabled"
        :autofocus="autofocus"
        :type="nativetype"
        @click="handleClick"
    >
        <span v-if="icon">
          <WsIcon :icon="icon" />
        </span>
        <span><slot/></span>
    </button>
</template>

<script lang ='ts' setup>
    import { ref } from 'vue';
    import type { ButtonProps } from './type';
    import WsIcon from '../Icon/Icon.vue';

    const props = withDefaults(  //// 设置默认属性
        defineProps<ButtonProps>(),    /// 属性接口
        {
            nativetype: 'button',
        }
    );

    const emit = defineEmits<{
      click: [event: MouseEvent]
    }>();

    // @vue 3.3
    defineOptions({
        name: "WsButton",
    });

    /// 将模板绑定_ref，使得可以通过绑定组件实例的 ref 来 与_ref 关联，从而拿到模板的dom
    const _ref = ref<HTMLButtonElement>();
    defineExpose({
        ref: _ref
    });

    const handleClick = (event: MouseEvent) => {
      emit('click', event);
    };
</script>


<style scoped>
    @import './style.scss';
</style>
