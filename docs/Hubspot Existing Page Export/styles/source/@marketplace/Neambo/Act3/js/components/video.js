const players = document.querySelectorAll('.video__player');

for (i = 0; i < players.length; i++) {

  const player = players[i];
  const video = player.querySelector('video');
  const play_btn = player.querySelector('.video__player__play');

  // On play

  video.addEventListener('play', function(event){
    player.classList.add('video__player--playing', 'video__player--activated');
    if (player.classList.contains('video__player--controls-playing')) {
      video.controls = true;
    }
  });

  // On pause

  video.addEventListener('pause', function(event){
    player.classList.remove('video__player--playing');
  });

  // On end

  video.addEventListener('ended', function(event){
    player.classList.remove('video__player--playing');
  });

  // Play/pause while clicking on video

  video.addEventListener('click', function(){
    if (!video.controls && play_btn) {
      if (video.paused || video.ended) {
        video.play();
      }
      else {
        video.pause();
      }
    }
  });

  // Play/pause while clicking on play button

  if (play_btn) {
    play_btn.addEventListener('click', function(){
      if (video.paused || video.ended) {
        video.play();
      }
      else {
        video.pause();
      }
    });
  }
}