const Router = require('express');
const User = require('../models/User');

const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middlewares/auth.middleware');

const router = new Router();

router.post(
	'/registration',
	[
		check('username', 'Uncorrect username length').isLength({
			min: 3,
			max: 20,
		}),
		check('password', 'Uncorrect password length').isLength({ min: 6 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				res.status(400).json({ message: 'Uncorrect request', errors });
			}

			const { username, password } = req.body;
			const isUserExist = await User.findOne({ username });

			if (isUserExist) {
				res
					.status(400)
					.json({ message: 'User already exists' });
			}

			const hashPassword = await bcrypt.hash(password, 7);
			const user = new User({ username, password: hashPassword });

			await user.save();

			return res.json({ message: 'User was created' });
		} catch (err) {
			console.error(err.message);

			res.send({ message: 'Server Error' });
		}
	}
);

router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });

		if (!user) {
			res.status(404).json({ message: `User not found` });
		}

		const isPasswordValid = bcrypt.compareSync(password, user.password);

		if (!isPasswordValid) {
			res.status(400).json({ message: `Invalid password` });
		}

		const token = jwt.sign({ id: user.id }, config.get('secretKey'), {
			expiresIn: '30d',
		});

		return res.json({
			token,
			id: user.id,
			username: user.username,
		});
	} catch (err) {
		console.error(err.message);

		res.send({ message: 'Server Error' });
	}
});

router.get('/auth', authMiddleware, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user.id });

		const token = jwt.sign({ id: user.id }, config.get('secretKey'), {
			expiresIn: '30d',
		});

		return res.json({
			token,
			id: user.id,
			username: user.username,
		});
	} catch (err) {
		console.error(err.message);

		res.send({ message: 'Server Error' });
	}
});

module.exports = router;
