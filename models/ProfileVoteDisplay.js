const mongoose = require('mongoose');
const { Schema } = mongoose; // = const Schema = mongoose.Schema;

const profileVoteDisplaySchema = new Schema({
	question: String,
	_askId: { type: Schema.Types.ObjectId, ref: 'Ask' },
	selectedAnswer: String,
	_answerId: { type: Schema.Types.ObjectId }
});

module.exports = profileVoteDisplaySchema;
