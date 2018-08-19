const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
  timeCreated: Date,
  status: String
});

module.exports = messageSchema;
