class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }


    create(){
        //sets background to outcome of boss battle
        if(GAMEWON){
            this.background = this.add.tileSprite(0, 0, 900, 900, 'victoryEnding').setOrigin(0, 0);
        }else{
            this.background = this.add.tileSprite(0, 0, 900, 900, 'defeatEnding').setOrigin(0, 0);
        }
        this.credit = this.sound.add('credit');
        this.credit.play({
            loop: true,
            volume: .5,
            mute: false
        });

        this.creditButton = this.add.image(250, 700, 'creditButton');
        this.menuButton = this.add.image(650, 700, 'menuButton');

        //deals with interactive gameove menu
        this.menuButton.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            this.credit.stop();
            this.scene.start("menuScene");
        });

        this.menuButton.setInteractive().on('pointerover',()=>{
            this.menuButton.setTexture('menuSelected');
            this.creditButton.setTexture('creditButton');
        });

        this.creditButton.setInteractive().on('pointerover',()=>{
            this.menuButton.setTexture('menuButton');
            this.creditButton.setTexture('creditSelected');
        });

        this.background.setInteractive().on('pointerover',()=>{
            this.menuButton.setTexture('menuButton');
            this.creditButton.setTexture('creditButton');
        });

        //if the credits are pushes deals with a new background
        this.creditButton.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            this.inEvent = true;
            this.creditPage = this.add.image(0, 0, 'creditPage').setOrigin(0.0, 0.0);
            this.menuButton = this.add.image(680, 780, 'menuButton');

            this.menuButton.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
                this.credit.stop();
                this.scene.start("menuScene");
            });
            this.menuButton.setInteractive().on('pointerover',()=>{
                this.menuButton.setTexture('menuSelected');
            });
            this.background.setInteractive().on('pointerover',()=>{
                this.menuButton.setTexture('menuButton');
            });
        });
    }
}