const words = [
  "the",
  "be",
  "of",
  "and",
  "a",
  "to",
  "in",
  "he",
  "have",
  "it",
  "that",
  "for",
  "they",
  "I",
  "with",
  "as",
  "not",
  "on",
  "she",
  "at",
  "by",
  "this",
  "we",
  "you",
  "do",
  "but",
  "from",
  "or",
  "which",
  "one",
  "would",
  "all",
  "will",
  "there",
  "say",
  "who",
  "make",
  "when",
  "can",
  "more",
  "if",
  "no",
  "man",
  "out",
  "other",
  "so",
  "what",
  "time",
  "up",
  "go",
  "about",
  "than",
  "into",
  "could",
  "state",
  "only",
  "new",
  "year",
  "some",
  "take",
  "come",
  "these",
  "know",
  "see",
  "use",
  "get",
  "like",
  "then",
  "first",
  "any",
  "work",
  "now",
  "may",
  "such",
  "give",
  "over",
  "think",
  "most",
  "even",
  "find",
  "day",
  "also",
  "after",
  "way",
  "many",
  "must",
  "look",
  "before",
  "great",
  "back",
  "through",
  "long",
  "where",
  "much",
  "should",
  "well",
  "people",
  "down",
  "own",
  "just",
  "because",
  "good",
  "each",
  "those",
  "feel",
  "seem",
  "how",
  "high",
  "too",
  "place",
  "little",
  "world",
  "very",
  "still",
  "nation",
  "hand",
  "old",
  "life",
  "tell",
  "write",
  "become",
  "here",
  "show",
  "house",
  "both",
  "between",
  "need",
  "mean",
  "call",
  "develop",
  "under",
  "last",
  "right",
  "move",
  "thing",
  "general",
  "school",
  "never",
  "same",
  "another",
  "begin",
  "while",
  "number",
  "part",
  "turn",
  "real",
  "leave",
  "might",
  "want",
  "point",
  "form",
  "off",
  "child",
  "few",
  "small",
  "since",
  "against",
  "ask",
  "late",
  "home",
  "interest",
  "large",
  "person",
  "end",
  "open",
  "public",
  "follow",
  "during",
  "present",
  "without",
  "again",
  "hold",
  "govern",
  "around",
  "possible",
  "head",
  "consider",
  "word",
  "program",
  "problem",
  "however",
  "lead",
  "system",
  "set",
  "order",
  "eye",
  "plan",
  "run",
  "keep",
  "face",
  "fact",
  "group",
  "play",
  "stand",
  "increase",
  "early",
  "course",
  "change",
  "help",
  "line",
];

let filters = {
  punctuation: false,
  numbers: false,
  time: 30,
};

const state = {
  word: null,
  letter: null,
  isWord: false,
  timerRunning: false,
  correctLettersTyped: 0,
  allLettersTyped: 0,
  uncorrectedErrors: 0,
  timerFinished: false,
  updateLetter: function () {
    this.letter = this.word.children[0];
  },
};

// Selecting most used / important dom elements
const wordsContainer = document.querySelector(".words-container");
// Hidden mobile input to detect user input on virtual keyboards
const mobileInput = document.getElementById("mobileInput");

function addfilter(event) {
  // implementing
  // listen to user input and update the filters object
  let target = event.target;
  let filter = target.dataset.filter;
  let currentValue = filters[filter];

  // Punctuation & Numbers Filter
  if (currentValue == true) {
    filters[filter] = false;
  } else {
    filters[filter] = true;
  }

  localStorage.setItem("filters", JSON.stringify(filters));

  target.classList.toggle("active-tool-btn");
  updateWords();
  focusWordsDiv();
  updateCursor();
}

// Handle Time Filter
function timeFilter(event) {
  const timeDiv = document.querySelector("#time-container");
  let target = event.target;
  let filter = target.dataset.filter;
  if (filter == "time") {
    let time = Number(target.dataset.time);
    filters.time = time;
    let timeFilters = document.querySelectorAll("[data-time]");
    timeFilters.forEach((time_filter) =>
      time_filter.classList.remove("active-tool-btn")
    );
  }
  target.classList.toggle("active-tool-btn");
  timeDiv.innerText = filters.time;
  localStorage.setItem("filters", JSON.stringify(filters));
  focusWordsDiv();
  updateCursor();
}

