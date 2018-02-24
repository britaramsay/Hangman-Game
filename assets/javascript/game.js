var monsters = ["banshee", "basilisk", "behemoth", "centaur", 
                "cyclops", "dryad", "elf", "ghoul", "imp", 
                "ogre", "orc", "troll", "zombie"];

var guess;
            
function newGame() {
    //Choose a random monster for user to guess
    var monster = monsters[Math.floor(Math.random()*monsters.length)];
    console.log(monster);

    //Show instructions when new game is started
    var x = document.getElementById("instructions");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    };
    // Logs user's letter guess, saves it in variable guess.
    document.onkeyup = function(event) {
        guess = event.key;
        console.log(guess);

        // Loops through randomly chosen word to see if user's 
        // guess is in the word.
        for(var i = 0; i < monster.length; i++) {

        if (guess == monster.charAt(i)) {
            console.log("correct");
        }
    }
    };
    

}