const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const AskCollection = mongoose.model('asks');

module.exports = app => {
	app.get('/api/train_ai', requireLogin, async (request, response) => {
		const mostRecent4Asks = await AskCollection.find()
			.sort({ $natural: -1 })
			.limit(4);
		//console.log('mostRecent4Asks = ', mostRecent4Asks);

		response.send(mostRecent4Asks);
	});
};
