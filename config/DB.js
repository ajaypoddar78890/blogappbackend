import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    console.log(
      `YOUR MONGODB IS CONNECTED TO THE SERVER  
       
        // ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`error in ${error}`);
  }
};
export default connectDB;
