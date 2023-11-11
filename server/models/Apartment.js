const mongoose = require("mongoose");

const ApartmentSchema = mongoose.Schema({
  buildingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "building",
    required: true,
  },
  apartmentTitle: {
    type: String,
    required: true,
  },
  numberOfBedrooms: {
    type: String,
    required: true,
  },
  numberOfBathrooms: {
    type: Number,
    required: true,
  },
  floorLevel: {
    type: String,
    required: true,
  },
  monthlyRent: {
    type: String,
    required: true,
  },
  isRented: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("apartment", ApartmentSchema);
