const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
	senderName: String,
	content: String,
	timeCreated: Date
});

module.exports = messageSchema;
