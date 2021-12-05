const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const cors = require('cors');
const userRouter = require('./router/user.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/user', userRouter);

const PORT = process.env.PORT || config.get('serverPort');

const start = async () => {
	try {
		await mongoose.connect(config.get('dbUrl'));

		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	} catch (err) {
		console.error(err.message);
	}
};

start();
