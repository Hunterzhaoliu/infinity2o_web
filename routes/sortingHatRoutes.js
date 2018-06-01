const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const AskCollection = mongoose.model('asks');
const UserCollection = mongoose.model('users');

// when the user first presses Train AI this will store...
let newestRetrievedAskDate; // the date of the newest ask
let oldestRetrievedAskDate; // the date of the oldest ask

const updateDate = (newerOrOlder, newDate) => {
	if (newerOrOlder === 'newer') {
		if (newDate > newestRetrievedAskDate) {
			newestRetrievedAskDate = newDate;
		}
	} else if (newerOrOlder === 'older') {
		if (newDate < oldestRetrievedAskDate) {
			oldestRetrievedAskDate = newDate;
		}
	}
};

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

const getOlderAsks = async (nextAsks, mongoDBUserId, response) => {
	// don't need to check if new dates are actually older or newer since
	// this is the first update
	newestRetrievedAskDate = new Date(nextAsks[0].dateAsked);
	oldestRetrievedAskDate = new Date(nextAsks[nextAsks.length - 1].dateAsked);

	// takes out the asks that the user has already voted on
	let nextAsksHT = await getNonVotedAsks(mongoDBUserId, nextAsks);

	// goes to find older Asks if there aren't 4 recent asks
	while (Object.keys(nextAsksHT).length < 4) {
		// finds up to 16 older Asks
		const olderAsks = await AskCollection.find({
			dateAsked: {
				$lt: oldestRetrievedAskDate
			}
		})
			.sort({ dateAsked: -1 })
			.limit(16);

		if (olderAsks.length === 0) {
			break;
		} else if (olderAsks.length > 0) {
			oldestRetrievedAskDate = new Date(
				olderAsks[olderAsks.length - 1].dateAsked
			);
		}

		const olderNextAsksHT = await getNonVotedAsks(mongoDBUserId, olderAsks);

		// combines the unvoted Asks together
		nextAsksHT = Object.assign({}, nextAsksHT, olderNextAsksHT);

		// leaves the loop if there aren't any more questions in the Ask collection
		if (olderAsks.length < 16) {
			break;
		}
	}

	const nonVotedNextAsks = Object.values(nextAsksHT);
	response.send(nonVotedNextAsks);
};

const getNewerAndOlderAsks = async (nextAsks, mongoDBUserId, response) => {
	if (nextAsks.length > 0) {
		updateDate('newer', new Date(nextAsks[0].dateAsked));
		updateDate('older', new Date(nextAsks[nextAsks.length - 1].dateAsked));
	}

	let nextAsksHT = await getNonVotedAsks(mongoDBUserId, nextAsks);

	// goes to find older & newer asks if there aren't 4 or more asks to display
	while (Object.keys(nextAsksHT).length < 4) {
		// finds up to 16 older Asks
		const moreAsks = await findNewerAndOlderAsks(
			newestRetrievedAskDate,
			oldestRetrievedAskDate
		);

		if (moreAsks.length === 0) {
			break;
		} else if (moreAsks.length > 0) {
			updateDate('newer', moreAsks[0].dateAsked);
			updateDate('older', moreAsks[moreAsks.length - 1].dateAsked);
		}

		// checks if the user has voted on the more asks
		const moreAsksHT = await getNonVotedAsks(mongoDBUserId, moreAsks);

		// combines the unvoted asks together
		nextAsksHT = Object.assign({}, nextAsksHT, moreAsksHT);

		// leaves the loop if there aren't any more asks in the Ask collection
		if (moreAsks.length < 16) {
			break;
		}
	}

	const nonVotedNextAsks = Object.values(nextAsksHT);

	response.send(nonVotedNextAsks);
};

const findNewerAndOlderAsks = async (
	newestRetrievedAskDate,
	oldestRetrievedAskDate
) => {
	return await AskCollection.find({
		$or: [
			{
				dateAsked: {
					$gt: newestRetrievedAskDate
				}
			},
			{
				dateAsked: {
					$lt: oldestRetrievedAskDate
				}
			}
		]
	})
		.sort({ dateAsked: -1 })
		.limit(16);
};