// Function to update the words in UI, can take a parameter of puncuation (true or false)
function updateWords() {
  const { punctuation, numbers } = filters;
  const noSentences = 15;
  wordsContainer.innerHTML = ""; // Deleting previous words from ui
  for (let i = 0; i < noSentences; i++) {
    let sentence = makeSentence(punctuation, numbers);
    // Looping over each word in sentence
    sentence.forEach((word, index) => {
      word = String(word);
      let wordDiv = document.createElement("div");
      wordDiv.className =
        "word font-normal text-secondary/20 mr-2 mb-2 md:mr-3 mb-3 select-none	";

      // Make the first word active by adding a data attribute
      if (index === 0) {
        wordDiv.dataset.active = "true";
      }
      // Looping over each character in word
      for (let i = 0; i < word.length; i++) {
        let charSpan = document.createElement("span");
        charSpan.classList.add("transition-colors", "duration-200");
        charSpan.innerText = word[i];
        wordDiv.appendChild(charSpan);
      }
      wordsContainer.appendChild(wordDiv);
    });
  }
  let activeCharacter = wordsContainer.children[0].children[0];

  // Update Global State
  state.word = wordsContainer.children[0];
  state.letter = state.word.children[0];
  state.isWord = true;
  state.letter.scrollIntoView();
}

// Function to make a unique sentence with at option to include puncuations or numbers as well
// punctuation and numbers paratameters can be true or false
function makeSentence(punctuation, numbers) {
  let sentence = [];
  let sentenceLength = getRandomIntInclusive(4, 10);

  // Loop random sentence length many times & add words to the sentence array.
  for (let i = 0; i <= sentenceLength; i++) {
    let word = words[getRandomIntInclusive(0, words.length - 1)];
    sentence.push(word);
  }

  // If user wants punctuation
  if (punctuation == true) {
    // Captalize the first letter of the first word
    let firstWord = sentence[0];
    sentence[0] = capatalize(firstWord);

    let lastWord = sentence[sentence.length - 1];
    sentence[sentence.length - 1] += ".";

    // Adding a symbol at the end of the current word at a random index
    let randomIndex = getRandomIntInclusive(0, sentenceLength - 1);
    let randomWord = sentence[randomIndex];
    sentence[randomIndex] = addSymbolAtEnd(randomWord);
  }

  // If user wants numbers then
  // add at least one number in the sentence
  if (numbers == true) {
    let randomIndex = getRandomIntInclusive(1, sentenceLength - 1);
    let randomNumber = getRandomIntInclusive(0, 999);
    sentence.splice(randomIndex, 0, randomNumber);
  }

  return sentence;
}

// Helper Functions Below

// Capatalize the string and return it
function capatalize(string) {
  let newString = "";
  for (let i = 0; i < string.length; i++) {
    let char = "";
    if (i == 0) {
      char = string[i].toUpperCase();
    } else {
      char = string[i];
    }
    newString += char;
  }

  return newString;
}

// Wrap the string with quotations and return it
function wrapWithQuotations(string) {
  let newString = "";
  let quotations = ["'", '"'];
  let randomQuote = quotations[getRandomIntInclusive(0, quotations.length - 1)];
  newString += randomQuote;
  newString += string;
  newString += randomQuote;
  return newString;
}

// Add a random symbol at the end of string and return it
function addSymbolAtEnd(string) {
  let symbols = [",", ":", ";", " -", "!"];
  let randomSymbol = symbols[getRandomIntInclusive(0, symbols.length - 1)];
  string += randomSymbol;
  return string;
}

