const videoUrlInput = document.getElementById("videoUrl");
const spinner = document.getElementById("spinner");
const qualityWrapper = document.getElementById("qualityWrapper");
const qualitySelect = document.getElementById("qualitySelect");

videoUrlInput.addEventListener("input", () => {
  const url = videoUrlInput.value.trim();
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    qualityWrapper.classList.remove("hidden");
  } else {
    qualityWrapper.classList.add("hidden");
  }
});

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

    // ✅ Updated: get direct download URL from response.data.url
    if (data.success && data.url) {
      window.location.href = data.url;
    } else {
      alert(data.message || "Failed to get download link.");
    }
  } catch (error) {
    spinner.classList.add("hidden");
    console.error("Error:", error);
    alert("Server error. Please try again later.");
  }
      }
    