module.exports = app => {
	app.get(
		'/api/sorting_hat/initial_asks',
		requireLogin,
		async (request, response) => {
			const nextAsks = await AskCollection.find()
				.sort({ dateAsked: -1 }) // -1 = newest to oldest
				.limit(16);

			if (nextAsks.length > 0) {
				await getOlderAsks(
					nextAsks,
					request.query.mongoDBUserId,
					response
				);
			} else {
				// there are no more asks to display
				response.send([]);
			}
		}
	);

	app.get(
		'/api/sorting_hat/next_asks',
		requireLogin,
		async (request, response) => {
			const nextAsks = await findNewerAndOlderAsks(
				newestRetrievedAskDate,
				oldestRetrievedAskDate
			);

			if (nextAsks.length > 0) {
				await getNewerAndOlderAsks(
					nextAsks,
					request.query.mongoDBUserId,
					response
				);
			} else {
				// there are no more asks to display
				response.send([]);
			}
		}
	);

	app.put(
		'/api/sorting_hat/revote',
		requireLogin,
		async (request, response) => {
			const {
				mongoDBAskId,
				mongoDBAnswerId,
				previousMongoDBAnswerId,
				newAnswer
			} = request.body;

			// update revote in Ask Collection
			let askInDB = await AskCollection.findOne({ _id: mongoDBAskId });
			askInDB.lastVotedOn = Date.now();
			askInDB.totalRevotes += 1;

			for (let i = 0; i < askInDB.answers.length; i++) {
				if (
					String(askInDB.answers[i]._id) === previousMongoDBAnswerId
				) {
					askInDB.answers[i].votesOut += 1;
					askInDB.answers[i].votes -= 1;
				}

				if (String(askInDB.answers[i]._id) === mongoDBAnswerId) {
					askInDB.answers[i].votesIn += 1;
					askInDB.answers[i].votes += 1;
				}
			}

			try {
				await AskCollection.updateOne(
					{ _id: mongoDBAskId },
					{
						$set: {
							lastVotedOn: askInDB.lastVotedOn,
							answers: askInDB.answers,
							totalVotes: askInDB.totalVotes,
							totalRevotes: askInDB.totalRevotes
						}
					}
				);

				// update revote on user
				await UserCollection.updateOne(
					{
						_id: request.user._id,
						'profile.asks.votes._askId': mongoDBAskId
					},
					{
						$set: {
							'profile.asks.votes.$.selectedAnswer': newAnswer,
							'profile.asks.votes.$._answerId': mongoDBAnswerId
						}
					}
				);

				response.send(askInDB);
			} catch (error) {
				response.status(422).send(error);
			}
		}
	);

	app.put(
		'/api/sorting_hat/vote',
		requireLogin,
		async (request, response) => {
			const { answerId, askId } = request.body;

			let isRevote = false;
			let previousAnswerId;
			let votedAskId;
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
					if (
						String(askInDB.answers[i]._id) ===
						String(previousAnswerId)
					) {
						askInDB.lastVotedOn = Date.now();
						askInDB.answers[i].votes -= 1;
					}
				}

				// replaces old answerId with new one inside of answerIdsUserVotedOn
				let answerIdsUserVotedOn =
					userInDB.profile.asks.answerIdsUserVotedOn;
				for (let i = 0; i < answerIdsUserVotedOn.length; i++) {
					if (
						String(answerIdsUserVotedOn[i]) ===
						String(previousAnswerId)
					) {
						answerIdsUserVotedOn[i] = votedAnswerId;
						break;
					}
				}

				try {
					//updates the User Collection selectedAnswer, _answerId, and answerIdsUserVotedOn
					await UserCollection.updateOne(
						{
							_id: request.user._id,
							'profile.asks.votes._askId': votedAskId
						},
						{
							$set: {
								'profile.asks.votes.$.selectedAnswer': votedAnswer,
								'profile.asks.votes.$._answerId': votedAnswerId,
								'profile.asks.answerIdsUserVotedOn': answerIdsUserVotedOn
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

							request.user.profile.asks.answerIdsUserVotedOn.push(
								votedAnswerId
							);
							request.user.profile.asks.totalUserVotes =
								request.user.profile.asks.totalUserVotes + 1;

							const user = await request.user.save();

							response.send(askInDB);
						} catch (error) {
							response.status(422).send(error);
						}
					}
				}
			}
		}
	);
};
