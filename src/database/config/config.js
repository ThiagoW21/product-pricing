require('dotenv').config();

const config = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  dialectOptions: { decimalNumbers: true },
  logging: false,
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
