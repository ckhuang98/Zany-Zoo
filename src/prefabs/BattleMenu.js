class BattleMenu extends Phaser.GameObjects.Container{
    constructor(scene, x, y){
        super(scene, x, y);
        this.menuItems = [];
        this.menuItemIndex = 0;
        this.x = x;
        this.y = y;
    }

    addMenuItem(text, callback){
        let menuItem = new BattleMenuItem(this.scene, 0, this.menuItems.length * 40, text, callback);
        this.menuItems.push(menuItem);
        this.add(menuItem);
    }

    // clears menu
    clear(){
        for(let i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].destroy();
        }
        this.menuItems.length = 0;
        this.menuItemIndex = 0;
    }

}