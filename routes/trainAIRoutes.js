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

	app.put('/api/train_ai/vote', requireLogin, async (request, response) => {
		const { answerId, questionId } = request.body;
		const question = await AskCollection.findOne({ _id: questionId });
		//console.log('question.answers = ', question.answers);
		//console.log('answerId = ', answerId);
		for (let i = 0; i < question.answers.length; i++) {
			if (question.answers[i]._id === answerId) {
				console.log('inside if statement');
				question.answers[i].votes += 1;
			}
		}
		//console.log('after question.answers = ', question.answers);
		//response.send(mostRecent4Asks);
	});
};
