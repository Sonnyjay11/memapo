/* =========================================================
   VERSION 9
   Romantic Coffee Invitation
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const page1 =
    document.getElementById("page1");

  const page2 =
    document.getElementById("page2");

  const confirmation =
    document.getElementById("confirmation");

  const letterBtn =
    document.getElementById("letterBtn");

  const buttonText =
    document.getElementById("buttonText");

  const buttonArrow =
    document.getElementById("buttonArrow");

  const paperLetter =
    document.getElementById("paperLetter");

  const hintText =
    document.getElementById("hintText");

  const song =
    document.getElementById("song");

  const musicButton =
    document.getElementById("musicButton");

  const dateInput =
    document.getElementById("dateInput");

  const timeInput =
    document.getElementById("timeInput");

  const selectionPreview =
    document.getElementById("selectionPreview");

  const selectionHint =
    document.getElementById("selectionHint");

  const yesButton =
    document.getElementById("yesButton");

  const maybeButton =
    document.getElementById("maybeButton");

  const confirmedDate =
    document.getElementById("confirmedDate");

  const confirmedTime =
    document.getElementById("confirmedTime");

  const calendarButton =
    document.getElementById("calendarButton");

  const secretHeart =
    document.getElementById("secretHeart");

  const secretMessage =
    document.getElementById("secretMessage");

  const heartContainer =
    document.getElementById("heartContainer");

  const memoryPhoto =
    document.getElementById("memoryPhoto");

  const photoFallback =
    document.getElementById("photoFallback");


  /* =======================================================
     STATE
  ======================================================= */

  let letterOpened = false;

  let musicStarted = false;

  let maybeClicks = 0;

  let secretClicks = 0;


  /* =======================================================
     DATE HELPERS
  ======================================================= */

  function getTodayString() {

    const today =
      new Date();

    const year =
      today.getFullYear();

    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        today.getDate()
      ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }


  function setMinimumDate() {

    dateInput.min =
      getTodayString();

  }


  function formatFriendlyDate(value) {

    if (!value) {
      return "";
    }

    const date =
      new Date(
        `${value}T12:00:00`
      );

    return date.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      }
    );
  }


  function formatFriendlyTime(value) {

    if (!value) {
      return "";
    }

    const time =
      new Date(
        `2000-01-01T${value}:00`
      );

    return time.toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit"
      }
    );
  }


  /* =======================================================
     SAME-DAY TIME PROTECTION
  ======================================================= */

  function updateDateRules() {

    if (!dateInput.value) {
      timeInput.removeAttribute("min");
      return;
    }

    const today =
      getTodayString();

    if (
      dateInput.value === today
    ) {

      const now =
        new Date();

      const hours =
        String(
          now.getHours()
        ).padStart(2, "0");

      const minutes =
        String(
          now.getMinutes()
        ).padStart(2, "0");

      timeInput.min =
        `${hours}:${minutes}`;

    } else {

      timeInput.removeAttribute("min");

    }

  }


  /* =======================================================
     SELECTION PREVIEW
  ======================================================= */

  function updateSelectionPreview() {

    updateDateRules();

    const date =
      dateInput.value;

    const time =
      timeInput.value;

    if (!date && !time) {

      selectionPreview.textContent =
        "Choose your date and time...";

      selectionPreview.classList.remove(
        "show"
      );

      return;
    }


    if (date && !time) {

      selectionPreview.textContent =
        `Okay... ${formatFriendlyDate(date)} 👀`;

      selectionPreview.classList.add(
        "show"
      );

      selectionHint.textContent =
        "Date noted. Now pick an oras. ☕";

      animateHint();

      return;
    }


    if (!date && time) {

      selectionPreview.textContent =
        `Anong araw ng ${formatFriendlyTime(time)}? 👀`;

      selectionPreview.classList.add(
        "show"
      );

      selectionHint.textContent =
        "May oras na, kulang na lang ang araw HAHAHA.";

      animateHint();

      return;
    }


    selectionPreview.textContent =
      `${formatFriendlyDate(date)} • ${formatFriendlyTime(time)} ☕♡`;

    selectionPreview.classList.add(
      "show"
    );

    selectionHint.textContent =
      "Okay... parang official na 'to. 👀♡";

    animateHint();

  }


  /* =======================================================
     MUSIC
  ======================================================= */

  async function startMusic() {

    if (musicStarted) {
      return;
    }

    try {

      song.volume = 0.45;

      await song.play();

      musicStarted = true;

      musicButton.classList.add(
        "playing"
      );

      musicButton.setAttribute(
        "aria-pressed",
        "true"
      );

    } catch (error) {

      musicStarted = false;

    }

  }


  /* =======================================================
     MUSIC TOGGLE
  ======================================================= */

  musicButton.addEventListener(
    "click",
    async () => {

      if (song.paused) {

        try {

          song.volume = 0.45;

          await song.play();

          musicStarted = true;

          musicButton.classList.add(
            "playing"
          );

          musicButton.setAttribute(
            "aria-pressed",
            "true"
          );

        } catch (error) {

          // Browser blocked playback.

        }

      } else {

        song.pause();

        musicButton.classList.remove(
          "playing"
        );

        musicButton.setAttribute(
          "aria-pressed",
          "false"
        );

      }

    }
  );


  /* =======================================================
     LETTER BUTTON
  ======================================================= */

  letterBtn.addEventListener(
    "click",
    () => {

      /* -----------------------------------------------
         FIRST CLICK
      ------------------------------------------------ */

      if (!letterOpened) {

        letterOpened = true;

        startMusic();


        paperLetter.classList.add(
          "open"
        );


        letterBtn.classList.add(
          "opened"
        );


        buttonText.textContent =
          "Okay, next...";


        buttonArrow.textContent =
          "☕";


        hintText.textContent =
          "Take your time. ♡";


        createHearts();

        return;
      }


      /* -----------------------------------------------
         SECOND CLICK
      ------------------------------------------------ */

      showPage2();

    }
  );


  /* =======================================================
     FLOATING HEARTS
  ======================================================= */

  function createHearts() {

    const rect =
      letterBtn.getBoundingClientRect();

    const centerX =
      rect.left +
      rect.width / 2;

    const centerY =
      rect.top +
      rect.height / 2;

    const amount = 9;


    for (
      let i = 0;
      i < amount;
      i++
    ) {

      const heart =
        document.createElement("span");

      heart.className =
        "flying-heart";

      heart.textContent =
        Math.random() > 0.45
          ? "♡"
          : "♥";

      heart.style.left =
        `${centerX}px`;

      heart.style.top =
        `${centerY}px`;

      heart.style.fontSize =
        `${12 + Math.random() * 10}px`;

      const x =
        (Math.random() - 0.5) *
        200;

      const y =
        -45 -
        Math.random() * 130;

      heart.style.setProperty(
        "--x",
        `${x}px`
      );

      heart.style.setProperty(
        "--y",
        `${y}px`
      );

      heartContainer.appendChild(
        heart
      );

      setTimeout(
        () => heart.remove(),
        950
      );

    }

  }


  /* =======================================================
     PAGE SWITCH
  ======================================================= */

  function switchPage(
    fromPage,
    toPage
  ) {

    fromPage.classList.remove(
      "active"
    );

    fromPage.setAttribute(
      "aria-hidden",
      "true"
    );

    requestAnimationFrame(
      () => {

        toPage.classList.add(
          "active"
        );

        toPage.setAttribute(
          "aria-hidden",
          "false"
        );

        window.scrollTo(
          0,
          0
        );

      }
    );

  }


  /* =======================================================
     SHOW PAGE 2
  ======================================================= */

  function showPage2() {

    switchPage(
      page1,
      page2
    );

    setTimeout(
      () => {
        dateInput.focus();
      },
      450
    );

  }


  /* =======================================================
     DATE
  ======================================================= */

  dateInput.addEventListener(
    "change",
    () => {

      updateSelectionPreview();

    }
  );


  /* =======================================================
     TIME
  ======================================================= */

  timeInput.addEventListener(
    "change",
    () => {

      updateSelectionPreview();

    }
  );


  /* =======================================================
     HINT ANIMATION
  ======================================================= */

  function animateHint() {

    selectionHint.animate(
      [
        {
          opacity: 0.25,
          transform:
            "translateY(4px)"
        },

        {
          opacity: 1,
          transform:
            "translateY(0)"
        }
      ],
      {
        duration: 260,
        easing: "ease-out"
      }
    );

  }


  /* =======================================================
     KULIT BUTTON
  ======================================================= */

  const maybeMessages = [

    "Sure ka ba? 👀",

    "Coffee lang naman oh ☕",

    "Libre ko na HAHAHA",

    "Hindi kita pine-pressure 😭",

    "...pero sana yes. ♡",

    "Mimz naman oh 😭",

    "Last chance... joke lang HAHAHA",

    "Sige naaaa ☕♡"

  ];


  maybeButton.addEventListener(
    "click",
    () => {

      const message =
        maybeMessages[
          maybeClicks %
          maybeMessages.length
        ];


      maybeButton.textContent =
        message;


      maybeClicks++;


      maybeButton.animate(
        [
          {
            transform:
              "translateX(0)"
          },

          {
            transform:
              "translateX(-4px)"
          },

          {
            transform:
              "translateX(4px)"
          },

          {
            transform:
              "translateX(-3px)"
          },

          {
            transform:
              "translateX(0)"
          }
        ],
        {
          duration: 300,
          easing: "ease-out"
        }
      );


      if (
        maybeClicks === 3
      ) {

        selectionHint.textContent =
          "HAHAHA sige lang, nandito lang ako. 👀";

        animateHint();

      }

    }
  );


  /* =======================================================
     VALIDATION
  ======================================================= */

  function validateSelection() {

    if (!dateInput.value) {

      selectionHint.textContent =
        "Pili ka muna ng araw. 👀";

      animateHint();

      dateInput.focus();

      return false;

    }


    if (!timeInput.value) {

      selectionHint.textContent =
        "Okay, pero anong oras? HAHAHA.";

      animateHint();

      timeInput.focus();

      return false;

    }


    const selectedDate =
      dateInput.value;

    const selectedTime =
      timeInput.value;


    const selected =
      new Date(
        `${selectedDate}T${selectedTime}:00`
      );


    if (
      selected.getTime() <
      Date.now()
    ) {

      selectionHint.textContent =
        "Uy, past date/time yan HAHAHA. Pumili tayo ng future. 👀";

      animateHint();

      return false;

    }


    return true;

  }


  /* =======================================================
     YES BUTTON
  ======================================================= */

  yesButton.addEventListener(
    "click",
    () => {

      if (
        !validateSelection()
      ) {
        return;
      }

      showConfirmation();

    }
  );


  /* =======================================================
     SHOW CONFIRMATION
  ======================================================= */

  function showConfirmation() {

    const selectedDate =
      dateInput.value;

    const selectedTime =
      timeInput.value;


    const formattedDate =
      formatFriendlyDate(
        selectedDate
      );


    const formattedTime =
      formatFriendlyTime(
        selectedTime
      );


    confirmedDate.textContent =
      formattedDate;


    confirmedTime.textContent =
      formattedTime;


    page2.classList.remove(
      "active"
    );

    page2.setAttribute(
      "aria-hidden",
      "true"
    );


    requestAnimationFrame(
      () => {

        confirmation.classList.add(
          "active"
        );

        confirmation.setAttribute(
          "aria-hidden",
          "false"
        );

        window.scrollTo(
          0,
          0
        );

      }
    );


    createConfirmationHearts();

  }


  /* =======================================================
     CONFIRMATION HEARTS
  ======================================================= */

  function createConfirmationHearts() {

    const amount = 15;


    for (
      let i = 0;
      i < amount;
      i++
    ) {

      const heart =
        document.createElement("span");

      heart.className =
        "flying-heart";

      heart.textContent =
        Math.random() > 0.5
          ? "♡"
          : "♥";

      heart.style.left =
        `${43 + Math.random() * 14}%`;

      heart.style.top =
        `${54 + Math.random() * 6}%`;

      heart.style.fontSize =
        `${12 + Math.random() * 10}px`;

      heart.style.setProperty(
        "--x",
        `${(Math.random() - 0.5) * 280}px`
      );

      heart.style.setProperty(
        "--y",
        `${-100 - Math.random() * 190}px`
      );

      heartContainer.appendChild(
        heart
      );

      setTimeout(
        () => heart.remove(),
        950
      );

    }

  }


  /* =======================================================
     GOOGLE CALENDAR
  ======================================================= */

  function formatGoogleDate(date) {

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");

    const hours =
      String(
        date.getHours()
      ).padStart(2, "0");

    const minutes =
      String(
        date.getMinutes()
      ).padStart(2, "0");

    const seconds =
      String(
        date.getSeconds()
      ).padStart(2, "0");

    return (
      `${year}${month}${day}` +
      `T${hours}${minutes}${seconds}`
    );

  }


  calendarButton.addEventListener(
    "click",
    () => {

      const selectedDate =
        dateInput.value;

      const selectedTime =
        timeInput.value;


      if (
        !selectedDate ||
        !selectedTime
      ) {
        return;
      }


      const start =
        new Date(
          `${selectedDate}T${selectedTime}:00`
        );


      const end =
        new Date(
          start.getTime() +
          90 * 60 * 1000
        );


      const startString =
        formatGoogleDate(
          start
        );


      const endString =
        formatGoogleDate(
          end
        );


      const title =
        encodeURIComponent(
          "Coffee with Carmina ☕♡"
        );


      const details =
        encodeURIComponent(
          "Coffee with Jay ♡\n\n" +
          "Don't be late HAHAHA."
        );


      const location =
        encodeURIComponent(
          "Coffee date ☕"
        );


      const calendarURL =
        "https://calendar.google.com/calendar/render" +
        "?action=TEMPLATE" +
        `&text=${title}` +
        `&dates=${startString}/${endString}` +
        `&details=${details}` +
        `&location=${location}`;


      window.open(
        calendarURL,
        "_blank",
        "noopener,noreferrer"
      );

    }
  );


  /* =======================================================
     SECRET EASTER EGG
  ======================================================= */

  secretHeart.addEventListener(
    "click",
    () => {

      secretClicks++;


      secretHeart.animate(
        [
          {
            transform:
              "scale(1)"
          },

          {
            transform:
              "scale(1.25)"
          },

          {
            transform:
              "scale(1)"
          }
        ],
        {
          duration: 250,
          easing: "ease-out"
        }
      );


      if (
        secretClicks >= 3
      ) {

        secretMessage.classList.add(
          "show"
        );

        secretHeart.textContent =
          "♥";


        secretHeart.animate(
          [
            {
              transform:
                "scale(1)"
            },

            {
              transform:
                "scale(1.35)"
            },

            {
              transform:
                "scale(1)"
            }
          ],
          {
            duration: 350,
            easing: "ease-out"
          }
        );


        createConfirmationHearts();


        secretClicks = 0;

      }

    }
  );


  /* =======================================================
     PHOTO FALLBACK
  ======================================================= */

  memoryPhoto.addEventListener(
    "error",
    () => {

      memoryPhoto.style.display =
        "none";

      photoFallback.style.display =
        "flex";

    }
  );


  /* =======================================================
     MUSIC VISIBILITY
  ======================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.hidden &&
        !song.paused
      ) {

        song.pause();

        musicButton.classList.remove(
          "playing"
        );

        musicButton.setAttribute(
          "aria-pressed",
          "false"
        );

      }

    }
  );


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  setMinimumDate();

  updateDateRules();

  page1.classList.add(
    "active"
  );

  page1.setAttribute(
    "aria-hidden",
    "false"
  );

  page2.classList.remove(
    "active"
  );

  confirmation.classList.remove(
    "active"
  );

  song.volume =
    0.45;


  /* =======================================================
     IMPORTANT
  =======================================================

     Music does NOT autoplay on page load.

     It starts when Carmina presses:

     "Buksan mo ♡"

     This is intentional because modern browsers
     commonly block audio autoplay without interaction.

  ======================================================= */

});
