<template>
    <game-container>
        <button-group>
            <game-button @click="clear">Clear</game-button>
            <game-button @click="compute">Calculate</game-button>
            <game-button @click="showPage('story')">The Story</game-button>
            <game-button @click="showPage('disclaimer')">Disclaimer</game-button>
        </button-group>
        <game-main>
            <div class="col-span-7">
                <inputs v-bind:inputData="config.inputData" v-bind:username="username"></inputs>
            </div>
            <div class="col-span-5">
                <outputs v-bind:outputData="config.outputData"></outputs>
            </div>
        </game-main>
        <modal-page v-bind:pageData="dynamicModalPageComponent"></modal-page>
    </game-container>
</template>

<style>
body {
    background-color: #1a1a1a !important;
}

.text-gray-900 {
    color: #1a1a1a !important;
}

.io-body {
    background-color: #f2f2f2 !important;
}

.io-body > .border-4 {
    border-color: #1a1a1a !important;
}

input {
    background-color: #a1a1a1 !important;
    color: #1a1a1a !important;
    border-color: #4a4a4a !important;
}

.output-data {
//color: #0f4d0f !important;
}

button {
    background-color: #f2f2f2 !important;
    color: #4a4a4a !important;
    border-color: #a1a1a1 !important;
}

thead, thead .text-gray-500 {
    background-color: #4a4a4a !important;
    color: #f2f2f2 !important;
}

.output-data {
    color: #4a4a4a !important;
}
</style>

<script>
import GameMixin from "../Mixins/GameMixin.js";

import GameContainer from '../Components/Game/Container.vue';
import ButtonGroup from '../Components/Game/ButtonGroup.vue';
import GameButton from '../Components/Game/Button.vue';
import GameMain from '../Components/Game/Main.vue';
import Inputs from '../Components/Game/Inputs.vue';
import Outputs from '../Components/Game/Outputs.vue';
import ModalPage from '../Components/Game/ModalPage.vue';

export default {
	name: 'CaffeineSimulator',
	url: "a",
	mixins: [GameMixin],
	components: {
		GameContainer,
		ButtonGroup,
		GameButton,
		GameMain,
		Inputs,
		Outputs,
		ModalPage
	},
	data() {
		return {
			config: {
				inputData: [],
				graphData: [],
				outputData: [],
				pageData: [],
			},
			username: "",
			dynamicModalPageComponent: {
				"open": false,
			}
		}
	},
	created() {
		//We want to get the data for this game...
		const vm = this;
		vm.gameName = "bandwidth_calculator";
		vm.backendHost = "http://127.0.0.1:5678"
		vm.getConfig();
		while (!vm.username || vm.username === "") {
			vm.username = prompt('How will you be named?', 'Info Squirrel')
		}
	}
}
</script>