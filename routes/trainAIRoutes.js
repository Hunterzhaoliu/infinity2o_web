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

	app.get(
		'/api/train_ai/is_revote',
		requireLogin,
		async (request, response) => {
			const { answerId, askId } = request.body;
			const ask = await AskCollection.findOne({ _id: askId });
			console.log('in is_revote ask = ', ask);
		}
	);

	app.put('/api/train_ai/vote', requireLogin, async (request, response) => {
		const { answerId, askId } = request.body;
		const ask = await AskCollection.findOne({ _id: askId });

		//check if answerId = answerId in ask.answers
		let answer;
		for (let i = 0; i < ask.answers.length; i++) {
			//need to convert to string in order to compare
			if (String(ask.answers[i]._id) === String(answerId)) {
				answer = ask.answers[i].answer;
				ask.lastVotedOn = Date.now();
				ask.answers[i].votes += 1;
				ask.totalVotes += 1;
			}
		}

		try {
			await AskCollection.updateOne(
				{ _id: askId },
				{
					$set: {
						lastVotedOn: ask.lastVotedOn,
						answers: ask.answers,
						totalVotes: ask.totalVotes
					}
				}
			);

			request.user.profile.asks.votes.push({
				question: ask.question,
				_askId: ask._id,
				selectedAnswer: answer
			});
			const user = await request.user.save();
			const responseObject = {
				user,
				ask
			};
			response.send(responseObject);
		} catch (error) {
			response.status(422).send(error);
		}
	});
};
