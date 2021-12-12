const { Schema, model } = require('mongoose');

const userSchema = Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	lang: { type: String },
});

const User = model('User', userSchema);

module.exports = User;
