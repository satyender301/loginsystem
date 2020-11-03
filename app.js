const express = require("express");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



// Passport Config
require('./config/passport')(passport);


const app = express();
const PORT = process.env.PORT || 9000


// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  

  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
  
  // Connect flash
  app.use(flash());
  
  // Global variables
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });


app.set('view engine', 'ejs');

app.use(express.json());


app.use('/', indexRouter);
app.use('/users', usersRouter);


app.listen(PORT, console.log("server connected..."))
