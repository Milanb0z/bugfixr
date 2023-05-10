const router = require("express").Router();

const Bug = require("../models/bug.model");

router.post("/new", async (req, res) => {
  try {
    const { title, description } = req.body;

    const newBug = new Bug({ title, description });

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

    const fetchedBug = await Bug.findById(id);

    if (!fetchedBug) {
      res.status(404).send({ error: "Bug Not Found" });
    }

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

    const bug = await Bug.findById(id);

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
