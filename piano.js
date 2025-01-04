document.addEventListener("DOMContentLoaded", () => {
  function play(event) {
    const key = event.key || event.target.getAttribute("data-key");
    const element = document.querySelector(`[data-key="${key}"]`);
    if (!element) return;
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    if (!audio) return;
    handleAnimation(element);
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  function handleAnimation(keyElement) {
    const keyColorClass = keyElement.classList[0];
    keyElement.classList.add(`${keyColorClass}--active`);
    keyElement.classList.add(`${keyColorClass}--hover`);
    setTimeout(() => {
      keyElement.classList.remove(`${keyColorClass}--active`);
      keyElement.classList.remove(`${keyColorClass}--hover`);
    }, 500);
  }

  document.addEventListener("keydown", play);
  [
    ...document.querySelectorAll(".white_key"),
    ...document.querySelectorAll(".black_key"),
  ].forEach((key) => key.addEventListener("click", play));
});
