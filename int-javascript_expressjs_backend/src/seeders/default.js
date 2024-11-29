const db = require('../models')

async function seed() {
  await db['User'].sync({ force: true })
  await db['Faction'].sync({ force: true })
  await db['Squad'].sync({ force: true })
  await db['sequelize'].sync({force: true})
}

seed()