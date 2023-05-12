const router = require("express").Router();

const { User } = require("../models/user.model");

//Create User
router.post("/register", async (req, res) => {
  try {
    const { username, email, bio, password } = req.body;
    const newUser = new User({ username, email, bio, password });
    const savedUser = await newUser.save();

    res.send(savedUser);
  } catch (error) {
    console.error({ error });
    res.status(500).send([error]);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const fetchedUser = await User.findOne({ email });

    if (!fetchedUser) {
      return res.status(404).send({ error: "No User Found" });
    }

    const isMatch = await fetchedUser.isPasswordValid(password);

    if (!isMatch) {
      return res.status(400).send({ error: "Invalid Credentials" });
    }

    res.send(fetchedUser);
  } catch (error) {
    console.error({ error });
    res.status(500).send([error]);
  }
});

module.exports = router;
