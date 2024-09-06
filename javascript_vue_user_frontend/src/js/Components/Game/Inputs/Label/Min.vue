<template>
    <i v-if="inputData.type === 'currency'">
        (greater or equal to ${{ formatNumber_2(inputData.min) }})
    </i>
    <i v-else-if="inputData.type === 'number'">
        (greater or equal to {{ (inputData.min) }})
    </i>
    <i v-else-if="inputData.type === 'percentage'">
        (greater or equal to {{ formatNumber_2(inputData.min) }}%)
    </i>
</template>

<script>
import InputMixin from "../../../../Mixins/InputMixin.js";

export default {
	mixins: [InputMixin],
	props: ["inputData"],
}
</script>