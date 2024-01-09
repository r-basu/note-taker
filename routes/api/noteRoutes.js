const router = require("express").Router();
const { readFromFile, readAndAppend } = require("../../helpers/fsUtils");

router.get("/", async (req, res) => {
  try {
    readFromFile("./db/db.json").then((data) =>
      res.status(200).json(JSON.parse(data))
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
