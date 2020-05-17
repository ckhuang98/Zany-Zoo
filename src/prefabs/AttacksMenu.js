class AttacksMenu extends BattleMenu{
    constructor(scene, x, y){
        super(scene, x, y);
    }

    confirm(){
        this.scene.events.emit('attack');
    }
}