document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("downloadBtn");
  const videoUrlInput = document.getElementById("videoUrl");

  downloadBtn.addEventListener("click", async () => {
    const url = videoUrlInput.value.trim();

    if (!url) {
      alert("Please paste a video link.");
      return;
    }

    try {
      const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (data.success && data.videoUrl) {
        const a = document.createElement("a");
        a.href = data.videoUrl;
        a.download = "";
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert(data.message || "Download failed.");
      }
    } catch (e) {
      alert("Server error.");
      console.error(e);
    }
  });
});
