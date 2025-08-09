

<template>
	<!-- <h1>PlayGround 😽</h1> -->
	<div class = "playground">
		<h2>Part.1 Button</h2>
		<div class="pg-container">
			<div style="display: flex; flex-direction: row; margin-top: 5px;">
				<div v-for="item in <ButtonType[]>['primary', 'error', 'warning', 'success', 'info']" style="margin: 2px;" :key="item">
					<WsButton :type=item>
						{{ item }}
					</WsButton>
				</div>
			</div>

			<div style="display: flex; flex-direction: row; margin-top: 5px;">
				<div v-for="item in <ButtonType[]>['primary', 'error', 'warning', 'success', 'info']" style="margin: 2px;" :key="item">
					<WsButton :type=item plain>
						{{ item }}
					</WsButton>
				</div>
			</div>

			<div style="display: flex; flex-direction: row; margin-top: 5px;">
				<div v-for="item in <ButtonType[]>['primary', 'error', 'warning', 'success', 'info']" style="margin: 2px;" :key="item">
					<WsButton :type=item disabled>
						{{ item }}
					</WsButton>
				</div>
			</div>
		</div>
		<hr>
		<h2>Part.2 Collapse</h2>
		<div class="pg-container">
			<WsCollapse  v-model="startCollpase.list" style="width:30%; font-family: 'Times New Roman', Times, serif;">
				<WsCollapseItem name="1" title="Item-1">
					<template #content>
						<ul>
							<li>1</li>
							<li>2</li>
							<li>3</li>
							<li>4</li>

						</ul>
					</template>
				</WsCollapseItem>

				<WsCollapseItem name="4" title="Item-2">

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
						<h3>Item-3</h3>
					</template>

					<template #content>
            <h4>LineTitle</h4>
            <p>slot List 1</p>
						<ul>
							<p>slot List 1</p>
							<li>你好！</li>
							<li>nihaoma！</li>
							<li>4</li>

						</ul>
					</template>
				</WsCollapseItem>

				<WsCollapseItem name="3">
					<template #title>
						<h3>Item-4</h3>
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

		// setTimeout(()=>{
		// 	startCollpase.list = ['4'];
		// 	console.log(startCollpase.list);

		// },1000);
	});

</script>


<style scoped>
	.playground{
    padding: 2%;
    border-radius: 15px; width: 90%; height: 800px;
    background: linear-gradient(to right, #ffffff , #5255ba 30%, #ffffff 70%);
		display: flex;
		flex-direction: column;

		h2,h3 {
			color: rgb(0, 0, 0);
      font-family: 'Times New Roman', Times, serif;
		}

		.pg-container{
			margin-top: 2%;
			/* color: aliceblue; */
		}
	}


</style>



