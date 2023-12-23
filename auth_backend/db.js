const mongoose = require("mongoose");
//const mongoURI = "mongodb://localhost:27017/inotebook";
const mongoURI=process.env.MONGOOSE_URL;
const connectToMongo = async () => {
  await mongoose
    .connect(mongoURI)
    .then(console.log("database connected"))
    .catch((e) => {
      console.log(e);
    });
};
module.exports = connectToMongo;

connectToMongo()