import fs from "fs";
import * as path from "path";

const styleExtensions = [".css", ".scss", ".sass", ".styl", ".less", ".pcss"];

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files
    .filter((file) => file !== "node_modules" && file !== "dist")
    .forEach(function (file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      } else {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    });

  return arrayOfFiles;
}

const getStyleExtensions = (directory) => {
  const files = getAllFiles(directory);
  const extensionsFound = files
    .map((filepath) => {
      if (styleExtensions.includes(path.extname(filepath))) {
        console.log(filepath);
      }
      return path.extname(filepath);
    })
    .filter((extension) => styleExtensions.includes(extension))
    .reduce((extensions, extension) => extensions.add(extension), new Set());
  return Array.from(extensionsFound);
};

const extensions = getStyleExtensions(".");
let extension;
if (extensions.length === 0) {
  console.log("There are no style files");
  process.exit(1);
} else if (extensions.length > 1) {
  console.log(extensions);
  console.log("Files with styles must have one extension. For example, .scss");
  process.exit(1);
} else {
  extension = extensions[0];
}
