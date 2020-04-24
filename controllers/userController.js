const mongoose = require("mongoose");
const Store = require("../models/store");
const path  = require("path");
const userSchema = require("../models/users")
const User = mongoose.model("Users",userSchema);

exports.profile = (req,res) =>{
  res.render("profile")
}

exports.editProfile =async (req,res) =>{
  
 try{
  await User.updateOne({_id: req.params.id},req.body,(err,docs)=>{
    if(err){
      throw err;
    }else{
      // redirect to the store page  and show flash message
      req.flash("success","The profile has been updated")
      res.redirect("back")
    }
  })
}catch(err){
 if(err){
   throw err;
 }
}
  

}