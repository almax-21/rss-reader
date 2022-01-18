const { Schema, model, ObjectId } = require('mongoose');

const Post = Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	url: { type: String },
	imgSrc: { type: String },
	state: { type: String, required: true },
	feedId: { type: ObjectId, ref: 'Feed', required: true },
	userId: { type: ObjectId, ref: 'User', required: true },
	date: { type: Number, required: true },
});

module.exports = model('Post', Post);
