const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const UserCollection = mongoose.model("users");

module.exports = app => {
  app.put(
    "/api/profile/user_visited_site",
    requireLogin,
    async (request, response) => {
      // first set time to local time and then convert to eastern time zone
      let timeInEasternTimeZone = new Date();
      // getTimezoneOffset returns in minutes hence / 60 and subtract four for
      // difference between UTC and eastern time zone
      timeInEasternTimeZone.setHours(
        timeInEasternTimeZone.getHours() +
          timeInEasternTimeZone.getTimezoneOffset() / 60 -
          4
      );
      try {
        await UserCollection.findOneAndUpdate(
          { _id: request.user._id },
          {
            $set: {
              "profile.minerva.lastRecordedSiteVisitDate": timeInEasternTimeZone
            }
          }
        );
        response.send("done");
      } catch (error) {
        response.status(422).send(error);
      }
    }
  );

  app.post("/api/profile", requireLogin, async (request, response) => {
    const {
      name,
      email,
      age,
      interests,
      linkedInPublicProfileUrl,
      githubPublicProfileUrl,
      timeZone,
      availability
    } = request.body;

    if (request.user.profile.name !== name) {
      //user changed their name, need to also update all of their
      // contacts with their new name

      const userConversations = request.user.conversations.userConversations;
      for (let i = 0; i < userConversations.length; i++) {
        await UserCollection.findOneAndUpdate(
          {
            _id: userConversations[i]["matchId"],
            "conversations.userConversations.matchId": request.user._id
          },
          {
            $set: {
              "conversations.userConversations.$.matchName": name
            }
          }
        );
      }
    }
    request.user.profile.name = name;
    request.user.profile.emailInformation.email = email;
    request.user.profile.age = age;
    request.user.profile.interests = interests;
    request.user.profile.linkedInPublicProfileUrl = linkedInPublicProfileUrl;
    request.user.profile.githubPublicProfileUrl = githubPublicProfileUrl;
    request.user.profile.timeZone = timeZone;
    request.user.profile.availability = availability;

    const user = await request.user.save();
    response.send(user);
  });

  app.put(
    "/api/profile/decrease_neurons",
    requireLogin,
    async (request, response) => {
      const { decrementAmount, mongoDBUserId } = request.body;

      try {
        await UserCollection.findOneAndUpdate(
          { _id: mongoDBUserId },
          {
            $inc: {
              "profile.payment.neuronsInBillions": -decrementAmount
            }
          }
        );
        response.send("done");
      } catch (error) {
        response.status(422).send(error);
      }
    }
  );

  app.put(
    "/api/profile/add_neurons",
    requireLogin,
    async (request, response) => {
      const { neuronsInBillions, mongoDBUserId } = request.body;

      try {
        await UserCollection.findOneAndUpdate(
          { _id: mongoDBUserId },
          {
            $inc: {
              "profile.payment.neuronsInBillions": neuronsInBillions
            }
          }
        );
        response.send("done");
      } catch (error) {
        response.status(422).send(error);
      }
    }
  );
  app.put(
    "/api/profile/increment_unseen_messages",
    requireLogin,
    async (request, response) => {
      const { contactMongoDBId, conversationId } = request.body;
      try {
        // https://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects
        await UserCollection.findOneAndUpdate(
          {
            _id: contactMongoDBId,
            "conversations.userConversations.conversationId": conversationId
          },
          {
            $inc: {
              "conversations.userConversations.$.numberOfUnseenMessages": 1,
              "conversations.totalNumberOfUnseenMessages": 1
            }
          }
        );
        response.send("done");
      } catch (error) {
        response.status(422).send(error);
      }
    }
  );

  app.put(
    "/api/profile/seen_new_message",
    requireLogin,
    async (request, response) => {
      const { contactMongoDBId } = request.body;
      try {
        await UserCollection.findOneAndUpdate(
          {
            _id: request.user._id,
            "conversations.userConversations.matchId": contactMongoDBId
          },
          {
            $inc: {
              "conversations.userConversations.$.numberOfUnseenMessages": -1,
              "conversations.totalNumberOfUnseenMessages": -1
            }
          }
        );
        response.send("done");
      } catch (error) {
        response.status(422).send(error);
      }
    }
  );

  app.put(
    "/api/profile/seen_messages",
    requireLogin,
    async (request, response) => {
      const { conversationId, numberOfUnseenMessages } = request.body;
      try {
        await UserCollection.findOneAndUpdate(
          {
            _id: request.user._id,
            "conversations.userConversations.conversationId": conversationId
          },
          {
            $inc: {
              "conversations.userConversations.$.numberOfUnseenMessages": -numberOfUnseenMessages,
              "conversations.totalNumberOfUnseenMessages": -numberOfUnseenMessages
            }
          }
        );
        response.send("done");
      } catch (error) {
        response.status(422).send(error);
      }
    }
  );
};
