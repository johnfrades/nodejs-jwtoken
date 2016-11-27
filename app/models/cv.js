var mongoose = require('mongoose');

var CVSchema = new mongoose.Schema({
	cvname: {
		type: String,
		required: true
	},
	firstname: String,
	lastname: String,
	address: String,
	suburb: String,
	city: String,
	postcode: Number,
	phone: Number,
	personalstatement: String,
	experience:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Experience'
		}
	],
	education: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Education'
		}

	],
	skills: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Skills'
		}
	]
});

module.exports = mongoose.model('CV', CVSchema);