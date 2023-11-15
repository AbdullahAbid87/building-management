const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  buildingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "building",
  },
  apartmentId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "apartment",
    },
  ],
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  profession: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
