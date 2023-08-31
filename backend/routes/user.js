const express=require('express');
const { register, login, followUser } = require('../controllers/user');
const { Authenticator } = require('../middleware/auth');
const router=express.Router();


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/follow/:id').get(Authenticator,followUser);
module.exports=router;