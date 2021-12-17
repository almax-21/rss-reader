const { Schema, model } = require('mongoose');

const userSchema = Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	isAutoUpdateEnabled: { type: Boolean, required: true },
	lang: { type: String, required: true },
});

const User = model('User', userSchema);

module.exports = User;
