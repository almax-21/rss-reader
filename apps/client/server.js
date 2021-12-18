/* eslint-disable @typescript-eslint/no-var-requires */

const express = require('express');
const path = require('path');
const compression = require('compression');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(compression());
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (_req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
