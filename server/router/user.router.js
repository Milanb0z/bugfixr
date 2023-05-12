const router = require("express").Router();

const { User } = require("../models/user.model");

//Create User
router.post("/", async (req, res) => {
  try {
    const { username, email, bio, password } = req.body;

    const newUser = new User({ username, email, bio });

    const hashedPass = await newUser.hashPassword(password);

    console.log(hashedPass);

    res.send(newUser);
  } catch (error) {
    console.error({ error });
    res.status(500).send([error]);
  }
});

module.exports = router;
