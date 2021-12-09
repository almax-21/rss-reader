const { check, validationResult } = require('express-validator');

const validateUser = [
	check('username', 'Uncorrect username length').isLength({
		min: 3,
		max: 20,
	}),
	check('password', 'Uncorrect password length').isLength({ min: 6 }),
	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ message: 'Uncorrect request', errors });
		}

		next();
	},
];

module.exports = validateUser;
