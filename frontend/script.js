async function download() {
  const url = videoUrlInput.value.trim();
  if (!url) return alert("Please enter a video URL.");

  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const quality = isYouTube ? qualitySelect.value : "high";

  spinner.classList.remove("hidden");

  try {
    const query = new URLSearchParams({ url, quality });
    const response = await fetch(`https://social-downloader.onrender.com/api/download?${query.toString()}`);
    const data = await response.json();

    spinner.classList.add("hidden");

    if (data.success && data.url) {
      // ✅ Open the video download link in a new tab
      window.open(data.url, "_blank");
    } else {
      alert(data.message || "Failed to get download link.");
    }
  } catch (error) {
    spinner.classList.add("hidden");
    console.error("Error:", error);
    alert("Server error. Please try again later.");
  }
}
