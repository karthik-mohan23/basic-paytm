require("dotenv").config();
const express = require("express");
const app = express();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    app.listen(process.env.PORT, () => {
      console.log("Server is listening at " + process.env.PORT);
    });
  } catch (error) {
    console.console.log("Something went wrong!!!");
    console.error(error);
  }
})();
