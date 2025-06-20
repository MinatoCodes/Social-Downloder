const axios = require("axios");

exports.getDownloadUrl = async function(userUrl, quality = "360") {
  if (!userUrl || !userUrl.startsWith("http")) {
    throw new Error("Invalid URL");
  }

  try {
    let apiUrl = "";
    let response = null;

    if (userUrl.includes("youtube.com") || userUrl.includes("youtu.be")) {
      // YouTube API with quality param
      apiUrl = `https://dev-priyanshi.onrender.com/api/ytmp4dl?url=${encodeURIComponent(userUrl)}&quality=${encodeURIComponent(quality)}`;
      response = await axios.get(apiUrl);

      if (
        response.data &&
        response.data.status === true &&
        response.data.download &&
        response.data.download.status === true &&
        response.data.download.url
      ) {
        return {
          url: response.data.download.url,
          filename: response.data.download.filename,
          availableQuality: response.data.download.availableQuality,
          selectedQuality: response.data.download.quality,
        };
      } else {
        throw new Error("YouTube video not found or unsupported.");
      }
    } else {
      // Other platforms API (alldl) - always return HIGH quality url only
      apiUrl = `https://dev-priyanshi.onrender.com/api/alldl?url=${encodeURIComponent(userUrl)}`;
      response = await axios.get(apiUrl);

      if (response.data && response.data.status && response.data.data && response.data.data.high) {
        return {
          url: response.data.data.high,
          title: response.data.data.title,
          thumbnail: response.data.data.thumbnail,
          quality: "high",
        };
      } else {
        throw new Error("Video not found or unsupported.");
      }
    }
  } catch (error) {
    console.error("Downloader error:", error.message);
    throw new Error("Could not fetch video download URL.");
  }
};
    
