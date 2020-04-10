const mongo = require('mongo');
const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
  name:{
   type:String,
   trim:true,
   required:"Please enter a name"
  },
  slug:String,
  description:{
   type:String,
   trim:true
  },
  tags:[String]
})

module.exports = mongoose.model('Store',storeSchema);