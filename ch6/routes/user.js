const express = require("express");

const router = express.Router();

// GET /user 라우터
router.get("/", (req, res) => {
  res.send("Hello, User");
});

router.get("/:id", (req, res) => {
  console.log(req.params, req.query);
  res.send(`Hello, ${req.params.id}`);
});

module.exports = router;
