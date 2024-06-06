import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,       // Meskipun ini deprecated, pastikan tidak ada kesalahan lain
            useUnifiedTopology: true,    // Meskipun ini deprecated, pastikan tidak ada kesalahan lain
            connectTimeoutMS: 10000,     // Waktu tunggu koneksi 10 detik
            socketTimeoutMS: 45000,      // Waktu tunggu socket 45 detik
        })

        console.log(`mongo db connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1)
    }
}

export default connectDB;