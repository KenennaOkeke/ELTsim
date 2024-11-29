<template>
    <i v-if="inputData.type === 'currency'">
        (less or equal to ${{ formatNumber_2(inputData.max) }})
    </i>
    <i v-else-if="inputData.type === 'number'">
        (less or equal to {{ (inputData.max) }})
    </i>
    <i v-else-if="inputData.type === 'percentage'">
        (less or equal to {{ formatNumber_2(inputData.max) }}%)
    </i>
</template>

<script>
import InputMixin from "../../../../Mixins/InputMixin.js";

export default {
	mixins: [InputMixin],
	props: ["inputData"],
}
</script>