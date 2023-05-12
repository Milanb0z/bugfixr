const router = require("express").Router();

const { User } = require("../models/user.model");
const generateToken = require("../utils/generateToken");

//Create User
router.get("/all", async (req, res) => {
  try {
    const fetchedUsers = await User.find();

    res.send(fetchedUsers);
  } catch (error) {
    console.error({ error });
    res.status(500).send([error]);
  }
});

//Create User
router.post("/register", async (req, res) => {
  try {
    const { username, email, bio, password } = req.body;
    const newUser = new User({ username, email, bio, password });
    const savedUser = await newUser.save();

    const token = await generateToken(savedUser.id);

    res.send(token);
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

    const token = await generateToken(fetchedUser.id);

    console.log(token);

    res.send(token);
  } catch (error) {
    console.error({ error });
    res.status(500).send([error]);
  }
});

router.delete("/", async (req, res) => {
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

    const deletedUser = await User.deleteOne({ email });

    res.send(deletedUser);
  } catch (error) {
    console.error({ error });
    res.status(500).send([error]);
  }
});

module.exports = router;
