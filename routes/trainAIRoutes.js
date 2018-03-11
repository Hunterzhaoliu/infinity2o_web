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
		const { answerId, askId } = request.body;
		const question = await AskCollection.findOne({ _id: askId });
		//console.log('question.answers.length = ', question.answers.length);
		//check if answerId = answerId in question.answers
		for (let i = 0; i < question.answers.length; i++) {
			//need to convert to string in order to compare
			if (String(question.answers[i]._id) === String(answerId)) {
				question.answers[i].votes += 1;
				question.totalVotes += 1;
			}
		}
		//console.log('after question.answers = ', question.answers);
		//response.send(mostRecent4Asks);
		try {
			await AskCollection.updateOne(
				{ _id: askId },
				{
					$set: {
						lastVotedOn: Date.now(),
						answers: question.answers,
						totalVotes: question.totalVotes
					}
				}
			);
			response.send(question);
		} catch (error) {
			response.status(422).send(error);
		}
	});
};
