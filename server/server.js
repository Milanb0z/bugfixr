const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", require("./router/user.router"));
app.use("/bug", require("./router/bug.router"));

app.listen(3001, () => {
  console.log("SERVER_ONLINE");
});
