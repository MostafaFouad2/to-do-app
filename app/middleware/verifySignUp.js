const db = require("../models");
const User = db.user;
var passwordValidator = require('password-validator');

// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()  

checkUsernameAndPass = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }else{
       const pass = req.body.password
       const validErr = schema.validate(pass, { details: true })
       if(validErr.length>0){
        res.status(500).send({ message: validErr });
        return;
       }
        next();
       
       
    }
  });
  
};

const verifySignUp = {
    checkUsernameAndPass
};
module.exports = verifySignUp;