const mongoose = require ("mongoose")

const connectDB =async()=>{
    try{
        const connec =await mongoose.connect(process.env.MONGODV_URI)
        console.log(`MongoDB connected : ${connec.connection.host}`);
    }catch(error){
        console.error(`Database connection failed ${error.message}`);
        process.exit(1);   //stop server if db fails
    }
}
module.exports =connectDB;