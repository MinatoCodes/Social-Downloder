const express = require("express");
const path = require("path");
const downloader = require("./downloader");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/download", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ success: false, message: "Missing URL" });

  try {
    const videoUrl = await downloader.getDownloadUrl(url);
    res.json({ success: true, videoUrl });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
