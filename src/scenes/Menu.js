class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
        this.load.image('menu', './assets/images/TitleMenu.png');
        this.load.image('pressStart', './assets/images/instructionsButton.png');
        this.load.image('pressInstruction', './assets/images/pressStart.png');
        this.load.image('instructions', './assets/images/Instructions.png');

        this.load.audio('bgm', './assets/sound/hipjazz.mp3'); // place holder bgm until I have time to make one.
    }

    create(){
        this.add.tileSprite(0, 0, 1000, 1000, 'menu').setOrigin(0, 0);
        this.pressStart = this.add.image(450, 600, 'pressInstruction');
        this.pressInstructions = this.add.image(450, 400, 'pressStart');
        this.exit = this.load.image('exit', 'exit.png');
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.instructionPressed = false;
        this.bgm = this.sound.add('bgm', {volume: 0.5});
        
        this.bgm.play();

        this.pressInstructions.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            if(!this.instructionPressed){
            this.instructions = this.add.image(500, 500, 'instructions')
            this.instructionPressed = true;
            }
        });

        this.pressStart.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            this.scene.start("skillsScene");
            this.bgm.stop();
        });
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyUP) && !this.instructionPressed){
            this.instructions = this.add.image(500, 500, 'instructions')
            this.instructionPressed = true;
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)){
            if(!this.instructionPressed){
                this.scene.start("skillsScene");
                this.bgm.stop();
            }else{
            this.instructions.destroy();
            this.instructionPressed = false;
            }
        }
    }
}