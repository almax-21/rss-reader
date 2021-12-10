const { Schema, model, ObjectId } = require('mongoose');

const Post = Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	url: { type: String },
	state: { type: String, required: true },
	feedId: { type: ObjectId, ref: 'Feed' },
	userId: { type: ObjectId, ref: 'User' },
});

module.exports = model('Post', Post);
