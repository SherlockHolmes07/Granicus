const Sequelize = require('sequelize');
require('dotenv').config();

// Setup Sequelize connection
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: 'postgres',
  port: process.env.PGPORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Only use for development, not in production
    }
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.users = require('./user.model.js')(sequelize, Sequelize);
db.temples = require('./temple.model.js')(sequelize, Sequelize);
db.restaurants = require('./restaurant.model.js')(sequelize, Sequelize);
db.dharamshalas = require('./dharmshala.model.js')(sequelize, Sequelize);

// Setup associations here (if any)

module.exports = db;
