let ytNoticeShown = false;

async function download() {
  const videoUrl = document.getElementById("videoUrl").value.trim();
  const spinner = document.getElementById("spinner");
  const videoInfo = document.getElementById("videoInfo");
  const ytNotice = document.getElementById("ytNotice");

  if (!videoUrl) {
    alert("Please enter a video URL.");
    return;
  }

  spinner.classList.remove("hidden");
  videoInfo.classList.add("hidden");
  ytNotice.classList.add("hidden"); // Hide notice on new request

  try {
    const apiUrl = `https://dev-priyanshi.onrender.com/api/alldl?url=${encodeURIComponent(videoUrl)}`;
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.status || !result.data || !result.data.high) {
      throw new Error("Invalid video link.");
    }

    document.getElementById("videoTitle").innerText = result.data.title || "Untitled";
    document.getElementById("videoThumbnail").src = result.data.thumbnail || "";
    videoInfo.classList.remove("hidden");

    const proxyBase = "https://your-backend-url.onrender.com/proxy-download?url=";
    const proxyDownloadUrl = proxyBase + encodeURIComponent(result.data.high);

    const isYouTube = /youtube\.com|youtu\.be/.test(videoUrl.toLowerCase());

    if (isYouTube) {
      if (!ytNoticeShown) {
        ytNotice.classList.remove("hidden");
        ytNoticeShown = true;
        spinner.classList.add("hidden");
        return; // Stop here, user must click download again
      }
      // On second click, proceed with download and hide notice
      ytNotice.classList.add("hidden");
      ytNoticeShown = false;
    }

    // Trigger download by redirecting to proxy URL
    const a = document.createElement("a");
    a.href = proxyDownloadUrl;
    a.download = (result.data.title || "video") + ".mp4";
    document.body.appendChild(a);
    a.click();
    a.remove();

  } catch (err) {
    console.error("Download error:", err);
    alert("❌ Failed to download video.");
  } finally {
    spinner.classList.add("hidden");
  }
    }
      
