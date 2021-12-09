const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

class UserService {
	static async createUser(username, password) {
		try {
			const hashPassword = await bcrypt.hash(password, 7);
			const user = new User({ username, password: hashPassword });

			await user.save();
		} catch (err) {
			console.error(err.message);

			throw new Error('USER_CREATE_ERROR');
		}
	}

	static async authorizeUser(id) {
		try {
			const user = await User.findOne({ _id: id });

			const token = jwt.sign({ id: user.id }, config.get('secretKey'), {
				expiresIn: '30d',
			});

			return {
				token,
				id: user.id,
				username: user.username,
			};
		} catch (err) {
			console.error(err.message);

			throw new Error('USER_AUTH_ERROR');
		}
	}
}

module.exports = UserService;
