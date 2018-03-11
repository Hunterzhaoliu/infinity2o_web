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
		const askInDB = await AskCollection.findOne({ _id: askId });

		//check if answerId = answerId in askInDB.answers
		let answer;
		for (let i = 0; i < askInDB.answers.length; i++) {
			//need to convert to string in order to compare
			if (String(askInDB.answers[i]._id) === String(answerId)) {
				answer = askInDB.answers[i].answer;
				askInDB.lastVotedOn = Date.now();
				askInDB.answers[i].votes += 1;
				askInDB.totalVotes += 1;
			}
		}

		try {
			await AskCollection.updateOne(
				{ _id: askId },
				{
					$set: {
						lastVotedOn: askInDB.lastVotedOn,
						answers: askInDB.answers,
						totalVotes: askInDB.totalVotes
					}
				}
			);

			request.user.profile.asks.votes.push({
				question: askInDB.question,
				_askId: askInDB._id,
				selectedAnswer: answer
			});
			const user = await request.user.save();
			const responseObject = {
				user,
				askInDB
			};
			response.send(responseObject);
		} catch (error) {
			response.status(422).send(error);
		}
	});
};
