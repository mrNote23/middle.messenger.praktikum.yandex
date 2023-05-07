const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

const build = "dist";

app.use("/", express.static(path.resolve(__dirname, build)));

app.get("*", (req, res) => {
  const indexFile = path.resolve(__dirname, build, "index.html");

  if (fs.existsSync(indexFile)) {
    res.sendFile(indexFile);
  } else {
    res.status(200).send(`./${build}/index.html not found...`);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
