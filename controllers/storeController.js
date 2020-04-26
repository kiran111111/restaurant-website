const mongoose = require("mongoose");
const Store = require("../models/store");
const path  = require("path");
const multer = require("multer");
const jimp = require("jimp");
const uuid = require("uuid");

const userSchema = require("../models/users")
const User = mongoose.model("Users",userSchema);




const multerOptions = {
  storage : multer.memoryStorage(),

  fileFilter(req,file,next){
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto){
      next(null,true)
    }else{
      const msg = "not";
      next({message:'This filetype is not allowed'},false);
    }
  }
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
  await photo.resize(1000,jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // once we have written in out file system
  next();
}


// Query to get list of stores
exports.getStores = async (req,res) =>{
  try{
    await Store.find({},(err,docs)=>{
      if(err){
        res.render("error")
      }else{
        res.render("stores",{
          title:"Stores",
          stores :docs
        })
      }
    });
  }
  catch(err){
    res.render("error")
  }
   
}


// Route to create store
exports.createStore = async (req,res)=>{

  let store = new Store(req.body);
  try{
    await store.save(err=>{
      if(err){
        req.flash("danger","You need to upload a photo  ")
        res.redirect("back")
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
       res.render("error")
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
      res.render("error")
    }
  }
}




exports.updateStores = async (req,res) =>{
  // find and update the store and handle errors too

  try{
    await Store.updateOne({_id: req.params.id},req.body,(err,docs)=>{
      if(err){
        res.render("error")
      }else{
        // redirect to the store page  and show flash message
        req.flash("success","The store has been updated")
        res.redirect("/stores")
      }
    })
  }catch(err){
   if(err){
     res.render("error")
   }
  }
}



// Route to a selected store;;-----



exports.viewStore = async (req,res) =>{
  try{
    await Store.findById({_id: req.params.id},(err,docs)=>{
      if(err){
        res.render("error")
      }else{
        // render the form 
        res.render("store",{
         store:docs
       })
      }
    })
   }
   catch(err){
     if(err){
       res.render("error")
     }
   }
}


// route to get stores by tags

exports.getStoresByTags = async (req,res) =>{
   const tag =   req.params.tag;
   const tagQuery = tag ||  { $exists : true};
   const tagsPromise =  Store.getTagsList();
   const storePromise =  Store.find({tags: tagQuery});
   const [tags,stores] = await Promise.all([tagsPromise,storePromise]);
   res.render("tags",{ tags, title: 'Tags' , tag,stores  })
}


// AJAX APIS ----****************************************

//  API -1 *******************************
// api search
exports.searchStores = async (req,res) =>{
  // res.json(req.query);
  const stores = await Store.find({
    // first find stores that match 
    $text :{
      $search : req.query.q
    }
  },{
    score:{ $meta :'textScore'}
  })
   .sort({
     score : {$meta : 'textScore'}
   })
  res.json(stores);
}


// Hearting the stores
exports.heartStore = async(req,res) =>{
  const hearts = req.user.hearts.map(obj => obj.toString())

  // ! TODO : Display number of likes-----
  // const stores = Store.heartCount.map(obj => obj.toString())
  // await Store.findOne({_id : req.params.id},(err,docs)=>{
  //   res.json(docs.heartCount.map(obj => obj.toString()))
  // })
  
  const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet';
  const user = await User.findByIdAndUpdate(req.user._id,
     {[operator] : {hearts : req.params.id}},
     {new : true}
    )
  res.redirect("back");
}


// Getting the hearted Stores
exports.getHeartedStores = async (req,res) =>{
  const stores = await Store.find({
    _id:{$in : req.user.hearts}
  })
 res.render("top",{
   stores:stores
 })
}



// Giving each store a unique name------
// !No restaurant should have same name-----
exports.getunique = async (req,res) =>{
  // Check if the name matches any of the stores already present
  let uniq = await Store.aggregate([{ $match: { name:req.query.q } }]);
  res.json(uniq)
}


