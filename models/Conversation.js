const mongoose = require('mongoose');
const { Schema } = mongoose;
const MessageSchema = require('./Message');

const conversationSchema = new Schema({
	user1: {
		name: String,
		id: String
	},
	user2: {
		name: String,
		id: String
	},
	last50Messages: [MessageSchema]
});

mongoose.model('conversations', conversationSchema);
