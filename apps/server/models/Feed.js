const { Schema, model, ObjectId } = require('mongoose');

const Feed = Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	url: { type: String, required: true },
	userId: { type: ObjectId, ref: 'User' },
});

module.exports = model('Feed', Feed);
