const mongo = require('mongo');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var slug = require("mongoose-slug-generator");
// mongoose.plugin(slug);


const storeSchema = new mongoose.Schema({
  name:{
   type:String,
   trim:true,
   lowercase:true
  },
  // Define the slug parameters------------------
  // TODO for SEO
  
photo:{
  type:String,
  required:true
 },
  description:{
   type:String,
   trim:true,
   lowercase:true
  },
  tags:[String],
  created:{
     type:Date,
     default:Date.now()
  },
  address:{
    type:String
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!'
    }]
  },
  heartCount:[
    {type : mongoose.Schema.ObjectId , ref:'User',default:0}
  ]
})



// label(for="lng") Address Lng
//   input(type="number" id="lng" name="location[coordinates][0]" value=(store.location && store.location.coordinates[0] ) required)
//   label(for="lat") Address lat
//   input(type="number" id="lng" name="location[coordinates][1]" value=(store.location && store.location.coordinates[1] ) required)

storeSchema.index({
  name:"text",
  description:"text"
})



storeSchema.statics.getTagsList = function(){
  return this.aggregate([
    {$unwind : '$tags'},
    {$group: {_id : '$tags', count : { $sum : 1} }},
    {$sort : {count : -1} }
  ])
}


module.exports = mongoose.model('Store',storeSchema);


