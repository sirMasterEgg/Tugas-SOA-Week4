const { QueryTypes } = require('sequelize');
const sequelize = require('../config/databaseConfig');

const addFriend = async (req, res) => {
	const { username, password, usercari } = req.body;
	try {
		const result = await sequelize.query(
			'SELECT * FROM users WHERE username = :username and password = :password limit 1',
			{
				replacements: { username, password },
				type: QueryTypes.SELECT,
			}
		);
		console.log(result);
		if (!result.length) {
			res.status(401).json({
				message: 'Invalid username or password!',
			});
			return;
		}

		await sequelize.query(
			'INSERT INTO friends (user_username, friend_username) VALUES (:username, :usercari)',
			{
				replacements: { username, usercari },
				type: QueryTypes.INSERT,
			}
		);
		res.status(200).json({
			message: 'Friend added!',
		});
	} catch (error) {
		res.status(500).json({
			message: 'Username have been registered!',
		});
	}
};

const viewFriend = async (req, res) => {
	const { password } = req.body;
	const { username } = req.params;

	if (!password || !username) {
		res.status(400).json({
			message: 'Bad Request',
		});
		return;
	}

	try {
		const data = await sequelize.query(
			`select u.name as nama, u.address as alamat, u.phone as nomorhp  from friends f
			join users u on u.username = f.friend_username
			join users u2 on u2.username = f.user_username
			where u2.username = :username and u2.password = :password`,
			{
				replacements: { username, password },
				type: QueryTypes.SELECT,
			}
		);

		res.status(200).json(
			data.map((item, index) => {
				const key = 'user' + Number(index + 1);
				return {
					[key]: {
						nama: item.nama,
						alamat: item.alamat,
						nomorhp: item.nomorhp,
					},
				};
			})
		);
	} catch (error) {
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
};

const deleteFriend = async (req, res) => {
	const { username, password, usercari } = req.body;
	try {
		await sequelize.query(
			`delete f
			from friends f
			join users u on u.username = f.user_username
			where user_username= :username and friend_username= :usercari and u.password= :password`,
			{
				replacements: { username, usercari, password },
				type: QueryTypes.DELETE,
			}
		);
		res.status(200).json({
			message: 'Friend deleted!',
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error!',
		});
	}
};

module.exports = {
	addFriend,
	viewFriend,
	deleteFriend,
};
