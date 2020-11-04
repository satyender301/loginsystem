var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var path = require('path')
var flash = require('connect-flash');
const session = require('express-session'); 

const bcrypt = require('bcryptjs');

const passport = require('passport');


const User = require('../model/usermodel')

router.use(flash());
var encoder = bodyParser.urlencoded({
    extended: true
  })

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
    res.render('register');
  });

  
router.post('/register', encoder,function(req, res, next) {
   console.log(req.body);
    // res.send('data passes from register');

    const {name , email , password , password2 } = req.body;

    let errors=[];

    //check required fields
    if(!name || !email || !password || !password2 ){
        errors.push({msg: "Please fill all the fields"})
    }

    if(password !== password2){
        errors.push({msg:"password do not matched"})
    }

    
    if(password.length<6){
        errors.push({msg:"password should be atleast 6 characters"})
    }

    if(errors.length>0){
          res.render('register',{
              errors,
              name,
              email,
              password,
              password2
          })

    }else{
       // res.send('pass');
       //validation passed
       User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  req.flash('success_msg','You are now registered and can log in' );
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        }


      });
    }
  });

//   Login
 router.post('/login', (req, res, next) => {
   passport.authenticate('local', 
   {successRedirect: '/dashboard',
   failureRedirect: '/users/login',
   failureFlash: true})(req, res, next);
  });

// router.post('/login', (req, res, next) => {
//   User.findOne({
//     email: req.body.email
//   })
//       .then(user => {
//         if (user && user.password === req.body.password){
//           res.locals.redirect = `dashboard`;
//           req.flash("success", `${user.fullName}'s logged in successfully!`);
//           res.locals.user = user;
//           next();
//     } else {
//       req.flash("error", "Your account or password is incorrect. Please try again or contact your system administrator!");
//              res.locals.redirect = "/users/login";
//       next();
//     }
//   })
//       .catch(error => {
//         console.log(`Error logging in user: ${error.message}`);
//         next(error);
//       });
// });

module.exports = router;

