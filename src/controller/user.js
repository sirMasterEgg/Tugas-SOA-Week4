const { QueryTypes } = require('sequelize');
const sequelize = require('../config/databaseConfig');
const registerUser = async (req, res) => {
	const { username, password, name, address, phone } = req.body;
	try {
		const result = await sequelize.query(
			'INSERT INTO users (username, password, name, address, phone) VALUES (:username, :password, :name, :address, :phone)',
			{
				replacements: { username, password, name, address, phone },
				type: QueryTypes.INSERT,
			}
		);
		res.status(200).json({
			message: 'User registered!',
			result: {
				id: result[0],
				username,
				password,
				name,
				address,
				phone,
			},
		});
	} catch (error) {
		res.status(500).json({
			message: 'Username have been registered!',
		});
	}
};

const loginUser = async (req, res) => {
	const { username, password } = req.body;
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

		res.status(200).json({
			message: 'Login success!',
			result: result[0],
		});
	} catch (error) {
		res.status(500).json({
			message: 'Internal server error!',
		});
	}
};

const editProfile = async (req, res) => {
	const { nama, alamat, nomorhp, oldpassword, newpassword } = req.body;
	const { username } = req.params;
	if (
		!nama ||
		!alamat ||
		!nomorhp ||
		!oldpassword ||
		!newpassword ||
		!username
	) {
		res.status(400).json({
			message: 'Input semua field!',
		});
		return;
	}

	try {
		const result = await sequelize.query(
			'UPDATE users SET name = :nama, address = :alamat, phone = :nomorhp, password = :newpassword WHERE username = :username AND password = :oldpassword',
			{
				replacements: {
					nama,
					alamat,
					nomorhp,
					newpassword,
					username,
					oldpassword,
				},
				type: QueryTypes.UPDATE,
			}
		);
		res.status(200).json({
			message: 'Profile updated!',
			result: {
				id: result[0],
				username,
				password: newpassword,
				name: nama,
				address: alamat,
				phone: nomorhp,
			},
		});
	} catch (error) {
		res.status(500).json({
			message: 'Internal server error!',
		});
	}
};

module.exports = {
	registerUser,
	loginUser,
	editProfile,
};
