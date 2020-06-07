class BattleMenuItem extends Phaser.GameObjects.Text{
    constructor(scene, x, y, text, callback){
        super(scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 25});
        this.setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.enterButtonHoverState() )
            .on('pointerout', () => this.enterButtonRestState() )
            .on('pointerdown', () => this.enterButtonActiveState() )
            .on('pointerup', () => {
            this.enterButtonHoverState();
            callback();
      });
    }

    enterButtonHoverState(){
        this.setColor('#f8ff38');
    }

    enterButtonRestState(){
        this.setColor('#ffffff');
    }

    enterButtonActiveState(){
        this.setColor('#ff0000');
    }
}
