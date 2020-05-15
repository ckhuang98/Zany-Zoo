class MiniGameBattleUi extends Phaser.Scene{
    constructor(){
        super("miniGameBattleUiScene");
    }

    create(){
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);        
        this.graphics.strokeRect(2, 1100, 800, 300);
        this.graphics.fillRect(2, 1100, 800, 300);
        this.graphics.strokeRect(804, 1100, 598, 300);
        this.graphics.fillRect(804, 1100, 598, 300);
    }
}

