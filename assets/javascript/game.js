var monsters = [{name: "banshee", hint: "a female spirit whose wailing warns of an impending death in a house."}, 
                {name: "basilisk", hint: "a mythical reptile with a lethal gaze or breath, hatched by a serpent from a cock's egg."}, 
                {name: "behemoth", hint: "a huge or monstrous creature."},
                {name: "centaur", hint: "a creature with the head, arms, and torso of a man and the body and legs of a horse."},
                {name: "cyclops", hint: "a member of a race of savage one-eyed giants."}, 
                {name: "dryad", hint: "a nymph inhabiting a forest or a tree, especially an oak tree."}, 
                {name: "elf", hint: "a supernatural creature of folk tales, typically represented as a small, elusive figure in human form with pointed ears, magical powers, and a capricious nature."}, 
                {name: "ghoul", hint: "an evil spirit or phantom, especially one supposed to rob graves and feed on dead bodies."}, 
                {name: "giant", hint: "an imaginary or mythical being of human form but superhuman size."},
                {name: "gnome", hint: "a legendary dwarfish creature supposed to guard the earth's treasures underground."},
                {name: "imp", hint: "a small, mischievous devil or sprite."}, 
                {name: "ogre", hint: "a man-eating giant."}, 
                {name: "orc", hint: "a member of an imaginary race of humanlike creatures, characterized as ugly, warlike, and malevolent."}, 
                {name: "troll", hint: "a mythical, cave-dwelling being depicted in folklore as either a giant or a dwarf, typically having a very ugly appearance."}, 
                {name: "zombie", hint: "a corpse said to be revived by witchcraft, especially in certain African and Caribbean religions."}];

// Initial variables
var guess;
var guesses = [];
var lives = 7;
var blankWord = "";

// for mobile, jquery to make div buttons of all letters

// Check box for auto replay
function checkBox() {
    var auto = document.getElementById("box");
    if (auto.checked == true)
        newGame();
}

function onMobile(x) {
    if (x.matches) {
        // document.mobile.style.display = "block";
       showElement("mobile"); 
    }
    else {
        hideElement("mobile");
    }
}

const x = window.matchMedia("(max-width: 768px)");
    x.addListener(onMobile);

if(matchMedia) {
    const x = window.matchMedia("(max-width: 768px)");
    x.addListener(onMobile);
    onMobile(x);
}

// Checkbox for show/hide on screen letters
function showLetters () {
    var mobile = document.getElementById("mobile");
    if (mobile.style.display === "none") {
        mobile.style.display = "block";
    }
    else 
        mobile.style.display = "none";
}

