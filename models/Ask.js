const mongoose = require('mongoose');
const { Schema } = mongoose; // = const Schema = mongoose.Schema;
const AnswerSchema = require('./Answer');

const asksSchema = new Schema({
	question: [String],
	totalVotes: { type: Number, default: 0 },
	answers: [AnswerSchema],
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	datsAsked: Date,
	lastVotedOn: Date
});

mongoose.model('asks', asksSchema);
