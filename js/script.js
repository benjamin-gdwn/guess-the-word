const lsContainer = document.querySelector('.guessed-letters');
const button = document.querySelector('.guess ');
const letterInput = document.querySelector('.letter');
const progress = document.querySelector('.remaining');
const wordProgress = document.querySelector('.word-in-progress');
const guessRemaining = document.querySelector('span');
const letterGuessed = document.querySelector('.message');
const playAgain = document.querySelector('.play-again button');
const word = 'Magnolia';
const guessedLetters = [];



// create a function to change word to dots
const hiddenLetters = function() {

    // create array of the word
    const wordArray = word.split('');
    
    // for each function to cycle through the new array
    wordArray.forEach(function (letter) {
        // replace each letter and append to correct paragraph
        const single = letter.replace(letter,'●');
        wordProgress.append(single);
        
    })

    // take the earlier array and put it back into a string
    const restitch = wordArray.join('')
    
}
// --------------------- Skillcrush way ------------------------
// const placeholder = function (word) {
//     const placeholderLetters = [];
//     for (const letter of word) {
//       console.log(letter);
//       placeholderLetters.push("●");
//     }
//     wordProgress.innerText = placeholderLetters.join("");
//   };


// --------------------End of Skillcrush way -------------------

// call function with the word as the parameter
hiddenLetters(word)


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
        console.log(guessedLetters)
    }
     
}

