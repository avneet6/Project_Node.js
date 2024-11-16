const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/Userjs")(sequelize, Sequelize);
db.feed = require("../models/Feed.js")(sequelize, Sequelize);

db.feed.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.feed, {
  through: "user_roles"
});

db.ROLES = ["Admin", "Super-Admin", "Basic"];

module.exports = db;