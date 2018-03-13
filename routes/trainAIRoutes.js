const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const AskCollection = mongoose.model('asks');
const UserCollection = mongoose.model('users');

module.exports = app => {
	app.get(
		'/api/train_ai/initial_asks',
		requireLogin,
		async (request, response) => {
			// const nextAsks = await AskCollection.find()
			// 	.sort({ $natural: -1 })
			// 	.limit(16);

			// ====== WARNING REMOVE
			const nextAsks = await AskCollection.find({
				$or: [
					{
						dateAsked: {
							$gt: new Date('2018-03-13T18:52:22.270Z')
						}
					},
					{
						dateAsked: {
							$lt: new Date('2018-03-13T18:52:21.965Z')
						}
					}
				]
			}).limit(16);
			// =====================

			response.send(nextAsks);
		}
	);

	app.get(
		'/api/train_ai/next_asks',
		requireLogin,
		async (request, response) => {
			console.log(
				'in /api/train_ai/next_asks request.query = ',
				request.query
			);
			const nextAsks = await AskCollection.find({
				dateAsked: {
					$gt: ISODate(request.query.newestAskDate)
				}
			}).limit(16);

			// const nextAsks = await AskCollection.find({
			// 	$or: [
			// 		{
			// 			dateAsked: { $gt: ISODate(request.query.newestAskDate) }
			// 		},
			// 		{ dateAsked: { $lt: ISODate(request.query.oldestAskDate) } }
			// 	]
			// }).limit(16);

			console.log('nextAsks = ', nextAsks);
			response.send(nextAsks);
		}
	);

	app.put('/api/train_ai/vote', requireLogin, async (request, response) => {
		const { answerId, askId } = request.body;

		let isRevote = false;
		let previousAnswerId;
		let votedAskId;
		let previousAnswer;
		let votedAnswer;
		let votedAnswerId;

		// finds currentUser's votedAsks
		const userInDB = await UserCollection.findOne({
			_id: request.user._id
		});
		const userVotedAsks = userInDB.profile.asks.votes;
		// finds if the user has already answered the question
		// TODO: optimize this search
		for (let i = 0; i < userVotedAsks.length; i++) {
			if (String(userVotedAsks[i]._askId) === String(askId)) {
				previousAnswerId = userVotedAsks[i]._answerId;
				votedAskId = userVotedAsks[i]._askId;
				isRevote = true;
			}
		}

		// const questionInUserProfile = await UserCollection.findOne(
		// 	{
		// 		_id: request.user._id,
		// 		'profile.asks.votes._askId': askId
		// 	},
		// 	{
		// 		'profile.asks': 1
		// 	}
		// );
		//
		// console.log('questionInUserProfile = ', questionInUserProfile);

		// if (questionInUserProfile !== null) {
		// 	previousAnswerId = questionInUserProfile.isRevote = true;
		// }

		// finds ask in database
		const askInDB = await AskCollection.findOne({ _id: askId });

		if (isRevote) {
			for (let i = 0; i < askInDB.answers.length; i++) {
				//need to convert to string in order to compare
				//looks for the newAnswer Id in ask to increment votes and update lastVotedOn
				if (String(askInDB.answers[i]._id) === String(answerId)) {
					votedAnswer = askInDB.answers[i].answer;
					votedAnswerId = askInDB.answers[i]._id;
					askInDB.lastVotedOn = Date.now();
					askInDB.answers[i].votes += 1;
				}
				//looks for the previousAnswer Id in ask to decrement votes and update lastVotedOn
				if (
					String(askInDB.answers[i]._id) === String(previousAnswerId)
				) {
					previousAnswer = askInDB.answers[i].answer;
					askInDB.lastVotedOn = Date.now();
					askInDB.answers[i].votes -= 1;
				}
			}
			try {
				//updates the User Collection selectedAnswer and _answerId
				await UserCollection.updateOne(
					{
						_id: request.user._id,
						'profile.asks.votes._askId': votedAskId
					},
					{
						$set: {
							'profile.asks.votes.$.selectedAnswer': votedAnswer,
							'profile.asks.votes.$._answerId': votedAnswerId
						}
					}
				);
				//updates the Ask Collection lastVotedOn and votes
				await AskCollection.updateOne(
					{ _id: askId },
					{
						$set: {
							lastVotedOn: askInDB.lastVotedOn,
							answers: askInDB.answers
						}
					}
				);

				response.send(askInDB);
			} catch (error) {
				response.status(422).send(error);
			}
		} else {
			// when not revote updates the askInDB correctly
			for (let i = 0; i < askInDB.answers.length; i++) {
				//need to convert to string in order to compare
				if (String(askInDB.answers[i]._id) === String(answerId)) {
					votedAnswer = askInDB.answers[i].answer;
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
							selectedAnswer: votedAnswer,
							_answerId: votedAnswerId
						});
						const user = await request.user.save();

						response.send(askInDB);
					} catch (error) {
						response.status(422).send(error);
					}
				}
			}
		}
	});
};
