const router = require("express").Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");

router.get("/", async (req, res) => {
  try {
    const data = fs.readFileSync("./db/db.json", "utf8");
    const notes = JSON.parse(data);
    res.status(200).json(notes);
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

    const data = fs.readFileSync("./db/db.json", "utf8");
    const notes = JSON.parse(data);
    notes.push(newNote);
    fs.appendFileSync("./db/db.json", JSON.stringify(notes));
    res.status(200).json({message: "Note added successfully"});
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
