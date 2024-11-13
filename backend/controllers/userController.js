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
    const token = jwt.sign({ username, password }, process.env.TOKEN_SECRET);
    res.json({ token, user: { username, email } });
  } catch (err) {
    if(err.errorResponse.code === 11000){
       return res.json({err:"already existing credentials"})
    }
    console.log(err);
  }
};

module.exports = { createUser };
