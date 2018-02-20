const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.post('/api/profile', requireLogin, async (request, response) => {
		const {
			newName,
			newAge,
			newInterests,
			newTimeZone,
			newAvailability
		} = request.body;
		request.user.profile.name = newName;
		request.user.profile.age = newAge;
		request.user.profile.interests = newInterests;
		request.user.profile.timeZone = newTimeZone;
		request.user.profile.availability = newAvailability;
		console.log('request.body = ', request.body);

		const user = await request.user.save();
		response.send(user);
	});
};
