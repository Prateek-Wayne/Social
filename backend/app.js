const dotenv=require('dotenv');
const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const session = require('express-session')
const path = require("path");


//app midleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true })); //we can use body-parser;
//express-seesion
app.use(
    session({
        secret: "I am girl",
        resave: false,
        saveUninitialized: true,
        cookie: {
            expires: 60000
        }
    })
);

app.use(function (req, res, next) {
    if (!req.session.sessionStarted) {
        req.session.sessionStarted = true;
        console.log(`New session started ${new Date(Date.now()).toLocaleString()}`);
        
        // Schedule a log message and session destruction for when the session should expire
        setTimeout(() => {
            console.log(`Session expired at ${new Date(Date.now()).toLocaleString()}`);
            req.session.destroy();
        }, req.session.cookie.expires);
    }
    next();
});


app.use(cookieParser());//this is enables cookie data to be read
if(process.env.NODE_ENV!=='DEVELOPMENT'){
    dotenv.config({path:'backend/config/config.env'});
}
    
//Importing Routes
const postRouter=require('./routes/post');
const userRouter=require('./routes/user');

//using Routes
app.use('/api/v1',postRouter);    //url will be  https//localhost:4000/api/v1/post/upload  ,here /api/v1 will be prefix
app.use('/api/v1',userRouter);    //url will be https://localhost:4000/api/v1/register         ,here /api/v1 will be prefix

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
module.exports=app;

  