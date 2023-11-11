const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  handymenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "open",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("request", RequestSchema);
