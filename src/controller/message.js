const { QueryTypes } = require('sequelize');
const sequelize = require('../config/databaseConfig');

const sendMessage = async (req, res) => {
	const { username, password, usercari, message } = req.body;

	try {
		const result = await sequelize.query(
			'SELECT * FROM users WHERE username = :username and password = :password limit 1',
			{
				replacements: { username, password },
				type: QueryTypes.SELECT,
			}
		);

		if (!result.length) {
			res.status(401).json({
				message: 'Invalid username or password!',
			});
			return;
		}

		const result2 = await sequelize.query(
			'SELECT * FROM friends WHERE user_username = :username and friend_username = :usercari',
			{
				replacements: { username, usercari },
				type: QueryTypes.SELECT,
			}
		);

		if (!result2.length) {
			res.status(401).json({
				message: 'Anda blm berteman!',
			});
			return;
		}

		await sequelize.query(
			'INSERT INTO messages (from_username, to_username, message) VALUES (:username, :usercari, :message)',
			{
				replacements: { username, usercari, message },
				type: QueryTypes.INSERT,
			}
		);
		res.status(200).json({
			message: 'Message sent!',
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error!',
		});
	}
};

const viewMessage = async (req, res) => {
	const { password } = req.body;
	const { username } = req.params;

	if (!password || !username) {
		res.status(400).json({
			message: 'Bad Request',
		});
		return;
	}

	try {
		const result = await sequelize.query(
			'SELECT * FROM users WHERE username = :username and password = :password limit 1',
			{
				replacements: { username, password },
				type: QueryTypes.SELECT,
			}
		);

		if (!result.length) {
			res.status(401).json({
				message: 'Invalid username or password!',
			});
			return;
		}

		const data = await sequelize.query(
			`select from_username as 'from', to_username as 'to', message as 'pesan' from messages where from_username = :username`,
			{
				replacements: { username },
				type: QueryTypes.SELECT,
			}
		);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({
			message: 'Error!',
		});
	}
};

module.exports = {
	sendMessage,
	viewMessage,
};
