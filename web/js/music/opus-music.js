const songs = [{
  title: "Baby_One_More_Time-Tenacious_D.opus",
  src: "Baby_One_More_Time-Tenacious_D.opus"
}, {
  title: "Boys_Town_Gang-Can't_Take_My_Eyes_Off_You.opus",
  src: "Boys_Town_Gang-Can't_Take_My_Eyes_Off_You.opus"
}, {
  title: "Bruno_Mars-Treasure.opus",
  src: "Bruno_Mars-Treasure.opus"
}, {
  title: "Cats_Sped_Up.opus",
  src: "Cats_Sped_Up.opus"
}, {
  title: "Engelwood-Crystal_Dolphin.opus",
  src: "Engelwood-Crystal_Dolphin.opus"
}, {
  title: "Hotel_California.opus",
  src: "Hotel_California.opus"
}, {
  title: "Music_Sounds_Better_With_You.opus",
  src: "Music_Sounds_Better_With_You.opus"
}, {
  title: "Rasputin.opus",
  src: "Rasputin.opus"
}, {
  title: "Super_Mario_3D_World-Beep_Block_Skyway.opus",
  src: "Super_Mario_3D_World-Beep_Block_Skyway.opus"
}, {
  title: "That's_How_You_Know.opus",
  src: "That's_How_You_Know.opus"
}, {
  title: "The_Way_You_Make_Me_Feel.opus",
  src: "The_Way_You_Make_Me_Feel.opus"
}, {
  title: "You'll_Be_Gone.opus",
  src: "You'll_Be_Gone.opus"
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
      e.src = `//cdn.mcalec.dev/audio/opus/${songs[currentSong].src}`,
      e.play(),
      t.classList.add("paused"),
      s.style.display = "block",
      n.textContent = songs[currentSong].title,
      c()
  }
  currentSong = Math.floor(Math.random() * songs.length),
  e.src = `//cdn.mcalec.dev/audio/opus/${songs[currentSong].src}`,
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