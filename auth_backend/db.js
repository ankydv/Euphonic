import mongoose from "mongoose";
import { config } from 'dotenv';
config();
//const mongoURI = "mongodb://localhost:27017/inotebook";
const mongoURI=process.env.MONGOOSE_URL;
const connectToMongo = async () => {
  mongoose.set('strictQuery', false);
  await mongoose
    .connect(mongoURI)
    .then(console.log("database connected"))
    .catch((e) => {
      console.log(e);
    });
};
export default connectToMongo

connectToMongo()



//  import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

// const connectDB = async () => {
//   try {
//       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//       console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
//   } catch (error) {
//       console.log("MONGODB connection FAILED ", error);
//       process.exit(1)
//   }
// }

// export default connectDB