const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const UserCollection = mongoose.model('users');

const updateUserConversationsWithOnlineContacts = async (
	userConversations,
	redis
) => {
	console.log('userConversations = ', userConversations);
	Promise.all(
		_.map(userConversations, userConversation => {
			return new Promise(function(resolve, reject) {
				console.log(
					'userConversation.matchId = ',
					userConversation.matchId
				);
				// need to redo this redis.get because await is not working
				redis.get(userConversation.matchId, function(err, reply) {
					if (err) {
						return reject(err);
					} else if (reply !== null) {
						const contactSocketId = reply.toString();
						console.log('contactSocketId = ', contactSocketId);
						// the current contact is online
						userConversation['isOnline'] = true;
						userConversation['socketId'] = contactSocketId;
					}
					resolve();
				});
			});
		})
	).catch(function(err) {
		console.log(err);
	});

	console.log('userConversations after promise = ', userConversations);
	return userConversations;
};

module.exports = app => {
	app.post('/api/profile', requireLogin, async (request, response) => {
		const {
			newName,
			newEmail,
			newAge,
			newInterests,
			newLinkedInPublicProfileUrl,
			newGithubPublicProfileUrl,
			newTimeZone,
			newAvailability
		} = request.body;

		request.user.profile.name = newName;
		request.user.profile.email = newEmail;
		request.user.profile.age = newAge;
		request.user.profile.interests = newInterests;
		request.user.profile.linkedInPublicProfileUrl = newLinkedInPublicProfileUrl;
		request.user.profile.githubPublicProfileUrl = newGithubPublicProfileUrl;
		request.user.profile.timeZone = newTimeZone;
		request.user.profile.availability = newAvailability;

		const user = await request.user.save();
		response.send(user);
	});

	app.put(
		'/api/profile/conversations',
		requireLogin,
		async (request, response) => {
			const redis = request.app.get('redis');
			const updatedUserConversations = await updateUserConversationsWithOnlineContacts(
				request.body,
				redis
			);
			console.log(
				'updatedUserConversations = ',
				updatedUserConversations
			);
			request.user.conversations = updatedUserConversations;
			await request.user.save();
			response.send(updatedUserConversations);
		}
	);

	app.put(
		'/api/profile/decrease_neurons',
		requireLogin,
		async (request, response) => {
			const { decrementAmount, mongoDBUserId } = request.body;

			try {
				await UserCollection.findOneAndUpdate(
					{ _id: mongoDBUserId },
					{
						$inc: {
							'profile.payment.neuronsInBillions': -decrementAmount
						}
					}
				);
				response.send('done');
			} catch (error) {
				response.status(422).send(error);
			}
		}
	);

	app.put(
		'/api/profile/add_neurons',
		requireLogin,
		async (request, response) => {
			const { neuronsInBillions, mongoDBUserId } = request.body;

			try {
				await UserCollection.findOneAndUpdate(
					{ _id: mongoDBUserId },
					{
						$inc: {
							'profile.payment.neuronsInBillions': neuronsInBillions
						}
					}
				);
				response.send('done');
			} catch (error) {
				response.status(422).send(error);
			}
		}
	);
};
