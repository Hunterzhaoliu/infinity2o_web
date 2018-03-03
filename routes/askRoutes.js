const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.post('/api/ask', requireLogin, async (request, response) => {
		console.log('request.body = ', request.body);
		const { newQuestion, newAnswers } = request.body;

		// TODO: create question id
		console.log('request = ', request);

		const user = await request.user.save();
		response.send(user);
	});
};
