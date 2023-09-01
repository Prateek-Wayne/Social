const User=require('../model/USERMODEL');

exports.register=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        let user=await User.findOne({email});
        if(user)
        {
            return res.status(400).json({
                success:false,
                message:"User already exists",
            });

        }
        user=await User.create({
            name,
            email,
            password,
            avatar:{
                public_id:"temp public id",
                url:"temp/temp."
            }
        });
       
        const token=await user.generateTOken();
        const options = {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
    
        res.status(201).cookie("token", token, options).json({
          success: true,
          user,
          token,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            location:"I am inside register catch block"
        });
    }
};

exports.login=async (req,res)=>{
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email })
        .select("+password")
        .populate("posts followers following");
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User does not exist",
        });
      }
  
      const isMatch = await user.matchPassword(password);
  
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Incorrect password",
        });
      }
        const token=await user.generateTOken();
        const options = {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
    
        res.status(200).cookie("token", token, options).json({
          success: true,
          user,
          token,
        });
    } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
};

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token","")
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.followUser = async (req, res) => {
    try {
      const userToFollow = await User.findById(req.params.id);
      const loggedInUser = await User.findById(req.user._id);
  
      if (!userToFollow) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      if (loggedInUser.following.includes(userToFollow._id)) {
        const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
        const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);
  
        loggedInUser.following.splice(indexfollowing, 1);
        userToFollow.followers.splice(indexfollowers, 1);
  
        await loggedInUser.save();
        await userToFollow.save();
  
        res.status(200).json({
          success: true,
          message: "User Unfollowed",
        });
      } else {
        loggedInUser.following.push(userToFollow._id);
        userToFollow.followers.push(loggedInUser._id);
  
        await loggedInUser.save();
        await userToFollow.save();
  
        res.status(200).json({
          success: true,
          message: "User followed",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  //1:38
  exports.updatePassword=async (req,res)=>{
    try {
      const user =await User.findById(req.user._id).select("+password");
      const {oldPassword,newPassword}=req.body;
      console.log("--->",oldPassword,newPassword);
      if(!oldPassword||!newPassword)
      {
        return res.status(400).json({
          success:false,
          message:"Please Provide oldPassword || newPassword",
        });
      }
  
      const isMatch = await user.matchPassword(oldPassword);
      console.log("T/F",isMatch);
      if(!isMatch)
      {
        return res.status(400).json({
          success:false,
          mesage:"You entered wrong Password",
        });
      }
      user.password=newPassword;
      await user.save();
      return res.status(200).json({
        success:true,
        message:"Password is changed successfully",
      })

    } catch (error) {
        return res.status(500).json(
          {
            success:false,
            message:error.message,
            location:"Inside Update Password Catch block"
          }
        )
    }
  };
exports.updateUserProfile=async (req,res)=>{
    try {

      const user=await User.findById(req.user._id);
      const {name,email} =req.body;

      if(name)
      {
        user.name=name;
  
      }
      if(email)
      {
        user.email=email;
      }
      
      await user.save();
      return res.status(200).json({
        success:true,
        message:"Profile Updated Successfully",
      })

    } catch (error) {
      res.status(500).send({
        success:false,
        message:error.message,
        message:"Inside updateUserPorfile catch block"
      })
    }
  }
