const mongoose = require("mongoose");
const Store = require("../models/store");
const path  = require("path");
const multer = require("multer");
const jimp = require("jimp");
const uuid = require("uuid");


const multerOptions = {
  storage : multer.memoryStorage(),

  fileFilter(req,file,next){
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto){
      next(null,true)
    }else{
      next({message : 'That filetype is not allowed'},false);
    }
  }
}




// Route to HomePage----------------
exports.homepage = (req,res) =>{
  res.redirect("stores");
}


// Route to EditStore-----------------------
exports.addStore = (req,res)=>{
 res.render("editStore",{
  title:"Add Store"
 })
}

// Middleware for uploading photos
exports.uploads = multer(multerOptions).single('photo');

// Middleware for resizing the photos
exports.resize = async (req,res,next) =>{
  // check if there is no new file
  if(!req.file){
    next();// skip to next middleware
    return;
  }
  const extension = req.file.mimetype.split("/")[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(300,jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // once we have written in out file system
  next();
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

  let store = new Store(req.body);
 try{
   await store.save(err=>{
    if(err){
     console.log(err)
    }else{
      req.flash("success","Store has been created")
      res.redirect("/stores")
    }
   });
 }catch(err){
   if(err){
    console.log(err)
   }
 }
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



