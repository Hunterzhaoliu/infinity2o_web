const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
	name: String,
	age: { type: Number },
	interests: [String],
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	dateCreated: Date
});

mongoose.model('profiles', profileSchema);
