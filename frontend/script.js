async function download() {
  const url = videoUrlInput.value.trim();
  if (!url) return alert("Please enter a video URL.");

  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  // For YouTube use selected quality, else use "high"
  const quality = isYouTube ? qualitySelect.value : "high";

  try {
    spinner.classList.remove("hidden"); // Show spinner
    const query = new URLSearchParams({ url, quality });
    const response = await fetch(`https://social-downloader.onrender.com/api/download?${query.toString()}`);
    const data = await response.json();
    spinner.classList.add("hidden"); // Hide spinner

    if (data.success && data.videoUrl && data.videoUrl.url) {
      const title = data.videoUrl.title || data.videoUrl.filename || "Video";
      const thumbnail = data.videoUrl.thumbnail || data.videoUrl.image || "";

      videoTitle.textContent = title;
      videoThumbnail.src = thumbnail;
      videoInfo.classList.remove("hidden");

      const a = document.createElement("a");
      a.href = data.videoUrl.url;
      a.download = title + ".mp4";
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      alert(data.message || "Download failed.");
    }
  } catch (error) {
    console.error("Error:", error);
    spinner.classList.add("hidden");
    alert("Server error. Please try again later.");
  }
        }
        
