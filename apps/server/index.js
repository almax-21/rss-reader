const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const dotenv = require('dotenv');

const cors = require('cors');
const userRouter = require('./router/user.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/user', userRouter);

dotenv.config();

const PORT = process.env.PORT || config.get('serverPort');
const dbURI = process.env.DB_URI;

const start = async () => {
	try {
		await mongoose.connect(dbURI);

		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	} catch (err) {
		console.error(err.message);
	}
};

start();
