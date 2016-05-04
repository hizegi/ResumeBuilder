var express = require("express"),
    router = express.Router(),
    User = require("../models/user.js"),
    Resume = require("../models/resume.js").
    passport = require("passport");
    mongoose = require("mongoose");
    mongoose.set("debug", true);


//********************
// GET REQUESTS
//********************
router.get('/', function(req, res){
	res.send("Hello World!")
});


module.exports = router;