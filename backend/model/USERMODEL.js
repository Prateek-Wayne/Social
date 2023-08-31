const { urlencoded } = require('express');
const bcryptjs=require('bcryptjs');
const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'backend/config/config.env'});
const jwt=require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    avatar: {
        public_id: String,
        url: String
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter your email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select:false,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
});
//khudke methods
userSchema.methods.matchPassword =async function(password){
    return await bcryptjs.compare(password,this.password); //return true or false...
}

userSchema.methods.generateTOken=async function()
{   
    return jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY);
}


userSchema.pre("save",async function(next){
    if(this.isModified("password"))
    {
    this.password=await bcryptjs.hash(this.password,10);
    }
    next();
});




module.exports = mongoose.model('User ', userSchema);