const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const AskCollection = mongoose.model('asks');
const UserCollection = mongoose.model('users');

module.exports = app => {
	app.get('/api/voteEdit', requireLogin, async (request, response) => {
		const askToRevote = await AskCollection.findOne({
			_id: request.query.mongoDBAskId
		});
		console.log('askToRevote = ', askToRevote);

		response.send(askToRevote);
	});
};
