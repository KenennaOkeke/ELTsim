<template>
    <span :id="'inputDataLabel_' + inputData.name">
        <span>{{ inputData.label }} <i v-if="inputData.hasOwnProperty('subLabel')">{{ inputData.subLabel }}</i></span>
        <span v-if="inputData.hasOwnProperty('min') && inputData.hasOwnProperty('max')"><label-min-max
                v-bind:inputData="inputData"></label-min-max></span>
        <span v-else-if="inputData.hasOwnProperty('min')"> Greater or equal to</span>
        <span v-else-if="inputData.hasOwnProperty('max')"> Less or equal to</span>
    </span>
</template>

<script>
import LabelMinMax from './Label/MinMax.vue';

export default {
	components: {
		LabelMinMax,
	},
	props: ["inputData"],
}
</script>