// Getting a random integer between two values, inclusive
// MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function userTypes(event) {
  document.querySelector("#mobileInput").value = event.key;
  // Our program to assume that there is only single word.
  // Once we are done with our current word, update the current word to be next word.
  // Error, mistypes

  if (!isValidTypingKey(event)) {
    return;
  }

  // Update global allt typed entries
  state.allLettersTyped++;
  // The number of correct words user typed.
  if (!state.timerRunning) {
    startCountdown();
  }

  const letter = state.letter;
  const userLetter = event.key;

  if (!state.isWord) {
    // If user types space, move to next word.
    if (event.key == " ") {
      event.preventDefault();
      state.word = state.word.nextSibling;
      state.isWord = true;
      state.updateLetter();
      updateCursor();
      state.correctLettersTyped++;
    } else {
      // user typed an extra character
      state.errors += 1;
      let extraCharacter = document.createElement("span");
      extraCharacter.classList.add("extra", "text-red-900");
      extraCharacter.innerText += userLetter;
      state.word.appendChild(extraCharacter);
      state.letter = extraCharacter;
      updateCursor();
    }
    return;
  }

  if (letter.innerText == userLetter) {
    // user typed correct letter
    letter.classList.add("correct");
    if (letter.nextSibling) {
      state.letter = letter.nextSibling;
    }
    state.correctLettersTyped++;
  } else {
    // user typed wrong letter
    state.errors += 1;
    letter.classList.add("wrong");
    if (state.letter.nextSibling) {
      state.letter = letter.nextSibling;
    }
    updateCursor();
  }
  // Check if current letter is the last letter of the word
  if (!letter.nextSibling) {
    state.isWord = false;
  }
  updateCursor();
}

// Functionality of deleting a character
function backspace(event) {
  // if first letter of the first word, return
  if (!state.word.previousSibling && !state.letter.previousSibling) {
    return;
  }

  // first character of the any word  and last character of the previous word is wrong
  if (!state.letter.previousSibling && state.word.previousSibling) {
    const prevWord = state.word.previousSibling;
    const prevWordLastChar = prevWord.children[prevWord.childElementCount - 1];
    if (
      prevWordLastChar.classList.contains("wrong") ||
      prevWordLastChar.classList.contains("extra")
    ) {
      state.letter = prevWordLastChar;
      state.word = prevWord;
      // Check if current letter is the last letter of the word
      if (!state.letter.nextSibling) {
        state.isWord = false;
      }
      updateCursor();
    }
    return;
  }

  // last character of the word
  if (
    state.letter.className.includes("correct") ||
    state.letter.className.includes("wrong")
  ) {
    state.letter.className = "";
    state.isWord = true;
    updateCursor();
    return;
  }

  // if extra character
  if (state.letter.classList.contains("extra")) {
    let tempLetter = state.letter;
    state.letter = state.letter.previousSibling;
    tempLetter.remove();
    updateCursor();
    return;
  }

  state.letter.previousSibling.className = "";
  state.letter = state.letter.previousSibling;
  updateCursor();
}

function updateCursor() {
  let letterRect = state.letter.getBoundingClientRect();

  // Subtracting Distance of viewport to the top of the wordsContainer from top of the viewport to the top of cursor gives us the position of the cursor relative to the wordsContainer Div
  const wordsContainerRect = wordsContainer.getBoundingClientRect();
  let cursorPositionRelativeToWordsContainer =
    letterRect.top - wordsContainerRect.top;
  // If current words is in the middle of the wordsContainer div then scroll into view
  // i.e scroll the current word into view if the user is typing at least on the middle line of the text
  if (cursorPositionRelativeToWordsContainer >= wordsContainerRect.height / 2) {
    wordsContainer.scroll({
      top: wordsContainer.scrollTop + wordsContainerRect.height / 3,
      behavior: "smooth",
    });
    return;
  }

  let cursorDiv = document.querySelector(".cursor");
  cursorDiv.style.top = `${letterRect.top}px`;
  cursorDiv.style.left = `${letterRect.left}px`;
  if (
    state.letter.classList.contains("correct") ||
    state.letter.classList.contains("wrong") ||
    state.letter.classList.contains("extra")
  ) {
    cursorDiv.style.left = `${letterRect.left + letterRect.width}px`;
  }
  // Make cursor visible on first page load
  cursorDiv.classList.remove("invisible");
}

function startCountdown() {
  state.timerRunning = true;
  let timeLeft = filters.time;
  let timer = setInterval(() => {
    const timeContainer = document.querySelector("#time-container");
    // Restart test without waiting for results
    if (state.timerRunning === false) {
      displayUI(false);
      clearInterval(timer);
      state.timerFinished = true;
      return;
    }
    if (timeLeft <= 0) {
      evaluateNonCorrectedErrors();
      timeContainer.innerText = 0;
      state.timerRunning = false;
      state.timerFinished = true;
      displayUI(true);
      clearInterval(timer);
      return;
    }
    timeLeft = timeLeft - 1;
    timeContainer.innerText = timeLeft;
  }, 1000);
}

