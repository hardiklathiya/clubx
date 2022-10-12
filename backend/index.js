var cors = require("cors");

const express = require("express");
const app = express();
app.use(cors());
const port = process.env.PORT || 80;
const cookieParser = require("cookie-parser");
//*connecting to database
const connectionDB = require("./database");
connectionDB();

//* uncaught exception be like console.log(anyVariable)
app.use(express.urlencoded({ extended: false }));
// process.on("uncaughtException", (err) => {
//   console.log("Error : " + err.message);
//   console.log("server is shutting down due to uncaught exception");
//   process.exit(1);
// });
//*config
require("dotenv").config({ path: "./config/.env" });
app.use(express.json());

//* cookieparser must be initialized before the routes are mentioned in index.js or main file of backend
app.use(cookieParser());

const product = require("./routes/product");
const user = require("./routes/user");
const order = require("./routes/order");
app.use("/", product);
app.use("/", user);
app.use("/", order);
const server = app.listen(port, () => console.log(`http://localhost:${port}`));

//* unhandled promise rejected that can be resolved
// process.on("unhandledRejection", (err) => {
//   console.error("Error: " + err);
//   console.log("server is shutting down due to unhandled promise rejection");
//   server.close(() => {
//     process.exit(1);
//   });
// });
