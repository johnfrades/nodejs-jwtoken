var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../app/models/users');
var Authkey = require('../app/models/authkey'); 
var jwt = require('jsonwebtoken');
var config = require('../config/main');


// Register new users
router.post('/register', function(req, res) {  
  console.log(req.body);
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
      address: req.body.address
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
        message: 'Successfully created an account!' });
    });
  }
});



// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/authenticate', function(req, res) {  
  User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user, config.secret, {
            expiresIn: 1000 // in seconds
          });
          
          user.token = token;
          user.save();
          console.log(user);
          // res.redirect('/api/dashboard');
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
});

// Protect dashboard route with JWT
router.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {  
  res.send('It worked! User id is: ' + req.user._id + '.');
});


module.exports = router;