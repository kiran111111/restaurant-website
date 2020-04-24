const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");
// Modules for  passport 
const LocalStrategy = require('passport-local').Strategy;
// Schema model setup for database
const userSchema = require("../models/users")
// Modules for express validaiton
// const {userValidationRules,validate} = require("./validator")
// Module for the database model
const User = mongoose.model("Users",userSchema);



// Serialise User
passport.serializeUser(function(user, done) {
 done(null, user.id);               
});

// Deserialise User
passport.deserializeUser(function(id, done) {
 User.findById(id, function(err, user) {
   done(err, user);
 });
});   

// Local Strategy of passport for Login...........................
passport.use(new LocalStrategy(
   function(username,password,done){
     User.findOne({username:username},async (err,user)=>{
       if(err){
         throw err;
       }
       if(!user){
         return done(null,false,{type:'danger', message: 'Username not Found, Please Register !' })
       }
       
       try{
         if(await bcrypt.compare(password,user.password)){
            return done(null,user,{message: 'You got it' })
         }
         else{
           return done(null,false,{type:'danger', message: 'Incorrect Password'})
          }
       }catch(err){
         return done(err);
      }
    })
  })
)



