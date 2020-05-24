class ActionsMenu extends BattleMenu{
    constructor(scene, x, y){
        super(scene, x, y);
        this.addMenuItem('Attack')
        this.addMenuItem('Item');
    }

    confirm(){
        if(this.menuItemIndex == 0){
            this.scene.events.emit('SelectAttacks');
        } else if(this.menuItemIndex == 1){
            this.scene.events.emit('SelectItems');
        }
        
    }
}