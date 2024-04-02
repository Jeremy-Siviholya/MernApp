const mongoose = require("mongoose");



const ReserveSchema = new mongoose.Schema({
  clients:[
    {type:'ObjectId',ref:'clients'}
  ],

  flights:[
    {type:'ObjectId',ref:'flights'}
  ],


  trajets:[
    {type:'ObjectId',ref:'trajets'}
  ],

dateReservation: {
  type: Date,
  required: false,

},
username: {
  type: String,
  required: true,
},
});




ReserveSchema.statics.TotalReserve =async function() {
  return this.countDocuments().exec();
};


const ReserveModel = mongoose.model("reserves", ReserveSchema);
module.exports =  ReserveModel