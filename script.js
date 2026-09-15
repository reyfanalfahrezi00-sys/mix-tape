document.addEventListener("DOMContentLoaded", () => {
  const screenEnvelope = document.getElementById("screen-envelope");
  const screenFlowers = document.getElementById("screen-flowers");
  const screenMain = document.getElementById("screen-main");
  const envelopeBtn = document.getElementById("envelope-btn");

  const audioPlayer = document.getElementById("audio-player");
  const cassetteBody = document.querySelector(".cassette-body");
  const playingStatus = document.getElementById("playing-status");
  
  const ytBubble = document.getElementById("yt-bubble");
  const ytIframe = document.getElementById("yt-iframe");
  const ytNowPlaying = document.getElementById("yt-now-playing");
  const closeYtBtn = document.getElementById("close-yt-btn");

  let currentPlayingTrack = null;

  // 1. STEP 1 -> STEP 2: ENVELOPE CLICK
  envelopeBtn.addEventListener("click", () => {
    screenEnvelope.classList.remove("active");
    screenFlowers.classList.add("active");

    // 2. STEP 2 -> STEP 3: FLOWER TRANSITION (Auto transition after 3s)
    setTimeout(() => {
      screenFlowers.classList.remove("active");
      screenMain.classList.add("active");
    }, 3000);
  });

  // 3. PLAYLIST TRACK CLICK
  const trackItems = document.querySelectorAll(".track-item");

  trackItems.forEach((item) => {
    item.addEventListener("click", () => {
      const audioSrc = item.getAttribute("data-audio");
      const ytId = item.getAttribute("data-yt");
      const trackTitle = item.getAttribute("data-title");

      // Check if clicking same playing track
      if (currentPlayingTrack === trackTitle && !audioPlayer.paused) {
        pauseSong();
        return;
      }

      playSong(audioSrc, trackTitle);
      showYtBubble(ytId, trackTitle);
    });
  });

  function playSong(audioSrc, title) {
    audioPlayer.src = audioSrc;
    audioPlayer.play().then(() => {
      cassetteBody.classList.add("playing");
      playingStatus.innerText = "Playing: " + title;
      currentPlayingTrack = title;
    }).catch(err => {
      console.log("Audio play error:", err);
    });
  }

  function pauseSong() {
    audioPlayer.pause();
    cassetteBody.classList.remove("playing");
    playingStatus.innerText = "Paused";
  }

  function showYtBubble(ytId, title) {
    ytIframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1`;
    ytNowPlaying.innerText = title;
    ytBubble.classList.remove("hidden");
  }

  // CLOSE YOUTUBE BUBBLE
  closeYtBtn.addEventListener("click", () => {
    ytBubble.classList.add("hidden");
    ytIframe.src = ""; // Stop YouTube video
  });

  // AUDIO ENDED EVENT
  audioPlayer.addEventListener("ended", () => {
    cassetteBody.classList.remove("playing");
    playingStatus.innerText = "Finished playing.";
  });
});
