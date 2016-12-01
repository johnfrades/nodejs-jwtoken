var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var CV = require('../app/models/cv');


router.post('/cvname', function(req, res){
	var cvName = {
		cvname: req.body.cvname
	}

	CV.create(cvName, function(err, newCV){
		if(err){
			console.log(err);
		} else {
			res.json({
				success: true,
				info: newCV
			});
		}
	});
});

router.post('/cvpersonalinfo', function(req, res){
	console.log(req.body);
  var piData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    email: req.body.email,
    linkedin: req.body.linkedin,
    website: req.body.website,
    address: req.body.address,
    postcode: req.body.postcode
  }

  CV.findByIdAndUpdate(req.body.id, piData, {new: true}, function(err, updateCV){
    if(err){
      console.log(err);
    } else {
      // res.redirect('/cvs/' + req.params.cvid);
      res.send(updateCV);
    }
  });
});







module.exports = router;