const router = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../../helpers/fsUtils");
const uuid = require("../../helpers/uuid");
const fs = require("fs");

router.get("/", async (req, res) => {
  try {
    readFromFile("./db/db.json").then((notes) =>
      res.status(200).json(JSON.parse(notes))
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const { title, text } = req.body;
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
      readAndAppend(newNote, "./db/db.json");
      res.status(200).json(`Note added successfully`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = fs.readFileSync("./db/db.json", "utf8");
    const notes = JSON.parse(data);

    const updatedNotes = notes.filter((note) => note.id !== id);

    fs.writeFileSync("./db/db.json", JSON.stringify(updatedNotes));

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
