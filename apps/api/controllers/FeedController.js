const FeedService = require('../services/FeedService');

class FeedController {
	static async getAllContent(req, res) {
		try {
			const [feeds, posts] = await FeedService.getAllContent(req.user.id);

			return res.json({ feeds, posts });
		} catch (err) {
			console.error(err.message);

			res.status(500).send({ message: 'Server Error' });
		}
	}

	static async uploadFeed(req, res) {
		try {
			const [feed, posts] = await FeedService.uploadFeed(req.body, req.user.id);

			return res.json({ feed, posts });
		} catch (err) {
			console.error(err.message);

			res.status(500).send({ message: 'Server Error' });
		}
	}

	static async deleteFeed(req, res) {
		try {
			await FeedService.deleteFeed(req.query.id, req.user.id);

			return res.json('Feed was deleted');
		} catch (err) {
			console.error(err.message);

			res.status(500).send({ message: 'Server Error' });
		}
	}
}

module.exports = FeedController;
