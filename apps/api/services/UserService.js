const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

class UserService {
	static async createUser(username, password, lang) {
		const hashPassword = await bcrypt.hash(password, 7);
		const user = new User({
			username,
			password: hashPassword,
			lang,
		});

		return user.save();
	}

	static async authUser(id) {
		const { _id, username, lang } = await User.findOne({
			_id: id,
		});

		const token = jwt.sign({ id: _id }, config.get('secretKey'), {
			expiresIn: '30d',
		});

		return {
			token,
			id: _id,
			username,
			lang,
		};
	}

	static switchLang(lang, _id) {
		const newLang = { lang };

		return User.updateOne({ _id }, newLang);
	}
}

module.exports = UserService;
