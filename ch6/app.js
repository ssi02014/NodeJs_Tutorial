const express = require("express");
const path = require("path");

const app = express();
app.set("port", process.env.PORT || 8000);

app.get("/", (req, res) => {
  // res.send("Hello Express");
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번에서 대기중");
});
