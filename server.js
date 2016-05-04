//=========================
// REQUIREMENTS
//=========================
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    passport = require('passport'),
    passportLocal = require('passport-local'),
    session = require('express-session');

//setting up port/DB, requiring mongoose
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/resume';

//pass port config load
require('./config/passport')(passport);


//=========================
// MIDDLEWARES
//=========================
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(methodOverride('_method'));

//passport middleware
var passport = require('passport');
var session = require('express-session');
app.use(session({name: 'champs_stat_auth_app', secret: 'leagueofdraven'}));
app.use(passport.initialize());
app.use(passport.session());


//check user session
app.get('/checkuser', function(req,res){
    if (req.isAuthenticated()) {
        console.log("THIS CHECKUSER THING WAS HIT");
        console.log(req.session.passport.user);
        res.send(req.session.passport.user);
    } else {
        console.log("USER NOT AUTH ... CHECKUSER HIT")
    }
});


//=========================
// CONTROLLERS
//=========================
var userController = require('./controllers/userController.js');
app.use('/user', userController);

//=========================
// LISTENERS
//=========================
mongoose.connect(mongoURI);

mongoose.connection.on('error', function(){
	console.log('MONGO not connected');
})

//port
mongoose.connection.once('open', function(){
		console.log('MONGO connected');
		app.listen(port, function(){
		console.log("Listening on port:" + port);
	});
});