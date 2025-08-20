
# part.5 ToolTip
----

> 简单的提示气泡组件，支持 hover / click / manual 三种触发方式，使用 Popper.js 做定位。

#### 组件架构部分
1. 使用 `trigger` 属性控制交互模式：`hover`（鼠标移入显示）、`click`（点击切换显示）、`manual`（手动通过组件实例方法 `show`/`hide` 或 `v-model` 控制）。
2. 支持 `v-model`（即 `modelValue`）在父组件中受控显示。组件内部会通过 `emits('update:modelValue', value)` 同步。
3. 使用 `createPopper` 管理浮层定位，trigger 节点和 popper 节点分别通过 `ref` 引用。

#### types
```ts
export type TriggerType = 'hover' | 'click' | 'manual';

export interface ToolTipProps {
  content?: string; // 默认弹出内容
  placement?: string; // popper placement，'bottom' 默认
  trigger?: TriggerType;
  modelValue?: boolean;
}

export interface ToolTipInstance {
  show: () => void;
  hide: () => void;
}
```

#### 使用示例
```html
<template>
  <div>
    <!-- hover 示例（默认） -->
    <WsToolTip content="hover 提示">
      <button>Hover me</button>
    </WsToolTip>

    <!-- click 示例 -->
    <WsToolTip content="click 提示" trigger="click">
      <button>Click me</button>
    </WsToolTip>

    <!-- manual 示例：通过 ref 调用 show/hide 或使用 v-model -->
    <WsToolTip ref="tooltipRef" content="manual 提示" trigger="manual" v-model="showManual">
      <button @click="tooltipRef.show">打开</button>
    </WsToolTip>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ToolTipInstance } from './components/ToolTip/type';
const tooltipRef = ref<ToolTipInstance | null>(null);
const showManual = ref(false);
</script>
```

#### 交互/实现要点
1. hover 模式：trigger 节点绑定 `mouseenter` / `mouseleave`，同时 popper 节点也要监听 `mouseenter` / `mouseleave`，以保证从触发器移动到浮层时不会被意外关闭（使用 `relatedTarget` 判断）。
2. click 模式：触发节点 `click` 切换状态，组件应监听文档点击（或使用 `useClickOutside`）来判断点击外部并关闭浮层。
3. manual 模式：组件通过 `defineExpose` 暴露 `show` / `hide` 方法供父组件调用；同时也可以通过 `v-model` 控制。
4. 注意 `watch` `props.modelValue` 来同步内部状态 `isActive`，并在内部更新时 emit `update:modelValue` 保持父子一致。

#### 样式
1. 使用 `scoped` 样式限定 Tooltip 的样式，提供 `.ws-tooltip__popper` 的背景、边框、阴影和过渡效果。
2. 通过 `placement` 控制箭头方向和偏移。

