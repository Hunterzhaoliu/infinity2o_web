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
		colorTheme: {
			savedBackgroundColor: {
				type: String,
				default: 'rgb(229, 229, 229)'
			},
			savedColorPallateIndex: { type: Number, default: 4 }
		},
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
			infinityStatus: Boolean,
			neuronsInBillions: {
				type: Number,
				default: 0.22
			}
		}
	},
	matches: [String],
	conversations: [userConversationSchema]
});

mongoose.model('users', userSchema);
