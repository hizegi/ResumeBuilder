//=====================
// REQUIREMENTS
//=====================
var User = require('../models/user.js');
var LocalStrategy   = require('passport-local').Strategy;
var passport = require("passport");


//=====================
// EXPORTS
//=====================

// ALL PASSPORT STUFF
// + serialize user
// + deserialize user
// + sign up verification
// + login
module.exports = function(passport){

	console.log("PASSPORT LOADED")

	//used to serialize the user
	passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

	// used to deserialize the user once req.user is persisted
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

	//===========================
	// SIGN UP
	//===========================
     passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        console.log('Req.body within local signup: >>>>>>', req.body);
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        //REMOVED LOCAL from local.email
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false);
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                // removed local because userModel doesn't have 'local'
                console.log('REQ.BODY WITHIN LOCAL SIGNUP:', req.body);
                console.log('USERNAME IN REQ.BODY' + req.body.username)
                newUser.username = req.body.username;
                newUser.email    = email;
                newUser.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        	});    

        });

    }));


	 // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        console.log('Req.body within local login: >>>>>>', req.body.username);
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            console.log(user);
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // // if no user is found, return the message
            if (!user)
                return done(null, false); // req.flash is the way to set flashdata using connect-flash

            // // if the user is found but the password is wrong
            if (!user.validPassword(password)) {
                return done(null, false);
            }

            // // all is well, return successful user
            return done(null, user);
        });

    }));
}; //ends module.exports