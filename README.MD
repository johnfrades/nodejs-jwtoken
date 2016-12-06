Simple setup of JSON Web Token on NodeJS <br>


Nov 27 <br>
-- added modules.. Officegen, Async, Nodemailer. <br>
-- added authkey, cv, education and experience models <br>

Nov 28 <br>
-- added generate auth key.. <br>

Dec 1 <br>
-- Added new route for adding cv (cvsave.js) <br>

Dec 2 <br>
-- Added 2 POST routes for saving CV experience and getting updated CV experience to pass in the data to angularjs (table) <br>

Dec 5 <br>
-- Reworked the education model and user model. <br>
  -- user model, added website value on the schema <br>
  -- education model, removed start month & year, end month & year. Replaced with Start date & End Date <br>
-- added 2 POST routes for saving CV education and getting updated CV education to pass in the data to angularjs (table) <br>
-- Changed the '/authenticate' route, from finding the user by EMAIL to STUDENTID <br>

Dec 6 <br>
-- Added a Skill model schema <br>
-- Added 2 POST routes for adding a skill on the database and querying the database for updated skill and pass into the AngularJS through res.json <br>
-- Added PHONE value on USER model schema <br>
-- Added a POST route for updating and getting the PROFILE of the student <br>

- John Lois Frades