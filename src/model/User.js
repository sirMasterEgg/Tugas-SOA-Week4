'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {}
	}
	User.init(
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			nama: DataTypes.STRING,
			alamat: DataTypes.STRING,
			nomorhp: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
