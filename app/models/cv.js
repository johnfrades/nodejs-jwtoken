var mongoose = require('mongoose');

var CVSchema = new mongoose.Schema({
	cvname: {
		type: String,
		required: true
	},
	firstname: String,
	lastname: String,
	address: String,
	phone: Number,
	website: String,
	email: String,
	linkedin: String,
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
			ref: 'Skill'
		}
	]
});

module.exports = mongoose.model('CV', CVSchema);