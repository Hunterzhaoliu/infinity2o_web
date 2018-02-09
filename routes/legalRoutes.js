module.exports = app => {
	app.get('/legal/terms_of_use', (request, response) => {
		response.send(request.user);
	});

	app.get('/legal/privacy_policy', (request, response) => {
		response.send(request.user);
	});
};
