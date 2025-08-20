

# part.3 Toast
----

> 用于短时提示信息，支持图标、可关闭和受控/非受控两种使用方式

#### 组件架构部分
1. 单一根节点，并支持通过 `v-model` 进行显示控制（受控）。
2. 支持暴露事件：`update:modelValue`（v-model 双向绑定）、`change:modelValue`（同步事件）。
3. 支持 `closable` 属性显示关闭按钮，支持 `icon` 插槽或 `icon` 字符串属性用于自定义图标。

#### types
```ts
export type ToastType = 'success' | 'warning' | 'error' | 'info' | undefined;

export interface ToastProps {
	context?: string; // 提示文本
	type?: ToastType; // 提示风格
	icon?: string; // icon class 名或标识
	closable?: boolean; // 是否显示关闭按钮
	modelValue?: boolean; // v-model 控制显示
}

export interface ToastInstance {
	// 如组件定义了 defineExpose 可在父组件通过 ref 调用
}
```


#### 使用示例
```html
<template>
	<WsToast
		v-model="isToastActive"
		context="操作成功"
		:type="'success'"
		icon="fa-regular fa-calendar-check"
		closable
	/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const isToastActive = ref(true);
</script>
```

#### 交互/实现要点
1. 当 `v-model`（`modelValue`）改变时，组件应同步显示/隐藏。
2. 点击关闭时触发 `update:modelValue` 并把值置为 `false`。
3. 提供 `icon` 属性时优先显示 icon，否则可在默认 slot 中自定义。

#### 样式
1. 使用组件级样式变量控制背景色、字体色、图标大小等。
2. 根据 `type` 改变背景与图标颜色（success/ warning / error / info）。


