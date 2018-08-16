const mongoose = require("mongoose");
const UserCollection = mongoose.model("users");

module.exports = app => {
  app.put("/api/unsubscribe", async (request, response) => {
    const { userId } = request.body;
    const userProfileName = await UserCollection.findOneAndUpdate(
      {
        _id: userId
      },
      {
        $set: {
          "profile.emailInformation.wantsEmailNotifications": false
        }
      },
      {
        projection: { "profile.name": true, _id: false }
      }
    );
    response.send(userProfileName.profile.name);
  });
};
