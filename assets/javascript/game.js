var monsters = ["banshee", "basilisk", "behemoth", "centaur", 
                "cyclops", "dryad", "elf", "ghoul", "imp", 
                "ogre", "orc", "troll", "zombie"];

var guess;
var guesses = [];
var lives;
var blanks = [];
            
function newGame() {
    //Choose a random monster for user to guess
    var monster = monsters[Math.floor(Math.random()*monsters.length)];
    console.log(monster);
    guesses.length = 0;
    lives = 6;
    blanks = [];

    for(var i = 0; i < monster.length; i++) {
        blanks.push("_ ");
    }

    

    //Shows instructions when new game is started
    var x = document.getElementById("instructions");
    if (x.style.display === "none") {
        x.style.display = "block";
    };

    //Shows instructions when new game is started
    var x = document.getElementById("blanks");
    if (x.style.display === "none") {
        x.style.display = "block";
    };

    //Shows guesses when new game is started
    var x = document.getElementById("guesses");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    };
    
    // Logs user's letter guess, saves it in variable guess.
    document.onkeyup = function(event) {

        // Set key to guess
        guess = event.key;
        var ind = [];
        // Chnage to nested ifs
        // Loops through randomly chosen word to see if user's 
        // guess is in the word.
        if(!guesses.includes(guess)) {
            if(monster.includes(guess)){
                ind.push(monster.indexOf(guess));
                for (var j = 0; j < ind.length; j++) {
                    blanks[ind[j]] = guess;
                }
                // blanks[ind] = guess;
                console.log("correct");
            }
            else if(lives > 1){
                lives--;
            }
            else if (lives == 1){
                lives--;
                console.log("Game Over!");
                ind = [];
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


    

}