class ActionsMenu extends BattleMenu{
    constructor(scene, x, y){
        super(scene, x, y);
        this.addMenuItem('Endurance');
        this.addMenuItem('Wit');
        this.addMenuItem('Dexterity');
        this.addMenuItem('items');
    }
}