const mongoose = require("mongoose");
const Store = require("../models/store")

// Route to HomePage----------------
exports.homepage = (req,res) =>{
  res.render("home");
}


// Route to EditStore-----------------------
exports.addStore = (req,res)=>{
 res.render("editStore",{
  title:"Add Store"
 })
}

// Route to create store
exports.createStore = async (req,res)=>{
 const store = new Store(req.body)
 try{
   await store.save(err=>{
    if(err){
     throw err;
    }else{
     // res.redirect("/storeList")
     res.json(store);
    }
   });
 }catch(err){
   if(err){
    throw err;
   }
 }
}