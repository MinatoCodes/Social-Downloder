async function download() {
  const videoUrl = document.getElementById("videoUrl").value.trim();
  const spinner = document.getElementById("spinner");
  const videoInfo = document.getElementById("videoInfo");

  if (!videoUrl) {
    alert("Please enter a video URL.");
    return;
  }

  // Show loading spinner
  spinner.classList.remove("hidden");
  videoInfo.classList.add("hidden");

  try {
    const encodedUrl = encodeURIComponent(videoUrl);
    const apiUrl = `https://dev-priyanshi.onrender.com/api/alldl?url=${encodedUrl}`;
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.status || !result.data || !result.data.high) {
      throw new Error("No valid video link found in response.");
    }

    // Optional UI update: Show thumbnail and title
    document.getElementById("videoTitle").innerText = result.data.title || "Untitled";
    document.getElementById("videoThumbnail").src = result.data.thumbnail || "";
    videoInfo.classList.remove("hidden");

    // Redirect to the high quality video URL
    window.location.href = result.data.high;

  } catch (err) {
    console.error(err);
    alert("❌ Error downloading video. Please check the link or try again later.");
  } finally {
    spinner.classList.add("hidden");
  }
      }
  
