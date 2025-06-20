const express = require("express");
const cors = require("cors");
const downloader = require("./downloader");

const app = express();
const PORT =  10000;

// Enable CORS for all origins
app.use(cors());

app.get("/api/download", async (req, res) => {
  try {
    const { url, quality } = req.query;

    if (!url) {
      return res.status(400).json({ success: false, message: "Missing URL" });
    }

    const data = await downloader(url, quality);

    if (!data || !data.url) {
      return res.status(500).json({ success: false, message: "Could not fetch video download URL." });
    }

    return res.json({
      success: true,
      videoUrl: data,
    });
  } catch (error) {
    console.error("Download error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
    
