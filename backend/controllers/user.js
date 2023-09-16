const User = require('../model/USERMODEL');
const Post = require('../model/POSTMODEL');
const {sendEmail}=require('../middleware/sendEmail');
const crypto=require('crypto');
const cloudinary = require("cloudinary");

exports.register = async (req, res) => {
  try {
    const { name, email, password ,avatar} = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });

    }
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {folder:'avatars'});
    user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      }
    });

    const token = await user.generateTOken();
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
      success: false,
      message: error.message,
      location: "I am inside register catch block"
    });
  }
};

exports.login = async (req, res) => {
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
    const token = await user.generateTOken();
    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
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
      .cookie("token", "")
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
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const { oldPassword, newPassword } = req.body;
    // console.log("--->", oldPassword, newPassword);
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please Provide oldPassword || newPassword",
      });
    }

    const isMatch = await user.matchPassword(oldPassword);
    // console.log("T/F", isMatch);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        mesage: "You entered wrong Password",
      });
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password is changed successfully",
    })

  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: error.message,
        location: "Inside Update Password Catch block"
      }
    )
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const {email}=req.body;
    const user = await User.findOne({email:email});
  
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    const resetToken = await user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    console.log(resetUrl);
    const message = `Reset Your Password By clicking on the link below :\n\n ${resetUrl}`;
    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message
      });
      res.status(200).json({
        success: true,
        message: `Email Sent to ${user.email}`
      })

    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save();
        return res.status(500).json({
          success:false,
          message:error.mesage
          // message:"Sorry Unaible to send the email"
        })
    };

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      location: "Inside forgotPassword catch block"
    })
  }
};
exports.resetPassword=async(req,res)=>{
  try {
    const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user=await User.findOne({resetPasswordToken,
                                    resetPasswordExpire:{$gt:Date.now()}});
    if(!user){
      return res.status(400).json({
        success:false,
        message:"Invalid Token || Token Expired"
      });
    }
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    return res.json({
      success:true,
      message:"Password Reseted Successfully"
    })

  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      location: "Inside resetPassword catch block"
    })
  }
};
exports.updateUserProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);
    const { name, email } = req.body;

    if (name) {
      user.name = name;

    }
    if (email) {
      user.email = email;
    }

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
    })

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      message: "Inside updateUserPorfile catch block"
    })
  }
}
exports.DeleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const postArray = user.posts;
    const followersArray = user.followers;
    const followingArray = user.following;
    const userId = user._id;

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    //Delting User Posts;
    for (let i of postArray) {
      const post = await Posts.findById(i);
      await post.remove();
    }
    // Delteting FOllowers
    for (let i of followersArray) {
      const follower = await User.findById(i);
      const index = follower.following.indexOf(userId);
      follower.following.splice(index, 1);
      await follower.save();
    }
    //Deleting Followings
    for (let i of followingArray) {
      const follows = await User.findById(following[i]);

      const index = follows.followers.indexOf(userId);
      follows.followers.splice(index, 1);
      await follows.save();
    }
    await user.deleteOne();

    return res.status(200).json({
      success: true,
      message: "User has been deleted"
    });
  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: error.message,
        location: "Inside DeleteProfile catch block"
      }
    );
  }
};

exports.myProfle = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("posts followers following");
    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      location: "Inside myProfile catch block"
    })
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");
    return res.status(200).json({
      success: true,
      user
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      location: "Inside getUserProfile ccatch Block"
    })
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.find({
    });

    return res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      location: "Inside the getAlluser catch block"
    })
  }
}