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
      console.log(err);
			res.send('error');
		} else if(!validKey){
      console.log('no key/user found');
		} else if(validKey.used === true){
      console.log('Key already used!');
    } else {
			res.json({
					success: true,
					data: validKey
			});
		}
	});
});


// Register new users
router.post('/register', function(req, res) {  
  var checkIfValid = {
    authcode: req.body.authcode,
    studentid: req.body.studentid
  }

  Authkey.findOne(checkIfValid, function(err, foundKey){
    if(err){
      console.log(err);
    } else if(!foundKey){
      res.json({
        success: false,
        message: 'No StudentId/Wrong authentication code.'
      });
    } else if(foundKey){
        var newUser = new User({
        email: req.body.email,
        studentid: req.body.studentid,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        linkedin: req.body.linkedin,
        website: req.body.website,
        address: req.body.address,
        authcode: req.body.authcode
      });


        newUser.save(function(err) {
          if (err) {
            return res.json({ 
              success: false, 
              message: 'Error! Try again!'});
          }

          foundKey.used = true;
          foundKey.save();
          res.json({ 
            success: true, 
            data: newUser 
          });
      });

    }
  });




  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    

    // Attempt to save the user

  }
});

module.exports = router;