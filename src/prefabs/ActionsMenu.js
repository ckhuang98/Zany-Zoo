class ActionsMenu extends BattleMenu{
    constructor(scene, x, y){
        super(scene, x, y);
        this.addMenuItem('Attack')
        this.addMenuItem('Items');
    }

    confirm(){
        this.scene.events.emit('SelectAttacks', this.menuItemIndex);
    }
}