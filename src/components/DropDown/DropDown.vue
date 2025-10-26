<template>
  <div class="ws-dropdown" >
    <WsToolTip
    :change-delay="props.changeDelay"
    :v-model="props.modelValue"
    :placement="props.placement"
    :changedelay="props.changeDelay"
    ref="DpToolTipRef"
    :popper-options="props.popperOptions"
    :trigger="props.trigger"
    >
      <slot>DropDownTriggerSlot</slot>
      <template #content>
        <ul class="ws-dropdown__menu">
          <template v-for="item in props.DropDownMenuOptions" :key="item.key">
            <li v-if="item.divided"
            role="separator"
            class="item-separator"
            >
            </li>

            <li class="ws-dropdown-item"
            :class="{
              'is-disabled': item.disabled,
              'is-divided': item.divided,
              }"
            :id="`dropdown-item-${item.key}`"
            @click="dropDownItemClickHandler(item)"
            >
              <RenderVnode :v-node="item.label"/>
            </li>

          </template>
        </ul>

      </template>

    </WsToolTip>

  </div>
</template>


<script lang ='ts' setup>
import type { DropDownEmits, DropDownInstance, DropDownProps, DropDownOptionsKey, MenuOptions} from './type';
import WsToolTip from '../ToolTip/ToolTip.vue';
import { ref } from 'vue';
import RenderVnode from '../Common/RenderVnode';
import type { ToolTipInstance } from '../ToolTip/type';


const emits = defineEmits<DropDownEmits>();

defineOptions({
    name:"WsDropDown"
});

const props = withDefaults(
  defineProps<DropDownProps>(),
  {
    placement: 'bottom',
    changeDelay: 50
  }
);

/**
 * Emit 选中项， 组件仅处理选择逻辑，后续根据key调用回调在 上层封装 操作
 * @param e
 */
const dropDownItemClickHandler = (e : MenuOptions) => {
  if(e.disabled) return;

  const ekey : DropDownOptionsKey = e.key;
  // console.log(ekey);
  emits('update:select', ekey);
  console.log(e);
};


/**
 * 继承ToolTipInstance， 通过ref控制函数 例： DropDown.value.show(), 但是触发模式必须为 manual
 */
const DpToolTipRef = ref<ToolTipInstance | null>(null);
defineExpose<DropDownInstance>({
    'show': () => {
      console.log(props.trigger);
      return DpToolTipRef.value?.show();
    },
    'hide': () => DpToolTipRef.value?.hide()
  });

</script>

<style scoped>
    @import './style.scss';
</style>
