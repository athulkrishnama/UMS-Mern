const jwt = require('jsonwebtoken')
const User = require('../model/user')
const login = (req,res)=>{
    const {email, password} = req.body;
    if(email === process.env.ADMIN_EMAIL && password ===process.env.ADMIN_PASSWORD){
        const token = jwt.sign({email:process.env.ADMIN_EMAIL},process.env.ADMIN_TOKEN_SECRET)
        res.json({token, admin:{email}})
    }else{
        res.status(404).json({err:"not authorised"})
    }
}


const getUsers = async(req,res)=>{
    try{
        const users =await User.find();
        console.log(users)
        res.status(200).json({users})
    }catch(error){
        console.log(error)
    }
}

module.exports = {login, getUsers}