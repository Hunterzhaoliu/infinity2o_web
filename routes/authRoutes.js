const passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	// after a user is logged in
	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(request, response) => {
			response.redirect('/questions');
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
