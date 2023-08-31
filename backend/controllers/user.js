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
        // const options={
        //     expires:new Date()+60*1000 ,
        //     httpOnly:true
        // }

        return res.status(201).cookie("token",token).json({
            success:true,
            user,
            token
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
        const {email,password}=req.body;
        let user=await User.findOne({email}).select('+password');
        if(!user)
        {
            return res.staus(400).json({
                success:false,
                message:"user does'nt exist Please register first"
            })
        }
        
        const isMatch=await user.matchPassword(password);
        if(!isMatch)
        {
            return res.status(400).json({
                success:false,
                message:"Incorect Password",
            });
        }
        const token=await user.generateTOken();
        const options={

            expires:new Date()+20*60*60*1000 ,httpOnly:true
        }

        return res.status(200).cookie("token",token).json({
            success:true,
            user,
            token
        });
    } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
};