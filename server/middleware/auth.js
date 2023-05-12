const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];

    if (!token) {
      return res.status(401).send({ error: "No Token Provided" });
    }

    const { id } = await jwt.verify(token, process.env.JWT_SECRET);

    const fetchedUser = await User.findById(id);

    if (!fetchedUser) {
      return res.status(404).send({ error: "No User Found" });
    }

    req.user = fetchedUser;
    next();
  } catch (error) {
    console.error({ error });
    res.status(500).send({ error });
  }
};

module.exports = isAuth;
