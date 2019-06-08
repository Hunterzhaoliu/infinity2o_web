const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProfileQuestionDisplay = require("./ProfileQuestionDisplay");
const ProfileVoteDisplay = require("./ProfileVoteDisplay");
const UserConversation = require("./UserConversation");
const Match = require("./Match");
const CompletedCourse = require("./CompletedCourse");

const userSchema = new Schema(
  {
    auth: {
      googleId: String,
      linkedInId: String,
      location: String
    },
    profile: {
      colorTheme: {
        savedBackgroundColor: {
          type: String,
          default: "rgb(229, 229, 229)"
        },
        savedColorPallateIndex: { type: Number, default: 4 }
      },
      name: String,
      emailInformation: {
        email: String,
        wantsEmailNotifications: { type: Boolean, default: true }
      },
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
          default: 1.2
        }
      },
      minerva: {
        // after a new user votes on 4 asks we run Athena
        ranInitialMinerva: { type: Boolean, default: false },
        lastRecordedSiteVisitDate: Date,
        completedCourses: [CompletedCourse]
      }
    },
    matches: [Match],
    conversations: {
      userConversations: [UserConversation],
      totalNumberOfUnseenMessages: {
        type: Number,
        default: 0
      }
    }
  },
  {
    usePushEach: true
    // allows for request.user.save()
  }
);

mongoose.model("users", userSchema);
