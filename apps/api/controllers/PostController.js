const PostService = require('../services/PostService');
const Feed = require('../models/Feed');

class PostController {
	static async setPostRead(req, res) {
		try {
			await PostService.setPostRead(req.body.id, req.user.id);

			return res.json('Post state has been updated');
		} catch (err) {
			console.error(err.message);

			res.status(500).send({ message: 'Server Error' });
		}
	}

	static async setAllActivePostsRead(req, res) {
		try {
			await PostService.setAllActivePostsRead(req.body.feedId, req.user.id);

			return res.json('State of active posts has been updated');
		} catch (err) {
			console.error(err.message);

			res.status(500).send({ message: 'Server Error' });
		}
	}

	static async uploadNewPosts(req, res) {
		try {
			const posts = await PostService.uploadNewPosts(req.body, req.user.id);

			return res.json(posts);
		} catch (err) {
			console.error(err.message);

			res.status(500).send({ message: 'Server Error' });
		}
	}

	static async replacePosts(req, res) {
		try {
			const { feedId } = req.body;
			const userId = req.user.id;

			const isFeedExist = await Feed.findOne({
				feedId,
				userId,
			});

			if (!isFeedExist) {
				return res.status(400).json({ message: "Feed doesn't exist" });
			}

			const posts = await PostService.replacePosts(req.body, userId);

			return res.json(posts);
		} catch (err) {
			console.error(err.message);

			res.status(500).send({ message: 'Server Error' });
		}
	}
}

module.exports = PostController;
