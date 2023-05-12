const router = require("express").Router();

//Models
const Bug = require("../models/bug.model");

//Middleware
const isAuth = require("../middleware/auth");

router.post("/new", isAuth, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newBug = new Bug({ title, description, author: req.user.id });

    const savedBug = await newBug.save();

    res.send(savedBug);
  } catch (error) {
    console.error({ error });
    res.status(500).send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBug = await Bug.findByIdAndDelete(id);

    res.send(deletedBug);
  } catch (error) {
    console.error({ error });
    res.status(500).send({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const allBugs = await Bug.find();

    res.send(allBugs);
  } catch (error) {
    console.error({ error });
    res.status(500).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const bug = await Bug.findById(id).populate("author");

    if (!bug) {
      res.status(404).send({ error: "Bug Not Found" });
    }

    res.send(bug);
  } catch (error) {
    console.error({ error });
    res.status(500).send({ error });
  }
});

module.exports = router;
