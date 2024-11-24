const mongoose = require("mongoose");
    
const connectDB =  async ()=>{
    mongoose.connect("mongodb+srv://airvision:airvision123@airvision.wgfho.mongodb.net/users?retryWrites=true&w=majority&appName=AirVision").then(()=>{
        console.log("Db connected")
      }).catch((error)=>{
        console.log("Db connection failed")
        console.log(error)
        process.exit(0)
      })
}
module.exports =  connectDB;




