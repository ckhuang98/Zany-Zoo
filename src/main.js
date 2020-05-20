let config = {
    type: Phaser.CANVAS,
    width: 1000,
    height: 1000,
    scene: [ Menu, Skills, City, Battle, BattleUi]
}

let game = new Phaser.Game(config);
let WIDTH = game.config.width;
let HEIGHT = game.config.height;

let keyUP, keySPACE;

// Main conditionals for choosing scenes
let numOfDays = 1;
let isNight = false;
