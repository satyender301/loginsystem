const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/registerloginDB', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

var conn = mongoose.connection

var loginSchema = new mongoose.Schema({
    
    name :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true
    },
  
  password :{
    type:String,
    required:true
},
  date :{
    type:Date,
    default:Date.now
}


  
})

var loginModel = mongoose.model('logintable', loginSchema)

module.exports = loginModel
