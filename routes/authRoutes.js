const passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(request, response) => {
			// after a user is logged in show them questions they can vote on
			response.redirect('/questions');
		}
	);

	app.get(
		'/auth/linkedIn/',
		passport.authenticate('linkedIn', {
			scope: ['profile', 'email']
		})
	);

	app.get(
		'/auth/linkedIn/callback',
		passport.authenticate('linkedIn'),
		(request, response) => {
			response.redirect('/PID');
		}
	);

	app.get('/api/logout', (request, response) => {
		request.logout(); // kills the cookie
		response.redirect('/');
	});

	app.get('/api/current_user', (request, response) => {
		response.send(request.user);
	});
};
