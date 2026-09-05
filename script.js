const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const letterBtn = document.getElementById("letterBtn");
const paperLetter = document.getElementById("paperLetter");
const hintText = document.getElementById("hintText");
const musicButton = document.getElementById("musicButton");
const song = document.getElementById("song");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const dateHint = document.getElementById("dateHint");
const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");
const successOverlay =
  document.getElementById("successOverlay");
const chosenDate =
  document.getElementById("chosenDate");

let letterOpened = false;
letterBtn.addEventListener("click", function () {
  if (!letterOpened) {
    letterOpened = true;
    paperLetter.classList.add("open");
    letterBtn.textContent =
      "May itatanong ako sa'yo →";
    hintText.textContent =
      "Basahin mo muna... promise, hindi mahaba ♡";
    return;
  }
  
  goToPageTwo();
  
});

function goToPageTwo() {

  page1.classList.remove("active");
  page2.classList.add("active");
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
  startMusic();
}

let musicPlaying = false;
function startMusic() {
  song.play()
    .then(() => {
      musicPlaying = true;
      musicButton.innerHTML =
        "♫ <span>Love Is playing...</span>";
    })
    .catch(() => {
      musicPlaying = false;
    });
}
musicButton.addEventListener("click", function () {
  if (musicPlaying) {
    song.pause();
    musicPlaying = false;
    musicButton.innerHTML =
      "♫ <span>Love Is</span>";
  } else {
    song.play()
      .then(() => {
        musicPlaying = true;
        musicButton.innerHTML =
          "♫ <span>Love Is playing...</span>";
      })
      .catch(() => {
        alert(
          "Tap the button again to play the song ♡"
        );
      });
  }
});
function setMinimumDate() {
  const today = new Date();
  const year =
    today.getFullYear();
  const month =
    String(today.getMonth() + 1)
      .padStart(2, "0");
  const day =
    String(today.getDate())
      .padStart(2, "0");
  dateInput.min =
    `${year}-${month}-${day}`;
}
setMinimumDate();
dateInput.addEventListener("change", function () {
  if (dateInput.value) {
    dateHint.textContent =
      "Okay, may napili ka na. 👀";
  }
});
timeInput.addEventListener("change", function () {
  if (timeInput.value) {
    dateHint.textContent =
      "Noted... mukhang seryoso na 'to HAHAHA.";
  }
});
yesBtn.addEventListener("click", function () {
  const date = dateInput.value;
  const time = timeInput.value;
  if (!date || !time) {
    dateHint.textContent =
      "Pili ka muna ng date at time please ♡";
    dateHint.style.color =
      "#568fa8";
    return;
  }
  const dateObject =
    new Date(`${date}T${time}`);
  const formattedDate =
    dateObject.toLocaleDateString(
      "en-PH",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      }
    );
  const formattedTime =
    dateObject.toLocaleTimeString(
      "en-PH",
      {
        hour: "numeric",
        minute: "2-digit"
      }
    );
  chosenDate.innerHTML =
    `${formattedDate}<br>at ${formattedTime}`;
  successOverlay.classList.add("show");
  createHearts();
});
const maybeMessages = [
  "Sure ka ba? 👀",
  "Pag-isipan mo muna HAHAHA",
  "May free coffee dito oh ☕",
  "Hindi kita pine-pressure... 👀",
  "One coffee lang naman... ♡"
];
let maybeIndex = 0;
maybeBtn.addEventListener("click", function () {
  maybeBtn.textContent =
    maybeMessages[maybeIndex];
  maybeIndex++;
  if (maybeIndex >= maybeMessages.length) {
    maybeIndex = 0;
  }
});
function createHearts() {
  const hearts = [
    "♡",
    "♥",
    "♡",
    "✿",
    "♡",
    "♥",
    "♡"
  ];
  hearts.forEach(function (symbol, index) {
    const heart =
      document.createElement("div");
    heart.textContent =
      symbol;
    heart.style.position =
      "fixed";
    heart.style.left =
      Math.random() * 100 + "%";
    heart.style.bottom =
      "-30px";
    heart.style.fontSize =
      (18 + Math.random() * 18) + "px";
    heart.style.color =
      "#72b5cc";
    heart.style.zIndex =
      "200";
    heart.style.pointerEvents =
      "none";
    heart.style.transition =
      "transform 3s ease, opacity 3s ease";
    document.body.appendChild(heart);
    setTimeout(function () {
      heart.style.transform =
        `translateY(-${300 + Math.random() * 300}px)
         rotate(${Math.random() * 80 - 40}deg)`;
      heart.style.opacity =
        "0";
    }, index * 120);
    setTimeout(function () {
      heart.remove();
    }, 3500);
  });
}
