const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const ConversationCollection = mongoose.model('conversations');
const UserCollection = mongoose.model('users');

const getMatchesInfo = async mongoDBUserIds => {
	let matches_info = [];
	for (let mongoDBUserId of mongoDBUserIds) {
		const user = await UserCollection.findOne({
			_id: mongoDBUserId
		});
		matches_info.push({
			name: user.profile.name,
			interests: user.profile.interests,
			timeZone: user.profile.timeZone,
			totalUserVotes: user.profile.asks.totalUserVotes,
			id: user._id
		});
	}
	return matches_info;
};

module.exports = app => {
	app.get('/api/matches', requireLogin, async (request, response) => {
		const mongoDBUserIds = request.query.mongoDBUserIds.split(',');
		let matches_info = await getMatchesInfo(mongoDBUserIds);
		response.send(matches_info);
	});

	app.post('/api/matches', requireLogin, async (request, response) => {
		const { matchId, matchName } = request.body;
		const userId = request.user._id;
		let userName;
		if (request.user.profile.name === undefined) {
			userName = 'Anonymous';
		} else {
			userName = request.user.profile.name;
		}

		const conversation = new ConversationCollection({
			user1: { name: userName, id: userId },
			user2: { name: matchName, id: matchId },
			last50Messages: []
		});

		try {
			await conversation.save();
			// request.user.profile.asks.questions.push({
			// 	question: ask.question,
			// 	_askId: ask._id
			// });
			// //
			//saves document ask in collection asks
			// const user = await request.user.save();
			// response.send(user);
		} catch (error) {
			response.status(422).send(error);
		}
	});
};
