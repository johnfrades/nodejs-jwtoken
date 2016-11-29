var express = require('express');
var router = express.Router();
var User = require('../app/models/users');
var Authkey = require('../app/models/authkey');



router.post('/authreg', function(req, res){
	var authData = {
		authcode: req.body.authcode,
		studentid: req.body.studentid,
	}

	Authkey.findOne(authData, function(err, validKey){
		if(err){
			res.send('error');
		} else if(!validKey){
			res.send('error');
		} else {
			res.json({
					success: true,
					data: validKey
			});
		}
	});
})


// Register new users
router.post('/register', function(req, res) {  
  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    var newUser = new User({
      email: req.body.email,
      studentid: req.body.studentid,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      linkedin: req.body.linkedin,
      portfolio: req.body.portfolio,
      address: req.body.address,
      authcode: req.body.authcode
    });

    // Attempt to save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({ 
          success: false, 
          message: 'Error! Try again!'});
      }
      res.json({ 
        success: true, 
        data: newUser 
      });
    });
  }
});

module.exports = router;