// displayUI -> display results or normal wordsContainer depending on the showResults parameter
function displayUI(showResults) {
  const timeContainer = document.querySelector("#time-container");
  const resultsContainer = document.querySelector(".results-container");
  const cursorDIV = document.querySelector(".cursor");

  if (!showResults) {
    wordsContainer.classList.remove("hidden");
    document.querySelector("#time-container").innerHTML = filters.time;
    updateWords();
    updateCursor();
    return;
  }
  cursorDIV.classList.toggle("hidden");
  wordsContainer.classList.toggle("hidden");
  timeContainer.classList.toggle("invisible");
  resultsContainer.classList.remove("hidden");
  let wpm = calculateWPM();
  let accuracy = calculateAccuracy();
  let results = `<h3 class="text-secondary text-2xl mr-6">WPM: ${wpm}</h3>
  <h3 class="text-secondary text-2xl mr-6">Accuracy: ${accuracy}%</h3>`;
  document.querySelector("#results").innerHTML = results;
}

function calculateWPM() {
  const time = filters.time / 60;
  const uncorrected = state.uncorrectedErrors;
  let gpm = (state.allLettersTyped / 5) / time // prettier-ignore
  let netWPM = gpm - (uncorrected / time); // prettier-ignore
  if (netWPM < 0) {
    netWPM = 0;
  }
  // reset user typing stats in state
  state.uncorrectedErrors = 0;
  return Math.floor(netWPM);
}

function calculateAccuracy() {
  let accuracy = (state.correctLettersTyped / state.allLettersTyped) * 100;
  // reset user typing stats in state
  state.correctLettersTyped = 0;
  state.allLettersTyped = 0;
  return Math.floor(accuracy);
}

// Function to check all the non corrector errors after the test time finishes
function evaluateNonCorrectedErrors() {
  let words = document.querySelectorAll(".word");

  words.forEach((word) => {
    let characters = word.children;
    for (let letter of characters) {
      if (
        letter.classList.contains("wrong") ||
        letter.classList.contains("extra")
      ) {
        state.uncorrectedErrors++;
        return;
      }
    }
  });
}

function handleFiltersPersists() {
  if (localStorage.getItem("filters")) {
    // If filters exist already, update program filters to be the one as localstorage
    filters = JSON.parse(localStorage.getItem("filters"));
  } else {
    // If no filters in localstorage, then add program's current filters to localstorage
    localStorage.setItem("filters", JSON.stringify(filters));
  }

  // Selecting all filters componenets from UI
  const timeFilters = document.querySelectorAll("[data-filter='time']");
  const punctuationFilter = document.querySelector(
    "[data-filter='punctuation']"
  );
  const numbersFilter = document.querySelector("[data-filter='numbers']");

  //  Updating the timer filters in UI according to the filters stored in localstorage
  timeFilters.forEach((filter) => {
    const value = filter.dataset.time;
    if (filters.time == value) {
      filter.classList.add("active-tool-btn");
    } else {
      filter.classList.remove("active-tool-btn");
    }
  });

  //  Updating the punctuation filter in UI according to the filters stored in localstorage
  if (filters.punctuation === true) {
    punctuationFilter.classList.add("active-tool-btn");
  } else {
    punctuationFilter.classList.remove("active-tool-btn");
  }

  //  Updating the numbers filter in UI according to the filters stored in localstorage
  if (filters.numbers === true) {
    numbersFilter.classList.add("active-tool-btn");
  } else {
    numbersFilter.classList.remove("active-tool-btn");
  }
  document.querySelector("#time-container").innerText = filters.time;
}

// Resets the filter to the initial state (time = 30s, everything else false)
function resetFilters() {
  focusWordsDiv();
  let resetFilters = {
    time: 30,
    punctuation: false,
    numbers: false,
  };
  localStorage.setItem("filters", JSON.stringify(resetFilters));
  // Stop timer
  state.timerRunning = false;
  state.timerFinished = true;
  handleFiltersPersists();
  updateCursor();
  updateWords();
}

// Remove the focus from whatever element is currently focused and focus on the words div.
function focusWordsDiv() {
  document.activeElement.blur();
  wordsContainer.focus();
}

