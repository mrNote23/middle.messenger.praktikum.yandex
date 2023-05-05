// import express from "express";
// import * as path from "path";
// import { fileURLToPath } from "url";
// import * as fs from "fs";

const express = require("express");
const path = require("path");
// const { fileURLToPath } = require("url");
const fs = require("fs");

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = "localhost";

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

app.listen(PORT, HOST, () => {
  console.log(`Server started on ${HOST}:${PORT}`);
});
