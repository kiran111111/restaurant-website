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



module.exports = userSchema;

