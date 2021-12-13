const Feed = require('../models/Feed');
const Post = require('../models/Post');

class FeedService {
	static getAllContent(userId) {
		return Promise.all([
			Feed.find({ userId }),
			Post.find({ userId }),
		]);
	}

	static uploadFeed(data, userId) {
		const { parsedFeed, parsedPosts, feedUrl } = data;

		const feed = new Feed({
			...parsedFeed,
			url: feedUrl,
			userId,
		});
		const posts = parsedPosts.map(
			(post) =>
				new Post({
					...post,
					state: 'UNREAD',
					feedId: feed._id,
					userId,
					date: Date.now(),
				})
		).reverse();

		return Promise.all([feed.save(), Post.insertMany(posts)]);
	}

	static deleteFeed(_id, userId) {
		return Promise.all([
			Feed.findOneAndDelete({ _id, userId }),
			Post.deleteMany({ feedId: _id, userId }),
		]);
	}
}

module.exports = FeedService;
