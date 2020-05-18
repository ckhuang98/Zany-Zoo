class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
        this.load.image('menu', './assets/images/TitleMenu.png');
        this.load.image('button', './assets/images/Button.png');
        this.load.image('instructions', './assets/images/Instructions.png');

        this.load.audio('bgm', './assets/sound/hipjazz.mp3'); // place holder bgm until I have time to make one.
    }

    create(){
        this.add.tileSprite(0, 0, 1000, 1000, 'menu').setOrigin(0, 0);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.instructionPressed = false;
        this.bgm = this.sound.add('bgm')
        this.bgm.play();
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyUP) && !this.instructionPressed){
            this.instructions = this.add.image(500, 500, 'instructions')
            this.instructionPressed = true;
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)){
            if(!this.instructionPressed){
                //this.scene.start("cityScene");
                this.scene.start("battleScene");
                this.bgm.stop();
            }else{
            this.instructions.destroy();
            this.instructionPressed = false;
            }
        }
    }
}