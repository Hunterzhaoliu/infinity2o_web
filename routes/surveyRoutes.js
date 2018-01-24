const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys/thanks', (request, response) => {
		response.send('Thanks for voting!');
	});

	app.post(
		'/api/surveys',
		requireLogin,
		requireCredits,
		async (request, response) => {
			const { title, subject, body, recipients } = request.body;

			// 1) create new survey instance
			const survey = new Survey({
				title: title,
				subject: subject,
				body: body,
				recipients: recipients.split(',').map(email => {
					return { email: email.trim() };
				}),
				// yes: { type: Number, default: 0 },
				// no: { type: Number, default: 0 },
				_user: request.user.id,
				dateSent: Date.now()
				// lastResponded: Date
			});

			// 2) create and send emails
			const mailer = new Mailer(survey, surveyTemplate(survey));
			try {
				await mailer.send();

				// 3) if emails sent successfully save survey
				await survey.save();
				request.user.credits -= 1;
				const user = await request.user.save();

				response.send(user);
			} catch (err) {
				response.status(422).send(err);
			}
		}
	);
};
