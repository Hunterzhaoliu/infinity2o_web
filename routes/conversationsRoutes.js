const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const ConversationCollection = mongoose.model('conversations');
const ClientInConversationCollection = mongoose.model('clientsInConversation');

const getOnlineContacts = async (allContacts, socketId, socket) => {
	let onlineContacts = [];
	for (let i = 0; i < allContacts.length; i++) {
		// TODO: optimize this, don't want to be searching individually
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

			// TODO: update contact with your new latest socketId
			const newContactInfo = {
				conversationId: contactInConversation.conversationId,
				socketId: socketId
			};

			console.log('newContactInfo = ', newContactInfo);
			console.log(
				'contactInConversation.socketId = ',
				contactInConversation.socketId
			);

			socket
				.to(contactInConversation.socketId)
				.emit(
					'TELL_CLIENT_X:ONE_OF_YOUR_CONTACTS_IS_ONLINE',
					newContactInfo
				);
		} else {
			allContacts[i]['isOnline'] = false;
			allContacts[i]['socketId'] = null;
			onlineContacts.push(allContacts[i]);
		}
	}
	return onlineContacts;
};

module.exports = app => {
	app.get('/api/conversations', requireLogin, async (request, response) => {
		const conversation = await ConversationCollection.findOne({
			_id: request.query.conversationId
		});

		response.send(conversation);
	});

	app.post(
		'/api/conversations/clients_online',
		requireLogin,
		async (request, response) => {
			const { mongoDBUserId, allContacts, socketId } = request.body;

			if (
				mongoDBUserId !== null &&
				socketId !== null &&
				allContacts !== null
			) {
				const clientInConversation = await ClientInConversationCollection.findOne(
					{
						mongoDBUserId: mongoDBUserId
					}
				);

				// console.log('clientInConversation = ', clientInConversation);

				if (clientInConversation === null) {
					// this is the client's initial connection
					const newClientInConversation = {
						mongoDBUserId: mongoDBUserId,
						socketId: socketId
					};
					ClientInConversationCollection.create(
						newClientInConversation
					);
				} else {
					// update clientInConversation if socketId is newer
					console.log('new socketId = ', socketId);
					if (clientInConversation.socketId !== socketId) {
						try {
							await ClientInConversationCollection.updateOne(
								{
									mongoDBUserId: mongoDBUserId
								},
								{
									$set: {
										socketId: socketId
									}
								}
							);
						} catch (error) {
							response.status(422).send(error);
						}
					}
				}

				let socket = request.app.get('socket');

				// respond with which of the client's contacts can chat over websockets
				const onlineContacts = await getOnlineContacts(
					allContacts,
					socketId,
					socket
				);
				response.send(onlineContacts);
			}
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
