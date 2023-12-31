const User = require("../model/USERMODEL");
const Post = require("../model/POSTMODEL");

const cloudinary = require("cloudinary");

  
exports.createPost = async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "posts",
    });
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
    };

    const post = await Post.create(newPostData);

    const user = await User.findById(req.user._id);

    user.posts.unshift(post._id);

    await user.save();
    res.status(201).json({
      success: true,
      message: "Post created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.likeAndUnlikePost = async (req, res) => {
  try {
    console.log(req.params.id);
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: true,
        message: "Post not Found",
      });
    }

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Liked",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      location: "inside likeAndunlikePost catch block",
    });
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
      await cloudinary.v2.uploader.destroy(post.image.public_id);
      await Post.deleteOne({ _id: req.params.id });
      const user = await User.findById(req.user._id);
      const index = user.posts.indexOf(req.params.id);
      user.posts.splice(index, 1);
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

exports.getPostOfFollowing = async (req, res) => {
  try {
    //by doing populate we can get reference that is given insidethe following array in USer models
    // const user=await User.findById(req.user._id).populate('following','posts');
    const user = await User.findById(req.user._id);
    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    }).populate("owner likes Comments.user");

    return res.status(200).json({
      success: true,
      posts:posts.reverse(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      location: "Inside getPostOFFOllowing catch block",
    });
  }
};

exports.updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { caption } = req.body;
    if (!caption) {
      return res.status(400).json({
        success: false,
        message: "Please Enter capiton",
      });
    }
    post.caption = caption;
    await post.save();
    return res.status(200).json({
      success: false,
      message: "Caption is updated successFully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      location: "Inside updateCaption catch block ",
    });
  }
};
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not avaialable",
      });
    }
    let commentIndex = -1;

    // Checking if comment already exists

    post.Comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentIndex = index;
      }
    });

    if (commentIndex !== -1) {
      post.Comments[commentIndex].comment = req.body.comment;

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Comment Updated",
      });
    } else {
      post.Comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });

      await post.save();
      return res.status(200).json({
        success: true,
        message: "Comment added",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      location: "Inside add Comment Catch block",
    });
  }
};
exports.deleteComment=async(req,res)=>{
    try {
        const post= await Post.findById(req.params.id).Comments;
        return res.status(200).json({
            success:true,
            message:"Comment deleted successfully",
            post
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            location:"inside delte commnet catch block"
        })
    }
}