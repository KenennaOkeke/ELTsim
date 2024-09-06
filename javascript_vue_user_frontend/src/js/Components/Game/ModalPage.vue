<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <TransitionRoot :show="pageData.open" as="template">
        <Dialog :open="pageData.open" as="div" class="fixed z-10 inset-0 overflow-y-auto" static
                @close="pageData.open = false">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                                 enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100"
                                 leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </TransitionChild>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span aria-hidden="true" class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300"
                                 enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                 enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                                 leave-from="opacity-100 translate-y-0 sm:scale-100"
                                 leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6">
                        <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                            <button class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    type="button"
                                    @click="pageData.open = false">
                                <span class="sr-only">Close</span>
                                <XIcon aria-hidden="true" class="h-6 w-6"/>
                            </button>
                        </div>
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                                    {{ pageData.title }}
                                </DialogTitle>
                                <div class="mt-2"><!--<span v-html="rawHtml"></span>-->
                                    <span v-html="pageData.content"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
import {Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {ExclamationIcon, XIcon} from '@heroicons/vue/outline'

export default {
	props: ['pageData'],
	watch: {
		pageData: {
			deep: true,
			handler: 'setup'
		}
	},
	components: {
		Dialog,
		DialogOverlay,
		DialogTitle,
		TransitionChild,
		TransitionRoot,
		ExclamationIcon,
		XIcon,
	},
	setup(props) {
		const open = props.pageData.open

		return {
			open,
		}
	},
}
</script>