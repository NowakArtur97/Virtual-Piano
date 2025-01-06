document.addEventListener("DOMContentLoaded", () => {
  let isRecording = false;
  let startTime = new Date();
  let recording = [];

  const recordButton = document.querySelector("#record_button");

  function play(event) {
    const key = event.key || event.target.getAttribute("data-key");
    const element = document.querySelector(`[data-key="${key}"]`);
    if (!element) return;
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    if (!audio) return;
    handleAnimation(element);
    playAudio(audio);
    if (isRecording) addRecord(element.getAttribute("data-index"));
  }

  function addRecord(index) {
    if (!isRecording) return;
    let endTime = new Date();
    const record = { index, time: endTime - startTime };
    recording.push(record);
  }

  function loadSample() {
    // TODO
  }

  function playNextSound() {
    // TODO
  }

  function startPlaying() {
    // TODO
  }

  function handleRecording() {
    isRecording = !isRecording;
    startTime = new Date();
    recordButton.textContent = isRecording ? "Stop" : "Record";
  }

  function clearRecording() {
    recording = [];
  }

  function playAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  function handleAnimation(keyElement) {
    const keyColorClass = keyElement.classList[1];
    keyElement.classList.add(`key--active`);
    keyElement.classList.add(`${keyColorClass}--active`);
    keyElement.classList.add(`key--hover`);
    keyElement.classList.add(`${keyColorClass}--hover`);
    setTimeout(() => {
      keyElement.classList.remove(`key--active`);
      keyElement.classList.remove(`${keyColorClass}--active`);
      keyElement.classList.remove(`key--hover`);
      keyElement.classList.remove(`${keyColorClass}--hover`);
    }, 500);
  }

  document.addEventListener("keydown", play);
  [
    ...document.querySelectorAll(".white_key"),
    ...document.querySelectorAll(".black_key"),
  ].forEach((key) => key.addEventListener("click", play));

  document
    .querySelector("#sample_button")
    .addEventListener("click", loadSample);
  document
    .querySelector("#play_next_button")
    .addEventListener("click", playNextSound);
  document
    .querySelector("#start_button")
    .addEventListener("click", startPlaying);
  recordButton.addEventListener("click", handleRecording);
  document
    .querySelector("#clear_button")
    .addEventListener("click", clearRecording);
});
