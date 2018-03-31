const mongoose = require('mongoose');
const { Schema } = mongoose; // = const Schema = mongoose.Schema;

const conversationSchema = new Schema({
	user1: {
		name: String,
		id: String
	},
	user2: {
		name: String,
		id: String
	},
	last50Messages: []
});

mongoose.model('conversations', conversationSchema);
