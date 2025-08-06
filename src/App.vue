<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import WsButton from './components/Button/Button.vue';
	import type { ButtonInstance } from './components/Button/type';
	const ButtonDom = ref<ButtonInstance>();

	onMounted(()=>{
		console.log(ButtonDom.value?.ref);
	})

</script>

<template>
	<h1>PlayGround 😽</h1>
	<div class = "playground">
		<WsButton type="primary"  plain ref="ButtonDom">
			button slot
		</WsButton>
	</div>
</template>

<style scoped>
	.playground{
    	padding: 2%;
    	border-radius: 15px; width: 90%; height: 400px;
    	background: linear-gradient(to right, #bfdfe2, #9decc6);
	}

	.ws-button{
		background-color: lightcoral;
	}
	

</style>



