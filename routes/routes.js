const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const storeController = require("../controllers/storeController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController")
const Store = require("../models/store");
const {validate,userValidationRules} = require("../helpers/validator")
require("../helpers/passport");


// Get the passport module-------------------------------------------
// require("../controllers/passport")

router.get("/home",storeController.homepage);
router.get("/add",storeController.addStore);
router.get("/",storeController.getStores);
router.get("/stores",storeController.getStores);
router.get("/add/edit/:id",storeController.editStores);
router.get("/store/:id",storeController.viewStore);
router.get("/tags",storeController.getStoresByTags)
router.get("/top",storeController.getHeartedStores);
router.get("/tags/:tag",storeController.getStoresByTags);
router.get("/profile",authController.checkAuthenticated,userController.profile);


router.get("/register",authController.checkNotAuthenticated,authController.register)
router.get("/login",authController.checkNotAuthenticated,authController.login);
router.get("/logout",authController.logout);
router.post("/register",userValidationRules(),validate,authController.registered);
router.post("/login",
   passport.authenticate('local', {
     failureRedirect:"/login",
     failureFlash:true
    }),
  authController.loggedIn
)

router.post("/add",
  storeController.uploads,    
  storeController.resize,
  storeController.createStore
);

router.post("/add/:id",
  storeController.uploads,
  storeController.resize,
  storeController.updateStores
);

router.post("/profile/:id",
   userController.editProfile
)

// API-1 *****
router.get('/api/search',storeController.searchStores)
// API-2 *****
router.post('/api/heart/:id',storeController.heartStore)



module.exports  = router;


