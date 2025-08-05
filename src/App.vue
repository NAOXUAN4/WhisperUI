<script setup lang="ts">
	import WsButton from './components/Button/Button.vue';
</script>

<template>
	<h1>PlayGround 😽</h1>
	<div class = "playground">
		<WsButton type="primary" disabled  plain >
			aa
		</WsButton>
	</div>


</template>

<style scoped>
	.playground{
    	padding: 2%;
    	border-radius: 15px; width: 90%; height: 400px;
    	background: linear-gradient(to right, #bfdfe2, #9decc6);
	}

</style>



