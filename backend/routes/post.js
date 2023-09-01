const express=require('express');
const {  createPost, likeAndUnlikePost,deletePost, followUser, getPostOfFollowing, updateCaption } = require('../controllers/post');
const { Authenticator } = require('../middleware/auth');
const router=express.Router();


router.route('/post/upload').post(Authenticator,createPost);
router.route('/post/:id').get(Authenticator,likeAndUnlikePost).delete(Authenticator,deletePost).put(Authenticator,updateCaption);;
// router.route('/post/delete/:id').get(Authenticator,deletePost);
router.route('/posts').get(Authenticator,getPostOfFollowing);

module.exports=router;