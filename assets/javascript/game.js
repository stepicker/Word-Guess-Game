// VARIABLES
// ===========================================================================================

// Create array with the movie characters
var movieCharacters = ["MARTY", "JENNIFER", "DOC", "GEORGE", "LORRAINE", "BIFF", "STRICKLAND", "GRIFF", "MARLENE", "BUFORD", "CLARA", "SEAMUS", "MAGGIE"];

// Generate a random number within the length of the array
var randomNumber = Math.floor(Math.random() * movieCharacters.length);

// Use the random number to pick a random character
var pickedCharacter = movieCharacters[randomNumber];

// Set up an empty array that will contain the letters of the word to guess
var lettersToGuess = [];

// Fill up the array lettersToGuess with the letters that make up the name of the character picked
for (var i = 0; i < pickedCharacter.length; i++) {
    lettersToGuess.push(pickedCharacter[i]);
}

// Set up an empty array where the correct guesses will be gradually stored
var lettersGuessed = [];

// Pre-fill the empty array lettersGuessed with underscore characters
for (var i = 0; i < pickedCharacter.length; i++) {
    lettersGuessed.push("_");
}

// Set up an empty array where all the user guesses (right or wrong) will be stored
var lettersTried = [];

// Create variable for countdown of guesses left, starting with 10 available guesses
var guessesLeft = 10;

// Create list of acceptable letters
var alphabetArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Create empty variable for user input
var userInput;

// Create item to store score (if this is the first game within the browser session)
if (sessionStorage.getItem("wins") === null) {
    sessionStorage.setItem("wins", 1);
}

// Create variables for sounds
var typingSound = new Audio('./assets/sounds/typewriter.mp3');
var winningSound = new Audio('./assets/sounds/ta-da.mp3');
var losingSound = new Audio('./assets/sounds/sad-trombone.mp3');



// FUNCTIONS
// ===========================================================================================

// Create function that recognizes the correct guesses and inserts them into the lettersGuessed array
function characterCheck(userInput) {
    for (var i = 0; i < pickedCharacter.length; i++) {
        if (lettersToGuess[i].indexOf(userInput) > -1) {
            lettersGuessed[i] = userInput;
        }
    }
}

// Create function to store all guesses (right or wrong) in the lettersTried array
function addToAttempted(userInput) {
    lettersTried.push(userInput);
}

// Create function that reduces the number of available guesses, unless the userInput was typed before or it was a correct guess
function subtractAttempt(userInput) {
    if (lettersTried.indexOf(userInput) > -1 && lettersTried.indexOf(userInput) < (lettersTried.length-1)) {
        guessesLeft = guessesLeft;
    }
    else if (lettersToGuess.indexOf(userInput) > -1) {
        guessesLeft = guessesLeft;
    }
    else {
        guessesLeft = guessesLeft - 1;
    }
}

// Create function to populate the HTML
function populateHTML() {
    document.getElementById("guessesLeft").innerText = "Attempts left: " + guessesLeft;
    document.getElementById("lettersGuessed").innerText = lettersGuessed;
    document.getElementById("lettersTried").innerText = "So far you have tried: " + lettersTried;
    document.getElementById("totalWins").innerText = "Wins: " + (sessionStorage.getItem("wins").length - 1);
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
        typingSound.play();
        populateHTML();
    }

    // End the game if all the letters have been correctly guessed
    if (lettersGuessed.indexOf("_") === -1) {
        winningSound.play();
        sessionStorage.setItem("wins", (sessionStorage.getItem("wins") + 1));
        alert("You WIN!! The character is " + pickedCharacter + ". Click OK to play again.");
        location.reload();
    }

    // End the game if there are no more guesses available
    else if (guessesLeft < 1) {
        losingSound.play();
        alert("You lose!! The character was " + pickedCharacter + ". Click OK to try again.");
        location.reload();
    }

}