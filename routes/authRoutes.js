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
			response.redirect('/surveys');
		}
	);

	app.get('/api/logout', (request, response) => {
		request.logout(); // kills the cookie
		response.redirect('/');
	});

	app.get('/api/current_user', (request, response) => {
		response.send(request.user);
	});

	app.get('/legal/terms-of-service', (request, response) => {
		response.send('terms of service');
	});

	app.get('/legal/privacy-policy', (request, response) => {
		response.send('privacy policy');
	});
};
