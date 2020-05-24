let config = {
    type: Phaser.CANVAS,
    width: 900,
    height: 900,
    scene: [ Menu, Skills, City, Battle, BattleUi]
}

let game = new Phaser.Game(config);
let WIDTH = game.config.width;
let HEIGHT = game.config.height;

let keyUP, keySPACE;

// Main conditionals for choosing scenes
let DAY = 1;

let MONEY = 0;
let REWARD = 10;

// Hard coded value for testing item loop
let BOUGHTPOTION = true;

let END = 0;
let STR = 0;
let WIT = 0;
let DEX = 0;
