const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET);

    return token;
  } catch (error) {
    console.error(error);
  }
};

module.exports = generateToken;
