const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },

  postnom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
   
  },
  genre: {
    type: String,
  },

  telephone: {
    type: String,
  },
  
});


ClientSchema.statics.totalClients =async function() {
  return this.countDocuments().exec();
};

const ClientsModel = mongoose.model("clients", ClientSchema);
module.exports = ClientsModel;
