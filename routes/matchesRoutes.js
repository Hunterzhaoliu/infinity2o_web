const _ = require('lodash');
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');

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
			totalUserVotes: user.profile.asks.totalUserVotes
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
};
