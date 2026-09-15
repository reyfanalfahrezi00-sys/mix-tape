document.addEventListener("DOMContentLoaded", () => {
  const screenEnvelope = document.getElementById("screen-envelope");
  const screenFlowers = document.getElementById("screen-flowers");
  const screenMain = document.getElementById("screen-main");
  const envelopeBtn = document.getElementById("envelope-btn");
  const flowerContainer = document.getElementById("flower-container");

  const cassetteBody = document.getElementById("cassette-body");
  const playingStatus = document.getElementById("playing-status");

  const ytBubble = document.getElementById("yt-bubble");
  const ytIframe = document.getElementById("yt-iframe");
  const ytNowPlaying = document.getElementById("yt-now-playing");
  const closeYtBtn = document.getElementById("close-yt-btn");

  let currentYtId = null;

  // TRANSISI LAYAR: AMPLOP -> BUNGA -> ROOM
  envelopeBtn.addEventListener("click", () => {
    screenEnvelope.classList.remove("active");
    screenFlowers.classList.add("active");

    generateFlowers();

    setTimeout(() => {
      screenFlowers.classList.remove("active");
      screenMain.classList.add("active");
    }, 2500);
  });

  function generateFlowers() {
    flowerContainer.innerHTML = "";
    const flowerIcons = ['🌸', '🌺', '🌷', '🌹', '🌸', '🌺'];

    flowerIcons.forEach((icon, i) => {
      const flower = document.createElement("div");
      flower.classList.add("css-flower");
      flower.innerText = icon;

      flower.style.left = `${12 + i * 15}%`;
      flower.style.top = `${25 + (i % 3) * 20}%`;
      flower.style.animationDelay = `${i * 0.15}s`;

      flowerContainer.appendChild(flower);
    });
  }

  // PLAYLIST INTERAKSI
  const trackItems = document.querySelectorAll(".track-item");

  trackItems.forEach((item) => {
    item.addEventListener("click", () => {
      const ytId = item.getAttribute("data-yt");
      const title = item.getAttribute("data-title");

      if (currentYtId === ytId && !ytBubble.classList.contains("hidden")) {
        closeYoutube();
        return;
      }

      playYoutubeTrack(ytId, title);
    });
  });

  function playYoutubeTrack(ytId, title) {
    // Tampilkan dulu kontainernya baru muat URL YouTube (Supaya browser tidak blokir autoplay)
    ytBubble.classList.remove("hidden");
    
    // URL Embed YouTube resmi yang aman dari kebijakan autoplay desktop
    ytIframe.src = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&enablejsapi=1&allow=autoplay`;
    
    ytNowPlaying.innerText = title;
    cassetteBody.classList.add("playing");
    playingStatus.innerText = "Playing: " + title;
    currentYtId = ytId;
  }

  function closeYoutube() {
    ytBubble.classList.add("hidden");
    ytIframe.src = ""; // Stop video & audio
    cassetteBody.classList.remove("playing");
    playingStatus.innerText = "Press play.";
    currentYtId = null;
  }

  closeYtBtn.addEventListener("click", closeYoutube);
});
