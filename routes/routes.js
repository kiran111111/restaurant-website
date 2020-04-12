
const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const Store = require("../models/store");



router.get("/home",storeController.homepage);
router.get("/add",storeController.addStore);

router.post("/add",storeController.createStore);


module.exports  = router;