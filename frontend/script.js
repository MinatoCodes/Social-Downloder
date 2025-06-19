document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("downloadBtn");
  const videoUrlInput = document.getElementById("videoUrl");
  const qualitySelect = document.getElementById("qualitySelect");

  videoUrlInput.addEventListener("input", () => {
    const url = videoUrlInput.value.trim();
    qualitySelect.style.display = (url.includes("youtube.com") || url.includes("youtu.be")) ? "block" : "none";
  });

  downloadBtn.addEventListener("click", async () => {
    const url = videoUrlInput.value.trim();
    const quality = qualitySelect.value;

    if (!url) return alert("Please paste a video link.");

    try {
      const res = await fetch(`/api/download?url=${encodeURIComponent(url)}&quality=${encodeURIComponent(quality)}`);
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
