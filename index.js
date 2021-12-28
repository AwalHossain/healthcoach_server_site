const express = require("express");
const app = express();
// const productRoute = require("./model/Product");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const paymentRoute = require("./routes/stripe");
// CORS
const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 5000;
app.use(express.json());

//environment file
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

app.get("/", (req, res) => {
  res.send("Server is workine");
});

// mongoDB
app.use("/api/auth", authRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);
app.use("/api", paymentRoute);

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Db connection is succesful"))
  .catch((err) => {
    console.log(err);
  });

//   router

app.listen(port, () => {
  console.log("The backend server is running on " + port);
});