function newGame() {

    // Create letter buttons
    for (var i = 97; i < 123; i++) {
        var letterBtn = String.fromCharCode(i);
        var newDiv = $("<div>");
        newDiv.html("<input type='button' id='"+ letterBtn +"' class='btn btn-success' value='"+ letterBtn +"' onclick='newGame.setGuess(value);' style='margin-left:5px;margin-right:5px;margin-bottom:5px;'>");
        
        $("#mobile").append(newDiv);
    }

    // Choose a random monster for user to guess
    var inx = Math.floor(Math.random()*monsters.length);
    var monster = monsters[inx].name;
    var monsterHint = monsters[inx].hint;
    // Var for if autoplay is checked
    var auto = document.getElementById("box");

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    resetData(c, ctx);

    // Create string of underscores the length of word
    for(var i = 0; i < monster.length; i++) {
        blankWord += "_ ";
    }

    // Function to show/hide elements on new game
    showElement("showHint");
    showElement("gamePanel");
    showElement("instructions");
    showElement("letters");

    // Creating a variable to hold html of user's
    // previous guesses
    var html =
    "<p>You have guessed: " + guesses + "</p>" + 
    "<p>Lives: " + lives;
    // Set the inner HTML contents of the #guesses div 
    // to our html string.
    document.querySelector("#guesses").innerHTML = html;
    document.querySelector("#blankWord").innerHTML = blankWord;
    document.querySelector("#hint").innerHTML = monsterHint;

    // Canvas variables
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    // Clear canvas from previous game
    ctx.clearRect(0, 0, 200, 300);
    ctx.beginPath();
    // Draw gallows
    ctx.moveTo(50,50);
    ctx.lineTo(50,250);
    ctx.stroke();
    ctx.moveTo(20,250);
    ctx.lineTo(80,250);
    ctx.stroke();
    ctx.moveTo(50,50);
    ctx.lineTo(130,50);
    ctx.stroke();
    ctx.moveTo(130,50);
    ctx.lineTo(130,80);
    ctx.stroke();

    // Logs user's letter guess, saves it in variable guess.
    document.onkeyup = function(event) {
        if((event.key.charCodeAt(0)>96 && event.key.charCodeAt(0)<123)){      
            // Set key to guess
            guess = event.key;
        }
        else {      
            alert("Please only guess lowercase characters.");
        }
        checkLetter();
    }
        
    // Set guess when user click letter buttons
    function setGuess(value) {
        guess = value;
        checkLetter();
    }

    // Call function to check guess
    function checkLetter(){
        // Canvas variables
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");

        // if they have not already guessed that letter
        if(!guesses.includes(guess) && !didUserWin(blankWord, monster) && lives !== 0) {
            // If guess is not in the guesses array, push it to array
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
            }
            // lose a life if guess is not in word
            else if(lives > 1) {
                lives--;
                if (lives == 6) {
                    // Draw head
                    ctx.beginPath();
                    ctx.arc(130,100,20,0,2*Math.PI);
                    ctx.stroke();
                }
                if (lives == 5) {
                    // Draw body
                    ctx.moveTo(130,120);
                    ctx.lineTo(130,180);
                    ctx.stroke();
                }
                if (lives == 4) {
                    // Draw left leg
                    ctx.moveTo(130,180);
                    ctx.lineTo(110,200);
                    ctx.stroke();
                }
                if (lives == 3) {
                    // Draw right leg
                    ctx.moveTo(130,180);
                    ctx.lineTo(150,200);
                    ctx.stroke();
                }
                if (lives == 2) {
                    // Draw left arm
                    ctx.moveTo(130,150);
                    ctx.lineTo(105,140);
                    ctx.stroke();
                }
                if (lives == 1) {
                    // Draw right arm
                    ctx.moveTo(130,150);
                    ctx.lineTo(155,140);
                    ctx.stroke();
                }
            }
            // game is over if they were on their last life
            else if (lives == 1){
                lives--;
                // Draw face
                ctx.moveTo(128,100);
                ctx.lineTo(118,90);
         
                ctx.moveTo(118,100);
                ctx.lineTo(128,90);
             
                ctx.moveTo(142,100);
                ctx.lineTo(132,90);
             
                ctx.moveTo(142,90);
                ctx.lineTo(132,100);
              
                ctx.moveTo(125,110);
                ctx.lineTo(135,110);
                ctx.stroke();

                showElement("game-over");

                if (auto.checked == true)
                    newGame();
            }
            // Check if user won and show div
            if (didUserWin(blankWord, monster)) {               
                showElement("win");

                if (auto.checked == true)
                    newGame();
            }
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
    // variable for setGuess function
    newGame.setGuess = setGuess;
// End newGame()
}

// check if user has guessed all letters
function didUserWin (blannks, monster) {
    for (var i = 0; i < monster.length; i++) {
        if (blankWord.charAt(2*i) !== monster.charAt(i)) {
            return false;
        }
    }
    return true;
}

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

function showHint(){
    showElement("hint");
};

function resetData(canvas, contezt) {
    // Reset variables
    guesses = [];
    blankWord = "";
    lives = 7;
    // Hide win or lose message if user starts a new game
    hideElement("win");
    hideElement("game-over");
    hideElement("hint");
};