const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.post('/api/profile', requireLogin, async (request, response) => {
		const { name, age, interests, time_zone } = request.body;
		console.log('in profileRoutes.js request.body = ', request.body);
		request.user.profile.name = name;
		request.user.profile.age = age;
		request.user.profile.interests = interests;
		request.user.profile.time_zone = time_zone;

		const user = await request.user.save();
		response.send(user);
	});
};
