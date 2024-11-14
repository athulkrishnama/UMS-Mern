const jwt = require('jsonwebtoken')
const login = (req,res)=>{
    const {email, password} = req.body;
    if(email === process.env.ADMIN_EMAIL && password ===process.env.ADMIN_PASSWORD){
        const token = jwt.sign({email:process.env.ADMIN_EMAIL},process.env.TOKEN_SECRET)
        res.json({token, admin:{email}})
    }else{
        res.status(404).json({err:"not authorised"})
    }
}

module.exports = {login}