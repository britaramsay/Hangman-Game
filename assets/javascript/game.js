var monsters = ["banshee", "basilisk", "behemoth", 
            "centaur", "cyclops", "dryad", "elf", 
            "ghoul", "imp", "ogre", "orc", 
            "troll", "zombie"];

function newGame() {
    var monster = monsters[Math.floor(Math.random()*monsters.length)];
    console.log(monster);
}