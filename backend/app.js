const dotenv=require('dotenv');
const express=require('express');
const app=express();


//app midleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true })); //we can use body-parser;

if(process.env.NODE_ENV!=='DEVELOPMENT'){
    dotenv.config({path:'backend/config/config.env'});
}
    
//Importing Routes
const postRouter=require('./routes/post');
const userRouter=require('./routes/user');

//using Routes
app.use('/api/v1',postRouter);    //url will be  https//localhost:4000/api/v1/post/upload  ,here /api/v1 will be prefix
app.use('/api/v1',userRouter);    //url will be https://localhost:4000/api/v1/register         ,here /api/v1 will be prefix
module.exports=app;