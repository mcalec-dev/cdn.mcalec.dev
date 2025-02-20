let songs = [];
let currentSong = 0;
let isDragging = false;

async function loadSongs() {
  try {
    const response = await fetch('/web/json/opus-songs.json');
    songs = await response.json();
    initMusic();
    createPlaylist();
  } catch (error) {
    console.error('Error loading songs:', error);
  }
}

function createPlaylist() {
  // Create playlist container
  const playlistContainer = document.createElement('div');
  playlistContainer.id = 'playlist-container';
  playlistContainer.style.cssText = `
    background-color: #161c23;
    margin-top: 10px;
    border-radius: 5px;
    padding: 10px;
    max-height: 300px;
    overflow-y: auto;
  `;

  // Create playlist items
  songs.forEach((song, index) => {
    const songElement = document.createElement('div');
    songElement.className = 'playlist-item';
    songElement.style.cssText = `
      color: #fff;
      padding: 8px;
      cursor: pointer;
      border-bottom: 1px solid #2a2a2a;
      font-family: LatoRegular;
      display: flex;
      align-items: center;
      gap: 10px;
    `;

    // Add playing indicator
    const indicator = document.createElement('div');
    indicator.className = 'playing-indicator';
    indicator.style.cssText = `
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: ${index === currentSong ? '#fff' : 'transparent'};
    `;
    songElement.appendChild(indicator);

    // Add song title
    const titleSpan = document.createElement('span');
    titleSpan.textContent = song.title;
    songElement.appendChild(titleSpan);

    // Highlight current song
    if (index === currentSong) {
      songElement.style.backgroundColor = '#2a2a2a';
    }

    // Add click handler
    songElement.addEventListener('click', () => {
      playSong(index);
      updatePlaylistHighlight(index);
    });

    playlistContainer.appendChild(songElement);
  });

  // Add playlist to music box
  const musicBox = document.getElementById('music-box');
  musicBox.appendChild(playlistContainer);
}

function updatePlaylistHighlight(newIndex) {
  const playlistItems = document.querySelectorAll('.playlist-item');
  playlistItems.forEach((item, index) => {
    const indicator = item.querySelector('.playing-indicator');
    if (index === newIndex) {
      item.style.backgroundColor = '#2a2a2a';
      indicator.style.backgroundColor = '#fff';
    } else {
      item.style.backgroundColor = 'transparent';
      indicator.style.backgroundColor = 'transparent';
    }
  });
}

function playSong(index) {
  currentSong = index;
  const e = document.getElementById("music-src");
  const t = document.getElementById("music");
  const s = document.getElementById("music-skip");
  const n = document.getElementById("music-info");
  const timeLeft = document.getElementById("time-left");
  
  e.src = `/audio/opus/${songs[currentSong].src}`;
  e.play();
  t.classList.add("paused");
  s.style.display = "block";
  n.textContent = songs[currentSong].title;
  e.onloadedmetadata = () => {
    timeLeft.textContent = formatTime(e.duration);
  };
}

function initMusic() {
  if (songs.length === 0) return;
  const e = document.getElementById("music-src"),
  t = document.getElementById("music"),
  s = document.getElementById("music-skip"),
  n = document.getElementById("music-info"),
  timeBar = document.getElementById("time-bar-progress"),
  timeElapsed = document.getElementById("time-elapsed"),
  timeLeft = document.getElementById("time-left");

  function o() {
    currentSong = (currentSong + 1) % songs.length;
    playSong(currentSong);
    updatePlaylistHighlight(currentSong);
  }

  currentSong = 0;
  e.src = `/audio/opus/${songs[currentSong].src}`;
  
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

  // Update time bar and time displays
  e.addEventListener("timeupdate", function() {
    if (!isDragging) {
      const progress = (e.currentTime / e.duration) * 100;
      timeBar.style.width = `${progress}%`;
      timeElapsed.textContent = formatTime(e.currentTime);
    }
  });

  // Seek functionality
  const timeBarContainer = timeBar.parentElement;
  timeBarContainer.addEventListener("mousedown", function(event) {
    isDragging = true;
    seek(event);
  });

  timeBarContainer.addEventListener("mousemove", function(event) {
    if (isDragging) {
      seek(event);
    }
  });

  timeBarContainer.addEventListener("mouseup", function(event) {
    if (isDragging) {
      seek(event);
      isDragging = false;
    }
  });

  timeBarContainer.addEventListener("mouseleave", function() {
    if (isDragging) {
      isDragging = false;
    }
  });

  function seek(event) {
    const rect = timeBarContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const newTime = (offsetX / rect.width) * e.duration;
    e.currentTime = newTime;
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

loadSongs();