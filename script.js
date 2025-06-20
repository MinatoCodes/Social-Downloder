async function download() {
  const videoUrl = document.getElementById("videoUrl").value.trim();
  const spinner = document.getElementById("spinner");
  const videoInfo = document.getElementById("videoInfo");

  if (!videoUrl) {
    alert("Please enter a video URL.");
    return;
  }

  spinner.classList.remove("hidden");
  videoInfo.classList.add("hidden");

  try {
    // Step 1: Get video metadata + URLs from API
    const apiUrl = `https://dev-priyanshi.onrender.com/api/alldl?url=${encodeURIComponent(videoUrl)}`;
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.status || !result.data || !result.data.high) {
      throw new Error("No valid video found.");
    }

    document.getElementById("videoTitle").innerText = result.data.title || "Untitled";
    document.getElementById("videoThumbnail").src = result.data.thumbnail || "";
    videoInfo.classList.remove("hidden");

    const proxyBase = "https://proxy-downloader.onrender.com/download?url=";
    const proxiedVideoUrl = proxyBase + encodeURIComponent(result.data.high);

    const isYouTube = /youtube\.com|youtu\.be/.test(videoUrl.toLowerCase());

    if (isYouTube) {
      // For YouTube: fetch as arraybuffer and download via blob
      const videoResponse = await fetch(proxiedVideoUrl);
      if (!videoResponse.ok) throw new Error("Failed to fetch video data");

      const videoBuffer = await videoResponse.arrayBuffer();
      const contentType = videoResponse.headers.get("Content-Type") || "video/mp4";

      const blob = new Blob([videoBuffer], { type: contentType });
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = (result.data.title || "video") + ".mp4";
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(blobUrl);

    } else {
      // For other platforms: direct download via proxy link
      const a = document.createElement("a");
      a.href = proxiedVideoUrl;
      a.download = (result.data.title || "video") + ".mp4";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }

  } catch (error) {
    console.error("Download error:", error.message);
    alert("Failed to download video.");
  } finally {
    spinner.classList.add("hidden");
  }
}
  
