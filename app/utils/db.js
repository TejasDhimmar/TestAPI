const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.database, process.env.dbusername, process.env.dbpassword, {
    host: process.env.host,
    dialect: process.env.dialect,
    pool: {
        max: process.env.pool.max,
        min: process.env.pool.min,
        acquire: process.env.pool.acquire,
        idle: process.env.pool.idle
    },
    dialectOptions: JSON.parse(process.env.dialectOptions),
    timezone: process.env.timezone,
    logging: true
});

const db = {};

db.sequelize = sequelize;

db.user = require('../models/user.model.js')(sequelize, Sequelize);

module.exports = db;