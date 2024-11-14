const jwt = require("jsonwebtoken");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const createHash = async (password) => {
  const hashedPassword = await bcrypt.hash(password,10);
  return hashedPassword;
};



const createUser = async (req, res) => {
  try {
    const { username, password, email, image } = req.body;
    const hashedPassword = await createHash(password);
    const user = new User({
        username,
        email,
        password:hashedPassword,
        imageUrl:image
    });
    const userCredentials = await user.save()
    console.log(userCredentials)
    const token = jwt.sign({ username, email }, process.env.TOKEN_SECRET);
    res.json({ token, user: { username, email, id:userCredentials._id } });
  } catch (err) {
    if(err.errorResponse.code === 11000){
       return res.json({err:"already existing credentials"})
    }
    console.log(err);
  }
};


const login = async(req,res)=>{
    try{
        const {email, password} = req.body;
        const user =await User.findOne({email});
        if(!user){
            return res.json({err:"user not found"});
        }
        console.log(user)
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(passwordMatch){
            const token = jwt.sign({username:user.username, email}, process.env.TOKEN_SECRET)
            res.json({token,user:{username:user.username, email:email, id:user._id,image:user.imageUrl}});
        }else{
            res.json({err:"password not matching"})
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = { createUser ,login};
