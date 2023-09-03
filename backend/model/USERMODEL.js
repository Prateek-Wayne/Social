const { urlencoded } = require('express');
const bcryptjs=require('bcryptjs');
const mongoose = require('mongoose');
const dotenv=require('dotenv');
const crypto=require('crypto');
dotenv.config({path:'backend/config/config.env'});
const jwt=require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
  
    avatar: {
      public_id: String,
      url: String,
    },
  
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
  
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  });
  
//khudke methods
userSchema.methods.matchPassword =async function(password){
    return await bcryptjs.compare(password,this.password); //return true or false...
}

userSchema.methods.generateTOken=async function()
{   
    return jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY, {
      expiresIn: '3m'
  });
}

userSchema.methods.getResetPasswordToken=async function()
{
  const resetToken=await crypto.randomBytes(20).toString("hex");
  // console.log(resetToken);
  this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire=Date.now()+10*60*1000;
  return resetToken;

};

userSchema.pre("save",async function(next){
    if(this.isModified("password"))
    {
    this.password=await bcryptjs.hash(this.password,10);
    }
    next();
});


module.exports = mongoose.model("User",userSchema);
