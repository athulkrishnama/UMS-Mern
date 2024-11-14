const jwt = require('jsonwebtoken');
const tokenChecker = (req,res,next)=>{
    console.log()
    const authorisation = req.headers['Authorization'] ?? req.headers['authorization'];
    const token = authorisation.split(' ')[1];
    try{
        const decode = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET)
        req.email = decode.email
        console.log("Authorised")
        next()
    }catch{
        res.status(400).json({error:"token not matching"})
    }

}

module.exports = {tokenChecker}