/*
1. timer and punctuation
2. figure out where to get the words
3. keep track of the curretn letter user is about to type
--- listen to keyboard type event
--- compare the user  input with the current active letter
4. ability for the user to backspace
5. track of the words that user typed correctly
*/

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

let time = 30;
updateWords();
// Todo
// Toggle "active" class on the filter in UI
// Add a timer in ui

const filters = {
  punctuation: false,
  numbers: false,
};
function filter(event) {
  // implementing
  // listen to user input and update the filters object
  let target = event.target;
  let filter = target.dataset.filter;

  let currentValue = filters[filter];

  if (currentValue == true) {
    filters[filter] = false;
  } else {
    filters[filter] = true;
  }

  target.classList.toggle("active-tool-btn");
  updateWords(filters.punctuation, filters.numbers);
}

// Function to update the words in UI, can take a parameter of puncuation (true or false)
function updateWords(punctuation, numbers) {
  const wordContainer = document.querySelector(".words-container");
  wordContainer.innerHTML = ""; // Deleting previous words from ui
  for (let i = 0; i < 5; i++) {
    let sentence = makeSentence(punctuation, numbers);
    // Looping over each word in sentence
    sentence.forEach((word) => {
      word = String(word);
      let wordDiv = document.createElement("div");
      wordDiv.className =
        "word word text-2xl md:text-3xl text-[#646669] mr-2 mb-2 md:mr-4 mb-4";

      // Looping over each character in word
      for (let i = 0; i < word.length; i++) {
        let charSpan = document.createElement("span");
        // charSpan.className = "active";
        charSpan.innerText = word[i];
        wordDiv.appendChild(charSpan);
      }
      wordContainer.appendChild(wordDiv);
    });
  }
  let activeCharacter = wordContainer.children[0].children[0];
  activeCharacter.className =
    "active-character relative after:content-[''] after:animation after:border-b-2 after:border-secondary after:w-full after:absolute after:bottom-0 after:left-0 after:animate-pulse-faster  after:rounded-lg";
}

// updateWords();

// console.log(wrapWithQuotations("united"));
// console.log(capatalize("good"));
// console.log(addSymbolAtEnd("one piece"));

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
