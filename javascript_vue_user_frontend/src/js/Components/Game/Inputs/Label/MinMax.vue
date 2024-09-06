<template>
    <i v-if="inputData.type === 'currency'">
        (between ${{ formatNumber_2(inputData.min) }} and ${{ formatNumber_2(inputData.max) }})
    </i>
    <i v-else-if="inputData.type === 'number'">
        (between {{ (inputData.min) }} and {{ (inputData.max) }})
    </i>
    <i v-else-if="inputData.type === 'percentage'">
        (between {{ formatNumber_2(inputData.min) }}% and {{ formatNumber_2(inputData.max) }}%)
    </i>
</template>

<script>
import InputMixin from "../../../../Mixins/InputMixin.js";

export default {
	mixins: [InputMixin],
	props: ["inputData"],
}
</script>