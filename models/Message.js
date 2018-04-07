const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
	senderName: String,
	content: String,
	timeCreated: Date,
	status: String
});

module.exports = messageSchema;
