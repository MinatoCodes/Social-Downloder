const videoUrlInput = document.getElementById("videoUrl");
const spinner = document.getElementById("spinner");

async function download() {
  const url = videoUrlInput.value.trim();
  if (!url) return alert("Please enter a video URL.");

  spinner.classList.remove("hidden"); // Show loading

  try {
    const query = new URLSearchParams({ url }); // no quality, backend handles it
    const response = await fetch(`https://social-downloader.onrender.com/api/download?${query.toString()}`);
    const data = await response.json();

    spinner.classList.add("hidden"); // Hide loading

    if (data.success && data.videoUrl && data.videoUrl.url) {
      // Redirect to video download URL
      window.location.href = data.videoUrl.url;
    } else {
      alert(data.message || "Failed to get download link.");
    }
  } catch (error) {
    console.error("Download error:", error);
    spinner.classList.add("hidden");
    alert("Server error. Please try again later.");
  }
            }
