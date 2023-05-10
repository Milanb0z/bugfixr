const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB_ONLINE");
  })
  .catch((e) => {
    console.error(e);
  });
