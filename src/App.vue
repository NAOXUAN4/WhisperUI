<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import WsButton from './components/Button/Button.vue';
	import type { ButtonInstance, ButtonType } from './components/Button/type';
	const ButtonDom = ref<ButtonInstance>();

	onMounted(()=>{
		console.log(ButtonDom.value?.ref);
	})

</script>

<template>
	<h1>PlayGround 😽</h1>
	<div class = "playground">
		<div v-for="item in <ButtonType[]>['primary', 'error', 'warning', 'success', 'info']" style="margin: 2px;">
			<WsButton :type=item>
				{{ item }}
			</WsButton>
		</div>
		<!-- <WsButton type="primary" ref="ButtonDom">
			Primary
		</WsButton> -->
	</div>
</template>

<style scoped>
	.playground{
    	padding: 2%;
    	border-radius: 15px; width: 90%; height: 400px;
    	background: linear-gradient(to right, #214447, #000000);
		display: flex;
		flex-direction: row;
	}
	

</style>



