const { Sequelize } = require("sequelize");
const  DataTypes = require("sequelize").DataTypes;
const config = require("../config");

const db = {}

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: 'postgres'
});

db['User'] = require('./User')(sequelize, DataTypes)
db['Faction'] = require('./Faction')(sequelize, DataTypes)
db['Squad'] = require('./Squad')(sequelize, DataTypes)

//TODO: remodel? test 1:1s, many:many, and one to many
//db['Squad'].belongsTo(db['Faction'])
//db['Faction'].hasMany(db['Squad'])
//db['User'].belongsToMany(db['Squad'], { through: 'UserSquad' });
//db['Squad'].belongsToMany(db['User'], { through: 'UserSquad' });
//db['User'].belongsToMany(db['Faction'], { through: 'UserFaction' });
//db['Faction'].belongsToMany(db['User'], { through: 'UserFaction' });

db['User'].belongsTo(db['Faction'])
db['Faction'].hasMany(db['User'])

db['User'].belongsTo(db['Squad'])
db['Squad'].belongsToMany(db['User'], { through: 'UserSquad' });

db['sequelize'] = sequelize

module.exports = db