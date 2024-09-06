import {createApp, h} from 'vue'
import {createInertiaApp} from '@inertiajs/inertia-vue3'
import '../css/app.css';

createInertiaApp({
	initialPage: {
		component: 'BandwidthCalculator',
		props: {},
		url: window.location.pathname, // Use the current pathname
		version: null,
	},
	resolve: name => import(`./Pages/${name}.vue`),
	setup({el, app, props, plugin}) {
		createApp({render: () => h(app, props)})
			.use(plugin)
			.mount(el)
	},
})