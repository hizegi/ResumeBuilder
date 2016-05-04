var express = require("express"),
    router = express.Router(),
    User = require("../models/user.js"),
    Resume = require("../models/resume.js").
    passport = require("passport");
    mongoose = require("mongoose");
    mongoose.set("debug", true);


router.get('/user', function(req, res){
	res.send("HEY WOW");
});


module.exports = router;