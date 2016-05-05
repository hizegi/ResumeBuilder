var express = require("express"),
    router = express.Router(),
    User = require("../models/user.js"),
    Resume = require("../models/resume.js"),
    passport = require("passport"),
    mongoose = require("mongoose");
    mongoose.set("debug", true);


//********************
// GET REQUESTS
//********************
router.get('/', function(req, res){
	res.send("Hello World!")
});

// IS LOGGED IN
router.get('/login', function(req, res) {
    if (req.isAuthenticated() == true) {
        // console.log("IS LOGGED IN, BETCH: " + req.user);
        res.send(req.user);
    }
    else {
        console.log("not logged in");
        res.send("not logged in");
    }
});


// SIGNUP
router.post('/signup', passport.authenticate('local-signup', {
    failureRedirect: '/'}), function(req, res){
    console.log("USER SIGNED UP:  " + req.user);
    res.send(req.user);
});


// Middleware to check login status
function isLoggedIn(req, res, next) {
    console.log('isLoggedIn middleware');     
    if (req.isAuthenticated()) {
        console.log("successful login!")
        return next(); 
    } else {      
        console.log("BAD LOGIN")
        res.redirect('/');
    }
};


module.exports = router;