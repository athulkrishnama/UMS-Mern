const jwt = require('jsonwebtoken');
const createUser = (req,res)=>{
    try{
        const {username , password, email} = req.body
        console.log(req.body)
        const token = jwt.sign({username,password}, process.env.TOKEN_SECRET)
        res.json({token})
        }catch(err){
        console.log(err)
    }
}

module.exports = {createUser}