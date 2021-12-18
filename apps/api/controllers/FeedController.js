const Feed = require('../models/Feed');
const FeedService = require('../services/FeedService');

const { FEEDS_LIMIT } = require('../constants');

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
			const { feedUrl } = req.body;
			const userId = req.user.id;

			const isFeedExist = await Feed.findOne({
				url: feedUrl,
				userId,
			});

			if (isFeedExist) {
				return res.status(400).json({ message: 'Feed already exists' });
			}

			const feeds = await Feed.find({ userId });
			const newFeedsCount = feeds.length + 1;

			if (newFeedsCount > FEEDS_LIMIT) {
				return res.status(400).json({ message: 'Feeds limit reached' });
			}

			const [feed, posts] = await FeedService.uploadFeed(req.body, userId);

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
