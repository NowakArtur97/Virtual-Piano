document.addEventListener("DOMContentLoaded", () => {
  const SAMPLE_RECORDING = [
    { key: "q", time: 3 * 150 },
    { key: "q", time: 3 * 265 },
    { key: "t", time: 3 * 380 },
    { key: "t", time: 3 * 501 },
    { key: "y", time: 3 * 625 },
    { key: "y", time: 3 * 748 },
    { key: "t", time: 3 * 871 },
    { key: "r", time: 3 * 1126 },
    { key: "r", time: 3 * 1247 },
    { key: "e", time: 3 * 1365 },
    { key: "e", time: 3 * 1477 },
    { key: "w", time: 3 * 1597 },
    { key: "w", time: 3 * 1714 },
    { key: "q", time: 3 * 1837 },
    { key: "t", time: 3 * 2092 },
    { key: "t", time: 3 * 2212 },
    { key: "r", time: 3 * 2332 },
    { key: "r", time: 3 * 2457 },
    { key: "e", time: 3 * 2572 },
    { key: "e", time: 3 * 2692 },
    { key: "w", time: 3 * 2812 },
    { key: "t", time: 3 * 3092 },
    { key: "t", time: 3 * 3212 },
    { key: "r", time: 3 * 3332 },
    { key: "r", time: 3 * 3457 },
    { key: "e", time: 3 * 3572 },
    { key: "e", time: 3 * 3692 },
    { key: "w", time: 3 * 3812 },
    { key: "q", time: 3 * 4050 },
    { key: "q", time: 3 * 4205 },
    { key: "t", time: 3 * 4330 },
    { key: "t", time: 3 * 4451 },
    { key: "y", time: 3 * 4575 },
    { key: "y", time: 3 * 4698 },
    { key: "t", time: 3 * 4821 },
    { key: "r", time: 3 * 5076 },
    { key: "r", time: 3 * 5197 },
    { key: "e", time: 3 * 5315 },
    { key: "e", time: 3 * 5427 },
    { key: "w", time: 3 * 5547 },
    { key: "w", time: 3 * 5667 },
    { key: "q", time: 3 * 5787 },
  ];

  let isRecording = false;
  let isPlaying = false;
  let startTime = null;
  let recording = [];
  let pauses = [0];
  let timeouts = [];
  let currentRecordIndex = 0;

  const recordButton = document.querySelector("#record_button");
  const startButton = document.querySelector("#start_button");
  const notes = document.querySelector(".notes");

  function playKey(key) {
    const element = document.querySelector(`[data-key="${key}"]`);
    if (!element) return;
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    if (!audio) return;
    handleKeyAnimation(element);
    playAudio(audio);
    if (!isRecording) return;
    const record = addRecord(key);
    displayNote(record);
    handleNoteAnimation(record.time);
  }

  function addRecord(key) {
    const time =
      new Date() -
      startTime +
      pauses.reduce((pauseA, pauseB) => pauseA + pauseB, 0);
    const record = { key, time };
    recording.push(record);
    console.log(record);
    return record;
  }

  function loadSample() {
    recording = SAMPLE_RECORDING;
    startPlaying();
  }

  function playNextSound() {
    if (recording.length === 0) return;
    if (currentRecordIndex >= recording.length) currentRecordIndex = 0;
    const { key, time } = recording[currentRecordIndex];
    playRecord(key, 0);
    handleNoteAnimation(time);
    currentRecordIndex++;
  }

  function startPlaying() {
    if (isRecording) handleRecording();
    if (recording.length === 0) return;
    isPlaying = !isPlaying;
    startButton.textContent = isPlaying ? "Stop" : "Start";
    if (isPlaying) {
      currentRecordIndex = 0;
      for (; currentRecordIndex < recording.length; currentRecordIndex++) {
        const record = recording[currentRecordIndex];
        const { key, time } = record;
        playRecord(key, time);
      }
      timeouts.push(
        setTimeout(() => {
          isPlaying = false;
          startButton.textContent = "Start";
        }, recording[recording.length - 1].time)
      );
    } else {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    }
  }

  function playRecord(key, time) {
    timeouts.push(
      setTimeout(() => {
        playKey(key);
        handleNoteAnimation(time);
      }, time)
    );
  }

  function handleRecording() {
    isRecording = !isRecording;
    if (isRecording) startTime = new Date();
    else pauses.push(new Date() - startTime);
    recordButton.textContent = isRecording ? "Stop" : "Record";
  }

  function clearRecording() {
    if (isRecording) {
      isRecording = false;
      recordButton.textContent = "Record";
    }
    recording = [];
    startTime = null;
    pauses = [0];
    currentRecordIndex = 0;
    notes.replaceChildren();
  }

  function displayNote(record) {
    const { key, time } = record;
    const note = document.createElement("div");
    note.classList.add("note");
    const noteKey = document.createElement("div");
    noteKey.classList.add("note__key");
    noteKey.textContent = key;
    const noteTime = document.createElement("div");
    noteTime.classList.add("note__time");
    noteTime.textContent = time;
    note.appendChild(noteKey);
    note.appendChild(noteTime);
    notes.appendChild(note);
  }

  function playAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  function handleKeyAnimation(keyElement) {
    const keyColorClass = keyElement.classList[1];
    keyElement.classList.add(`key--active`);
    keyElement.classList.add(`${keyColorClass}_active`);
    keyElement.classList.add(`key--hover`);
    keyElement.classList.add(`${keyColorClass}_hover`);
    setTimeout(() => {
      keyElement.classList.remove(`key--active`);
      keyElement.classList.remove(`${keyColorClass}_active`);
      keyElement.classList.remove(`key--hover`);
      keyElement.classList.remove(`${keyColorClass}_hover`);
    }, 500);
  }

  function handleNoteAnimation(time) {
    const noteTime = [...document.querySelectorAll(".note__time")].find(
      (el) => +el.textContent === time
    );
    if (noteTime === undefined) return;
    const noteElement = noteTime.parentElement;
    noteElement.classList.add(`note--hover`);
    setTimeout(() => {
      noteElement.classList.remove(`note--hover`);
    }, 500);
  }

  document.addEventListener("keydown", ({ key }) => playKey(key));
  [
    ...document.querySelectorAll(".key--white"),
    ...document.querySelectorAll(".key--black"),
  ].forEach((key) =>
    key.addEventListener("click", (event) => {
      playKey(event.target.getAttribute("data-key"));
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
