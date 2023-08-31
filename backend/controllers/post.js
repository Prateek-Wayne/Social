const User=require('../model/USERMODEL');
const Post=require('../model/POSTMODEL');

exports.createPost=async (req,res)=>{
    try{

        //**NOTE: req.user._id is coming from the Authenticator middleware./....
        const newPostData={
            caption:"this is my caption",
            image:{
                public_id:"this is a public id",
                url:'temp/temp/img.jpeg'
            },
            owner:req.user._id,

        }
        const newPost=await Post.create(newPostData);
        console.log(req.user._id);
        const user = await User.findById(req.user._id);
        user.posts.push(newPost._id);
        await user.save();
        res.status(201).json(
            {
                success:true,
                post:newPost,
            }
        );
    }catch(error) {
        res.status(500).json({
            success:false,
            message:error.message,
            location:'inside post /createPost catch block'
        })
    }
};
exports.likeAndUnlikePost =async (req,res) =>{
    try {
        console.log(req.params.id)
        const post= await Post.findById(req.params.id);

        if(!post)
        {
            return res.status(404).json({
                success:true,
                message:"Post not Found"
            })
        }

        if(post.likes.includes(req.user._id))
        {
            const index=post.likes.indexOf(req.user._id);
            post.likes.splice(index,1);
            await post.save();
            return res.status(200).json({
                success:true,
                message:"Post Unliked",
            })
        }
        else
        {
            post.likes.push(req.user._id);
            await post.save();
            return res.status(200).json({
                success:true,
                message:"Post Liked"
            })

        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            location:"inside likeAndunlikePost catch block",
            
        })
    }

};
exports.deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(400).json({
          success: false,
          message: "Post is not available",
        });
      } else {
        await Post.deleteOne({ _id: req.params.id });
        const user = await User.findById(req.user._id);
        const index=user.posts.indexOf(req.params.id);
        user.posts.splice(index,1);
        await user.save();
        return res.status(200).json({
          success: true,
          message: "Post deleted successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        location: "Inside deletePost catch Block",
      });
    }
  };
  
