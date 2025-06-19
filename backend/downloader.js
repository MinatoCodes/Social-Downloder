const axios = require("axios");

exports.getDownloadUrl = async function(userUrl, quality = "480p") {
  if (!userUrl || !userUrl.startsWith("http")) {
    throw new Error("Invalid URL");
  }

  try {
    let apiUrl = "";

    if (userUrl.includes("youtube.com") || userUrl.includes("youtu.be")) {
      apiUrl = `https://dev-priyanshi.onrender.com/api/ytmp4dl?url=${encodeURIComponent(userUrl)}&quality=${encodeURIComponent(quality)}`;
    } else {
      apiUrl = `https://dev-priyanshi.onrender.com/api/alldl?url=${encodeURIComponent(userUrl)}`;
    }

    const response = await axios.get(apiUrl);

    if (response.data && response.data.success && response.data.data && response.data.data.downloadUrl) {
      return response.data.data.low;
    } else {
      throw new Error("Video not found or unsupported.");
    }
  } catch (error) {
    console.error("Downloader error:", error.message);
    throw new Error("Could not fetch video download URL.");
  }
};
