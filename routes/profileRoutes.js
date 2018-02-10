const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Profile = mongoose.model('profile');

module.exports = app => {
	app.post('/api/profile', requireLogin, async (request, response) => {
		const { name, age, interests, time_zone } = request.body;
		console.log('in profileRoutes.js request.body = ', request.body);
		// const profile = new Profile({
		// 	name,
		// 	age,
		// 	interests: interests,
		// 	_user: request.user.id,
		// 	dateCreated: Date.now()
		// });
		//
		// try {
		// 	await profile.save();
		// } catch (error) {
		// 	response.status(422).send(error);
		// }
	});
};
