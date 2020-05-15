class BattleMenu extends Phaser.GameObjects.Container{
    constructor(scene, x, y, player){
        super(this, x, y);
        this.menuItems = [];
        this.menuItemIndex = 0;
        this.player = player;
        this.x = x;
        this.y = y;
    }

    addMenuItem(unit){
        let menuItem = new BattleMenuItem(this.scene, 0, this.menuItems.length * 20, unit);
        this.menuItems.push(menuItem);
        this.add(menuItem);
    }

    moveSelectionUp(){
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex--;
        if(this.menuItemIndex < 0){
            this.menuItemIndex = this.menuItems.length - 1;
        }
        this.menuItems[this.menuItemIndex].select();
    }   
}