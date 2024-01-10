const router = require("express").Router();
const { readFromFile, readAndAppend } = require("../../helpers/fsUtils");
const uuid = require('../../helpers/uuid');

router.get("/", async (req, res) => {
  try {
    readFromFile("./db/db.json").then((data) =>
      res.status(200).json(JSON.parse(data))
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body)

    const {title, text} = req.body
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid()
      }
      readAndAppend(newNote, "./db/db.json")
      res.status(200).json(`Note added successfully`)
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
