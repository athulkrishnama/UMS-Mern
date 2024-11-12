const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    imageUrl:{
        type:String,
        require:true,
    }
})

module.exports = mongoose.model('user', userScheme)