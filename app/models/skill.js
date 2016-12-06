var mongoose = require('mongoose');

var SkillSchema = new mongoose.Schema({
	name: String,
	description: String
});

module.exports = mongoose.model('Skill', SkillSchema);