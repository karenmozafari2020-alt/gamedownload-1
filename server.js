const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const FILE_NAME = "RA-GRAPHICS.zip";
const FILE_PATH = path.join(__dirname, "files", FILE_NAME);

app.use(express.static(path.join(__dirname, "public")));

app.get("/download", (req, res) => {
  if (!fs.existsSync(FILE_PATH)) {
    return res.status(404).send("File not found");
  }
  res.download(FILE_PATH, FILE_NAME);
});

app.get("/api/file", (req, res) => {
  if (!fs.existsSync(FILE_PATH)) {
    return res.status(404).json({ error: "File not found" });
  }
  const size = fs.statSync(FILE_PATH).size;
  res.json({ name: FILE_NAME, size });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
