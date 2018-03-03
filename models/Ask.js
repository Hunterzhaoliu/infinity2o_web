const mongoose = require('mongoose');
const { Schema } = mongoose; // = const Schema = mongoose.Schema;

const asksSchema = new Schema({
	question: [String],
	totalVotes: { type: Number },
	answers: []
});

mongoose.model('asks', asksSchema);
