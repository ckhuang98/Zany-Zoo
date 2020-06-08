class Preloading extends Phaser.Scene {
    constructor() {
        super("preLoadingScene");
    }
    preload(){
        this.load.spritesheet('loadingScreen', './assets/images/loadingSpriteSheet.png', {frameWidth: 900, frameHeight: 900, startFrame: 0, endFrame: 49});
    }
    create(){
        this.scene.start('loadingScene');
    }
}