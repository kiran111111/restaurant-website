const mongo = require("mongo");
const mongoose = require("mongoose");


const reviewSchema = mongoose.Schema({
 created:{
  type : Date,
  default: Date.now
 },
 author:{
  type:mongoose.Schema.ObjectId,
  ref:'User',
  required:'You must supply an author'
 },
 store:{
  type:mongoose.Schema.ObjectId,
  ref:'Store',
  required:'You must supply a store'
 },
 text:{
  type:String,
  required:'Your review must have a text'
 },
 rating:{
  type:Number,
  min:1,
  max:5
 }
})




module.exports = mongoose.model('Review',reviewSchema);