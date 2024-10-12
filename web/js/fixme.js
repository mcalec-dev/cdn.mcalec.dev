var video = document.getElementById('VIDEO PATH HERE'); 
video.addEventListener(() => { 
  var timeDur = video.duration; 
  console.log(`Total video duration: ${timeDur} seconds`); 
}); 
setTimeout(function () {
    window.location.href = "/";
  }, timeDur);