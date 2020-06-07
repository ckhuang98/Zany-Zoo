class ActionsMenu extends BattleMenu{
    constructor(scene, x, y){
        super(scene, x, y);
        this.addMenuItem('Attack', () => {this.scene.events.emit('SelectAttacks');});
        this.addMenuItem('Item', () => {this.scene.events.emit('SelectItems');});
    }
}