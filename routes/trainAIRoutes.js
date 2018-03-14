const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const AskCollection = mongoose.model('asks');
const UserCollection = mongoose.model('users');

const getNonVotedAsks = async (mongoDBUserId, nextAsks) => {
	//console.log('nextAsks = ', nextAsks);
	const oldestNextAsksDate = nextAsks[nextAsks.length - 1].dateAsked;
	// console.log('oldestNextAsksDate = ', oldestNextAsksDate);
	//gets the userVotes
	const user = await UserCollection.findOne({
		_id: mongoDBUserId
	});
	const userVotes = user.profile.asks.votes;

	//makes nextAsks into a hashtable
	let nextAsksHT = {};
	for (let i = 0; i < nextAsks.length; i++) {
		nextAsksHT[nextAsks[i]._id] = nextAsks[i];
	}

	//sees if userVotes' askId(s) are in the nextAsks hashtable
	for (let i = 0; i < userVotes.length; i++) {
		const isAlreadyVotedAsk = nextAsksHT[userVotes[i]._askId] !== undefined;
		if (isAlreadyVotedAsk) {
			delete nextAsksHT[userVotes[i]._askId];
		}
	}

	// console.log('nextAsksHT inside getNonVotedAsks= ', nextAsksHT);
	return { nextAsksHT, oldestNextAsksDate };
};

module.exports = app => {
	app.get(
		'/api/train_ai/initial_asks',
		requireLogin,
		async (request, response) => {
			const nextAsks = await AskCollection.find()
				.sort({ dateAsked: -1 }) // -1 = newest to oldest
				.limit(16);

			const nonVotedAsksInfo = await getNonVotedAsks(
				request.query.mongoDBUserId,
				nextAsks
			);
			//console.log('nextAsksHT outside= ', nextAsksHT);
			let oldestNextAsksDate = nonVotedAsksInfo.oldestNextAsksDate;
			//console.log('oldestNextAsksDate = ', oldestNextAsksDate);
			let nextAsksHT = nonVotedAsksInfo.nextAsksHT;
			// console.log('nextAsksHT outside while loop= ', nextAsksHT);
			while (Object.keys(nextAsksHT).length < 4) {
				// console.log('inside while loop');
				const olderAsks = await AskCollection.find({
					dateAsked: {
						$lt: new Date(oldestNextAsksDate)
					}
				}).limit(16);
				//console.log('olderAsks = ', olderAsks);
				const olderNonVotedAsksInfo = await getNonVotedAsks(
					request.query.mongoDBUserId,
					olderAsks
				);
				const olderNextAsksHT = olderNonVotedAsksInfo.nextAsksHT;
				oldestNextAsksDate = olderNonVotedAsksInfo.oldestNextAsksDate;
				nextAsksHT = Object.assign({}, nextAsksHT, olderNextAsksHT);
				console.log('nextAsksHT inside while loop = ', nextAsksHT);
				if (olderAsks.length < 16) {
					//console.log('olderAsks.length < 16');
					break;
				}
			}

			const nonVotedNextAsks = Object.values(nextAsksHT);
			response.send(nonVotedNextAsks);
		}
	);

	app.get(
		'/api/train_ai/next_asks',
		requireLogin,
		async (request, response) => {
			const nextAsks = await AskCollection.find({
				$or: [
					{
						dateAsked: {
							$gt: new Date(request.query.newestAskDate)
						}
					},
					{
						dateAsked: {
							$lt: new Date(request.query.oldestNextAsksDate)
						}
					}
				]
			}).limit(16);

			// let nextAsksHT = getNonVotedAsks(request.query.mongoDBUserId, nextAsks);
			//
			// const nonVotedNextAsks = Object.values(nextAsksHT);
			// response.send(nonVotedNextAsks);
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
				if (String(askInDB.answers[i]._id) === String(previousAnswerId)) {
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
