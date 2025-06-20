async function download() {
  const videoUrl = document.getElementById("videoUrl").value.trim();
  const spinner = document.getElementById("spinner");
  const videoInfo = document.getElementById("videoInfo");

  if (!videoUrl) {
    alert("Please enter a video URL.");
    return;
  }

  // Show spinner
  spinner.classList.remove("hidden");
  videoInfo.classList.add("hidden");

  try {
    const encodedUrl = encodeURIComponent(videoUrl);
    const apiUrl = `https://dev-priyanshi.onrender.com/api/alldl?url=${encodedUrl}`;
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.status || !result.data || !result.data.high) {
      throw new Error("No valid video found");
    }

    // Show title & thumbnail
    document.getElementById("videoTitle").innerText = result.data.title || "Untitled";
    document.getElementById("videoThumbnail").src = result.data.thumbnail || "";
    videoInfo.classList.remove("hidden");

    // Force download
    const link = document.createElement("a");
    link.href = result.data.high;
    link.download = (result.data.title || "video") + ".mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error(error);
    alert("❌ Error fetching or downloading the video.");
  } finally {
    spinner.classList.add("hidden");
  }
        }
      
