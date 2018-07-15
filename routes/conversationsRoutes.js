const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const ConversationCollection = mongoose.model('conversations');

const tellContactsUserIsOnline = async (
	userConversations,
	mongoDBUserId,
	serverSocket,
	clientSocketId,
	redis
) => {
	// tell all the user's contacts that are already online that the user is online
	for (let i = 0; i < userConversations.length; i++) {
		const contactMongoDBUserId = userConversations[i]['matchId'];
		redis.get(contactMongoDBUserId, function(err, reply) {
			if (reply !== null) {
				const contactSocketId = reply.toString();
				// contact is online
				const newUserSocketInfo = {
					userId: mongoDBUserId,
					socketId: clientSocketId
				};

				// send message to contact telling them we are also online
				console.log('contact is online, need to send contact newInfo');
				console.log('userConversations = ', userConversations);
				console.log(
					'contact socket id = ',
					userConversations[i]['socketId']
				);
				serverSocket
					.to(contactSocketId)
					.emit(
						'TELL_CONTACT_X:ONE_OF_YOUR_CONTACTS_IS_ONLINE',
						newUserSocketInfo
					);
				console.log(
					'updated the socketId of contact: ' + contactMongoDBUserId
				);
			}
		});
	}
};

module.exports = app => {
	app.get('/api/conversations', requireLogin, async (request, response) => {
		const conversation = await ConversationCollection.findOne({
			_id: request.query.conversationId
		});
		response.send(conversation);
	});

	app.post(
		'/api/conversations/user_online',
		requireLogin,
		async (request, response) => {
			const {
				mongoDBUserId,
				userConversations,
				clientSocketId
			} = request.body;

			const redis = request.app.get('redis');

			redis.get(mongoDBUserId, function(err, reply) {
				if (reply !== null) {
					const oldClientSocketId = reply.toString();
					redis.del(oldClientSocketId);
				}
			});

			redis.set(mongoDBUserId, clientSocketId);
			redis.set(clientSocketId, mongoDBUserId);

			const serverSocket = request.app.get('serverSocket');

			tellContactsUserIsOnline(
				userConversations,
				mongoDBUserId,
				serverSocket,
				clientSocketId,
				redis
			);
			response.send("added user's serverSocketId to redis");
		}
	);

	app.post(
		'/api/conversations/chat',
		requireLogin,
		async (request, response) => {
			const {
				conversationId,
				senderName,
				message,
				timeCreated
			} = request.body;

			// GOAL = save newMessage into correct conversation document
			const newMessage = {
				senderName: senderName,
				content: message,
				timeCreated: timeCreated,
				status: 'delivered'
			};

			const conversation = await ConversationCollection.findOne(
				{
					_id: conversationId
				},
				{ last50Messages: true }
			);
			let last50Messages = conversation.last50Messages;
			last50Messages.push(newMessage);
			if (last50Messages.length > 50) {
				last50Messages.shift();
			}

			try {
				await ConversationCollection.updateOne(
					{
						_id: conversationId
					},
					{
						$set: {
							last50Messages: last50Messages
						}
					}
				);

				response.send(last50Messages);
			} catch (error) {
				response.status(422).send(error);
			}
		}
	);
};
