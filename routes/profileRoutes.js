const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.post('/api/profile', requireLogin, async (request, response) => {
		const {
			name,
			age,
			interests,
			timeZone,
			availability,
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

		const user = await request.user.save();
		response.send(user);
	});

	app.put(
		'/api/profile/conversations',
		requireLogin,
		async (request, response) => {
			// request.body = onlineContacts
			request.user.conversations = request.body;
			const user = await request.user.save();
			response.send(user);
		}
	);
};
