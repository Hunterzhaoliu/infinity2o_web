const mongoose = require('mongoose');
const { Schema } = mongoose; // = const Schema = mongoose.Schema;

const answerSchema = new Schema({
	answer: String,
	votes: { type: Number, default: 0 }
});

module.exports = answerSchema;
