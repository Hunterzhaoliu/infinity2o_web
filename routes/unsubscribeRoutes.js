const mongoose = require("mongoose");
const UserCollection = mongoose.model("users");

module.exports = app => {
  app.put("/api/unsubscribe", async (request, response) => {
    const { userId } = request.body;
    const userInDB = await UserCollection.updateOne(
      {
        _id: userId
      },
      {
        $set: {
          "profile.emailInformation.wantsEmailNotifications": false
        }
      }
    );
    response.send("done");
  });
};
