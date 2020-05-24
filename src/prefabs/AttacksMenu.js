class AttacksMenu extends BattleMenu{
    constructor(scene, x, y){
        super(scene, x, y);
    }

    confirm(){
        if(this.scene.selectedItems == false){
            this.scene.events.emit('attack');
        } else{
            this.scene.events.emit('item');
        }
        
    }
}