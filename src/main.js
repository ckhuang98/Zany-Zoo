let config = {
    type: Phaser.CANVAS,
    width: 1400,
    height: 1400,
    scene: [ Battle, BattleUi]
}

let game = new Phaser.Game(config);
let WIDTH = game.config.width;
let HEIGHT = game.config.height;

// Main conditionals for choosing scenes
let numOfDays = 1;
let isNight = false;
