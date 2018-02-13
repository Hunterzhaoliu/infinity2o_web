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
			// after a user is logged in show them their dashboard
			response.redirect('/profile');
		}
	);
	app.get('/auth/linkedIn/', passport.authenticate('linkedin'));

	app.get(
		'/auth/linkedIn/callback',
		passport.authenticate('linkedin'),
		(request, response) => {
			// after a user is logged in show them their dashboard
			response.redirect('/profile');
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
