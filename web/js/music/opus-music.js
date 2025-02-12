let songs = [];
let currentSong = 0;
async function loadSongs() {
  try {
    const response = await fetch('/web/json/opus-songs.json'); // json
    songs = await response.json();
    initMusic();
  } catch (error) {
    console.error('Error loading songs:', error);
  }
}
function initMusic() {
  if (songs.length === 0) return;
  const e = document.getElementById("music-src"),
  t = document.getElementById("music"),
  s = document.getElementById("music-skip"),
  n = document.getElementById("music-info");
  function o() {
    currentSong = (currentSong + 1) % songs.length;
    e.src = `/audio/opus/${songs[currentSong].src}`; // src
    e.play();
    t.classList.add("paused");
    s.style.display = "block";
    n.textContent = songs[currentSong].title;
  }
  currentSong = Math.floor(Math.random() * songs.length);
  e.src = `/audio/opus/${songs[currentSong].src}`; // src
  t.addEventListener("click", function() {
    if (e.paused) {
      e.play();
      t.classList.add("paused");
      s.style.display = "block";
      n.textContent = songs[currentSong].title;
    } else {
      e.pause();
      t.classList.remove("paused");
    }
  });
  s.addEventListener("click", o);
  e.volume = 1;
  e.addEventListener("ended", o);
}
loadSongs();
