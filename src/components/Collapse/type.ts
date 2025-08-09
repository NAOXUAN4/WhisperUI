
import type { Ref, InjectionKey } from 'vue';

export type CollapseItemNameType = string | null;

/// item名称, 标题,
/// 内容用 slot
export interface CollapseItemProps{
    name: CollapseItemNameType,
    title?: string,
    disabled?: boolean
}

/// 默认打开状态, 是否手风琴模式
export interface CollapseProps{
    modelValue?: CollapseItemNameType[],
    accordion?: boolean
}

///emit
// export interface CollapseEmit{
//     updateModelValue: (e: 'update:modelValue', v: CollapseItemNameType[]) => void,
//     changeModelValue: (e: 'change:modelValue', v: CollapseItemNameType[]) => void
// }

export interface CollapseEmits {
    (e: 'update:modelValue', value: CollapseItemNameType[]): void;
    (e: 'change:modelValue', value: CollapseItemNameType[]): void;
}


/// 创建 provide/inject 来使得父组件信息透传到slot中的子组件上。
export interface CollapseProviderType{
    ItemActivateList: Ref<CollapseItemNameType[]>,
    handleItemClick: (item: CollapseItemNameType) => void;
}

/// 创建一个透传的全局Key type:
export const CollapseProviderKey = Symbol('collapseItemProvider') as InjectionKey<CollapseProviderType>;


