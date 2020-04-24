// @Has the Blog Schema

const mongo = require("mongo");
const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
 name:{
  type:String,
 },
username:{
  type:String,
  required:true
 },
 password:{
  type: String,
  required:true
 },
 hearts : [
   {type : mongoose.Schema.ObjectId , ref:'Store'}
 ]
})

// userSchema.virtual('gravatar').get(function(){
//   const hash = crypto.createHash('md5').update(this.email).digest('hex');
//   console.log(hash)
//   return `https://secure.gravatar.com/avatar/af29dd7256a323570c4495b77a39533e?s=60;
// })


module.exports = userSchema;

