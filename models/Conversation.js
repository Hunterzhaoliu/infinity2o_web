const mongoose = require("mongoose");
const { Schema } = mongoose;
const MessageSchema = require("./Message");

const conversationSchema = new Schema({
  user1: {
    id: { type: Schema.Types.ObjectId, ref: "User" }
  },
  user2: {
    id: { type: Schema.Types.ObjectId, ref: "User" }
  },
  last50Messages: [MessageSchema]
});

mongoose.model("conversations", conversationSchema);
