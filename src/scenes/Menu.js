class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
        this.load.image('continueButton', './assets/images/continueButton.png');
        this.load.image('continueSelect', './assets/images/continueSelect.png');
        this.load.image('menu', './assets/images/TitleMenu.png');
        this.load.image('pressStart', './assets/images/pressStart.png');
        this.load.image('startSelect', './assets/images/startSelect.png');
        this.load.image('backStory', './assets/images/backstory.png');
        this.load.image('pressInstruction', './assets/images/instructionsButton.png');
        this.load.image('instructionsSelect', './assets/images/instructionsSelect.png');

        this.load.image('instructions', './assets/images/instructions.png');

        this.load.audio('bgm', './assets/sound/hipjazz.mp3'); // place holder bgm until I have time to make one.
    }

    create(){
        this.background = this.add.tileSprite(0, 0, 1000, 1000, 'menu').setOrigin(0, 0);
        this.pressStart = this.add.image(450, 580, 'pressStart');
        this.pressInstructions = this.add.image(450, 400, 'pressInstruction');
        this.exit = this.load.image('exit', 'exit.png');
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.inEvent = false;
        this.bgm = this.sound.add('bgm');
        
        this.bgm.play({
            loop: true,
            volume: .5,
            mute: false
        });

        this.pressInstructions.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            if(!this.inEvent){
                this.pressStart.destroy();
                this.instructions = this.add.image(450, 450, 'instructions').setOrigin(0.5,0.5);
                this.pressStart = this.add.image(686, 700, 'pressStart');
                this.inEvent = true;
                    this.instructions.setInteractive().on('pointerover',()=>{;
                    this.pressStart.setTexture('pressStart');
                    }); 
                    this.pressStart.setInteractive().on('pointerover',()=>{
                    this.pressStart.setTexture('startSelect');           
                    });
                    this.pressStart.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    this.startStory();
                });
            }
        });

        this.pressStart.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            this.startStory();
        });

            this.pressStart.setInteractive().on('pointerover',()=>{
                if(!this.inEvent){
                    this.pressStart.setTexture('startSelect');
                    this.pressInstructions.setTexture('pressInstruction');
                }
            });
            this.pressInstructions.setInteractive().on('pointerover',()=>{
                if(!this.inEvent){
                    this.pressStart.setTexture('pressStart');
                    this.pressInstructions.setTexture('instructionsSelect');
                }
            });

            this.background.setInteractive().on('pointerover',()=>{;
                if(!this.inEvent){
                    this.pressStart.setTexture('pressStart');
                    this.pressInstructions.setTexture('pressInstruction');
                }
            }); 
    }

    startStory(){
        this.pressInstructions.destroy();
        this.pressStart.destroy();
        this.workDay = this.add.image(0, 0, 'backStory').setOrigin(0.0, 0.0);
        this.continue = this.add.image(450, 780, 'continueButton');
        this.workDay.setInteractive().on('pointerover',()=>{;
            this.continue.setTexture('continueButton');
        }); 
        this.continue.setInteractive().on('pointerover',()=>{;
            this.continue.setTexture('continueSelect');
        }); 
        this.continue.setInteractive().on('pointerdown',()=>{;
            //this.scene.start("skillsScene");
            //this.scene.start("bossBattleScene");
            //this.scene.start("gameOverScene");
            this.scene.start("cityScene");
            this.bgm.stop();
        });

    }
}