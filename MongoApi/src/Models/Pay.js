const mongoose = require("mongoose");

const PaySchema = new mongoose.Schema({
    reserves:[
        {type:'ObjectId',ref:'reserves'}
      ],

  montant: {
    type: Number,
    required: true,
  },

  datePaiement: {
    type: Date,
    required: false,
  },
});



const PayModel = mongoose.model("payements", PaySchema);
module.exports = PayModel;