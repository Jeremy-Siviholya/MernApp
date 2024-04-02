const mongoose = require("mongoose");




const TrajetSchema = new mongoose.Schema({
    intervalTemp: {
    type: String,
    required: true,
  },

  prix: {
    type: Number,
    required: true,
  },
  
});


const TrajetModel = mongoose.model("trajets", TrajetSchema);
module.exports = TrajetModel;
