const router = require("express").Router();

router.get("/", async (req, res) => {
  try {

    res.status(200).json(xxdData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;