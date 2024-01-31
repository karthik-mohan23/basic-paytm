require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const rootRouter = require("./routes/index");

app.use(express.json());

app.use("/api/v1", rootRouter);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    app.listen(process.env.PORT, () => {
      console.log("Server is listening at " + process.env.PORT);
    });
  } catch (error) {
    console.log("Something went wrong!!!");
    console.error(error);
  }
})();
