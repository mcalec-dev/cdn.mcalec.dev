const songs = [{
  title: "buzzer.wav",
  src: "buzzer.wav"
}, {
  title: "level-1.wav",
  src: "level-1.wav"
}, {
  title: "menu-1.wav",
  src: "menu-1.wav"
}, {
  title: "moon-theme.wav",
  src: "moon-theme.wav"
}, {
  title: "organic.wav",
  src: "organic.wav"
}, {
  title: "transfur.wav",
  src: "transfur.wav"
}];
let currentSong = 0;
function initMusic() {
  const e = document.getElementById("music-src")
    , t = document.getElementById("music")
    , s = document.getElementById("music-skip")
    , n = document.getElementById("music-info")
  //  , i = document.getElementById("music-cover");
  //function c() {
  //    i.src = `/audio/mp3/thumbnails/${songs[currentSong].src.replace(".mp3", ".png")}`,
  //    i.style.display = "block"
  //}
  function o() {
      currentSong = (currentSong + 1) % songs.length,
      e.src = `//cdn.mcalec.dev/audio/wav/${songs[currentSong].src}`,
      e.play(),
      t.classList.add("paused"),
      s.style.display = "block",
      n.textContent = songs[currentSong].title,
      c()
  }
  currentSong = Math.floor(Math.random() * songs.length),
  e.src = `//cdn.mcalec.dev/audio/wav/${songs[currentSong].src}`,
  //i.style.display = "none",
  t.addEventListener("click", (function() {
      e.paused ? (e.play(),
      t.classList.add("paused"),
      s.style.display = "block",
      n.textContent = songs[currentSong].title,
      c()) : (e.pause(),
      t.classList.remove("paused"),
      s.style.display = "none",
      n.textContent = "",
      i.style.display = "none")
  }
  )),
  s.addEventListener("click", o),
  e.volume = .5,
  e.addEventListener("ended", (function() {
      o()
  }
  ))
}
initMusic();