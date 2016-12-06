var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var User = require('../app/models/users');
var CV = require('../app/models/cv');
var Experience = require('../app/models/experience');
var Education = require('../app/models/education');
var Skill = require('../app/models/skill');
var moment = require('moment');


router.post('/updatemyprofile', function(req, res){

	var updateProfile = {
		address: req.body.address,
		phone: req.body.phone,
		email: req.body.email,
		linkedin: req.body.linkedin,
		website: req.body.website
	}

	User.findByIdAndUpdate(req.body.id, updateProfile, {new: true}, function(err, theUser){
		if(err){
			console.log(err);
		} else {
			res.json({
				success: true,
				info: theUser
			});
		}
	});
});


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


router.post('/cveducation', function(req, res){

	var eduData = {
		category: req.body.category,
		school: req.body.school,
		city: req.body.city,
		country: req.body.country,
		startdate: moment(req.body.startdate).format('MMMM Do YYYY'),
		enddate: moment(req.body.enddate).format('MMMM Do YYYY')
	}

	CV.findById(req.body.id, function(err, theCV){
		console.log(theCV);
		if(err){
			console.log(err);
		} else {
			Education.create(eduData, function(err, newEducation){
				if(err){
					console.log(err);
				} else {
					theCV.education.push(newEducation);
					theCV.save();
					res.json({
						success: true,
						info: newEducation
					});
				}
			});
		}
	});
});

router.post('/getcveducation', function(req, res){
	CV.findById(req.body.id).populate('education').exec(function(err, theCV){
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


router.post('/cvskill', function(req, res){
	var skillData = {
		name: req.body.name,
		description: req.body.description
	}

	CV.findById(req.body.id, function(err, theCV){
		if(err){
			console.log(err);
		} else {
			Skill.create(skillData, function(err, newSkill){
				if(err){
					console.log(err);
				} else {
					theCV.skills.push(newSkill);
					theCV.save();
					res.json({
						success: true,
						info: newSkill
					});
				}
			});
		}
	});
});

router.post('/getcvskill', function(req, res){
	CV.findById(req.body.id).populate('skills').exec(function(err, theCV){
		if(err){
			console.log(err);
		} else {
			console.log(theCV);
			res.json({
				success: true,
				info: theCV
			});
		}
	});
});



module.exports = router;