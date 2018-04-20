const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const UserCollection = mongoose.model('users');

module.exports = app => {
	app.put(
		'/api/profile/colorTheme',
		requireLogin,
		async (request, response) => {
			request.user.profile.colorTheme = request.body;
			const user = await request.user.save();
			response.send(user);
		}
	);
};
