const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const ConversationCollection = mongoose.model('conversations');
const ClientInConversationCollection = mongoose.model('clientsInConversation');

const getOnlineContacts = async allContacts => {
	let onlineContacts = [];
	for (let i = 0; i < allContacts.length; i++) {
		const contactInConversation = await ClientInConversationCollection.findOne(
			{
				mongoDBUserId: allContacts[i].matchId
			}
		);
		console.log('contactInConversation = ', contactInConversation);
		console.log('allContacts[i] = ', allContacts[i]);
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

			console.log('request.body = ', request.body);
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

				console.log('clientInConversation = ', clientInConversation);

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
							console.log('new socketId = ', socketId);
						} catch (error) {
							response.status(422).send(error);
						}
					}
				}

				// respond with which of the client's contacts can chat over websockets
				const onlineContacts = await getOnlineContacts(allContacts);
				console.log('onlineContacts = ', onlineContacts);
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
