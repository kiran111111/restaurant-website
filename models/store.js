const mongo = require('mongo');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const storeSchema = new mongoose.Schema({
  name:{
   type:String,
   trim:true,
   required:"Please enter a name"
  },
  // Define the slug parameters------------------
  slug: String ,
  description:{
   type:String,
   trim:true
  },
  tags:[String]
})

module.exports = mongoose.model('Store',storeSchema);