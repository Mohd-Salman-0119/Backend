const { mongoose } = require("../imports/modules.imports")
require("dotenv").config();

const connectionDB = async () => {
     try {
          await mongoose.connect(`${process.env.MONGO_URI}/board`);
          console.log("Connected Successfully: Mongo_DB")
     } catch (error) {
          console.log("Error, while connecting MONGO_DB")
     }
}

module.exports = {
     connectionDB
}