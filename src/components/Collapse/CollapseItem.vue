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
        </div>
        <div class="ws-collapse__content" :id="`collapse-item-content-${name}`" v-show="isActive">
            <!-- 具名插槽2 content -->
            <slot name="content"/>
        </div>
    </div>
</template>


<script lang ='ts' setup>
    import type { CollapseItemProps, CollapseProviderType } from './type';
    import { CollapseProviderKey } from './type'; 
    import { computed, inject } from 'vue';

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
    }

    defineOptions({
        name: "WsCollapseItem"
    })




</script>

<style scoped>
@import './style.scss';


</style>