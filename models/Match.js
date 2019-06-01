const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchSchema = new Schema({
  id: { type: Schema.Types.ObjectId, ref: "User" },
  seen: { type: Boolean, default: false }
});

module.exports = matchSchema;
