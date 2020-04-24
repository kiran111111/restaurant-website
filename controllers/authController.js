const mongoose = require("mongoose");
const Store = require("../models/store");
const path  = require("path");
const bcrypt = require("bcrypt");
const userSchema = require("../models/users")
// Modules for express validaiton
// const {userValidationRules,validate} = require("./validator")

// Module for the database model
const User = mongoose.model("Users",userSchema);


exports.register = (req,res) =>{
 res.render("register");
}

exports.login = (req,res) =>{
 res.render("login");
}

exports.registered = async (req,res) =>{
 await User.findOne({username:req.body.username},async (err,docs)=>{
  if(err){
   console.log(err)
  }
   else if(docs){
    req.flash("danger","Username already exists");
    res.redirect("/register");
   }else{
    try{
     const hashedPassword = await bcrypt.hash(req.body.password,10);
      let user = new User({
       name:req.body.name,
      username:req.body.username,
       password:hashedPassword
      }) 

       await user.save();
       req.flash("success","User has been created");
       res.redirect("/login")

      }catch(err){
       res.redirect("/register");
      }
    }
  }) 
}


exports.loggedIn = (req,res) =>{
  req.flash("success",`You have logged in ,${req.user.name} !`);
  res.redirect("/stores");
}


exports.logout  = (req,res) =>{
  req.logout();
  req.flash('success', `You are now logged out `);
  res.redirect('/login');
}

 
// Middleware for checking if user is authentiacated
exports.checkAuthenticated = (req, res, next)=> {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

exports.checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/stores')
  }
  next()
}

