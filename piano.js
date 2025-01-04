document.addEventListener("DOMContentLoaded", () => {
  function play(event) {
    const key = event.key || event.target.getAttribute("data-key");
    const element = document.querySelector(`[data-key="${key}"]`);
    if (!element) return;
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  document.addEventListener("keydown", play);
  [
    ...document.querySelectorAll(".white_key"),
    ...document.querySelectorAll(".black_key"),
  ].forEach((key) => key.addEventListener("click", play));
});
