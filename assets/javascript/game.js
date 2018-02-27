var monsters = ["banshee", "basilisk", "behemoth", "centaur", 
                "cyclops", "dryad", "elf", "ghoul", "imp", 
                "ogre", "orc", "troll", "zombie"];

var guess;
var guesses = [];
var lives = 6;
var blankWord = "";

            
function newGame() {
    // Choose a random monster for user to guess
    var monster = monsters[Math.floor(Math.random()*monsters.length)];

    blankWord = "";
    resetData();

    // Create string of underscores the length of word
    for(var i = 0; i < monster.length; i++) {
        blankWord += "_ ";
    }
    console.log(monster + "\nGuesses: " + guesses + "\nBlanks: " + blankWord);

    // console.log(blankWord);
    // Hide win or lose message if user starts a new game
    hideElement("win");
    hideElement("game-over");

    // Function to show elements on new game
    showElement("instructions");
    // showElement("blankWord");
    // showElement("guesses");

    // Creating a variable to hold html of user's
    // previous guesses
    var html =
    "<p>You have guessed: " + guesses + "</p>" + 
    "<p>Lives: " + lives;
    // Set the inner HTML contents of the #guesses div 
    // to our html string.
    document.querySelector("#guesses").innerHTML = html;
    document.querySelector("#blankWord").innerHTML = blankWord;

    // Logs user's letter guess, saves it in variable guess.
    document.onkeyup = function(event) {
        // Set key to guess
        guess = event.key;
        // if they have not already guessed that letter
        if(!guesses.includes(guess) && !didUserWin(blankWord, monster) && lives !== 0) {
            // If guess is not in the guesses array, push it
            // to array
            guesses.push(guess);
            // if guess is in word
            if(monster.includes(guess)){
                // loop through length of monster word
                for(var i = 0; i < monster.length; i++) {
                    // if guess is at position i
                    if(guess === monster.charAt(i)) {
                        // concatenate correct guess with blankWord substrings
                        blankWord = blankWord.substr(0, 2*i) + guess + " " + blankWord.substr(2*i + 2, blankWord.length - 1);
                    }
                }
                console.log("correct");
            }
            // lose a life if guess is not in word
            else if(lives > 1)
                lives--;
            // game is over if they were on their last life
            else if (lives == 1){
                lives--;
                showElement("game-over");
            }
            // Check if user won and show div
            if (didUserWin(blankWord, monster))                 
                showElement("win");
        }

        // Creating a variable to hold html of user's
        // previous guesses
        var html =
        "<p>You have guessed: " + guesses + "</p>" + 
        "<p>Lives: " + lives;
        // Set the inner HTML contents of the #guesses div 
        // to our html string.
        document.querySelector("#guesses").innerHTML = html;
        document.querySelector("#blankWord").innerHTML = blankWord;
    };

    // Show an html element
    function showElement (id) {
        var x = document.getElementById(id);
        if (x.style.display === "none") {
            x.style.display = "block";
        };
    };

    // Hide an html element
    function hideElement (id) {
        var x = document.getElementById(id);
        if (x.style.display === "block") {
            x.style.display = "none";
        };
    };

    // check if user has guessed all letters
    function didUserWin (blannks, monster) {

        for (var i = 0; i < monster.length; i++) {
            if (blankWord.charAt(2*i) !== monster.charAt(i)) {
                return false;
            }
        }
    

        return true;
    }
}

function resetData() {
    guesses = [];
    blankWord = "";
    lives = 6;

}

