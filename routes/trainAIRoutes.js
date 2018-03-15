const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const AskCollection = mongoose.model('asks');
const UserCollection = mongoose.model('users');

const getNonVotedAsks = async (mongoDBUserId, nextAsks) => {
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

	return nextAsksHT;
};

const getOlderAsks = async (
	nextAsksHT,
	oldestAskDate,
	mongoDBUserId,
	response
) => {
	//goes to find olderAsks if there aren't 4 recent asks
	while (Object.keys(nextAsksHT).length < 4) {
		//finds up 16 older Asks

		const olderAsks = await AskCollection.find({
			dateAsked: {
				$lt: new Date(oldestAskDate)
			}
		}).limit(16);

		oldestAskDate = olderAsks[olderAsks.length - 1].dateAsked;

		//console.log('olderAsks = ', olderAsks);
		// await AskCollection.find({
		// 	dateAsked: {
		// 		$lt: new Date(oldestAskDate)
		// 	}
		// }).limit(16);

		//checks if the user has voted on the older Asks
		const olderNextAsksHT = await getNonVotedAsks(mongoDBUserId, olderAsks);
		// const olderNextAsksHT = olderNonVotedAsksInfo.nextAsksHT;
		// oldestAskDate = olderNonVotedAsksInfo.oldestAskDate;

		//combines the unanswered Asks together
		nextAsksHT = Object.assign({}, nextAsksHT, olderNextAsksHT);

		//leaves the loop if there aren't any more questions in the Ask collection
		if (olderAsks.length < 16) {
			break;
		}
	}

	const nonVotedNextAsks = Object.values(nextAsksHT);
	response.send(nonVotedNextAsks);
};

const getMoreAsks = async (
	nextAsksHT,
	newestAskDate,
	oldestAskDate,
	mongoDBUserId,
	response
) => {
	//goes to find olderAsks if there aren't 4 recent asks
	while (Object.keys(nextAsksHT).length < 4) {
		//finds up 16 older Asks

		const moreAsks = await findNewerAndOlderAsks(newestAskDate, oldesAskDate);

		let newestAskDate = moreAsks[0].dateAsked;
		let oldestAskDate = moreAsks[moreAsks.length - 1].dateAsked;

		console.log('moreAsks = ', moreAsks);
		//checks if the user has voted on the older Asks
		const moreAsksHT = await getNonVotedAsks(mongoDBUserId, moreAsks);
		// const olderNextAsksHT = olderNonVotedAsksInfo.nextAsksHT;
		// oldestAskDate = olderNonVotedAsksInfo.oldestAskDate;

		//combines the unanswered Asks together
		nextAsksHT = Object.assign({}, nextAsksHT, moreAsksHT);

		//leaves the loop if there aren't any more questions in the Ask collection
		if (olderAsks.length < 16) {
			break;
		}
	}

	const nonVotedNextAsks = Object.values(nextAsksHT);
	response.send(nonVotedNextAsks);
};

// const findOlderAsks = async oldestAskDate => {
// 	//console.log('inside findOlderAsks function');
// 	return await AskCollection.find({
// 		dateAsked: {
// 			$lt: new Date(oldestAskDate)
// 		}
// 	}).limit(16);
// };

const findNewerAndOlderAsks = async (newestAskDate, oldestAskDate) => {
	// console.log('inside findNewerAndOlderAsks');
	console.log('newestAskDate = ', newestAskDate);
	console.log('oldestAskDate = ', oldestAskDate);
	//
	// console.log('inside findNewerAndOlderAsks');

	const test = await AskCollection.find({
		$or: [
			{
				dateAsked: {
					$gt: new Date(newestAskDate)
				}
			},
			{
				dateAsked: {
					$lt: new Date(oldestAskDate)
				}
			}
		]
	}).limit(16);
	console.log('test = ', test);
};

module.exports = app => {
	app.get(
		'/api/train_ai/initial_asks',
		requireLogin,
		async (request, response) => {
			const nextAsks = await AskCollection.find()
				.sort({ dateAsked: -1 }) // -1 = newest to oldest
				.limit(16);

			let oldestAskDate = nextAsks[nextAsks.length - 1].dateAsked;
			//console.log('nextAsks = ', nextAsks);
			//takes out the asks that the user has already voted on
			const nextAsksHT = await getNonVotedAsks(
				request.query.mongoDBUserId,
				nextAsks
			);
			// let nextAsksHT = nonVotedAsksInfo.nextAsksHT;
			//let oldestAskDate = nonVotedAsksInfo.oldestAskDate;
			//console.log('nextAsksHT = ', nextAsksHT);

			//console.log('oldestAskDate = ', oldestAskDate);

			await getOlderAsks(
				nextAsksHT,
				oldestAskDate,
				request.query.mongoDBUserId,
				response
			);
			// //goes to find olderAsks if there aren't 4 recent asks
			// while (Object.keys(nextAsksHT).length < 4) {
			// 	//finds up 16 older Asks
			// 	const olderAsks = await AskCollection.find({
			// 		dateAsked: {
			// 			$lt: new Date(oldestAskDate)
			// 		}
			// 	}).limit(16);
			//
			// 	//checks if the user has voted on the older Asks
			// 	const olderNonVotedAsksInfo = await getNonVotedAsks(
			// 		request.query.mongoDBUserId,
			// 		olderAsks
			// 	);
			// 	const olderNextAsksHT = olderNonVotedAsksInfo.nextAsksHT;
			// 	oldestAskDate = olderNonVotedAsksInfo.oldestAskDate;
			//
			// 	//combines the unanswered Asks together
			// 	nextAsksHT = Object.assign({}, nextAsksHT, olderNextAsksHT);
			//
			// 	//leaves the loop if there aren't any more questions in the Ask collection
			// 	if (olderAsks.length < 16) {
			// 		break;
			// 	}
			// }
			//
			// const nonVotedNextAsks = Object.values(nextAsksHT);
			// response.send(nonVotedNextAsks);
		}
	);

	app.get(
		'/api/train_ai/next_asks',
		requireLogin,
		async (request, response) => {
			const nextAsks = await findNewerAndOlderAsks(
				request.query.newestAskDate,
				request.query.oldestAskDate
			);

			console.log('nextAsks in next_asks = ', nextAsks);
			const nextAsksHT = await getNonVotedAsks(
				request.query.mongoDBUserId,
				nextAsks
			);

			await getMoreAsks(
				nextAsksHT,
				request.query.newestAskDate,
				request.query.oldestAskDate,
				request.query.mongoDBUserId,
				response
			);
			// await AskCollection.find({
			// 	$or: [
			// 		{
			// 			dateAsked: {
			// 				$gt: new Date(request.query.newestAskDate)
			// 			}
			// 		},
			// 		{
			// 			dateAsked: {
			// 				$lt: new Date(request.query.oldestAskDate)
			// 			}
			// 		}
			// 	]
			// }).limit(16)

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
