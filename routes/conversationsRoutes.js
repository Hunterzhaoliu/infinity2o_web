const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const ConversationCollection = mongoose.model('conversations');
const ClientInConversationCollection = mongoose.model('clientsInConversation');

const getOnlineContacts = async (allContacts, serverSocket) => {
	let onlineContacts = [];
	for (let i = 0; i < allContacts.length; i++) {
		const contactInConversation = await ClientInConversationCollection.findOne(
			{
				mongoDBUserId: allContacts[i].matchId
			}
		);

		if (contactInConversation !== null) {
			// the current contact is online
			allContacts[i]['isOnline'] = true;
			allContacts[i]['socketId'] = contactInConversation.socketId;
			onlineContacts.push(allContacts[i]);
		} else {
			allContacts[i]['isOnline'] = false;
			allContacts[i]['socketId'] = null;
			onlineContacts.push(allContacts[i]);
		}
	}
	console.log('onlineContacts = ', onlineContacts);
	return onlineContacts;
};

const tellContactsUserIsOnline = async (
	userConversations,
	mongoDBUserId,
	serverSocket,
	socketId
) => {
	// tell all the user's contacts that are already online that the user is online
	for (let i = 0; i < mostRecentUserConversations.length; i++) {
		const contactInConversation = await ClientInConversationCollection.findOne(
			{
				mongoDBUserId: mostRecentUserConversations[i]['matchId']
			}
		);

		const newContactInfo = {
			userId: mongoDBUserId,
			socketId: socketId
		};

		if (contactInConversation !== null) {
			// the current contact is online
			serverSocket
				.to(contactInConversation['socketId'])
				.emit(
					'TELL_CONTACT_X:ONE_OF_YOUR_CONTACTS_IS_ONLINE',
					newContactInfo
				);
			console.log(
				'updated the socketId of this contact: ' +
					contactInConversation['mongoDBUserId']
			);
		}
	}
};

module.exports = app => {
	app.get('/api/conversations', requireLogin, async (request, response) => {
		const conversation = await ConversationCollection.findOne({
			_id: request.query.conversationId
		});
		response.send(conversation);
	});

	app.get(
		'/api/conversations/user_contacts_online_status',
		requireLogin,
		async (request, response) => {
			console.log('request.query = ', request.query);
			response.send('onlineContacts are not ready yet');
		}
	);
	app.post(
		'/api/conversations/user_online',
		requireLogin,
		async (request, response) => {
			const {
				mongoDBUserId,
				userConversations,
				clientSocketId
			} = request.body;

			if (process.env.NODE_ENV === 'production') {
				// only store socketId in redis during staging or production
				const redis = request.app.get('redis');
				redis.set(mongoDBUserId, clientSocketId);
				console.log('saved socketId = ', clientSocketId);
				console.log('into redis for mongoDBUserId = ', mongoDBUserId);
			}

			// tellContactsUserIsOnline(
			// 	userConversations,
			// 	mongoDBUserId,
			// 	serverSocket,
			// 	socketId
			// );
			response.send("added user's serverSocketId to redis");
		}
	);

	app.delete(
		'/api/conversations/user_online',
		requireLogin,
		async (request, response) => {
			const { mongoDBUserId } = request.body;
			console.log('DELETE mongoDBUserId = ', mongoDBUserId);

			const redis = request.app.get('redis');
			redis.del(mongoDBUserId);

			response.send('Deleted');
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
