import mongoose from "mongoose";

export const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName : "Job_Portal"
    }).then(()=>{
        console.log("connected to mongoose")
    }).catch((err)=>{
        console.log(`couldn't connect : ${err}`)
    })
}
