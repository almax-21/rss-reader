const config = require('config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}

	try {
		const token = req.headers.authorization.split(' ')[1];

		if (!token) {
			return res.status(401).json({ message: 'Auth error' });
		}

		const decodedUserId = jwt.verify(token, config.get('secretKey'));

		req.user = decodedUserId;
		next();
	} catch (err) {
		res.status(401).json({ message: 'Auth error' });
	}
};

module.exports = authMiddleware;
