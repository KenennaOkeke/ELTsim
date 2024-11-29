<template>
    <select :id="'inputData_' + inputData.name"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option v-if="inputData.includeNullOption"></option>
        <option v-for="input in inputData.options" :key="input.display" :value="input.value">{{ input.display }}
        </option>
    </select>
</template>

<script>
export default {
	props: ["inputData"],
}
</script>