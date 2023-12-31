const express=require('express');
const { register, login, followUser ,logout, updatePassword, updateUserProfile, DeleteUser, myProfle, getUserProfile, getAllUsers, forgotPassword, resetPassword, updateProfile, searchUser } = require('../controllers/user');
const { Authenticator } = require('../middleware/auth');
const router=express.Router();


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(Authenticator,logout);
router.route('/follow/:id').get(Authenticator,followUser);
router.route("/update/profile").put(Authenticator, updateProfile);
router.route('/updatePassword').post(Authenticator,updatePassword);
router.route('/updateUserProfile').post(Authenticator,updateUserProfile);
router.route('/deleteUser').delete(Authenticator,DeleteUser);
router.route('/myProfile').get(Authenticator,myProfle);
// router.route("/userPost/:id").get(Authenticator,getUserPost);
router.route("/user/:id").get(Authenticator,getUserProfile);
router.route("/users").get(Authenticator,getAllUsers);
router.route("/search").get(Authenticator,searchUser);
router.route("/forgot/password").post(Authenticator,forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
module.exports=router;