const User=require('../model/USERMODEL');
const Post=require('../model/POSTMODEL');

exports.createPost=async (req,res)=>{
    try{
        const newPostData={
            caption:"this is my caption",
            image:{
                public_id:"this is a public id",
                url:'temp/temp/img.jpeg'
            },
            owner:req.user._id
        }
        const newPost=await Post.create(newPostData);
        res.status(200).json(
            {
                success:true,
                post:newPost,
            }
        );
    }catch(error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.register=async (req,res) =>{
    try{
          

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    };
}