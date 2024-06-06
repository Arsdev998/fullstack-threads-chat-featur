import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser :true,
            useUnifiedTopology: true,
            // UseCreateIndex: true
        })

        console.log(`mongo db connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1)
    }
}

export default connectDB;