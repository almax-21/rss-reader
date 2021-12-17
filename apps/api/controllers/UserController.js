const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const UserService = require('../services/UserService');

class UserController {
	static async createUser(req, res) {
		try {
			const { username, password, lang } = req.body;
			const isUserExist = await User.findOne({ username });

			if (isUserExist) {
				return res.status(400).json({ message: 'User already exists' });
			}

			await UserService.createUser(username, password, lang);

			return res.json({ message: 'User was created' });
		} catch (err) {
			console.error(err.message);

			res.status(500).send({ message: 'Server Error' });
		}
	}

	static async loginUser(req, res) {
		try {
			const { username, password } = req.body;
			const user = await User.findOne({ username });

			if (!user) {
				return res.status(404).json({ message: `User not found` });
			}

			const isPasswordValid = bcrypt.compareSync(password, user.password);

			if (!isPasswordValid) {
				return res.status(400).json({ message: `Invalid password` });
			}

			const token = jwt.sign({ id: user.id }, config.get('secretKey'), {
				expiresIn: '30d',
			});

			return res.json({
				token,
			});
		} catch (err) {
			console.error(err.message);

			res.status(500).send({ message: 'Server Error' });
		}
	}

	static async authUser(req, res) {
		try {
			const userData = await UserService.authUser(req.user.id);

			return res.json(userData);
		} catch (err) {
			console.error(err.message);

			res.status(500).send({ message: 'Server Error' });
		}
	}

	static async setIsAutoUpdateEnabled(req, res) {
		try {
			const { isEnabled } = req.body;

			await UserService.setIsAutoUpdateEnabled(isEnabled, req.user.id);

			return res.json(isEnabled);
		} catch (err) {
			console.error(err.message);

			res.status(500).send({ message: 'Server Error' });
		}
	}

	static async switchLang(req, res) {
		try {
			const { lang } = req.body;

			await UserService.switchLang(lang, req.user.id);

			return res.json(lang);
		} catch (err) {
			console.error(err.message);

			res.status(500).send({ message: 'Server Error' });
		}
	}
}

module.exports = UserController;
