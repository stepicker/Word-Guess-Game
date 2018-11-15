// VARIABLES
// ===========================================================================================

// Create array with the movie characters
var movieCharacters = ["MARTY", "JENNIFER", "DOC", "GEORGE", "LORRAINE", "BIFF", "STRICKLAND"];

// Generate a random number within the length of the array
var randomNumber = Math.floor(Math.random() * movieCharacters.length);

// Use the random number to pick a random character
var pickedCharacter = movieCharacters[randomNumber];

// Set up an empty array that will contain the letters of the word to guess
var lettersToGuess = [];

// Fill up the array lettersToGuess with the letters that make the name of the character picked
for (var i = 0; i < pickedCharacter.length; i++) {
    lettersToGuess.push(pickedCharacter[i]);
}

// Set up an empty array where the correct guesses will be gradually stored
var lettersGuessed = [];

// Pre-fill the array of letters guessed with underscore characters
for (var i = 0; i < pickedCharacter.length; i++) {
    lettersGuessed.push("_");
}

// Set up an empty array where all the user guesses (right or wrong) will be stored
var lettersTried = [];

// Create variable for countdown of guesses left, starting with 10 available guesses
var guessesLeft = 10;

// Create list of acceptable letters
var alphabetArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//Create empty variable for user input
var userInput;


// FUNCTIONS
// ===========================================================================================

// Create function that recognizes any correct guesses and inserts them into the lettersGuessed array
function characterCheck(userInput) {
    for (var i = 0; i < pickedCharacter.length; i++) {
        if (lettersToGuess[i].indexOf(userInput) > -1) {
            lettersGuessed[i] = userInput;
        }
    }
}

// Create function to list all guesses (right or wrong)
function addToAttempted(userInput) {
    lettersTried.push(userInput);
}

// Create function that reduces the number of available guesses
function subtractAttempt(userInput) {
    if (lettersTried.indexOf(userInput) > -1 && lettersTried.indexOf(userInput) < (lettersTried.length-1)) {
        guessesLeft = guessesLeft;
    }
    else {
        guessesLeft = guessesLeft - 1;
    }
}

// Create function to populate the HTML
function populateHTML() {
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("lettersGuessed").innerText = lettersGuessed;
    document.getElementById("lettersTried").innerText = lettersTried;
}

//Execute function to send initial data to the HTML
populateHTML();



// MAIN PROCESS
// ===========================================================================================

// Main function to run the game, executed every time a key is pressed
document.onkeydown = function(event) {

    // Store key presses into a variable and convert them to uppercase
    var userInput = event.key.toUpperCase();

    // Then make sure that the key pressed is actually a letter
    if (alphabetArray.indexOf(userInput) > -1) {

        //If yes, run the following functions
        characterCheck(userInput);
        addToAttempted(userInput);
        subtractAttempt(userInput);
        populateHTML();
    }

    // End the game if all the letters have been correctly guessed
    if (lettersGuessed.indexOf("_") === -1) {
        window.location = 'you-win.html';
    }

    // End the game if there are no more guesses available
    else if (guessesLeft < 1) {
        window.location = 'game-over.html';
    }

}