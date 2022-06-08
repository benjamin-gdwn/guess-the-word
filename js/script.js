const lsContainer = document.querySelector('.guessed-letters');
const button = document.querySelector('.guess ');
const input = document.querySelector('.letter');
const progress = document.querySelector('.remaining');
const wordProgress = document.querySelector('.word-in-progress');
const guessRemaining = document.querySelector('span');
const letterGuessed = document.querySelector('.message');
const playAgain = document.querySelector('.play-again button');
const word = 'Magnolia';


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
// call function with the word as the parameter
hiddenLetters(word)


// create event listener for guess! button
button.addEventListener('click', function (e) {
    e.preventDefault();
    // create variable to store the input value
    const guess = input.value;
    // console.log(guess);
    // return the value to '' once clicked
    input.value = '';
})
