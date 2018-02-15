const mongoose = require('mongoose');
const { Schema } = mongoose; // = const Schema = mongoose.Schema;
//schema describes every property of a user
const userSchema = new Schema({
	auth: {
		googleId: String,
		linkedInId: String,
		location: String
	},
	profile: {
		name: String,
		age: { type: Number },
		interests: [String],
		time_zone: String,
		availability: [String]
	}
});

mongoose.model('users', userSchema);
//model class, user collection
