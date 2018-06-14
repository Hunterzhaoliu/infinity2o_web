const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProfileQuestionDisplay = require('./ProfileQuestionDisplay');
const ProfileVoteDisplay = require('./ProfileVoteDisplay');
const UserConversation = require('./UserConversation');
const Match = require('./Match');

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
		email: String,
		imageUrl: String,
		linkedInPublicProfileUrl: String,
		githubPublicProfileUrl: String,
		age: { type: Number },
		interests: [String],
		timeZone: [String],
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
		},
		minerva: {
			ranInitialMinerva: { type: Boolean, default: false }
			// after a new user votes on 8 asks we run
			// minerva for them for the first time immediately
		}
	},
	matches: [Match],
	conversations: [UserConversation]
});

mongoose.model('users', userSchema);