// Restart the test when clicked on restart button in UI
function restartTest() {
  const resultsContainer = document.querySelector(".results-container");
  const timeContainer = document.querySelector("#time-container");
  const cursorDIV = document.querySelector(".cursor");

  if (!state.timerRunning && resultsContainer.classList.contains("hidden")) {
    // Dont restart test if its not started yet and results are there
    return;
  }

  // Check if results Div is hidden, if it is, just update the ui normally
  if (resultsContainer.classList.contains("hidden")) {
    state.timerFinished = true;
    state.timerRunning = false;
    focusWordsDiv();
    return;
  }
  // otherwise, hide resutls and then display
  resultsContainer.classList.add("hidden");
  timeContainer.classList.toggle("invisible");
  cursorDIV.classList.remove("hidden");
  displayUI(false);
  focusWordsDiv();
  // state.timerRunning = false;
}

// Function to check if user pressed a valid key to type, i.e avoid keys like ctrl, shift etc
function isValidTypingKey(event) {
  const invalidKeys = [
    "Tab",
    "CapsLock",
    "Shift",
    "Control",
    "Meta",
    "Alt",
    "ContextMenu",
    "Enter",
    "Backspace",
  ];

  if (invalidKeys.includes(event.key)) {
    return false;
  }
  return true;
}
// Render the UI on first page load
document.addEventListener("DOMContentLoaded", () => {
  handleFiltersPersists();
  const { punctuation, numbers } = filters;
  updateWords();
  focusWordsDiv();
  updateCursor();
});

// When words div is in focus, listen to the keydown events
document.onkeydown = function (event) {
  // because events capture and bubble, we dont want this function to execute if clicked on any relevant buttons such as filters or restart buttons
  // If device is a mobile or table, return
  if (isMobileOrTablet()) {
    return;
  }

  if (
    event.target.classList.contains("tool-btn") ||
    event.target.classList.contains("restartTest")
  ) {
    return;
  }

  // if (state.timerFinished) {
  //   return;
  // }

  if (event.key === "Backspace") {
    backspace(event);
  }

  if (!isValidTypingKey(event)) {
    return;
  }
  // Focus the words container if the device is not a mobile or table
  focusWordsDiv();
};

// Handle user typing event
wordsContainer.onkeydown = (event) => {
  // Disable scrolling on wordsContainer with space key
  if (event.code == "Space") {
    event.preventDefault();
  }
  userTypes(event);
};

// Handle user typing for touchscreens
wordsContainer.onclick = () => {
  // Dont do anything on non touch devices
  if (!isMobileOrTablet()) {
    return;
  }
  // Focus on the hidden input tag when clicked
  document.activeElement.blur();
  mobileInput.focus();
  mobileInput.value = "@";
  return;
};

// Grabbing user typed key on touch screens / virutal keyboards
mobileInput.onkeyup = () => {
  const userInput = mobileInput.value;
  const event = {
    key: null,
    preventDefault: () => {
      return;
    },
  };
  // Handle backspace
  if (userInput === "") {
    backspace();
    mobileInput.value = "@";
    return;
  }
  // Handle any other input
  event.key = userInput[1];
  userTypes(event);
  // Reset the input
  mobileInput.value = "@";
};
// Listen to the scroll event
// update the letter Rect accordingly
// When scrolled inside wordsContainer div, update the cursor.
wordsContainer.onscroll = () => {
  let timer = null;
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(function () {
    // update the letter Rect accordingly
    updateCursor();
  }, 200);
};

// Update cursor when window resizes because it was not working properly without it
window.onresize = () => {
  updateCursor();
};

// Disable scrolling on wordsContainer with mouse
wordsContainer.onwheel = (event) => {
  event.preventDefault();
};

// Change theme function, attached to color input in the header
function changeTheme(event) {
  // Get RGB channels of hexadecimal color
  const color = event.target.value;
  let HexR = color.slice(1, 3);
  let HexG = color.slice(3, 5);
  let HexB = color.slice(5, 7);
  // Convert hexadecimal RGB channels into decimal rgb channels
  let decR = parseInt(HexR, 16);
  let decG = parseInt(HexG, 16);
  let decB = parseInt(HexB, 16);
  let accentColor = `${decR} ${decG} ${decB}`;
  // Update the css variable in order to change colors
  let root = document.documentElement;
  root.style.setProperty("--color-secondary", accentColor);
}

// Store the selected color in localStorage after user selects color and dismisses the input
function storeTheme() {
  const currentColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--color-secondary");

  // store color in local storage
  localStorage.setItem("color-secondary", currentColor);
}
// Detect mobile browser
// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
const isMobileOrTablet = () => {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
