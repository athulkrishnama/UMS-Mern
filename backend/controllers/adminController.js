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
        res.status(200).json({users})
    }catch(error){
        console.log(error)
    }
}

const deleteUser = async (req,res)=>{
    try{
        const id = req.body.id
        await User.findByIdAndDelete(id)
        const users =await User.find();
        res.status(200).json({users})
        console.log(users)
    }catch(err){
        console.log(err)
    }
}

const updateUser = async (req,res)=>{
    try{
        const {username, email, imageUrl, id} = req.body;
        await User.findByIdAndUpdate(id,{username,email,imageUrl})
        res.status(200).json({message:"successfull updated"})
    }catch(err){
        res.status(400).json({error:"error occured"})
    }
}

const search = async(req, res)=>{
    try{
        const search = req.body.search
        const searchQuery = new RegExp(search);
        const result = await User.find({$or:[
            {username:{$regex:searchQuery}},
            {email:{$regex:searchQuery}}
        ]
        })
        res.json({users:result})
    }catch(err){
        console.log(err)
    }
}

module.exports = {login, getUsers, deleteUser, updateUser, search}