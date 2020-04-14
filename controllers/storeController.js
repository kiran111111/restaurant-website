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

// Query to get list of stores
exports.getStores = async (req,res) =>{
  try{
    await Store.find({},(err,docs)=>{
      if(err){
        throw err;
      }else{
        res.render("stores",{
          title:"Stores",
          stores :docs
        })
      }
    });
  }
  catch(err){
    throw err;
  }
   
}



// Route to create store
exports.createStore = async (req,res)=>{

 const store = new Store(req.body)
 
 res.json(store)

//  try{
//    await store.save(err=>{
//     if(err){
//      console.log(err)
//     }else{
//       req.flash("success","Store has been created")
//       res.redirect("/stores")
//     }
//    });
//  }catch(err){
//    if(err){
//     console.log(err)
//    }
//  }
}


// Route to get to  the Edit the Store page 
exports.editStores = async (req,res) =>{
  //  1. Get the store with the given Id
  try{
   await Store.findById({_id: req.params.id},(err,docs)=>{
     if(err){
       throw err;
     }else{
      //  render the form 
      res.render("editStore",{
        title:" Edit  "+ docs.name,
        store:docs
      })
     }
   })
  }
  catch(err){
    if(err){
      throw err;
    }
  }
}


exports.updateStores = async (req,res) =>{
  // find and update the store and handle errors too
  try{
    await Store.updateOne({_id: req.params.id},req.body,(err,docs)=>{
      if(err){
        throw err;
      }else{
        // redirect to the store page  and show flash message
        req.flash("success","The store has been updated")
        res.redirect("/stores")
      }
    })
  }catch(err){
   if(err){
     throw err;
   }
  }
}