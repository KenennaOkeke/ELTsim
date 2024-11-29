const { authorized } = require('../middleware/AuthMiddleware')
const {updateSettings} = require('../controllers/FactionController')

module.exports = (app) => {
  app.patch('/api/v1/faction/settings', authorized, updateSettings)
}