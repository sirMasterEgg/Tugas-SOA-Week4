const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({ path: '../../' });

const sequelize = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_URL,
		port: process.env.DB_PORT,
		dialect: 'mysql',
	}
);

module.exports = sequelize;
