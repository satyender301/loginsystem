var express = require('express')

var bodyParser = require('body-parser')
var path = require('path')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


var router = express.Router()

//welcome page
router.get('/',(req,res)=>{
    res.render("welcome")
})

//dashboard page
router.get('/dashboard', ensureAuthenticated,(req,res)=>{
    res.render("dashboard",{
        name:req.user.name
    })
})


module.exports = router
