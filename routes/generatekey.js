var express = require('express');
var router = express.Router();
var Authkey = require('../app/models/authkey');


router.post('/getkey', function(req, res){
	var newAuthkey = {
		studentid: req.body.studentid,
		authkey: Math.random().toString(36).substr(2, 5).toUpperCase(),
		used: false
	}

	Authkey.findOne({studentid: req.body.studentid}, function(err, studentExist){
		if(studentExist){
			res.send('Error! Student already registered!');
		} else if(studentExist === null) {
			Authkey.create(newAuthkey, function(err, newKey){
			if(err){
				console.log(err);
			} else {
				return res.json({
					success: true,
					studentid: newKey.studentid,
					authkey: newKey.authkey
				});
			}
		 });
		}
	});
});


router.post('/findkey', function(req, res){
	Authkey.findOne({studentid: req.body.studentid}, function(err, theStudent){
		if(!theStudent){
			res.send('no student found. Try again!');
		} else {
			res.send('The authkey for student# ' + theStudent.studentid + ' is ' + theStudent.authkey);
		}
	});
});


module.exports = router;