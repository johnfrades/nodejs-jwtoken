var mongoose = require('mongoose');

var EducationSchema = new mongoose.Schema({
	category: String,
	degree: String,
	school: String,
	city: String,
	country: String,
	startdate: String,
	enddate: String
});

module.exports = mongoose.model('Education', EducationSchema);