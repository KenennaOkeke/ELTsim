const {updateSettings} = require('../services/AccountService')

const controller = {}

controller.updateSettings = async (req, res, next) => {
  const {name} = req.body
  try {
    if(name !== undefined) {
      const response = await updateSettings(req.user.id, name)
      res.send(response)
    } else {
      res.status(400).send()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = controller