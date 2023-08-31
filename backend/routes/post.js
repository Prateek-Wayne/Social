const express=require('express');
const { register } = require('../controllers/post');
const router=express.Router();


router.route('./post/upload').post(register);


module.exports=router;