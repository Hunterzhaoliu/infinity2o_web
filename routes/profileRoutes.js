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
		console.log('request.body = ', request.body);
		request.user.profile.name = newName;
		request.user.profile.age = newAge;
		request.user.profile.interests = newInterests;
		request.user.profile.time_zone = newTimeZone;
		request.user.profile.availability = newAvailability;
		const user = await request.user.save();
		response.send(user);
	});
};
