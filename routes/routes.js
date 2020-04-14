
const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const Store = require("../models/store");



router.get("/home",storeController.homepage);
router.get("/add",storeController.addStore);
router.get("/",storeController.getStores);
router.get("/stores",storeController.getStores);
router.get("/add/edit/:id",storeController.editStores)

router.post("/add",storeController.createStore);



router.post("/add/:id",storeController.updateStores)


module.exports  = router;