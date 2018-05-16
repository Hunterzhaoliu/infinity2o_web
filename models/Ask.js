const mongoose = require('mongoose');
const { Schema } = mongoose;
const AnswerSchema = require('./Answer');

const askSchema = new Schema({
	question: String,
	totalVotes: { type: Number, default: 0 },
	answers: [AnswerSchema],
	_userId: { type: Schema.Types.ObjectId, ref: 'User' },
	dateAsked: Date,
	lastVotedOn: Date,
	totalRevotes: { type: Number, default: 0 }
});

mongoose.model('asks', askSchema);
