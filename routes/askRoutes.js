const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Ask = mongoose.model('asks');

module.exports = app => {
	app.post('/api/ask', requireLogin, async (request, response) => {
		console.log('request.body = ', request.body);
		const { newQuestion, newAnswers } = request.body;
		console.log('newQuestion = ', newQuestion);
		console.log('newAnswers = ', newAnswers);
		const answers = _.map(newAnswers, answer => {
			return {
				answer: answer,
				votes: { type: Number, default: 0 }
			};
		});
		const ask = new Ask({
			question: newQuestion,
			answers: answers,
			_userId: request.user.id,
			dateSent: Date.now()
		});
		console.log('ask = ', ask);
		try {
			await ask.save();
			//saves document ask in collection asks
			response.send(ask);
		} catch (error) {
			response.status(422).send(error);
		}
	});
};
