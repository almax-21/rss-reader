const PostService = require('../services/PostService');

class PostController {
	static async setPostRead(req, res) {
		try {
			await PostService.setPostRead(req.body.id, req.user.id);

			return res.json('Post state has updated');
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
}

module.exports = PostController;
