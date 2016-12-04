var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var CV = require('../app/models/cv');
var Experience = require('../app/models/experience');
var moment = require('moment');





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


router.post('/cvexperience', function(req, res){

	var expData = {
		category: req.body.category,
		role: req.body.role,
		companydescription: req.body.companydesc,
		company: req.body.company,
		city: req.body.city,
		country: req.body.country,
		startdate: moment(req.body.startdate).format('MMMM Do YYYY'),
		enddate: moment(req.body.enddate).format('MMMM Do YYYY')
	}

	CV.findById(req.body.id, function(err, theCV){
		if(err){
			console.log(err);
		} else {
			Experience.create(expData, function(err, newExp){
				if(err){
					console.log(err);
				} else {
					theCV.experience.push(newExp);
					theCV.save();
					res.json({
						success: true,
						info: newExp
					});
				}
			});
		}
	});

});

router.post('/getcvexperience', function(req, res){
	CV.findById(req.body.id).populate('experience').exec(function(err, theCV){
		if(err){
			console.log(err);
		} else {
			res.json({
				success: true,
				info: theCV
			});
		}
	});
});




module.exports = router;