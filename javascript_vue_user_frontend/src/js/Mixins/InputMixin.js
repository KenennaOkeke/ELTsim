import numeral from 'numeral'

export default {
	methods: {
		formatNumber_2(value) {
			return numeral(value).format('0,0.00');
		}
	}
};