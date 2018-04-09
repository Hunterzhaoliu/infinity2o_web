const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.post('/api/stripe', requireLogin, async (request, response) => {
		const {
			token,
			amountInUSDCents,
			chargeDescription,
			neuronsInBillionsToAdd
		} = request.body;

		try {
			const charge = await stripe.charges.create({
				amount: amountInUSDCents,
				currency: 'usd',
				description: chargeDescription,
				source: token.id
			});

			request.user.profile.payment.neuronsInBillions += neuronsInBillionsToAdd;
			if (neuronsInBillionsToAdd === 88888888) {
				request.user.profile.payment.infinityStatus = true;
			}
			const user = await request.user.save();

			response.send(user);
		} catch (error) {
			response.status(422).send(error);
		}
	});
};
