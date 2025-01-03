document.addEventListener("DOMContentLoaded", () => {
  function play(event) {
    const keyCode = event.keyCode;
    const element = document.querySelector(`[data-key="${keyCode}"]`);
    if (!element) return;
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  document.addEventListener("keydown", play);
});
