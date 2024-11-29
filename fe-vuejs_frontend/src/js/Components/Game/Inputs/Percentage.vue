<template>
    <div class="mt-1 relative rounded-md shadow-sm">
        <input :id="'inputData_' + inputData.name" :max="inputData.max" :min="inputData.min"
               :placeholder="inputData.placeholder"
               aria-describedby=""
               class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
               type="number"/>
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">
                  %
                </span>
        </div>
    </div>
</template>

<script>
export default {
	props: ["inputData"],
}
</script>