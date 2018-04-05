const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientInConversationSchema = new Schema({
	mongoDBUserId: String,
	socketId: String
});

mongoose.model('clientsInConversation', clientInConversationSchema);
