<template>
    <div class='ws-collapse-item'
    :class="{
        'is-disabled': disabled,
        'is-active': isActive
    }"
    >
        <div class="ws-collapse__header" :id="`collapse-item-header-${name}`" @click="handleItemClick">
            <!-- 具名插槽1 title -->
            <slot name="title">{{ title }}</slot>
            <div class="ws-collapse__icon">
              <WsIcon  icon="fa-solid fa-angle-down"/>
            </div>


        </div>

        <Transition name="slide"
        v-on="transitionEvents"
        >
        <div v-show="isActive">
          <div class="ws-collapse__content" :id="`collapse-item-content-${name}`" >
            <!-- 具名插槽2 content -->
            <slot name="content"/>
          </div>
        </div>

        </Transition>
    </div>
</template>


<script lang ='ts' setup>
    import type { CollapseItemProps, CollapseProviderType } from './type';
    import { CollapseProviderKey } from './type';
    import { computed, inject } from 'vue';

    import WsIcon  from '@/components/Icon/Icon.vue';

    const CollapseProvider: CollapseProviderType | undefined =  inject(CollapseProviderKey);

    const props = withDefaults(
        defineProps<CollapseItemProps>(),
        {
            disabled: false
        }
    );

    const isActive = computed(()=>{
        return CollapseProvider?.ItemActivateList.value.includes(props.name);
    });

    const handleItemClick = () =>{
        if(props.disabled){ return; }
        CollapseProvider?.handleItemClick(props.name);
    };

    defineOptions({
        name: "WsCollapseItem"
    });

    /// v-on 至 Transition
    const transitionEvents : Record<string, (el: HTMLElement) => void> = {
      'before-enter'(el){
        el.style.height = '0px';
      },
      'enter'(el){
        el.style.height = `${el.scrollHeight}px`;
      },
      'after-enter'(el){
        el.style.height = '';
      },
      'before-leave'(el){
        el.style.height = `${el.scrollHeight}px`;
      },
      'leave'(el){
        el.style.height = '0px';
      },
      'after-leave'(el){
        el.style.height = '';
      }
    };

</script>

<style scoped>
/* @import './style.scss'; */
</style>
