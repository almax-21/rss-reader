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

	static uploadNewPosts(newPostsData, userId) {
		const { newPosts, feedId } = newPostsData;

		const posts = newPosts
			.map(
				(post) =>
					new Post({
						...post,
						state: 'UNREAD',
						feedId,
						userId,
						date: Date.now(),
					})
			)
			.reverse();

		return Post.insertMany(posts);
	}
}

module.exports = PostService;
