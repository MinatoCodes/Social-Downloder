const axios = require("axios");

exports.getDownloadUrl = async function(userUrl) {
  if (!userUrl || !userUrl.startsWith("http")) {
    throw new Error("Invalid URL");
  }

  try {
    let apiUrl = "";
    if (userUrl.includes("youtube.com") || userUrl.includes("youtu.be")) {
      apiUrl = "https://dev-priyanshi.onrender.com/api/youtube";
    } else {
      apiUrl = "https://dev-priyanshi.onrender.com/api/alldl";
    }

    const response = await axios.get(apiUrl, {
      params: { url: userUrl }
    });

    if (response.data && response.data.success && response.data.data && response.data.data.downloadUrl) {
      return response.data.data.downloadUrl;
    } else {
      throw new Error("Failed to fetch video URL");
    }
  } catch (error) {
    console.error("Downloader error:", error.message);
    throw new Error("Error fetching video URL");
  }
};
