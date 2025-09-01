const Sequilize = require("sequelize");
require("dotenv").config();

const sequilize = new Sequilize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    schema: "support_db_schema",
    logging: false,
  }
);
module.exports = sequilize;
