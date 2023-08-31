const dotenv=require('dotenv');
const express=require('express');
const app=express();

if(process.env.NODE_ENV!=='DEVELOPMENT'){
    dotenv.config({path:'backend/config/config.env'});
}
    
module.exports=app;