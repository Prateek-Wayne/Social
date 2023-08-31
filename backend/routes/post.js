const express=require('express');
const {  createPost, likeAndUnlikePost,deletePost } = require('../controllers/post');
const { Authenticator } = require('../middleware/auth');
const router=express.Router();


router.route('/post/upload').post(Authenticator,createPost);
router.route('/post/:id').get(Authenticator,likeAndUnlikePost).delete(Authenticator,deletePost);;
// router.route('/post/delete/:id').get(Authenticator,deletePost);

module.exports=router;