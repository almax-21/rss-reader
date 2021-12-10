const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

class UserService {
	static async createUser(username, password) {
		const hashPassword = await bcrypt.hash(password, 7);
		const user = new User({ username, password: hashPassword });

		return user.save();
	}

	static async authorizeUser(id) {
		const user = await User.findOne({ _id: id });

		const token = jwt.sign({ id: user.id }, config.get('secretKey'), {
			expiresIn: '30d',
		});

		return {
			token,
			id: user.id,
			username: user.username,
		};
	}
}

module.exports = UserService;
