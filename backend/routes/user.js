const express=require('express');
const { register, login, followUser ,logout, updatePassword, updateUserProfile} = require('../controllers/user');
const { Authenticator } = require('../middleware/auth');
const router=express.Router();


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(Authenticator,logout);
router.route('/follow/:id').get(Authenticator,followUser);
router.route('/updatePassword').post(Authenticator,updatePassword);
router.route('/updateUserProfile').post(Authenticator,updateUserProfile)
module.exports=router;