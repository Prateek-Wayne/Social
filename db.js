const bcrypt = require('bcrypt');
// const mongoose=require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/SampleDB")
// .then(()=>{
//     console.log("connected with database");
// })
// .catch(()=>{
//     console.log("Error not connected with database");
// });

// const student=mongoose.Schema({
//     name:String,
//     workout:Boolean,
//     height:Number,
// })

// const Student=mongoose.model("Student",student);

// const adder=async()=>{
//     // const ss=await Student.create({
//     //     name:"Beta",
//     //     workout:true,
//     //     height:5.6,
//     // });
//     const ss=await Student.find({name:"Beta"});
//     console.log(ss);
// };
// adder();

const password="ABCDEFGH";
const printHashedPassword=async(password)=>{
    const hashedPassword=await bcrypt.hash(password,10);
    console.log(hashedPassword);
    return hashedPassword;
}
let hashedPassword="";
(async()=>{
     hashedPassword=await printHashedPassword(password);
     console.log(password,"!",hashedPassword);
})();