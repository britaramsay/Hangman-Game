var monsters = ["banshee", "basilisk", "behemoth", "centaur", 
                "cyclops", "dryad", "elf", "ghoul", "imp", 
                "ogre", "orc", "troll", "zombie"];

var guess;
var guesses = [];
var lives;
var blanks = [];
            
function newGame() {
    // Choose a random monster for user to guess
    var monster = monsters[Math.floor(Math.random()*monsters.length)];
    console.log(monster);
    // Clear guesses array when new game starts
    guesses.length = 0;
    lives = 6;
    // Clear array for blanks
    blanks = [];
    // Create array of underscores the length of word
    for(var i = 0; i < monster.length; i++) {
        blanks.push("_ ");
    }

    // function to show elements on new game
    // need to hide when game is over
    showElement("instructions");
    showElement("blanks");
    showElement("guesses");

    // Logs user's letter guess, saves it in variable guess.
    document.onkeyup = function(event) {

        // Set key to guess
        guess = event.key;

        // array to hold indexes of guessed letter if it is 
        // in the word.
        var ind = [];

        // Loops through randomly chosen word to see if user's 
        // guess is in the word.

        // if they have not already guessed that letter
        if(!guesses.includes(guess)) {
            // if guess is in word
            if(monster.includes(guess)){
                // loop through length of monster word
                for(var i = 0; i < monster.length; i++) {
                    // if guess is at position i
                    if(guess === monster.charAt(i)) {
                        // push i to indexes array
                        ind.push(i);
                    }
                }
                // loop through for length of saved indexes
                for (var j = 0; j < ind.length; j++) {
                    // replace the blanks with the letter 
                    blanks[ind[j]] = guess;
                }
                // clear index array? is this needed?
                ind = [];
                console.log("correct");
            }
            // lose a life if guess is not in word
            else if(lives > 1){
                lives--;
            }
            // game is over if they were on their last life
            else if (lives == 1){
                lives--;
                showElement("game-over");
                ind = [];
            }
            // check is user won
            if(didUserWin(blanks, monster)) {
                showElement("win");
            }
        }
        
        // If guess is not in the guesses array, push it
        // to array
        if(!guesses.includes(guess))
            guesses.push(guess);

        // Creating a variable to hold html of user's
        // previous guesses
        var html =
        "<p>You have guessed: " + guesses + "</p>" + 
        "<p>Lives: " + lives;
        // Set the inner HTML contents of the #guesses div 
        // to our html string.
        document.querySelector("#guesses").innerHTML = html;

        var underscores = blanks;
        document.querySelector("#blanks").innerHTML = underscores;
    };
    
    function showElement (id) {
        var x = document.getElementById(id);
        if (x.style.display === "none") {
            x.style.display = "block";
        };
    };

    function didUserWin (blanks, monster) {
        for (var i = 0; i < monster.length; i++) {
            if (blanks[i] !== monster.charAt(i)) {
                return false;
            }
        }
        return true;
    }


    

}