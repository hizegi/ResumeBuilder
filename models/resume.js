var mongoose = require("mongoose");

var resumeSchema = new mongoose.Schema({

	firstName: String,
	lastName: String,
	email: String,
	phoneNumber: String,

});

module.exports = mongoose.model("resumeSchema", resumeSchema);