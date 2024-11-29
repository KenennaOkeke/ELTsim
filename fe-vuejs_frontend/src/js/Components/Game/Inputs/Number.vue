<template>
    <div class="mt-1 relative rounded-md shadow-sm">
        <input :id="'inputData_' + inputData.name" :max="inputData.max" :min="inputData.min"
               :placeholder="inputData.placeholder"
               :value="inputData.default" aria-describedby=""
               class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
               type="number"/>
    </div>
</template>

<script>
export default {
	props: ["inputData"],
}
</script>