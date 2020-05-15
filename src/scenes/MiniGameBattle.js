class MiniGameBattle extends Phaser.Scene{
    constructor(){
        super("miniGameBattleScene");
    }

    preload(){
        this.load.image('bear', './assets/images/bear.png');
    }

    create(){
        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
        
        
        this.player = new Player(this, 200, 700, 'bear', 1, 1, 1, 1);
        this.add.existing(this.player);

        this.animal = new Animal(this, 1200, 700, 'bear', 1, 3, 1);
        this.add.existing(this.animal);

        this.scene.launch('miniGameBattleUiScene');

        
    }
}