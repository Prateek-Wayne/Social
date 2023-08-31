const User=require('../model/USERMODEL');
const jwt=require('jsonwebtoken');
exports.Authenticator=async(req,res,next)=>{
    try {
        const {token}=req.cookies;
        console.log(token);
        if(!token)
        {
            return res.status(400).send({
                success:false,
                message:"User is invalid ,Please Login again"
            })
        }
        const decoded=await jwt.verify(token,process.env.JWT_SECRET_KEY);
        // console.log(decoded);
        req.user=await User.findById(decoded._id);
        next();
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:error.message,
            location:"Inside Authenticator catch block"
        })
    }
};