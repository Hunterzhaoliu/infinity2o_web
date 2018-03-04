const mongoose = require('mongoose');
const { Schema } = mongoose;
const AnswerSchema = require('./Answer');

const asksSchema = new Schema({
	question: String,
	totalVotes: { type: Number, default: 0 },
	answers: [AnswerSchema],
	_userId: { type: Schema.Types.ObjectId, ref: 'User' },
	dateAsked: Date,
	lastVotedOn: Date
});

//mongoose class, ask collection
mongoose.model('asks', asksSchema);
