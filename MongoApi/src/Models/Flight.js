const mongoose = require("mongoose");

const FightSchema = new mongoose.Schema({
    designation: {
    type: String,
    required: true,
  },

  nbr_place: {
    type: Number,
    required: true,
  },

  datedepart: {
    type: Date,
    required: true,
  },
});


FightSchema.statics.countDocument =async function() {
  return this.countDocuments().exec();
};

const FlightModel = mongoose.model("flights", FightSchema);
module.exports = FlightModel;
