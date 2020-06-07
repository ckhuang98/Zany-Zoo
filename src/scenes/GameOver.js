class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }
    preload(){
        this.load.image('defeatEnding', './assets/images/defeatEnding.png');
        this.load.image('victoryEnding', './assets/images/victoryEnding.png');
        this.load.image('creditPage', './assets/images/creditPage.png');
        this.load.image('creditButton', './assets/images/creditsButton.png');
        this.load.image('creditSelected', './assets/images/creditsSelected.png');
        this.load.image('menuButton', './assets/images/menuButton.png');
        this.load.image('menuSelected', './assets/images/menuSelected.png');
    }


    create(){
        if(GAMEWON){
            this.background = this.add.tileSprite(0, 0, 900, 900, 'victoryEnding').setOrigin(0, 0);
        }else{
            this.background = this.add.tileSprite(0, 0, 900, 900, 'defeatEnding').setOrigin(0, 0);
        }
        this.creditButton = this.add.image(250, 700, 'creditButton');
        this.menuButton = this.add.image(650, 700, 'menuButton');
        this.inEvent = false;
        this.creditButton.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            if(!this.inEvent){
                this.inEvent = true;
                this.creditPage = this.add.image(0, 0, 'creditPage').setOrigin(0.0, 0.0);
                this.menuButton = this.add.image(680, 780, 'menuButton');

                this.menuButton.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                    this.scene.start("menuScene");
                });
                this.menuButton.setInteractive().on('pointerover',()=>{
                    this.menuButton.setTexture('menuSelected');
                });
                this.background.setInteractive().on('pointerover',()=>{
                    this.menuButton.setTexture('menuButton');
                });
            }
        });

        this.menuButton.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            if(!this.inEvent){
            this.scene.start("menuScene");
            }
        });

        this.menuButton.setInteractive().on('pointerover',()=>{
            if(!this.inEvent){
                this.menuButton.setTexture('menuSelected');
                this.creditButton.setTexture('creditButton');
            }
        });

        this.creditButton.setInteractive().on('pointerover',()=>{
            if(!this.inEvent){
                this.menuButton.setTexture('menuButton');
                this.creditButton.setTexture('creditSelected');
            }
        });

        this.background.setInteractive().on('pointerover',()=>{
            this.menuButton.setTexture('menuButton');
            this.creditButton.setTexture('creditButton');
        });
    }
}