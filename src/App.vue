

<template>
	<!-- <h1>PlayGround 😽</h1> -->
	<div class = "playground">
		<h2>Part.1 Button</h2>

		<div class="pg-container">

      <div style="display: flex; flex-direction: row; margin-top: 5px; gap: 4px;">
					<WsButton @click = "handlebtAToast">
						default
					</WsButton>
          <WsButton plain @click = "handlebtAToast">
						plain
					</WsButton>
          <WsButton icon="fa-lemon fa-regular" @click = "handlebtAToast">
						icon button
					</WsButton>
          <WsButton circle @click = "handlebtAToast">
						circle
					</WsButton>
          <WsButton round>
						round
					</WsButton>
			</div>

			<div style="display: flex; flex-direction: row; margin-top: 5px;">
				<div v-for="item in <ButtonType[]>['primary', 'error', 'warning', 'success', 'info']" style="margin: 2px;" :key="item">
					<WsButton :type=item @click = "handlebtAToast(item)">
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

    <hr>
    <h2>part.3 Icons</h2>
    <div class="pg-container">
      <div>
        <p>regular</p>
        <WsIcon icon="fa-lemon fa-regular" size="2x"/>
        <WsIcon icon="fa-lemon fa-regular" type="primary" size="2x"/>
        <WsIcon icon="fa-lemon fa-regular" type="error" size="2x"/>
        <WsIcon icon="fa-lemon fa-regular" type="warning" size="2x"/>
        <WsIcon icon="fa-lemon fa-regular" type="info" size="2x"/>
      </div>
      <div>
        <p>solid</p>
        <WsIcon icon="fa-lemon fa-solid" size="2x"/>
        <WsIcon icon="fa-lemon fa-solid" type="primary" size="2x"/>
        <WsIcon icon="fa-lemon fa-solid" type="error" size="2x"/>
        <WsIcon icon="fa-lemon fa-solid" type="warning" size="2x"/>
        <WsIcon icon="fa-lemon fa-solid" type="info" size="2x"/>
      </div>

      <div>
        <p>Custom</p>
        <WsIcon icon="fa-lemon fa-solid" size="2x" color="#f3f421"/>
        <WsIcon icon="fa-lemon fa-regular" size="3x"/>
      </div>
    </div>

    <hr>
    <h2>part.4 Toast</h2>
    <div class="pg-container">
      <div style="height: 100px; width: 100px;"><WsButton @click = "handlebtAToast">AwakeToast</WsButton></div>
      <WsToast context="this is Toast" closable icon="fa-regular fa-calendar-check" :type="Toasttype" v-model="isToastActive"/>
    </div>

    <hr>
    <h2>part.5 ToolTips</h2>
    <div class="pg-container">
      <WsToolTip content="tooltip1" trigger="click" v-model="TooltipVmodel">
        <WsIcon icon="fas fa-lemon"/>
      </WsToolTip>
    </div>


	</div>
</template>

<script setup lang="ts">
	import { onMounted, reactive, ref } from 'vue';
	import WsButton from './components/Button/Button.vue';
	import WsCollapse from './components/Collapse/Collapse.vue';
	import WsCollapseItem from './components/Collapse/CollapseItem.vue';
  import WsIcon from './components/Icon/Icon.vue';
	import type { ButtonInstance, ButtonType } from './components/Button/type';
	import type { ToastType } from './components/Toast/type';
  import WsToast from './components/Toast/Toast.vue';
  import WsToolTip from "./components/ToolTip/ToolTip.vue";


	const ButtonDom = ref<ButtonInstance>();
	const startCollpase = reactive({list:['2']});
  const isToastActive = ref(false);
  const Toasttype = ref<ToastType>();
  const TooltipVmodel = ref(true);

  const handlebtAToast = (type: ToastType) => {
    Toasttype.value = type;
    isToastActive.value = true;
  };

	onMounted(()=>{
		console.log(ButtonDom.value?.ref);
    setTimeout(()=>{
      TooltipVmodel.value = false;
    },2000);
	});

</script>


<style scoped>
	.playground{
    padding: 2%;
    border-radius: 15px; width: 90%; height: 1800px;
    background: linear-gradient(to right, #dedfe3 60%, #47867b 30%, #ffffff);
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



