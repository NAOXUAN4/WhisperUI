

<template>
	<!-- <h1>PlayGround 😽</h1> -->
	<div class = "playground">
		<h2>Part.1 Button</h2>
		<div class="pg-container">
			<div style="display: flex; flex-direction: row; margin-top: 5px;">
				<div v-for="item in <ButtonType[]>['primary', 'error', 'warning', 'success', 'info']" style="margin: 2px;">
					<WsButton :type=item>
						{{ item }}
					</WsButton>
				</div>
			</div>

			<div style="display: flex; flex-direction: row; margin-top: 5px;">
				<div v-for="item in <ButtonType[]>['primary', 'error', 'warning', 'success', 'info']" style="margin: 2px;">
					<WsButton :type=item plain>
						{{ item }}
					</WsButton>
				</div>
			</div>

			<div style="display: flex; flex-direction: row; margin-top: 5px;">
				<div v-for="item in <ButtonType[]>['primary', 'error', 'warning', 'success', 'info']" style="margin: 2px;">
					<WsButton :type=item disabled>
						{{ item }}
					</WsButton>
				</div>
			</div>
		</div>
		<hr>
		<h2>Part.2 Collapse</h2>
		<div class="pg-container">
			<WsCollapse accordion v-model="startCollpase.list">
				<WsCollapseItem name="1">
					<template #title>
						<h2 style="cursor: alias;">aaa</h2>
					</template>

					<template #content>
						<ul>
							<li>1</li>
							<li>2</li>
							<li>3</li>
							<li>4</li>

						</ul>
					</template>
				</WsCollapseItem>

				<WsCollapseItem name="4">
					<template #title>
						<h3>title</h3>
					</template>

					<template #content>
						<ul>
							<li>1</li>
							<li>2</li>
							<li>3</li>
							<li>4</li>

						</ul>
					</template>
				</WsCollapseItem>

				<WsCollapseItem name="2">
					<template #title>
						<h3>title</h3>
					</template>

					<template #content>
						<ul>
							<li>1</li>
							<li>2</li>
							<li>3</li>
							<li>4</li>

						</ul>
					</template>
				</WsCollapseItem>

				<WsCollapseItem name="3">
					<template #title>
						<h3>title</h3>
					</template>

					<template #content>
						<ul>
							<li>1</li>
							<li>2</li>
							<li>3</li>
							<li>4</li>

						</ul>
					</template>
				</WsCollapseItem>

			</WsCollapse>
		</div>
	</div>
</template>


<script setup lang="ts">
	import { onMounted, reactive, ref } from 'vue';
	import WsButton from './components/Button/Button.vue';
	import WsCollapse from './components/Collapse/Collapse.vue';
	import WsCollapseItem from './components/Collapse/CollapseItem.vue';
	import type { ButtonInstance, ButtonType } from './components/Button/type';
	const ButtonDom = ref<ButtonInstance>();
	const startCollpase = reactive({list:['1','2','3']});

	onMounted(()=>{
		console.log(ButtonDom.value?.ref);

		setTimeout(()=>{
			startCollpase.list = ['4'];
			console.log(startCollpase.list);
			
		},1000)
	})

</script>















<style scoped>
	.playground{
    	padding: 2%;
    	border-radius: 15px; width: 90%; height: 800px;
    	background: linear-gradient(to right, #d9e8ea, #bdd9c9);
		display: flex;
		flex-direction: column;

		h2{
			color: rgb(136, 171, 202);
		}

		.pg-container{
			margin-top: 2%;
			/* color: aliceblue; */
		}
	}
	

</style>



