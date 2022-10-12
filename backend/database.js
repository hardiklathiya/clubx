const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

const connectionDB = () => {
  mongoose.connect(
    process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (!err) {
        console.log("MongoDB Connection Succeeded.");
      } else {
        console.log(
          "server is shutting down due to unhandled promise rejection : " + err
        );
      }
    }
  );
};
module.exports = connectionDB;
