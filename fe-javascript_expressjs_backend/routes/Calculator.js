const {config, calculate} = require('../controllers/CalculatorController')

module.exports = (app) => {
	app.get('/api/v1/bandwidth_calculator/config', config)
	app.post('/api/v1/bandwidth_calculator/compute', calculate)
}