const mongoose = require('mongoose');
const { Schema } = mongoose;
const MatchSchema = require('./Match');

const matchSchema = new Schema({
	id: { type: Schema.Types.ObjectId, ref: 'User' },
	seen: { type: Boolean, default: false }
});

mongoose.model('match', matchSchema);
