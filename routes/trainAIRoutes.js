const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const AskCollection = mongoose.model('asks');
const UserCollection = mongoose.model('users');

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
		console.log('answerId = ', answerId);
		// detect if this vote is a revote
		let isRevote = false;
		let previousAnswerId;

		//finds ask in database
		const askInDB = await AskCollection.findOne({ _id: askId });

		//finds currentUser's votedAsks
		const userInDB = await UserCollection.findOne({
			_id: request.user._id
		});
		const userVotedAsks = userInDB.profile.asks.votes;
		for (let i = 0; i < userVotedAsks.length; i++) {
			if (String(userVotedAsks[i]._askId) === String(askId)) {
				// console.log(
				// 	'userVotedAsks[i]._answerId = ',
				// 	userVotedAsks[i]._answerId
				// );
				//console.log('userVotedAsks[i]._askId) === String(askId)');
				previousAnswerId = userVotedAsks[i]._answerId;
				isRevote = true;
			}
		}
		console.log('previousAnswerId = ', previousAnswerId);
		console.log('isRevote = ', isRevote);
		let askIndex;
		let answer;
		let votedAnswerId;

		if (isRevote) {
			for (let i = 0; i < askInDB.answers.length; i++) {
				//need to convert to string in order to compare
				if (String(askInDB.answers[i]._id) === String(answerId)) {
					console.log('increasing votes on new answer');
					answer = askInDB.answers[i].answer;
					askInDB.lastVotedOn = Date.now();
					askInDB.answers[i].votes += 1;
				}
				if (String(askInDB.answers[i]._id) === String(previousAnswerId)) {
					console.log('decreasing votes on old answer');

					askIndex = i;
					answer = askInDB.answers[i].answer;
					askInDB.lastVotedOn = Date.now();
					askInDB.answers[i].votes -= 1;
				}
			}
			try {
				await UserCollection.updateOne(
					{ _id: request.user._id },
					{
						$set: {
							'profile.asks.votes.0.selectedAnswer': answer
						}
					}
				);
				console.log('just sent new selectedAnsewr to UserCollection');
				await AskCollection.updateOne(
					{ _id: askId },
					{
						$set: {
							lastVotedOn: askInDB.lastVotedOn,
							answers: askInDB.answers
						}
					}
				);
				console.log('just sent data to AskCollection');
			} catch (error) {
				response.status(422).send(error);
			}
		} else {
			// updates the askInDB correctly
			for (let i = 0; i < askInDB.answers.length; i++) {
				//need to convert to string in order to compare
				if (String(askInDB.answers[i]._id) === String(answerId)) {
					answer = askInDB.answers[i].answer;
					votedAnswerId = askInDB.answers[i]._id;
					askInDB.lastVotedOn = Date.now();
					askInDB.answers[i].votes += 1;
					askInDB.totalVotes += 1;
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
							selectedAnswer: answer,
							_answerId: votedAnswerId
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
				}
			}
		}
	});
};
