const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const ConversationCollection = mongoose.model('conversations');
const ClientInConversationCollection = mongoose.model('clientsInConversation');

const getOnlineContacts = async (
	allContacts,
	socketId,
	socket,
	clientMongoDBUserId
) => {
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

			const newContactInfo = {
				matchId: clientMongoDBUserId,
				socketId: socketId
			};

			socket
				.to(contactInConversation.socketId)
				.emit(
					'TELL_CLIENT_X:ONE_OF_YOUR_CONTACTS_IS_ONLINE',
					newContactInfo
				);
			console.log(
				'contactInConversation.socketId = ',
				contactInConversation.socketId
			);
			console.log(
				'TELL_CLIENT_X:ONE_OF_YOUR_CONTACTS_IS_ONLINE newContactInfo = ',
				newContactInfo
			);
		} else {
			allContacts[i]['isOnline'] = false;
			allContacts[i]['socketId'] = null;
			onlineContacts.push(allContacts[i]);
		}
	}
	//console.log('onlineContacts = ', onlineContacts);
	return onlineContacts;
};

const tellContactsUserIsOnline = async (
	mostRecentUserConversations,
	newClientInConversation,
	socket
) => {
	// tell all the user's contacts that are already online that the user is online
	for (let i = 0; i < mostRecentUserConversations.length; i++) {
		const contactInConversation = await ClientInConversationCollection.findOne(
			{
				mongoDBUserId: mostRecentUserConversations[i]['matchId']
			}
		);

		if (contactInConversation !== null) {
			// the current contact is online
			socket
				.to(contactInConversation['socketId'])
				.emit(
					'TELL_CONTACT_X:ONE_OF_YOUR_CONTACTS_IS_ONLINE',
					newClientInConversation
				);
			console.log(
				'told contact ' +
					contactInConversation['mongoDBUserId'] +
					'that user is online'
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
		'/api/conversations/clients_online',
		requireLogin,
		async (request, response) => {
			const redis = request.app.get('redis');
			redis.get(request.query.mongoDBUserId, function(err, reply) {
				console.log('GET /clients_onlie reply = ', reply);
				if (reply === null) {
					response.send('not online');
				} else {
					response.send(reply);
				}
			});
		}
	);

	app.post(
		'/api/conversations/clients_online',
		requireLogin,
		async (request, response) => {
			const {
				mongoDBUserId,
				socketId,
				userConversations,
				socket
			} = request.body;
			// this is the client's initial connection
			const redis = request.app.get('redis');
			console.log(
				'saved socket into redis for mongoDBUserId = ',
				mongoDBUserId
			);
			redis.set(mongoDBUserId, socket);
			console.log('after redis.set(mongoDBUserId, socket);');

			// TODO:
			// const currentSocket = request.app.get('socket');
			// tellContactsUserIsOnline(
			// 	userConversations,
			// 	newClientInConversation,
			// 	currentSocket
			// );
			response.send("added user's socket to redis");
		}
	);

	// app.delete(
	// 	'/api/conversations/clients_online',
	// 	requireLogin,
	// 	async (request, response) => {
	// 		const { mongoDBUserId } = request.body;
	// 		console.log('DELETE mongoDBUserId = ', mongoDBUserId);
	//
	// 		await ClientInConversationCollection.deleteOne(
	// 			{
	// 				mongoDBUserId: mongoDBUserId
	// 			},
	// 			function(error) {
	// 				response.send('Error');
	// 			}
	// 		);
	// 		response.send('Deleted');
	// 	}
	// );

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
