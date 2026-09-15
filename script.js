document.addEventListener("DOMContentLoaded", () => {
  const screenEnvelope = document.getElementById("screen-envelope");
  const screenFlowers = document.getElementById("screen-flowers");
  const screenMain = document.getElementById("screen-main");
  const envelopeBtn = document.getElementById("envelope-btn");
  const flowerContainer = document.getElementById("flower-container");

  const audioPlayer = document.getElementById("audio-player");
  const cassetteBody = document.getElementById("cassette-body");
  const playingStatus = document.getElementById("playing-status");

  const ytBubble = document.getElementById("yt-bubble");
  const ytIframe = document.getElementById("yt-iframe");
  const ytNowPlaying = document.getElementById("yt-now-playing");
  const closeYtBtn = document.getElementById("close-yt-btn");

  // KLIK AMPLOP -> PANGGIL ANIMASI BUNGA CSS
  envelopeBtn.addEventListener("click", () => {
    screenEnvelope.classList.remove("active");
    screenFlowers.classList.add("active");

    // GENERATE BUNGA CSS MEKAR
    createFlowers();

    // TRANSISI KE MAIN ROOM
    setTimeout(() => {
      screenFlowers.classList.remove("active");
      screenMain.classList.add("active");
    }, 2500);
  });

  function createFlowers() {
    flowerContainer.innerHTML = "";
    const flowers = ['🌸', '🌺', '🌷', '🌹', '🌸'];
    
    flowers.forEach((flower, index) => {
      const el = document.createElement("div");
      el.classList.add("css-flower");
      el.innerText = flower;
      
      // Random posisi acak di layar
      el.style.left = `${15 + index * 18}%`;
      el.style.top = `${30 + (index % 3) * 15}%`;
      el.style.animationDelay = `${index * 0.2}s`;
      
      flowerContainer.appendChild(el);
    });
  }

  // PLAYLIST AUDIO & YOUTUBE
  const trackItems = document.querySelectorAll(".track-item");

  trackItems.forEach((item) => {
    item.addEventListener("click", () => {
      const audioSrc = item.getAttribute("data-audio");
      const ytId = item.getAttribute("data-yt");
      const title = item.getAttribute("data-title");

      playAudio(audioSrc, title);
      openYt(ytId, title);
    });
  });

  function playAudio(src, title) {
    audioPlayer.src = src;
    audioPlayer.play().then(() => {
      cassetteBody.classList.add("playing");
      playingStatus.innerText = "Playing: " + title;
    }).catch(e => console.log(e));
  }

  function openYt(ytId, title) {
    ytIframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1`;
    ytNowPlaying.innerText = title;
    ytBubble.classList.remove("hidden");
  }

  closeYtBtn.addEventListener("click", () => {
    ytBubble.classList.add("hidden");
    ytIframe.src = "";
  });
});
