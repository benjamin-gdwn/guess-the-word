const lsContainer = document.querySelector('.guessed-letters');
const button = document.querySelector('.guess ');
const letterInput = document.querySelector('.letter');
const progress = document.querySelector('.remaining');
const wordProgress = document.querySelector('.word-in-progress');
const guessRemaining = document.querySelector('span');
const letterGuessed = document.querySelector('.message');
const playAgain = document.querySelector('.play-again button');
let word = 'magnolia';
const guessedLetters = [];
let remainingGuesses = 8;


// function to retrieve new word from text file
const getWord = async function () {

    const wordRequest = await fetch (`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
    const newWord = await wordRequest.text();
    // store and split the words into strings
    const newWordResult = newWord.split('\n');
    // select an index at random
    const randomIndex = Math.floor(Math.random() * newWordResult.length);
    // update the word at index as the word used in the game
    word = newWordResult[randomIndex].trim();
    // call the placeholder function to display new word as defined by random index
    placeholder(word);
}
getWord();




//  ------------------- My Way which broke the code when trying to change the dots for the guesses -------------------
// // create a function to change word to dots
// const hiddenLetters = function() {

//     // create array of the word
//     const wordArray = word.split('');
    
//     // for each function to cycle through the new array
//     wordArray.forEach(function (letter) {
//         // replace each letter and append to correct paragraph
//         const single = letter.replace(letter,'●');
//         wordProgress.append(single);
        
//     })

//     // take the earlier array and put it back into a string
//     const restitch = wordArray.join('')
    
// }
// ---------------------End of my way ------------------------
// --------------------- Skillcrush way ------------------------
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
      console.log(letter);
      placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
  };


// --------------------End of Skillcrush way -------------------




// create event listener for guess! button
button.addEventListener('click', function (e) {
    e.preventDefault();
    // create variable to store the input value
    const guess = letterInput.value;
    // console.log(guess);
    letterGuessed.innerText = ''
    // variable to store the validation before the conditional statement
    const goodGuess = acceptInput(letterInput);
    // // conditional to make sure we have a letter
    if (goodGuess) {
    // if the letter is good make a guess
    makeGuess(guess);
    console.log(guessedLetters)
    };
    // return the value to '' once clicked
    letterInput.value = '';
})

// Create a function that accepts the users input
const acceptInput = function (input) {

    // variable for accepted letter sequence
    const acceptedLetter = /[a-zA-Z]/;
    // variable to store the input from user
    const actualGuess = input.value;

    // conditional statement to return messages depending on input
    if ( input.length = 0) {
        letterGuessed.innerText =  "Please enter a letter, you haven't selected one yet!"
    } else if ( input.length > 1 ) {
        letterGuessed.innerText =   "One letter at a time";
    } else if ( !actualGuess.match(acceptedLetter)) {
        letterGuessed.innerText =   "Only enter letters, it's a word after all!";
    } else {
        return actualGuess;
    }
    
}

// function to prevent multiple guesses of same letter
const makeGuess = function (guess) {
//    change all guesses in array to uppercase by default
    guess = guess.toUpperCase();
// conditional statement to see if its already been guessed
    if (guessedLetters.includes(guess)) {
        letterGuessed.innerText = "You've already guessed that one...."
    } else {
        // then push to array if all good
        guessedLetters.push(guess);
        showGuesses();
        guessesRemaining(guess);
        revealLetters(guessedLetters);
    }
};


//  function to show the guessed letters
const showGuesses = function() {
    lsContainer.innerHTML = '';
    // for each letter guessed create a list element and store it in the ul
    guessedLetters.forEach(function (value) {
        let li = document.createElement('li');
        li.innerText = value;
        lsContainer.append(li);
    })
}
// create a function to reveal the letters guessed
const revealLetters = function (guessedLetters) {
    // turn the word to upper case
    const wordUpper = word.toUpperCase();
    // turn the uppercase word into an array
    const wordArray = wordUpper.split('');
    // a blank array to store the placeholders in
    const match = [];
    // for of loop to check if the input matches a value in the array of the word
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            match.push(letter.toUpperCase());
        } else {
            match.push('●');
        }
    }
    // console.log(match);
    // update the text if theres a matching numbers
    wordProgress.innerText = match.join('');
    // call the function to see if the user has won each time they guess a  number
    checkWinner();
}
// function to check if there is a winner
const checkWinner = function () {
    // condition to see if the upper case word matches the inner text of the guesses
    if (word.toUpperCase() === wordProgress.innerText) {
        letterGuessed.classList.add('win');
        letterGuessed.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
}

// create a function to accept guesses remaining

const guessesRemaining = function(guess) {
    // grab word and make uppercase
    const newGuess = guess;
    const guessesUpCase = word.toUpperCase();
    // conditional statement to see if word contains the guess
    if (!guessesUpCase.includes(newGuess)) {
        // if it doesnt, remove a guess and display message
        remainingGuesses -= 1;
        console.log(remainingGuesses);
        letterGuessed.innerText = "This letter is not in the word!"
    } else {
        letterGuessed.innerText = "Yay! You guessed right."
    }
    // conditional statement to check if guesses remaining is 0, 1 or update the remaining attempts otherwise
    if (remainingGuesses === 0) {
        progress.innerText = `Game Over! 0 tries left! The word was ${word}`;
    } else if(remainingGuesses === 1) {
        progress.innerText = `Final guess. Make it a good one...`;
    } else {
        guessRemaining.innerText = `${remainingGuesses}`;
    }
}
