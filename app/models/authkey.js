var mongoose = require('mongoose');

var AuthKeySchema = new mongoose.Schema({
	authcode: String,
	studentid: Number,
	used: Boolean
});

module.exports = mongoose.model('Authkey', AuthKeySchema);