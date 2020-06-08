let config = {
    type: Phaser.CANVAS,
    width: 900,
    height: 900,
    scene: [ Loading, Menu, Skills, City, Battle, BossBattle, GameOver]
}



let game = new Phaser.Game(config);
let WIDTH = game.config.width;
let HEIGHT = game.config.height;

// All useful for playtesting specific days and scenes aka dev cheats
// Main conditionals for choosing scenes
let DAY = 1;
let GAMEWON = true;

let MONEY = 0;
let REWARD = 10;

// Consumable items tracker
let REDPOTION = 0;
let BLUEPOTION = 0;

let END = 1;
let STR = 1;
let WIT = 1;
let DEX = 1;
