async function download() {
  const videoUrl = document.getElementById("videoUrl").value.trim();
  const spinner = document.getElementById("spinner");
  const videoInfo = document.getElementById("videoInfo");

  if (!videoUrl) {
    alert("Please enter a video URL.");
    return;
  }

  // Show spinner while loading
  spinner.classList.remove("hidden");
  videoInfo.classList.add("hidden");

  try {
    const encodedUrl = encodeURIComponent(videoUrl);
    const apiUrl = `https://dev-priyanshi.onrender.com/api/alldl?url=${encodedUrl}`;

    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.status || !result.data || !result.data.high) {
      throw new Error("No valid video found.");
    }

    // Display video title and thumbnail
    document.getElementById("videoTitle").innerText = result.data.title || "Untitled Video";
    document.getElementById("videoThumbnail").src = result.data.thumbnail || "";
    videoInfo.classList.remove("hidden");

    // Prepare download using proxy
    const proxyUrl = `https://proxy-downloader.onrender.com/download?url=${encodeURIComponent(result.data.high)}`;

    // Force download by navigating to proxy
    const downloadLink = document.createElement("a");
    downloadLink.href = proxyUrl;
    downloadLink.download = (result.data.title || "video") + ".mp4";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

  } catch (error) {
    console.error("Download error:", error.message);
    alert("❌ Could not download the video. Please try another link.");
  } finally {
    spinner.classList.add("hidden");
  }
}
