<template>
    <div class='ws-collapse'
        :class = "{
            'is-accordion': accordion
        }"
    >
        <slot/>
    </div>
</template>


<script lang ='ts' setup>
    import type { CollapseEmits, CollapseItemNameType, CollapseProps, CollapseProviderType } from './type';
    import { CollapseProviderKey } from './type';
    import { ref, provide, watch } from 'vue';

    const props = withDefaults(
        defineProps<CollapseProps>(), /// 引入属性
        {
            accordion: false
        }
    );

    const emits = defineEmits<CollapseEmits>();
    const ItemActivateList = ref<CollapseItemNameType[]>(props.modelValue ?? []);  ////管理 已激活的item 名称
    const handleItemClick = (item: CollapseItemNameType) => {
        // console.log(ItemActivateList.value);

        /// 手风琴模式
        if(props.accordion && ItemActivateList.value.length>0){
            if(ItemActivateList.value.indexOf(item)>-1){
                ItemActivateList.value = [];
            }else{
                ItemActivateList.value = [];
                ItemActivateList.value.push(item);
            }

            emits('update:modelValue', ItemActivateList.value);
            emits('change:modelValue', ItemActivateList.value);
            return;
        }

        const index = ItemActivateList.value.indexOf(item);
        /// 默认模式
        if(index > -1){
            // 如果该标签存在(已激活状态)
            ItemActivateList.value.splice(index, 1);  // 开始位置， 个数
        }else{
            //如果该标签未激活
            ItemActivateList.value.push(item);
        }

        emits('update:modelValue', ItemActivateList.value);
        emits('change:modelValue', ItemActivateList.value);
    };

    /// 实现v-model 后续改变
    watch(() => props.modelValue, ()=>{
        ItemActivateList.value = props.modelValue ?? [];
    });


    /// 创建透传加入 bus 🐕
    provide(CollapseProviderKey, <CollapseProviderType>({
        handleItemClick: handleItemClick,
        ItemActivateList: ItemActivateList
    }));

    defineOptions({
        name: 'WsCollapse',
    });

    // defineExpose({

    // })

</script>
<style scoped>
</style>
