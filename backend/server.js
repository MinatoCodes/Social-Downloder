const express = require("express");
const path = require("path");
const downloder = require("./downloder");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/download", async (req, res) => {
  const { url, quality } = req.query;
  if (!url) return res.status(400).json({ success: false, message: "Missing URL" });

  try {
    const videoUrl = await downloder.getDownloadUrl(url, quality);
    res.json({ success: true, videoUrl });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
