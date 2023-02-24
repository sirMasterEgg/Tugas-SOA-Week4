const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./src/config/databaseConfig');

const route = require('./src/route/route');

const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));

app.use('/api', route);

const connectDB = async () => {
	console.log('Connecting to database...');
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');

		app.listen(port, () => {
			console.log(`Listening on port ${port}`);
		});
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

connectDB();
