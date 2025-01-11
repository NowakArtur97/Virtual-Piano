document.addEventListener("DOMContentLoaded", () => {
  let isRecording = false;
  let isPlaying = false;
  let startTime = new Date();
  let recording = [];

  const recordButton = document.querySelector("#record_button");
  const startButton = document.querySelector("#start_button");

  function play(key) {
    const element = document.querySelector(`[data-key="${key}"]`);
    if (!element) return;
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    if (!audio) return;
    handleAnimation(element);
    playAudio(audio);
    if (isRecording) addRecord(key);
  }

  function addRecord(key) {
    if (!isRecording) return;
    let endTime = new Date();
    const record = { key, time: endTime - startTime };
    recording.push(record);
    console.log(record);
  }

  function loadSample() {
    // TODO
  }

  function playNextSound() {
    // TODO
  }

  function startPlaying() {
    if (isRecording) handleRecording();
    isPlaying = !isPlaying;
    startButton.textContent = isPlaying ? "Stop" : "Start";
    if (recording.length === 0 || !isPlaying) return;
    recording.forEach(({ key, time }) => {
      setTimeout(() => {
        play(key);
        console.log(key);
      }, time);
    });
    setTimeout(() => {
      isPlaying = false;
    }, recording[recording.length - 1].time);
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

  document.addEventListener("keydown", (event) => {
    play(event.key);
  });
  [
    ...document.querySelectorAll(".white_key"),
    ...document.querySelectorAll(".black_key"),
  ].forEach((key) =>
    key.addEventListener("click", (event) => {
      play(event.target.getAttribute("data-key"));
    })
  );

  document
    .querySelector("#sample_button")
    .addEventListener("click", loadSample);
  document
    .querySelector("#play_next_button")
    .addEventListener("click", playNextSound);
  startButton.addEventListener("click", startPlaying);
  recordButton.addEventListener("click", handleRecording);
  document
    .querySelector("#clear_button")
    .addEventListener("click", clearRecording);
});
