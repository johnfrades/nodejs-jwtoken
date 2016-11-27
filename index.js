var bodyParser = require('body-parser');  
var morgan = require('morgan');  
var passport = require('passport');
var config = require('./config/main')
var User = require('./app/models/users');    
var jwt = require('jsonwebtoken');  
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var cors = require('cors');
var officegen = require('officegen');
var async = require('async');
var nodemailer = require('nodemailer');

var PORT = process.env.PORT || 3000;

// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json());

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
// Log requests to console
app.use(morgan('dev'));  

// Initialize passport for use
app.use(passport.initialize());  

// Bring in defined Passport Strategy
require('./config/passport')(passport);  


mongoose.connect(config.database);

app.options('*', cors());
app.use(cors());


// Create API group routes
var apiRoutes = express.Router(); 

// Register new users
apiRoutes.post('/register', function(req, res) {  
  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'That email address already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  }
});



// Authenticate the user and get a JSON Web Token to include in the header of future requests.
apiRoutes.post('/authenticate', function(req, res) {  
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
          console.log(token);
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
apiRoutes.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {  
  res.send('It worked! User id is: ' + req.user._id + '.');
});

// Set url for API group routes
app.use('/api', apiRoutes);  

// Home route. We'll end up changing this to our main front end index later.
app.get('/', function(req, res) {  
  res.render('homepage.ejs');
});


app.listen(PORT, function(req, res){
	console.log('Server started at port ' + PORT);
});



//Generate random string/number
//Math.random().toString(36).substr(2, length)