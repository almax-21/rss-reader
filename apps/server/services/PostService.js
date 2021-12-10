const Post = require('../models/Post');

class PostService {
	static setPostRead(_id, userId) {
		const newState = { state: 'READ' };

		return Post.updateOne({ _id, userId }, newState);
	}

	static setAllActivePostsRead(feedId, userId) {
		const newState = { state: 'READ' };

		return Post.updateMany({ feedId, userId }, newState);
	}
}

module.exports = PostService;
