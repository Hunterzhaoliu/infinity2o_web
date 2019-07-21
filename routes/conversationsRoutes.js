const _ = require("lodash");
const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const ConversationCollection = mongoose.model("conversations");
const UserCollection = mongoose.model("users");

const tellContactsUserIsOnline = async (
  userConversations,
  mongoDBUserId,
  serverSocket,
  clientSocketId,
  redis
) => {
  // tell all the user's contacts that are already online that the user is online
  for (let i = 0; i < userConversations.length; i++) {
    const contactMongoDBId = userConversations[i]["matchId"];
    redis.get(contactMongoDBId, function(err, reply) {
      if (reply !== null) {
        const contactSocketId = reply.toString();
        // contact is online
        const newUserSocketInfo = {
          userId: mongoDBUserId,
          socketId: clientSocketId
        };

        // send message to contact telling them we are also online
        serverSocket
          .to(contactSocketId)
          .emit(
            "TELL_CONTACT_X:ONE_OF_YOUR_CONTACTS_IS_ONLINE",
            newUserSocketInfo
          );
        // console.log(
        // 	'updated contactMongoDBId = ' +
        // 		contactMongoDBId +
        // 		' with our socketId'
        // );
      }
    });
  }
};

const updateUserConversationsWithOnlineContacts = async (
  userConversations,
  redis
) => {
  // https://stackoverflow.com/questions/29693469/node-js-wait-for-all-redis-queries-to-complete-before-continuing-with-execution
  await Promise.all(
    _.map(userConversations, userConversation => {
      return new Promise(function(resolve, reject) {
        redis.get(userConversation.matchId, function(err, reply) {
          if (err) {
            return reject(err);
          } else if (reply !== null) {
            const contactSocketId = reply.toString();
            // the current contact is online
            userConversation["isOnline"] = true;
            userConversation["socketId"] = contactSocketId;
          } else if (reply === null) {
            // TODO: remove when we actually figure out how to detect user is offline
            userConversation["isOnline"] = false;
            userConversation["socketId"] = null;
          }
          resolve();
        });
      });
    })
  )
    .then(function() {
      // console.log('All operations are done');
    })
    .catch(function(error) {
      console.log(error);
    });
  return userConversations;
};

module.exports = app => {
  app.get("/api/conversations", requireLogin, async (request, response) => {
    const conversation = await ConversationCollection.findOne({
      _id: request.query.conversationId
    });
    response.send(conversation);
  });

  app.post(
    "/api/conversations/user_online",
    requireLogin,
    async (request, response) => {
      const { mongoDBUserId, userConversations, clientSocketId } = request.body;

      const redis = request.app.get("redis");

      redis.get(mongoDBUserId, function(err, reply) {
        if (reply !== null) {
          const oldClientSocketId = reply.toString();
          redis.del(oldClientSocketId);
        }
      });

      redis.set(mongoDBUserId, clientSocketId);
      redis.set(clientSocketId, mongoDBUserId);

      const serverSocket = request.app.get("serverSocket");

      tellContactsUserIsOnline(
        userConversations,
        mongoDBUserId,
        serverSocket,
        clientSocketId,
        redis
      );
      response.send("added user's serverSocketId to redis");
    }
  );

  app.put(
    "/api/conversations/online_contacts",
    requireLogin,
    async (request, response) => {
      const redis = request.app.get("redis");
      const updatedUserConversations = await updateUserConversationsWithOnlineContacts(
        request.body,
        redis
      );
      response.send(updatedUserConversations);
    }
  );

  app.post(
    "/api/conversations/chat",
    requireLogin,
    async (request, response) => {
      const { conversationId, senderId, message, timeCreated } = request.body;
      // GOAL = save newMessage into correct conversation document
      const newMessage = {
        senderId: senderId,
        content: message,
        timeCreated: timeCreated,
        status: "delivered"
      };
      const conversation = await ConversationCollection.findOne(
        {
          _id: conversationId
        },
        { last50Messages: true }
      );
      let last50Messages = conversation.last50Messages;
      last50Messages.push(newMessage);
      if (last50Messages.length > 50) {
        // removes first element from array
        last50Messages.shift();
      }

      try {
        await ConversationCollection.updateOne(
          {
            _id: conversationId
          },
          {
            $set: {
              last50Messages: last50Messages
            }
          }
        );

        response.send(last50Messages);
      } catch (error) {
        response.status(422).send(error);
      }
    }
  );

  app.delete(
    "/api/conversations/delete",
    requireLogin,
    async (request, response) => {
      const { conversationId, contactMongoDBId } = request.body;
      const userId = request.user._id;
      try {
        // https://stackoverflow.com/questions/16959099/how-to-remove-array-element-in-mongodb
        // deletes conversation in the conversation collection
        await ConversationCollection.deleteOne({ _id: conversationId });
        // deletes conversation from user's conversations
        await UserCollection.update(
          { _id: userId },
          {
            $pull: {
              "conversations.userConversations": {
                conversationId: conversationId
              }
            }
          }
        );
        // deletes conversation in contact's conversations
        await UserCollection.update(
          { _id: contactMongoDBId },
          {
            $pull: {
              "conversations.userConversations": {
                conversationId: conversationId
              }
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
    "/api/conversations/completed_course",
    requireLogin,
    async (request, response) => {
      const userId = request.user._id;
      const { courseName, courseProvider } = request.body;
      const completedCourse = {
        courseName: courseName,
        courseProvider: courseProvider
      };

      await UserCollection.update(
        { _id: userId },
        {
          $push: {
            "profile.minerva.completedCourses": completedCourse
          }
        }
      );

      response.send("done");
    }
  );
};
