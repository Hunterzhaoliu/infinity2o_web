const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const ConversationCollection = mongoose.model("conversations");
const UserCollection = mongoose.model("users");
const amqp = require("amqplib/callback_api");

const getMatchesInfo = async mongoDBUserIds => {
  let matches_info = [];
  for (let mongoDBUserId of mongoDBUserIds) {
    const user = await UserCollection.findOne({
      _id: mongoDBUserId
    });
    matches_info.push({
      name: user.profile.name,
      age: user.profile.age,
      linkedInPublicProfileUrl: user.profile.linkedInPublicProfileUrl,
      githubPublicProfileUrl: user.profile.githubPublicProfileUrl,
      interests: user.profile.interests,
      timeZone: user.profile.timeZone,
      totalUserVotes: user.profile.asks.totalUserVotes,
      availability: user.profile.availability,
      asks: user.profile.asks,
      id: user._id,
      imageUrl: user.profile.imageUrl
    });
  }
  return matches_info;
};

const generateUniqueUID = () => {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
};

module.exports = app => {
  app.get("/api/matches", requireLogin, async (request, response) => {
    // formats the request string into an array
    const mongoDBUserIds = request.query.mongoDBUserIds.split(",");
    let matches_info = await getMatchesInfo(mongoDBUserIds);
    response.send(matches_info);
  });

  app.post(
    "/api/matches/start_conversation",
    requireLogin,
    async (request, response) => {
      const { matchId, matchName } = request.body;
      //console.log('start_conversation request.body = ', request.body);

      const userId = request.user._id;
      let userName;
      if (request.user.profile.name === undefined) {
        userName = "Anonymous";
      } else {
        userName = request.user.profile.name;
      }

      // sets new conversation document to conversation variable
      const conversation = new ConversationCollection({
        user1: { name: userName, id: userId },
        user2: { name: matchName, id: matchId },
        last50Messages: []
      });

      // finds userConversationList && matchConversationList
      const userInDB = await UserCollection.findOne({ _id: userId });
      let userConversationList = userInDB.conversations;
      // console.log('userConversationList = ', userConversationList);
      const matchInDB = await UserCollection.findOne({ _id: matchId });
      let matchConversationList = matchInDB.conversations;
      // console.log('matchConversationList = ', matchConversationList);

      try {
        const conversationInDB = await conversation.save();
        // console.log('conversationInDB = ', conversationInDB);
        userConversationList.push({
          conversationId: conversationInDB._id,
          matchName: matchName,
          matchId: matchId,
          isOnline: false,
          socketId: null
        });
        await UserCollection.updateOne(
          { _id: userId },
          { $set: { conversations: userConversationList } },
          { upsert: true }
        );
        matchConversationList.push({
          conversationId: conversationInDB._id,
          matchName: userName,
          matchId: userId,
          isOnline: false,
          socketId: null
        });

        await UserCollection.updateOne(
          { _id: matchId },
          { $set: { conversations: matchConversationList } },
          { upsert: true }
        );
        response.send(userConversationList);
      } catch (error) {
        response.status(422).send(error);
      }
    }
  );

  app.delete(
    "/api/matches/delete_match",
    requireLogin,
    async (request, response) => {
      const { matchId } = request.body;
      const userId = request.user._id;

      let userMatchesDict = await UserCollection.findOne(
        { _id: userId },
        { matches: true, _id: false }
      );

      let userMatches = userMatchesDict.matches;
      let matchIndex = userMatches.indexOf(matchId);

      userMatches.splice(matchIndex, 1);

      // let userMatches = userInDB.matches;
      const matchInDB = await UserCollection.findOne({ _id: matchId });
      let matchMatches = matchInDB.matches;

      let userIndex = matchMatches.indexOf(userId);
      if (userIndex > -1) {
        matchMatches.splice(userIndex, 1);
      }

      try {
        await UserCollection.updateOne(
          { _id: userId },
          { $set: { matches: userMatches } }
        );
        await UserCollection.updateOne(
          { _id: matchId },
          { $set: { matches: matchMatches } }
        );
        response.send("successful");
      } catch (error) {
        response.status(422).send(error);
      }
    }
  );

  app.post("/api/matches/initial", requireLogin, async (request, response) => {
    // send message to minerva server to run minerva
    // for a specific user
    const { mongoDBUserId } = request.body;
    const URL = "amqp://infinity2o:2134711@52.4.101.52:5672";
    await amqp.connect(URL, function(error, connection) {
      connection.createChannel(function(error, channel) {
        let sendToQueueName = "run_athena_for_new_user_queue";
        channel.assertQueue("", { exclusive: true }, function(
          error,
          replyToQueueObject
        ) {
          const correlationId = generateUniqueUID();

          console.log(
            " [x] Requesting Athena matches for mongoDBUserId=%s",
            mongoDBUserId
          );

          channel.consume(
            replyToQueueObject.queue,
            function(messageFromServer) {
              if (messageFromServer.properties.correlationId == correlationId) {
                const mongoDBUserIdFromAthenaServer = messageFromServer.content.toString();
                console.log(
                  " [.] Got messageFromServer=%s",
                  mongoDBUserIdFromAthenaServer
                );

                if (mongoDBUserIdFromAthenaServer !== null) {
                  response.send(mongoDBUserIdFromAthenaServer);
                } else {
                  response.status(422).send("ERROR: Athena ran unsuccessfully");
                }
                setTimeout(function() {
                  connection.close();
                }, 500);
              }
            },
            { noAck: true }
          );

          channel.sendToQueue(sendToQueueName, new Buffer(mongoDBUserId), {
            correlationId: correlationId,
            replyTo: replyToQueueObject.queue
          });
        });
      });
    });
  });
};
