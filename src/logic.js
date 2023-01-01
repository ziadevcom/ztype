// const animationInterval = require("./timer");
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

const filters = {
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

  target.classList.toggle("active-tool-btn");
  updateWords(filters.punctuation, filters.numbers);
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
}

// Function to update the words in UI, can take a parameter of puncuation (true or false)
function updateWords(punctuation, numbers) {
  const wordContainer = document.querySelector(".words-container");
  wordContainer.innerHTML = ""; // Deleting previous words from ui
  for (let i = 0; i < 5; i++) {
    let sentence = makeSentence(punctuation, numbers);
    // Looping over each word in sentence
    sentence.forEach((word, index) => {
      word = String(word);
      let wordDiv = document.createElement("div");
      wordDiv.className =
        "word md:text-2xl font-light text-[#646669] mr-2 mb-2 md:mr-4 mb-4";

      // Make the first word active by adding a data attribute
      if (index === 0) {
        wordDiv.dataset.active = "true";
      }
      // Looping over each character in word
      for (let i = 0; i < word.length; i++) {
        let charSpan = document.createElement("span");
        charSpan.classList.add("ml-[1px]", "transition-colors", "duration-500");
        charSpan.innerText = word[i];
        wordDiv.appendChild(charSpan);
      }
      wordContainer.appendChild(wordDiv);
    });
  }
  let activeCharacter = wordContainer.children[0].children[0];
  // activeCharacter.className = "active-character";

  // Update Global State
  state.word = wordContainer.children[0];
  state.letter = state.word.children[0];
  state.isWord = true;
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

// Add words on first render of the UI
updateWords();
updateCursor();

document.onkeydown = function (event) {
  if (state.timerFinished) {
    return;
  }
  if (event.key === "Backspace") {
    backspace(event);
  }
  userTypes(event);
};

function userTypes(event) {
  // TODO
  // Our program to assume that there is only single word.
  // Once we are done with our current word, update the current word to be next word.
  // Error, mistypes

  // Update global allt typed entries
  state.allLettersTyped++;
  // The number of correct words user typed.
  if (!state.timerRunning) {
    startCountdown();
  }
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
  // if ((event.keyCode < 48 || event.keyCode > 90) && event.keyCode != 32) {
  //   return;
  // }
  if (invalidKeys.includes(event.key)) {
    return;
  }
  const letter = state.letter;
  const userLetter = event.key;

  if (!state.isWord) {
    if (event.keyCode == 32) {
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
    letter.classList.add("text-white", "correct");
    if (letter.nextSibling) {
      state.letter = letter.nextSibling;
    }
    state.correctLettersTyped++;
  } else {
    // user typed wrong letter
    state.errors += 1;
    letter.classList.add("text-secondary", "wrong");
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
  // const { letter, word } = state;

  console.log(state);
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
  // return;
  const rect = state.letter.getBoundingClientRect();
  let cursorDiv = document.querySelector(".cursor");
  cursorDiv.style.top = `${rect.top}px`;
  cursorDiv.style.left = `${rect.left}px`;
  if (
    state.letter.classList.contains("correct") ||
    state.letter.classList.contains("wrong") ||
    state.letter.classList.contains("extra")
  ) {
    cursorDiv.style.left = `${rect.left + rect.width}px`;
  }
}

// Update cursor when window resizes because it was not working properly without it
window.onresize = () => {
  updateCursor();
};

function startCountdown() {
  state.timerRunning = true;
  let timeLeft = filters.time;
  let timer = setInterval(() => {
    const timeContainer = document.querySelector("#time-container");
    if (timeLeft <= 0) {
      evaluateNonCorrectedErrors();
      timeContainer.innerText = 0;
      state.timerRunning = false;
      state.timerFinished = true;
      displayUI();
      clearInterval(timer);
      return;
    }
    timeLeft = timeLeft - 1;
    timeContainer.innerText = timeLeft;
  }, 1000);
}

function displayUI() {
  document.querySelector(".cursor").classList.add("hidden");
  document.querySelector(".words-container").classList.add("hidden");
  document.querySelector("#time-container").classList.add("hidden");
  document.querySelector(".results-container").classList.remove("hidden");
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
  return Math.floor(netWPM);
}

function calculateAccuracy() {
  let accuracy = (state.correctLettersTyped / state.allLettersTyped) * 100;
  return Math.floor(accuracy);
}

// Function to check all the non corrector errors after the test time finishes
function evaluateNonCorrectedErrors() {
  let words = document.querySelectorAll(".word");

  words.forEach((word) => {
    let characters = word.children;
    console.log(characters);
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
