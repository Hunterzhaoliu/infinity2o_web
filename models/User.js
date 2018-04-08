const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProfileQuestionDisplay = require('./ProfileQuestionDisplay');
const ProfileVoteDisplay = require('./ProfileVoteDisplay');
const userConversationSchema = require('./UserConversation');

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
		timeZone: String,
		availability: {
			monday: [String],
			tuesday: [String],
			wednesday: [String],
			thursday: [String],
			friday: [String],
			saturday: [String],
			sunday: [String]
		},
		asks: {
			questions: [ProfileQuestionDisplay],
			votes: [ProfileVoteDisplay],
			answerIdsUserVotedOn: [Schema.Types.ObjectId],
			totalUserVotes: { type: Number, default: 0 }
		},
		payment: {
			neuronsInBillions: {
				type: Number,
				default: 3
			}
		}
	},
	matches: [String],
	conversations: [userConversationSchema]
});

mongoose.model('users', userSchema);
