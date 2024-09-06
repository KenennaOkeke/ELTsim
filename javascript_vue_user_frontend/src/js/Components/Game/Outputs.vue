<template>
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider game-outputs-title"
                colspan="2"
                scope="col">
                Outcomes
            </th>
        </tr>
        </thead>
        <tbody>
        <template v-for="output in outputData.outputs" :key="output.name">
            <tr>
                <template v-if="output.showSingleValue === true">
                    <td :id="'outputData_' + output.name + '_0'"
                        :class="'outputData_' + output.name" :colspan="output.colspan"
                        :t="output.type"
                        class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-right output-data">
                        {{ output.value }}
                    </td>
                </template>
                <template v-else>
                    <td :class="'outputData_' + output.name"
                        class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                        <span v-if="output.subItem1" class="pl-4"></span>{{ output.label }}
                    </td>
                    <template v-if="(output.valueCount)">
                        <template v-for="n in output.valueCount" v-bind:key="n - 1">
                            <td :id="'outputData_' + output.name + '_' + (n - 1)"
                                :class="'outputData_' + output.name" :t="output.type"
                                class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-right output-data">
                                <template v-if="output.value">{{ output.value[n - 1] }}</template>
                            </td>
                        </template>
                    </template>
                    <td v-else-if="!Array.isArray(output.value)"
                        :id="'outputData_' + output.name + '_0'"
                        :class="'outputData_' + output.name" :t="output.type"
                        class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-right output-data">
                        {{ output.value }}
                    </td>
                </template>
            </tr>
            <tr v-if="output.spacingAfter" style="border:0;">
                <td class="h-6" colspan="2"></td>
            </tr>
        </template>
        </tbody>
    </table>
</template>

<script>
import InputCurrency from './Inputs/Currency.vue';
import InputSelect from './Inputs/Select.vue';

export default {
	components: {
		InputCurrency,
		InputSelect,
	},
	props: ["outputData"],
}
</script>