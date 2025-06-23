const User = require('../models/User')

const jwt = require("jsonwebtoken");

//Generate JWT token

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"1h"});

};

//Register User

exports.registerUser = async (req,res) =>{
    const { fullName, email, password,profileImageUrl } = req.body || {};

    //Validation:Cheak for missing fields

   if (!fullName || !email || !password) {
    return res.status(400).json({
      message: "All fields are required"
    });
    }
    try{
        //cheak if email already exists

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"Email already in use"
            });
        }
        //Create the User
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });
        res.status(201).json({
            id:user._id,
            user,token:generateToken(user._id),
        })
    }

    catch(err) {
        res.status(500).json({
            message:"Error registering user", 
            error:err.message
        })
    }
};

//Login User

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists and password matches
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Success response
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({
            message: "Error logging in user",
            error: err.message
        });
    }
};


//Register User

exports.getUserInfo =async (req,res) =>{
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message:"User not find"});
        }
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({message:"Error registering user",error:err.message});
    }
};