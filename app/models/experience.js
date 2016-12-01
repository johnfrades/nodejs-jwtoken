var mongoose = require('mongoose');

var ExperienceSchema = new mongoose.Schema({
	category: String,
	role: String,
	companydescription: String,
	company: String,
	city: String,
	country: String,
	startdate: String,
	enddate: String
});


module.exports = mongoose.model('Experience', ExperienceSchema);