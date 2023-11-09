const mongoose = require("mongoose");

const BuildingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  numberOfFloors: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  parkingAvailability: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("building", BuildingSchema);
