const mongoose = require('mongoose');
const { Schema } = mongoose; // = const Schema = mongoose.Schema;

const profileQuestionDisplaySchema = new Schema({
	question: String,
	_askId: { type: Schema.Types.ObjectId, ref: 'Ask' }
});

module.exports = profileQuestionDisplaySchema;
