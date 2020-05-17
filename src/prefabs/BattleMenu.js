class BattleMenu extends Phaser.GameObjects.Container{
    constructor(scene, x, y, player){
        super(scene, x, y);
        this.menuItems = [];
        this.menuItemIndex = 0;
        this.player = player;
        this.x = x;
        this.y = y;
    }

    addMenuItem(unit){
        let menuItem = new BattleMenuItem(this.scene, 0, this.menuItems.length * 40, unit);
        this.menuItems.push(menuItem);
        this.add(menuItem);
    }

    moveSelectionUp(){
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex--;
        if(this.menuItemIndex < 0)
            this.menuItemIndex = this.menuItems.length - 1;
        this.menuItems[this.menuItemIndex].select();
    }

    moveSelectionDown(){
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex++;
        if(this.menuItemIndex >= this.menuItems.length)
            this.menuItemIndex = 0;
        this.menuItems[this.menuItemIndex].select();
    }

    // select an element with index from menu
    select(index){
        if(!index)
            index = 0;
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = index;
        this.menuItems[this.menuItemIndex].select();
    }

    // deselect this menu
    deselect(){
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = 0;
    }

    confirm(){
    }

    // clears menu
    clear(){
        for(let i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].destroy();
        }
        this.menuItems.length = 0;
        this.menuItemIndex = 0;
    }

    remap(array){
        this.clear();
        for(let i = 0; i < array.length; i++){
            let item = array[i];
            this.addMenuItem(item);
        }
    }


}